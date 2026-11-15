/** Site-wide branding. Change these to rename the whole thing. */
export const SITE = {
  name: 'Learnmap',
  tagline: 'Pick a language, tell us what you already know, and wander a map of bite-sized, hands-on lessons.',
  footer: 'Made by the folks behind',
  url: 'https://jetplugins.dev',
  urlLabel: 'JetPlugins',
  /**
   * Ad mode: show links to the IntelliJ plugins (on course cards, on the map,
   * and in the footer). Off by default. Turn it on here, or at build time with
   * VITE_AD_MODE=true. Preview either way with ?ads=1 or ?ads=0 in the URL.
   */
  adMode: false,
};

function readAdMode(): boolean {
  const param = new URLSearchParams(location.search).get('ads');
  if (param !== null) return param === '1' || param === 'true';
  const env = import.meta.env.VITE_AD_MODE;
  if (env !== undefined) return env === 'true' || env === '1';
  return SITE.adMode;
}

/** Whether plugin links are shown. Read once at startup. */
export const AD_MODE = readAdMode();
