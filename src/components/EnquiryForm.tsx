import { useState, type ChangeEvent, type FormEvent } from 'react';
import { submitEnquiry } from '../api/client';
import { ApiError, type EnquiryResponse } from '../api/types';
import { EVENT_TYPES, REFERRALS, VENUES } from '../data/site';
import { validateEnquiry, type EnquiryForm as Form, type Errors } from '../lib/validation';

const EMPTY: Form = {
  fullName: '', email: '', phone: '', eventType: 'WEDDING',
  date1: '', date2: '', date3: '', estimatedGuests: '',
  preferredVenue: 'EITHER', additionalNotes: '', referralSource: undefined,
};

export default function EnquiryForm({ defaultType = 'WEDDING' }: { defaultType?: Form['eventType'] }) {
  const [form, setForm] = useState<Form>({ ...EMPTY, eventType: defaultType });
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const [done, setDone] = useState<EnquiryResponse | null>(null);

  const set = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError('');
    const found = validateEnquiry(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setSending(true);
    try {
      const res = await submitEnquiry({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        eventType: form.eventType,
        preferredDates: [form.date1, form.date2, form.date3].filter(Boolean),
        estimatedGuests: Number(form.estimatedGuests),
        preferredVenue: form.preferredVenue,
        additionalNotes: form.additionalNotes?.trim() || undefined,
        referralSource: form.referralSource || undefined,
        // Real builds obtain this from reCAPTCHA v3; the dev backend accepts any value.
        recaptchaToken: import.meta.env.VITE_RECAPTCHA_TOKEN ?? 'dev-token',
      });
      setDone(res);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrors(err.fieldErrors);
        setFormError(err.message);
      } else {
        setFormError('We could not send your enquiry. Please try again or call us.');
      }
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="enquiry-done" role="status">
        <h3>Enquiry received</h3>
        <p>{done.message}</p>
        <p>
          Your reference number is <strong>{done.referenceNumber}</strong>.
        </p>
      </div>
    );
  }

  const err = (k: string) => errors[k];
  const field = (k: string) => ({
    id: `f-${k}`,
    name: k,
    'aria-invalid': !!err(k),
    'aria-describedby': err(k) ? `e-${k}` : undefined,
  });
  const msg = (k: string) =>
    err(k) ? <p id={`e-${k}`} className="field-error" role="alert">{err(k)}</p> : null;

  return (
    <form className="enquiry" onSubmit={onSubmit} noValidate>
      {formError && <p className="form-error" role="alert">{formError}</p>}

      <div className="grid-2">
        <div className="field">
          <label htmlFor="f-fullName">Full name</label>
          <input {...field('fullName')} value={form.fullName} onChange={set} autoComplete="name" />
          {msg('fullName')}
        </div>
        <div className="field">
          <label htmlFor="f-email">Email</label>
          <input {...field('email')} type="email" value={form.email} onChange={set} autoComplete="email" />
          {msg('email')}
        </div>
        <div className="field">
          <label htmlFor="f-phone">Phone</label>
          <input {...field('phone')} type="tel" value={form.phone} onChange={set} autoComplete="tel" />
          {msg('phone')}
        </div>
        <div className="field">
          <label htmlFor="f-eventType">Event type</label>
          <select {...field('eventType')} value={form.eventType} onChange={set}>
            {EVENT_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
      </div>

      <fieldset className="field">
        <legend>Preferred dates (up to three)</legend>
        <div className="grid-3">
          <input {...field('preferredDates')} id="f-preferredDates" name="date1" aria-label="First choice date" type="date" value={form.date1} onChange={set} />
          <input name="date2" aria-label="Second choice date" type="date" value={form.date2} onChange={set} />
          <input name="date3" aria-label="Third choice date" type="date" value={form.date3} onChange={set} />
        </div>
        {msg('preferredDates')}
      </fieldset>

      <div className="grid-2">
        <div className="field">
          <label htmlFor="f-estimatedGuests">Estimated guests</label>
          <input {...field('estimatedGuests')} type="number" min={1} max={500} inputMode="numeric" value={form.estimatedGuests} onChange={set} />
          {msg('estimatedGuests')}
        </div>
        <div className="field">
          <label htmlFor="f-preferredVenue">Preferred venue</label>
          <select {...field('preferredVenue')} value={form.preferredVenue} onChange={set}>
            {VENUES.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-additionalNotes">Anything else we should know?</label>
        <textarea {...field('additionalNotes')} rows={4} value={form.additionalNotes} onChange={set} />
        {msg('additionalNotes')}
      </div>

      <div className="field">
        <label htmlFor="f-referralSource">How did you hear about us? (optional)</label>
        <select {...field('referralSource')} value={form.referralSource ?? ''} onChange={set}>
          <option value="">Select…</option>
          {REFERRALS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </div>

      <button className="btn btn-green" disabled={sending}>
        {sending ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
