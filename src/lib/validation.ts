import type { EnquiryRequest } from '../api/types';

export type EnquiryForm = Omit<EnquiryRequest, 'recaptchaToken' | 'estimatedGuests' | 'preferredDates'> & {
  estimatedGuests: string;
  date1: string;
  date2: string;
  date3: string;
};

export type Errors = Partial<Record<string, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+0-9().\-\s]{7,20}$/;

/** Mirrors the backend Bean Validation rules so users get instant feedback. */
export function validateEnquiry(f: EnquiryForm, today = new Date()): Errors {
  const e: Errors = {};
  if (!f.fullName.trim()) e.fullName = 'Full name is required.';
  else if (f.fullName.length > 120) e.fullName = 'Full name must be 120 characters or fewer.';

  if (!f.email.trim()) e.email = 'Email address is required.';
  else if (!EMAIL.test(f.email)) e.email = 'Must be a valid email address.';

  if (!f.phone.trim()) e.phone = 'Phone number is required.';
  else if (!PHONE.test(f.phone)) e.phone = 'Must be a valid phone number.';

  const dates = [f.date1, f.date2, f.date3].filter(Boolean);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  if (dates.length === 0) e.preferredDates = 'At least one preferred date is required.';
  else if (dates.some((d) => new Date(`${d}T00:00:00`).getTime() < start))
    e.preferredDates = 'Preferred dates must be today or later.';
  else if (new Set(dates).size !== dates.length) e.preferredDates = 'Please choose different dates.';

  const g = Number(f.estimatedGuests);
  if (!f.estimatedGuests) e.estimatedGuests = 'Estimated guest count is required.';
  else if (!Number.isInteger(g) || g < 1) e.estimatedGuests = 'Guest count must be at least 1.';
  else if (g > 500) e.estimatedGuests = 'Guest count must be 500 or fewer.';

  if ((f.additionalNotes ?? '').length > 2000) e.additionalNotes = 'Notes must be 2000 characters or fewer.';
  return e;
}

export function isValidEmail(v: string): boolean {
  return EMAIL.test(v.trim());
}
