import type {
  EnquiryRequest, EnquiryResponse, EventResponse, PopupResponse, SubscribeRequest,
} from './types';
import { ApiError } from './types';

/**
 * Thin fetch wrapper. When VITE_API_BASE_URL is not set the site runs in demo
 * mode: reads return sample data and form posts are simulated, so the front
 * end can be developed and shown without the Spring Boot service running.
 */
const BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') ?? '';
export const isDemoMode = BASE === '';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...init,
  });
  if (res.status === 204) return null;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    // Spring problem+json or { errors: { field: msg } }
    const fieldErrors: Record<string, string> =
      body.errors && typeof body.errors === 'object' && !Array.isArray(body.errors) ? body.errors : {};
    throw new ApiError(body.detail ?? body.message ?? 'Something went wrong. Please try again.', res.status, fieldErrors);
  }
  return body as T;
}

// ---------- demo data ----------
const inDays = (d: number, hour = 10) => {
  const t = new Date();
  t.setDate(t.getDate() + d);
  t.setHours(hour, 0, 0, 0);
  return t.toISOString();
};

const DEMO_EVENTS: EventResponse[] = [
  { id: 1, slug: 'member-guest-scramble', title: 'Member-Guest Scramble', description: 'Two-person scramble with lunch and prizes.', categoryName: 'Tournament', categoryColour: '#1f5d3a', venueName: 'Lakes Course', startsAt: inDays(9, 8), endsAt: null, allDay: false, featuredImageUrl: null, bookingUrl: null },
  { id: 2, slug: 'sunset-wine-evening', title: 'Sunset Wine Evening', description: 'Tasting on the clubhouse terrace.', categoryName: 'Social', categoryColour: '#9a6b1f', venueName: 'Clubhouse', startsAt: inDays(16, 18), endsAt: null, allDay: false, featuredImageUrl: null, bookingUrl: null },
  { id: 3, slug: 'junior-clinic', title: 'Junior Golf Clinic', description: 'Ages 8 to 16, all abilities.', categoryName: 'Clinic', categoryColour: '#2a6f97', venueName: 'Ranch Course', startsAt: inDays(23, 9), endsAt: null, allDay: false, featuredImageUrl: null, bookingUrl: null },
];

// ---------- endpoints ----------
export async function getUpcomingEvents(limit = 3): Promise<EventResponse[]> {
  if (isDemoMode) return DEMO_EVENTS.slice(0, limit);
  return (await request<EventResponse[]>(`/api/v1/events/upcoming?limit=${limit}`)) ?? [];
}

/** Resolves to null when no campaign is scheduled (backend answers 204). */
export async function getActivePopup(): Promise<PopupResponse | null> {
  if (isDemoMode) {
    return {
      id: 1,
      headline: 'Fall Member Appreciation Weekend',
      bodyText: 'Join us for a relaxed scramble, live music and complimentary lunch. Open to members and guests.',
      flyerImageUrl: null,
      flyerAltText: null,
      ctaLabel: 'Enquire about events',
      ctaUrl: '/golf-outings#enquire',
      displayScope: 'HOME_ONLY',
      cookieName: 'ggc_popup_1',
      cookieTtlDays: 14,
    };
  }
  return request<PopupResponse>('/api/v1/popups/active');
}

export async function submitEnquiry(payload: EnquiryRequest): Promise<EnquiryResponse> {
  if (isDemoMode) {
    await wait(700);
    return {
      referenceNumber: `GGC-DEMO-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'NEW',
      submittedAt: new Date().toISOString(),
      message: `Thank you. A confirmation email is on its way to ${payload.email}.`,
    };
  }
  const res = await request<EnquiryResponse>('/api/v1/enquiries', { method: 'POST', body: JSON.stringify(payload) });
  return res as EnquiryResponse;
}

export async function subscribeEClub(payload: SubscribeRequest): Promise<void> {
  if (isDemoMode) {
    await wait(500);
    return;
  }
  await request('/api/v1/eclub/subscribe', { method: 'POST', body: JSON.stringify(payload) });
}
