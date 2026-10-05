import { validateEnquiry, isValidEmail, type EnquiryForm } from './validation';

const today = new Date('2026-10-05T12:00:00');
const good: EnquiryForm = {
  fullName: 'Jordan Michaels', email: 'jordan@example.com', phone: '+1 775 555 0142',
  eventType: 'WEDDING', date1: '2026-11-12', date2: '', date3: '',
  estimatedGuests: '140', preferredVenue: 'LAKES_COURSE', additionalNotes: '',
};

describe('validateEnquiry', () => {
  it('accepts a valid form', () => expect(validateEnquiry(good, today)).toEqual({}));

  it('requires name, email, phone, a date and guests', () => {
    const e = validateEnquiry({ ...good, fullName: '', email: '', phone: '', date1: '', estimatedGuests: '' }, today);
    expect(Object.keys(e).sort()).toEqual(['email', 'estimatedGuests', 'fullName', 'phone', 'preferredDates']);
  });

  it('rejects past and duplicate dates', () => {
    expect(validateEnquiry({ ...good, date1: '2026-10-01' }, today).preferredDates).toMatch(/today or later/);
    expect(validateEnquiry({ ...good, date2: '2026-11-12' }, today).preferredDates).toMatch(/different/);
  });

  it('accepts today as a preferred date', () => {
    expect(validateEnquiry({ ...good, date1: '2026-10-05' }, today).preferredDates).toBeUndefined();
  });

  it('bounds guest count to 1..500', () => {
    expect(validateEnquiry({ ...good, estimatedGuests: '0' }, today).estimatedGuests).toBeDefined();
    expect(validateEnquiry({ ...good, estimatedGuests: '501' }, today).estimatedGuests).toBeDefined();
    expect(validateEnquiry({ ...good, estimatedGuests: '500' }, today).estimatedGuests).toBeUndefined();
  });
});

describe('isValidEmail', () => {
  it('works', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('nope')).toBe(false);
  });
});
