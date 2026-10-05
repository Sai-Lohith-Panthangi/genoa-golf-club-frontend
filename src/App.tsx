import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

// Secondary pages load on demand to keep the first paint light on mobile.
const LakesCourse = lazy(() => import('./pages/LakesCourse'));
const RanchCourse = lazy(() => import('./pages/RanchCourse'));
const GolfOutings = lazy(() => import('./pages/GolfOutings'));
const Membership = lazy(() => import('./pages/Membership'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Capture = import.meta.env.DEV ? lazy(() => import('./pages/Capture')) : null;

export default function App() {
  return (
    <Suspense fallback={<p className="container muted" style={{ padding: '4rem 0' }}>Loading…</p>}>
      <Routes>
        {Capture && <Route path="__capture" element={<Capture />} />}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="lakes-course" element={<LakesCourse />} />
          <Route path="ranch-course" element={<RanchCourse />} />
          <Route path="golf-outings" element={<GolfOutings />} />
          <Route path="membership" element={<Membership />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
