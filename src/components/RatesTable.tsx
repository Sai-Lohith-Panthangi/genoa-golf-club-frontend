import { BOOKING_URL } from '../data/site';
import type { Course } from '../data/courses';
import SectionHead from './SectionHead';

export default function RatesTable({ course }: { course: Course }) {
  return (
    <section className="section section-dark" aria-labelledby="rates-h">
      <div className="container">
        <SectionHead label="Green Fees" title={course.ratesTitle} id="rates-h" light />
        <div className="rates-wrap">
          <table className="rates-table">
            <caption className="sr-only">{course.ratesTitle}</caption>
            <thead>
              <tr>
                <th scope="col">Time Window</th>
                <th scope="col">Sunday – Thursday</th>
                <th scope="col">Friday – Saturday</th>
              </tr>
            </thead>
            <tbody>
              {course.rates.map((r) => (
                <tr key={r.window}>
                  <th scope="row">{r.window}</th>
                  <td>{r.sunThu}</td>
                  <td>{r.friSat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="center">
          <a className="btn btn-green" href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Tee Time</a>
        </p>
      </div>
    </section>
  );
}
