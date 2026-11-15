import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Course } from '../types';
import { ancestors, isAvailable, type Placed } from '../graph';
import { Icon } from './Icon';

interface Props {
  course: Course;
  placed: Placed[];
  done: Set<string>;
  routeIds: string[] | null;
  goalNode: string | null;
  selected: string | null;
  onSelect: (id: string) => void;
  onBuildRoute: (id: string) => void;
}

interface View {
  x: number;
  y: number;
  k: number;
}

const MIN_K = 0.25;
const MAX_K = 2.5;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function MapView({ course, placed, done, routeIds, goalNode, selected, onSelect, onBuildRoute }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const [view, setView] = useState<View>({ x: 400, y: 120, k: 1 });
  const [animate, setAnimate] = useState(false);
  const dragged = useRef(false);
  const initialised = useRef(false);
  /** Node under the pointer (or keyboard focus): its prerequisite chain lights up. */
  const [hovered, setHovered] = useState<string | null>(null);
  /** Node whose "Build the route / Open" popover is showing. */
  const [menu, setMenu] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  const byId = useMemo(() => new Map(placed.map((p) => [p.node.id, p])), [placed]);
  const routeSet = useMemo(() => (routeIds ? new Set(routeIds) : null), [routeIds]);
  const focusId = hovered ?? menu;
  const trail = useMemo(() => (focusId ? ancestors(course, focusId) : null), [course, focusId]);
  const branchColor = useCallback(
    (id: string) => course.branches.find((b) => b.id === id)?.color ?? course.color,
    [course],
  );

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const animateTo = useCallback((v: View) => {
    setAnimate(true);
    setView(v);
    window.setTimeout(() => setAnimate(false), 450);
  }, []);

  const fit = useCallback(
    (ids?: Set<string> | null) => {
      const pts = placed.filter((p) => !ids || ids.has(p.node.id));
      if (pts.length === 0) return;
      const minX = Math.min(...pts.map((p) => p.x - 70));
      const maxX = Math.max(...pts.map((p) => p.x + 70));
      const minY = Math.min(...pts.map((p) => p.y - p.r - 20));
      const maxY = Math.max(...pts.map((p) => p.y + p.r + 40));
      // Keep clear of the top bar, and on phones of the route card docked at the bottom.
      const top = 64;
      const bottom = size.w < 700 ? 200 : 64;
      const h = Math.max(120, size.h - top - bottom);
      const k = clamp(Math.min(size.w / (maxX - minX), h / (maxY - minY)), MIN_K, 1.2);
      animateTo({ k, x: size.w / 2 - ((minX + maxX) / 2) * k, y: top + h / 2 - ((minY + maxY) / 2) * k });
    },
    [placed, size, animateTo],
  );

  const centerOn = useCallback(
    (id: string, k?: number) => {
      const p = byId.get(id);
      if (!p) return;
      setView((v) => {
        const kk = k ?? Math.max(v.k, 0.9);
        return { k: kk, x: size.w / 2 - p.x * kk, y: size.h / 2 - p.y * kk };
      });
      setAnimate(true);
      window.setTimeout(() => setAnimate(false), 450);
    },
    [byId, size],
  );

  // The whole map starts near the top, like the trailhead of a hike.
  const trailhead = useCallback((): View | null => {
    if (placed.length === 0) return null;
    const minX = Math.min(...placed.map((p) => p.x - 80));
    const maxX = Math.max(...placed.map((p) => p.x + 80));
    const minY = Math.min(...placed.map((p) => p.y - p.r));
    // Shrink to fit the width, but never so small that labels become unreadable.
    const k = clamp(size.w / (maxX - minX), 0.7, 1);
    return { k, x: size.w / 2 - ((minX + maxX) / 2) * k, y: Math.min(size.h * 0.15, 90) - minY * k };
  }, [placed, size]);

  useEffect(() => {
    if (initialised.current || size.w === 800) return;
    initialised.current = true;
    if (routeIds) {
      fit();
      return;
    }
    const v = trailhead();
    if (v) setView(v);
  }, [routeIds, size, fit, trailhead]);

  useEffect(() => {
    if (selected) centerOn(selected);
  }, [selected, size.w, centerOn]);

  // Entering or leaving a route swaps the layout: frame the new one.
  const routeKey = routeIds?.join(',') ?? '';
  const lastRouteKey = useRef(routeKey);
  useEffect(() => {
    if (lastRouteKey.current === routeKey) return;
    lastRouteKey.current = routeKey;
    setMenu(null);
    setHovered(null);
    if (!initialised.current) return;
    if (routeKey) fit();
    else {
      const v = trailhead();
      if (v) animateTo(v);
    }
  }, [routeKey, fit, trailhead, animateTo]);

  useEffect(() => {
    if (!menu) return;
    menuButton.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenu(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const activate = (id: string) => {
    // On a route, every stop opens straight away. On the full map, offer a route first.
    if (routeIds) onSelect(id);
    else setMenu((m) => (m === id ? null : id));
  };

  // Wheel: pinch / ctrl+wheel zooms, plain wheel pans (friendly to trackpads).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      setView((v) => {
        if (e.ctrlKey || e.metaKey) {
          const k = clamp(v.k * Math.exp(-e.deltaY * 0.01), MIN_K, MAX_K);
          return { k, x: px - (px - v.x) * (k / v.k), y: py - (py - v.y) * (k / v.k) };
        }
        return { ...v, x: v.x - e.deltaX, y: v.y - e.deltaY };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // Pointer: one finger/mouse pans, two fingers pinch-zoom.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    const start = { x: e.clientX, y: e.clientY };
    let last = pinchState();

    function pinchState() {
      const pts = [...pointers.current.values()];
      if (pts.length < 2) return null;
      const [a, b] = pts;
      return { d: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2 - rect.left, cy: (a.y + b.y) / 2 - rect.top };
    }

    const move = (ev: PointerEvent) => {
      const prev = pointers.current.get(ev.pointerId);
      if (!prev) return;
      pointers.current.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (Math.hypot(ev.clientX - start.x, ev.clientY - start.y) > 6) dragged.current = true;
      const pinch = pinchState();
      if (pinch && last) {
        const ratio = pinch.d / last.d;
        const l = last;
        setView((v) => {
          const k = clamp(v.k * ratio, MIN_K, MAX_K);
          const r = k / v.k;
          return { k, x: pinch.cx - (l.cx - v.x) * r, y: pinch.cy - (l.cy - v.y) * r };
        });
        last = pinch;
      } else if (pointers.current.size === 1) {
        setView((v) => ({ ...v, x: v.x + ev.clientX - prev.x, y: v.y + ev.clientY - prev.y }));
        last = null;
      } else {
        last = pinch;
      }
    };
    const up = (ev: PointerEvent) => {
      pointers.current.delete(ev.pointerId);
      last = pinchState();
      if (pointers.current.size === 0) {
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
      }
    };
    if (pointers.current.size === 1) {
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      window.addEventListener('pointercancel', up);
    }
  };

  const zoomBy = (f: number) =>
    animateTo({
      k: clamp(view.k * f, MIN_K, MAX_K),
      x: size.w / 2 - (size.w / 2 - view.x) * (clamp(view.k * f, MIN_K, MAX_K) / view.k),
      y: size.h / 2 - (size.h / 2 - view.y) * (clamp(view.k * f, MIN_K, MAX_K) / view.k),
    });

  const routeNumber = (id: string) => (routeIds ? routeIds.indexOf(id) + 1 : 0);
  const menuAt = menu ? byId.get(menu) : undefined;

  return (
    <div className={trail ? 'map tracing' : 'map'} ref={wrapRef} onPointerDown={onPointerDown}>
      <svg
        width="100%"
        height="100%"
        role="img"
        aria-label={`${course.name} learning map`}
        onClick={() => {
          if (!dragged.current) setMenu(null);
        }}
      >
        <defs>
          <radialGradient id="glow">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g
          key={routeIds ? 'route' : 'map'}
          className={animate ? 'map-world animate' : 'map-world'}
          style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.k})` }}
        >
          {placed.flatMap((p) =>
            p.node.requires.map((r) => {
              const from = byId.get(r);
              if (!from) return null;
              const lit = done.has(r) && done.has(p.node.id);
              const traced = trail !== null && trail.has(r) && trail.has(p.node.id);
              // The full map only shows paths you have walked; a route shows all of its own.
              const visible = traced || routeSet !== null || done.has(r);
              if (!visible) return null;
              const x1 = from.x;
              const y1 = from.y + from.r;
              const x2 = p.x;
              const y2 = p.y - p.r;
              const my = (y1 + y2) / 2;
              return (
                <path
                  key={`${r}->${p.node.id}`}
                  d={`M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`}
                  className={`edge${lit ? ' lit' : ''}${traced ? ' traced' : trail ? ' dim' : ''}`}
                  style={traced ? undefined : { stroke: branchColor(p.node.branch) }}
                />
              );
            }),
          )}
          {placed.map((p) => {
            const n = p.node;
            const isDone = done.has(n.id);
            const available = isAvailable(n, done);
            const num = routeNumber(n.id);
            const color = branchColor(n.branch);
            const cls = [
              'node',
              n.kind,
              isDone ? 'done' : available ? 'available' : 'locked',
              selected === n.id ? 'selected' : '',
              trail ? (trail.has(n.id) ? 'traced' : 'dim') : '',
              focusId === n.id ? 'focus' : '',
            ].join(' ');
            return (
              <g
                key={n.id}
                className={cls}
                transform={`translate(${p.x},${p.y})`}
                style={{ ['--node-color' as string]: color }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!dragged.current) activate(n.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate(n.id);
                  }
                }}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') setHovered(n.id);
                }}
                onPointerLeave={() => setHovered((h) => (h === n.id ? null : h))}
                onFocus={(e) => {
                  // Only keyboard focus traces; a mouse click shouldn't leave a trail behind.
                  if (e.currentTarget.matches(':focus-visible')) setHovered(n.id);
                }}
                onBlur={() => setHovered((h) => (h === n.id ? null : h))}
                tabIndex={0}
                role="button"
                aria-label={`${n.title}${isDone ? ' (completed)' : ''}`}
              >
                {selected === n.id && <circle r={p.r * 2.2} fill="url(#glow)" />}
                <circle className="node-halo" r={p.r + 6} />
                <circle className="node-ring" r={p.r + 5} />
                <circle className="node-body" r={p.r} />
                <text className="node-icon" dy="0.36em" fontSize={p.r * 0.85}>
                  {n.icon}
                </text>
                {isDone && (
                  <g transform={`translate(${p.r * 0.72},${-p.r * 0.72})`} className="badge-done">
                    <circle r={9} />
                    <path d="M-4,0.5 L-1.2,3.2 L4,-2.6" className="badge-check" />
                  </g>
                )}
                {goalNode === n.id && (
                  <g className="badge-goal" transform={`translate(${-p.r * 0.72},${-p.r * 0.72})`}>
                    <circle r={10} />
                    <path d="M-3.5,5 V-4.5 M-3.5,-4.5 H4 L2,-1.5 L4,1.5 H-3.5" />
                  </g>
                )}
                <text className="node-label" y={p.r + 18}>
                  {num > 0 && <tspan className="node-num">{num}. </tspan>}
                  {n.title}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
      {menuAt && (
        <div
          className="node-menu"
          style={{
            left: view.x + menuAt.x * view.k,
            top: view.y + (menuAt.y + menuAt.r + 28) * view.k,
            ['--node-color' as string]: branchColor(menuAt.node.branch),
          }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className="node-menu-route"
            ref={menuButton}
            onClick={() => {
              setMenu(null);
              onBuildRoute(menuAt.node.id);
            }}
          >
            <Icon name="route" size={18} /> Build the route
          </button>
          <button
            className="node-menu-open"
            onClick={() => {
              setMenu(null);
              onSelect(menuAt.node.id);
            }}
          >
            <Icon name="arrowRight" size={18} /> Open
          </button>
        </div>
      )}
      <div className="map-controls">
        <button className="icon-btn" onClick={() => zoomBy(1.25)} title="Zoom in">
          <Icon name="plus" />
        </button>
        <button className="icon-btn" onClick={() => zoomBy(0.8)} title="Zoom out">
          <Icon name="minus" />
        </button>
        <button className="icon-btn" onClick={() => fit()} title="Fit to screen">
          <Icon name="fit" />
        </button>
      </div>
    </div>
  );
}
