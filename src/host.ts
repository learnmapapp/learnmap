/*
 * Bridge to an embedding host such as an IntelliJ plugin.
 *
 * The site works stand-alone. When embedded, the host can:
 *   - load it with `?embed=1` to hide web-only chrome (footer links etc.)
 *   - add `&compare=java` to preselect the comparison language
 *   - inject `window.learnmapHost = { postMessage(json: string) }` (e.g. via
 *     JBCefJSQuery) to receive events like "insert this code into the editor"
 *
 * Inside an <iframe> the same events are sent with window.parent.postMessage.
 */

export type HostEvent =
  | { type: 'lessonCompleted'; course: string; node: string }
  | { type: 'openInEditor'; course: string; node: string; lang: string; code: string }
  | { type: 'openUrl'; url: string };

interface HostBridge {
  postMessage(message: string): void;
}

declare global {
  interface Window {
    learnmapHost?: HostBridge;
  }
}

const params = new URLSearchParams(location.search);

export const isEmbedded = params.has('embed') || window.parent !== window;

export function hasEditorHost(): boolean {
  return window.learnmapHost !== undefined;
}

export function notifyHost(event: HostEvent): void {
  window.learnmapHost?.postMessage(JSON.stringify(event));
  if (window.parent !== window) window.parent.postMessage({ source: 'learnmap', ...event }, '*');
}
