import { useEffect, useState } from 'react';

/**
 * Hash routing so the build works from any static host, file:// and JCEF:
 *   #/               landing page
 *   #/nix            the Nix map
 *   #/nix/booleans   the map with a lesson open
 */
export interface Route {
  course: string | null;
  node: string | null;
}

export function parseHash(hash: string): Route {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  return { course: parts[0] ?? null, node: parts[1] ?? null };
}

export function href(course: string | null, node?: string | null): string {
  if (!course) return '#/';
  return node ? `#/${encodeURIComponent(course)}/${encodeURIComponent(node)}` : `#/${encodeURIComponent(course)}`;
}

export function navigate(course: string | null, node?: string | null, replace = false): void {
  const target = href(course, node);
  if (location.hash === target) return;
  if (replace) history.replaceState(null, '', target);
  else location.hash = target;
  if (replace) window.dispatchEvent(new HashChangeEvent('hashchange'));
}

export function useRoute(): Route {
  const [route, setRoute] = useState(() => parseHash(location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parseHash(location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}
