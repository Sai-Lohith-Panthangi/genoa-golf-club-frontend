import { SEASONS, currentSeasonIndex } from './site';

describe('currentSeasonIndex', () => {
  const at = (m: number, d: number) => currentSeasonIndex(new Date(2026, m - 1, d));

  it('picks the right season on boundaries', () => {
    expect(at(5, 1)).toBe(0);
    expect(at(8, 31)).toBe(0);
    expect(at(9, 1)).toBe(1);
    expect(at(9, 30)).toBe(1);
    expect(at(10, 1)).toBe(2);
    expect(at(10, 14)).toBe(2);
    expect(at(10, 15)).toBe(3);
    expect(at(11, 1)).toBe(3);
  });

  it('returns -1 outside the published dates', () => {
    expect(at(11, 2)).toBe(-1);
    expect(at(1, 15)).toBe(-1);
    expect(at(4, 30)).toBe(-1);
  });

  it('matches the number of published seasons', () => expect(SEASONS).toHaveLength(4));
});
