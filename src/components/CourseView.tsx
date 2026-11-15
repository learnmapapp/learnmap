import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Course } from '../types';
import { layout, route, routeLayout } from '../graph';
import { navigate } from '../router';
import { useCourseProgress, usePrefs } from '../progress';
import { isEmbedded } from '../host';
import { AD_MODE } from '../site';
import { MapView } from './MapView';
import { LessonPanel } from './LessonPanel';
import { Guide } from './Guide';
import { Search } from './Search';
import { Settings } from './Settings';
import { Icon } from './Icon';
import { record } from '../stats';
import { ScoreChip } from './Rewards';

export function CourseView({ course, nodeId }: { course: Course; nodeId: string | null }) {
  const { progress, complete, uncomplete, setTarget, setIntroSeen, reset } = useCourseProgress(course.id);
  const { prefs, update: updatePrefs } = usePrefs();
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [guideOpen, setGuideOpen] = useState(!progress.introSeen && nodeId === null);

  const fullMap = useMemo(() => layout(course), [course]);
  const done = useMemo(() => new Set(progress.done), [progress.done]);
  const target = progress.target && course.nodeById.has(progress.target) ? course.nodeById.get(progress.target) ?? null : null;
  // A predefined goal gets its friendly title; any other lesson can be a destination too.
  const goal = target ? course.goals.find((g) => g.node === target.id) ?? null : null;
  const routeIds = useMemo(() => (target ? route(course, target.id) : null), [course, target]);
  const placed = useMemo(() => (routeIds ? routeLayout(course, routeIds) : fullMap), [course, routeIds, fullMap]);
  const goalToNode = (goalId: string | null) => (goalId ? course.goals.find((g) => g.id === goalId)?.node ?? null : null);
  const node = nodeId ? course.nodeById.get(nodeId) ?? null : null;
  const upNext = routeIds?.find((id) => !done.has(id));
  const explored = routeIds ? routeIds.filter((id) => done.has(id)).length : done.size;
  const total = routeIds ? routeIds.length : course.nodes.length;

  useEffect(() => {
    document.title = node ? `${node.title} · ${course.name} map` : `${course.name} map`;
    document.documentElement.style.setProperty('--accent', course.color);
  }, [course, node]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setShowSearch(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const select = useCallback((id: string) => navigate(course.id, id), [course.id]);
  const close = useCallback(() => navigate(course.id, null), [course.id]);

  const onComplete = (id: string) => {
    complete(id);
    record({ type: 'lesson', course: course.id, node: id });
  };

  return (
    <div className={node ? 'course with-panel' : 'course'}>
      <div className="map-area">
        <MapView
          course={course}
          placed={placed}
          done={done}
          routeIds={routeIds}
          goalNode={target?.id ?? null}
          selected={node?.id ?? null}
          onSelect={select}
          onBuildRoute={setTarget}
        />

        <div className="topbar">
          <a className="icon-btn home" href="#/" title="All courses">
            <Icon name="home" />
          </a>
          <div className="course-chip">
            <span>{course.logo}</span>
            <strong>{course.name}</strong>
            <span className="progress-text">
              {explored}/{total}
            </span>
          </div>
          <div className="spacer" />
          <ScoreChip />
          <button className="icon-btn" onClick={() => setShowSearch(true)} title="Search (⌘K or /)">
            <Icon name="search" />
          </button>
          <button className="icon-btn" onClick={() => setShowSettings(true)} title="Settings">
            <Icon name="settings" />
          </button>
        </div>

        {target && (
          <div className="route-card">
            <div className="route-head">
              <span className="route-icon">{goal?.icon ?? target.icon}</span>
              <div>
                <small>The way to</small>
                <strong>{goal?.title ?? target.title}</strong>
                <small>
                  {explored} of {total} explored
                </small>
              </div>
              <button className="icon-btn small" title="Leave route, show whole map" onClick={() => setTarget(null)}>
                <Icon name="close" size={16} />
              </button>
            </div>
            {upNext ? (
              <button className="route-next" onClick={() => select(upNext)}>
                <span>{course.nodeById.get(upNext)?.icon}</span>
                <span>
                  <small>Up next</small>
                  {course.nodeById.get(upNext)?.title}
                </span>
                <Icon name="arrowRight" />
              </button>
            ) : (
              <div className="route-next finished"><Icon name="sparkles" /> You made it! Close the route to explore the whole map.</div>
            )}
          </div>
        )}

        {!target && course.goals.length > 0 && !node && (
          <div className="goal-picker">
            <span className="muted">Pick a goal:</span>
            {course.goals.map((g) => (
              <button key={g.id} className="chip" onClick={() => setTarget(g.node)}>
                <Icon name="flag" size={15} /> {g.title}
              </button>
            ))}
            <span className="muted goal-hint">or tap any lesson to build your own route</span>
          </div>
        )}

        {!guideOpen && !node && (
          <button className="guide-mini" onClick={() => setGuideOpen(true)} title={`Talk to ${course.guide.name}`}>
            {course.guide.avatar}
          </button>
        )}
      </div>

      {node && (
        <LessonPanel
          key={node.id}
          course={course}
          node={node}
          done={done}
          routeIds={routeIds}
          compare={prefs.compare}
          onComplete={onComplete}
          onUncomplete={uncomplete}
          onClose={close}
        />
      )}

      {guideOpen && (
        <Guide
          course={course}
          compare={prefs.compare}
          onCompare={(id) => updatePrefs({ compare: id })}
          onGoal={(g) => setTarget(goalToNode(g))}
          onDone={() => {
            setGuideOpen(false);
            setIntroSeen(true);
          }}
        />
      )}
      {showSearch && (
        <Search
          course={course}
          onClose={() => setShowSearch(false)}
          onPick={(id) => {
            setShowSearch(false);
            select(id);
          }}
        />
      )}
      {showSettings && (
        <Settings
          course={course}
          compare={prefs.compare}
          onCompare={(id) => updatePrefs({ compare: id })}
          onReplayIntro={() => {
            setShowSettings(false);
            close();
            setGuideOpen(true);
          }}
          onReset={() => {
            reset();
            setShowSettings(false);
          }}
          onClose={() => setShowSettings(false)}
        />
      )}
      {AD_MODE && !isEmbedded && course.pluginUrl && !node && (
        <a className="plugin-link" href={course.pluginUrl} target="_blank" rel="noreferrer">
          Get the {course.name} plugin for IntelliJ <Icon name="external" size={14} />
        </a>
      )}
    </div>
  );
}
