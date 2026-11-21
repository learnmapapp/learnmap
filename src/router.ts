import { useEffect, useState } from 'react';

/**
 * Hash routing so the build works from any static host, file:// and JCEF:
 *   #/               landing page
 *   #/nix            the Nix map
 *   #/nix/booleans   the map with a lesson open
 *   #/nix?to=flakes  a shared link that starts the route to a lesson
 */
export interface Route {
  course: string | null;
  node: string | null;
  /** A route destination from a shared link; applied once, then dropped from the URL. */
  to: string | null;
}

export function parseHash(hash: string): Route {
  const [path, query = ''] = hash.replace(/^#\/?/, '').split('?', 2);
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const to = new URLSearchParams(query).get('to');
  return { course: parts[0] ?? null, node: parts[1] ?? null, to: to || null };
}

export function href(course: string | null, node?: string | null, to?: string | null): string {
  if (!course) return '#/';
  const path = node ? `#/${encodeURIComponent(course)}/${encodeURIComponent(node)}` : `#/${encodeURIComponent(course)}`;
  return to ? `${path}?to=${encodeURIComponent(to)}` : path;
}

/** A full URL for a hash, keeping the page address and its query (like ?embed=1). */
export function shareUrl(hash: string): string {
  return location.href.split('#')[0] + hash;
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
