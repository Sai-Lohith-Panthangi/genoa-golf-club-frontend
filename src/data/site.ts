// Static content for the marketing pages. Anything that changes often
// (events, popup) comes from the backend via src/api/client.ts instead.

export const BOOKING_URL = 'https://foreupsoftware.com/'; // ForeUP tee-time link (placeholder)

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/lakes-course', label: 'Lakes Course' },
  { to: '/ranch-course', label: 'Ranch Course' },
  { to: '/golf-outings', label: 'Golf Outings' },
  { to: '/membership', label: 'Membership' },
] as const;

export interface Tile {
  title: string;
  blurb: string;
  to: string;
  tone: 'green' | 'gold' | 'sky' | 'sand';
}

export const FEATURE_TILES: Tile[] = [
  { title: 'Membership', blurb: 'Play more, save more, belong.', to: '/membership', tone: 'green' },
  { title: 'Golf Outings', blurb: 'Tournaments and team days, handled.', to: '/golf-outings', tone: 'gold' },
  { title: 'Dining', blurb: 'Lunch with a view of the 18th.', to: '/#enquire', tone: 'sky' },
  { title: 'Weddings & Events', blurb: 'Vows on the lake, party on the lawn.', to: '/#enquire', tone: 'sand' },
];

export interface CourseInfo {
  slug: 'lakes' | 'ranch';
  name: string;
  tagline: string;
  intro: string;
  stats: { label: string; value: string }[];
  highlights: { title: string; text: string }[];
  holes: { hole: number; par: number; yards: number; note: string }[];
  rates: { label: string; price: string }[];
}

export const COURSES: Record<'lakes' | 'ranch', CourseInfo> = {
  lakes: {
    slug: 'lakes',
    name: 'Lakes Course',
    tagline: 'Water on nearly every hole. Views on all of them.',
    intro:
      'Our signature layout threads through five lakes with wide, forgiving fairways and greens that reward a confident approach. It is the course members point visitors to first.',
    stats: [
      { label: 'Holes', value: '18' },
      { label: 'Par', value: '72' },
      { label: 'Yardage', value: '6,812' },
      { label: 'Slope', value: '131' },
    ],
    highlights: [
      { title: 'Signature 7th', text: 'A par 3 over open water with the Sierra ridge behind the green.' },
      { title: 'Practice facilities', text: 'Full driving range, short-game area and two putting greens.' },
      { title: 'Clubhouse terrace', text: 'Post-round lunch overlooking the closing hole.' },
    ],
    holes: [
      { hole: 1, par: 4, yards: 392, note: 'Gentle opener, bunker guards the right side.' },
      { hole: 4, par: 5, yards: 541, note: 'Reachable in two, but the lake is waiting.' },
      { hole: 7, par: 3, yards: 178, note: 'Signature island-style green.' },
      { hole: 12, par: 4, yards: 421, note: 'Dogleg left, big hitters can cut the corner.' },
      { hole: 18, par: 5, yards: 556, note: 'Finishes in front of the clubhouse.' },
    ],
    rates: [
      { label: 'Weekday', price: '$75' },
      { label: 'Weekend', price: '$95' },
      { label: 'Twilight', price: '$55' },
      { label: 'Junior', price: '$25' },
    ],
  },
  ranch: {
    slug: 'ranch',
    name: 'Ranch Course',
    tagline: 'Open country golf with room to swing.',
    intro:
      'Rolling terrain, native grasses and long views define the Ranch Course. It plays a little firmer and a little faster, and it is the favourite for relaxed groups and outings.',
    stats: [
      { label: 'Holes', value: '18' },
      { label: 'Par', value: '71' },
      { label: 'Yardage', value: '6,540' },
      { label: 'Slope', value: '127' },
    ],
    highlights: [
      { title: 'Elevation changes', text: 'Tee shots that fall away to generous landing areas.' },
      { title: 'Group friendly', text: 'Wide corridors and quick rounds suit larger parties.' },
      { title: 'Ranch pavilion', text: 'Covered event space beside the 9th green.' },
    ],
    holes: [
      { hole: 2, par: 4, yards: 365, note: 'Downhill tee shot, aim at the lone oak.' },
      { hole: 5, par: 3, yards: 165, note: 'Elevated green, club up in the wind.' },
      { hole: 9, par: 5, yards: 520, note: 'Ends beside the pavilion.' },
      { hole: 14, par: 4, yards: 405, note: 'Creek crossing short of the green.' },
      { hole: 17, par: 3, yards: 192, note: 'Longest par 3 on property.' },
    ],
    rates: [
      { label: 'Weekday', price: '$65' },
      { label: 'Weekend', price: '$85' },
      { label: 'Twilight', price: '$45' },
      { label: 'Junior', price: '$20' },
    ],
  },
};

export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  cadence: string;
  featured?: boolean;
  perks: string[];
}

export const TIERS: MembershipTier[] = [
  {
    id: 'weekday',
    name: 'Weekday',
    price: '$185',
    cadence: 'per month',
    perks: ['Unlimited Monday to Friday golf', 'Range balls included', '7-day advance booking', 'Member guest rate'],
  },
  {
    id: 'full',
    name: 'Full Golf',
    price: '$265',
    cadence: 'per month',
    featured: true,
    perks: [
      'Unlimited golf, both courses',
      '14-day advance booking',
      'Complimentary range balls',
      'Four guest passes a year',
      'Member events and clubhouse discounts',
    ],
  },
  {
    id: 'family',
    name: 'Family',
    price: '$395',
    cadence: 'per month',
    perks: ['Two adults and dependants under 21', 'Junior clinics included', 'All Full Golf benefits', 'Family social calendar'],
  },
];

export const GALLERY = [
  { id: 'g1', alt: 'Morning light over the lake at the 7th hole', tone: 'green' },
  { id: 'g2', alt: 'Golfers walking the 12th fairway', tone: 'sky' },
  { id: 'g3', alt: 'Wedding ceremony on the terrace lawn', tone: 'sand' },
  { id: 'g4', alt: 'Ranch course pavilion at golden hour', tone: 'gold' },
  { id: 'g5', alt: 'Practice green at dawn', tone: 'green' },
  { id: 'g6', alt: 'Clubhouse dining room', tone: 'sand' },
] as const;

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

export const STAY_PLAY = {
  title: 'Stay & Play',
  text: 'Pair a night in the Carson Valley with a round on either course. One booking, one rate, no juggling.',
};

export const SOCIAL_POSTS = [
  { id: 's1', handle: '@genoagolfclub', text: 'First frost on the Lakes Course. Mornings like this are why we do it.', tone: 'sky' },
  { id: 's2', handle: '@genoagolfclub', text: 'Congratulations to the Hendersons. Wedding season is in full swing.', tone: 'sand' },
  { id: 's3', handle: '@genoagolfclub', text: 'New pin positions on the Ranch Course this weekend.', tone: 'green' },
] as const;

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
