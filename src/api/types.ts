// Mirrors the Spring Boot DTOs in genoa-golf-club-backend.

export type EventType = 'WEDDING' | 'CORPORATE' | 'PRIVATE_FUNCTION' | 'GOLF_OUTING' | 'OTHER';
export type VenuePreference = 'LAKES_COURSE' | 'RANCH_COURSE' | 'EITHER';
export type ReferralSource =
  | 'GOOGLE' | 'INSTAGRAM' | 'FACEBOOK' | 'YELP'
  | 'WORD_OF_MOUTH' | 'PREVIOUS_VISIT' | 'WEDDING_DIRECTORY' | 'OTHER';

export interface EnquiryRequest {
  fullName: string;
  email: string;
  phone: string;
  eventType: EventType;
  preferredDates: string[]; // ISO yyyy-mm-dd, 1 to 3
  estimatedGuests: number;
  preferredVenue: VenuePreference;
  additionalNotes?: string;
  referralSource?: ReferralSource;
  recaptchaToken: string;
}

export interface EnquiryResponse {
  referenceNumber: string;
  status: string;
  submittedAt: string;
  message: string;
}

export interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  sourcePage?: string;
}

export interface PopupResponse {
  id: number;
  headline: string;
  bodyText: string;
  flyerImageUrl: string | null;
  flyerAltText: string | null;
  ctaLabel: string | null;
  ctaUrl: string | null;
  displayScope: string;
  cookieName: string;
  cookieTtlDays: number;
}

export interface EventResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  categoryName: string | null;
  categoryColour: string | null;
  venueName: string | null;
  startsAt: string;
  endsAt: string | null;
  allDay: boolean;
  featuredImageUrl: string | null;
  bookingUrl: string | null;
}

/** Backend validation failures come back as field-keyed messages. */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}
