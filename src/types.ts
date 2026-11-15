/** A language the learner already knows, used for side-by-side comparisons. */
export interface CompareLang {
  id: string;
  name: string;
  /** Two-letter badge text, e.g. "Py". */
  short: string;
  color: string;
}

/** A branch groups related nodes on the map (e.g. "Language", "Tooling"). */
export interface Branch {
  id: string;
  title: string;
  color: string;
}

/** A goal is a destination node; picking one filters the map to the route there. */
export interface Goal {
  id: string;
  title: string;
  node: string;
  icon: string;
  description: string;
}

export interface GuideConfig {
  name: string;
  avatar: string;
  /** Lines shown before the "which language do you know?" question. */
  intro: string[];
  askLanguage: string;
  askGoal: string;
  outroRoute: string;
  outroExplore: string;
}

export interface CourseMeta {
  id: string;
  name: string;
  tagline: string;
  logo: string;
  color: string;
  /** Syntax id used for highlighting code in this course. */
  syntax: string;
  /** File extension used for code file titles, e.g. "nix". */
  extension: string;
  pluginUrl?: string;
  guide: GuideConfig;
  branches: Branch[];
  goals: Goal[];
  /** Ids of comparison languages offered for this course. */
  comparisons: string[];
}

export interface LessonNode {
  id: string;
  title: string;
  icon: string;
  branch: string;
  requires: string[];
  summary: string;
  kind: 'hub' | 'lesson';
  body: string;
  /** Optional manual position override, in map units. */
  pos?: { x: number; y: number };
}

export interface GlossaryEntry {
  term: string;
  definition: string;
  node?: string;
}

export interface Course extends CourseMeta {
  nodes: LessonNode[];
  nodeById: Map<string, LessonNode>;
  glossary: Map<string, GlossaryEntry>;
}

export interface CatalogEntry {
  id: string;
  name: string;
  logo: string;
  color: string;
  blurb: string;
  pluginUrl?: string;
}
