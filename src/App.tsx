import { useEffect, useState } from 'react';
import type { Course } from './types';
import { findCourse, loadCourse } from './content/loader';
import { useRoute } from './router';
import { Landing, type DashPage } from './components/Landing';
import { CourseView } from './components/CourseView';
import { RewardToasts } from './components/Rewards';

/** Dashboard pages that live next to the course maps in the URL. */
const PAGES = ['badges', 'about'] as const;
type Page = DashPage & ('learn' | (typeof PAGES)[number]);
const isPage = (s: string): s is (typeof PAGES)[number] => PAGES.some((p) => p === s);

export function App() {
  return (
    <>
      <Screen />
      <RewardToasts />
    </>
  );
}

function Screen() {
  const { course: courseId, node } = useRoute();
  const page: Page | null = !courseId ? 'learn' : isPage(courseId) ? courseId : null;
  const meta = courseId && !page ? findCourse(courseId) : undefined;
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    let cancelled = false;
    setCourse((c) => (c?.id === meta?.id ? c : null));
    if (meta) loadCourse(meta).then((c) => !cancelled && setCourse(c));
    return () => {
      cancelled = true;
    };
  }, [meta]);

  if (page) return <Landing page={page} />;
  if (!meta)
    return (
      <main className="landing">
        <h1>No map for “{courseId}” yet</h1>
        <p>
          <a href="#/">See all maps →</a>
        </p>
      </main>
    );
  if (!course || course.id !== meta.id) return <div className="loading">{meta.logo}</div>;
  return <CourseView key={course.id} course={course} nodeId={node} />;
}
