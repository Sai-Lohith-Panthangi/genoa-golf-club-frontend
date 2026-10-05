import type { PhotoKey } from './media';

export const BOOKING_URL = 'https://foreupsoftware.com/'; // replace with the club's ForeUP booking link

export const NAV = [
  { to: '/lakes-course', label: 'Lakes Course' },
  { to: '/ranch-course', label: 'Ranch Course' },
  { to: '/golf-outings', label: 'Golf Outings' },
  { to: '/membership', label: 'Membership' },
] as const;

export const FOOTER_LINKS = [
  { to: '/lakes-course', label: 'Lakes Course' },
  { to: '/ranch-course', label: 'Ranch Course' },
  { to: '/membership', label: 'Membership' },
  { to: '/#enquire', label: 'Weddings' },
  { to: '/#dining', label: 'Dining' },
  { to: '/#enquire', label: 'Contact' },
] as const;

export interface Tile {
  title: string;
  blurb: string;
  to: string;
  photo: PhotoKey;
  pos: string;
}

export const FEATURE_TILES: Tile[] = [
  { title: 'Membership', blurb: 'Play more, save more, belong.', to: '/membership', photo: 'river', pos: '50% 40%' },
  { title: 'Golf Outings', blurb: 'Tournaments and team days, handled.', to: '/golf-outings', photo: 'trail', pos: '60% 50%' },
  { title: 'Dining', blurb: 'Lunch with a view of the mountains.', to: '/#dining', photo: 'pond', pos: '50% 60%' },
  { title: 'Weddings & Events', blurb: 'Vows by the water, party on the lawn.', to: '/#enquire', photo: 'panorama', pos: '66% 60%' },
];

/** Seasonal tee-sheet hours. Months are 1-12. */
export interface Season {
  label: string;
  from: [month: number, day: number];
  to: [month: number, day: number];
  first: string;
  last: string;
}

export const SEASONS: Season[] = [
  { label: 'May 1 – August 31', from: [5, 1], to: [8, 31], first: '7:00 AM', last: '4:28 PM' },
  { label: 'September 1 – September 30', from: [9, 1], to: [9, 30], first: '7:30 AM', last: '4:28 PM' },
  { label: 'October 1 – October 14', from: [10, 1], to: [10, 14], first: '8:00 AM', last: '4:28 PM' },
  { label: 'October 15 – November 1', from: [10, 15], to: [11, 1], first: '8:30 AM', last: '4:28 PM' },
];

export const PRACTICE_NOTE = 'Practice facility coincides with the Golf Shop hours:';
export const PRACTICE_HOURS = '7:00 AM – 4:30 PM';

/** Index of the season containing `date`, or -1 when the course is outside the published dates. */
export function currentSeasonIndex(date = new Date()): number {
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const n = m * 100 + d;
  return SEASONS.findIndex((s) => n >= s.from[0] * 100 + s.from[1] && n <= s.to[0] * 100 + s.to[1]);
}

export const OUTING_PACKAGES = [
  { name: 'Foursome Day', size: '4 to 16 players', text: 'Tee times held together, cart included, optional lunch voucher.' },
  { name: 'Corporate Scramble', size: '24 to 120 players', text: 'Shotgun start, scoring, branded hole signs and a buffet lunch.' },
  { name: 'Charity Tournament', size: '60 to 144 players', text: 'Registration desk, raffle setup, awards dinner and on-course contests.' },
];

export const OUTING_STEPS = [
  { title: 'Tell us your date and group size', text: 'Use the enquiry form below with up to three preferred dates.' },
  { title: 'We confirm availability', text: 'Our events team replies with a reference number and options.' },
  { title: 'Plan the day together', text: 'Format, food, signage and prizes, agreed in one conversation.' },
  { title: 'Show up and play', text: 'We handle setup, scoring and cleanup on the day.' },
];

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  featured?: boolean;
  perks: string[];
}

export const TIERS: MembershipTier[] = [
  { id: 'weekday', name: 'Weekday', price: '$185', cadence: 'per month', perks: ['Unlimited Monday to Friday golf', 'Range balls included', '7-day advance booking', 'Member guest rate'] },
  { id: 'full', name: 'Full Golf', price: '$265', cadence: 'per month', featured: true, perks: ['Unlimited golf, both courses', '14-day advance booking', 'Complimentary range balls', 'Four guest passes a year', 'Member events and clubhouse discounts'] },
  { id: 'family', name: 'Family', price: '$395', cadence: 'per month', perks: ['Two adults and dependants under 21', 'Junior clinics included', 'All Full Golf benefits', 'Family social calendar'] },
];

export const MEMBER_FAQ = [
  { q: 'Is there an initiation fee?', a: 'No. Monthly dues are the whole price in this demo.' },
  { q: 'Can I freeze my membership?', a: 'Yes, for up to three months a year with notice.' },
  { q: 'Do members get priority booking?', a: 'Weekday members book 7 days out, Full Golf and Family 14 days out.' },
];

export const STAY_PLAY = {
  title: 'Stay & Play',
  text: 'Pair a night in the Carson Valley with a round on either course. One booking, one rate, no juggling.',
};

export const SOCIAL_POSTS = [
  { id: 's1', handle: '@genoagolfclub', text: 'First snow on the peaks. Mornings like this are why we do it.', photo: 'panorama' as PhotoKey, pos: '30% 40%' },
  { id: 's2', handle: '@genoagolfclub', text: 'Perfect reflections on the pond this weekend. Come see for yourself.', photo: 'pond' as PhotoKey, pos: '50% 60%' },
  { id: 's3', handle: '@genoagolfclub', text: 'New pin positions across the Ranch Course. Bring your short game.', photo: 'trail' as PhotoKey, pos: '60% 50%' },
];

export const EVENT_TYPES = [
  { value: 'WEDDING', label: 'Wedding' },
  { value: 'CORPORATE', label: 'Corporate event' },
  { value: 'PRIVATE_FUNCTION', label: 'Private function' },
  { value: 'GOLF_OUTING', label: 'Golf outing' },
  { value: 'OTHER', label: 'Other' },
] as const;

export const VENUES = [
  { value: 'LAKES_COURSE', label: 'Lakes Course' },
  { value: 'RANCH_COURSE', label: 'Ranch Course' },
  { value: 'EITHER', label: 'No preference' },
] as const;

export const REFERRALS = [
  { value: 'GOOGLE', label: 'Google' },
  { value: 'INSTAGRAM', label: 'Instagram' },
  { value: 'FACEBOOK', label: 'Facebook' },
  { value: 'YELP', label: 'Yelp' },
  { value: 'WORD_OF_MOUTH', label: 'Word of mouth' },
  { value: 'PREVIOUS_VISIT', label: 'Previous visit' },
  { value: 'WEDDING_DIRECTORY', label: 'Wedding directory' },
  { value: 'OTHER', label: 'Other' },
] as const;
