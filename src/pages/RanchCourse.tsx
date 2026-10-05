import { COURSES } from '../data/site';
import CoursePage from './CoursePage';

export default function RanchCourse() {
  return <CoursePage course={COURSES.ranch} />;
}
