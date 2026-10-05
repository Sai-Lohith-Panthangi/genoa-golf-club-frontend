import { useState, type FormEvent } from 'react';
import { subscribeEClub } from '../api/client';
import { ApiError } from '../api/types';
import { isValidEmail } from '../lib/validation';

export default function EClubSignup({ sourcePage = 'home' }: { sourcePage?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Please enter a valid email address.');
    setError('');
    setState('sending');
    try {
      await subscribeEClub({ email: email.trim(), sourcePage });
      setState('done');
    } catch (err) {
      setState('idle');
      setError(err instanceof ApiError ? err.message : 'Could not subscribe. Please try again.');
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className="eclub-done">
        You are on the list. Watch your inbox for member offers and event news.
      </p>
    );
  }

  return (
    <form className="eclub" onSubmit={onSubmit} noValidate>
      <label htmlFor="eclub-email" className="sr-only">Email address</label>
      <input
        id="eclub-email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? 'eclub-err' : undefined}
        autoComplete="email"
      />
      <button className="btn btn-gold" disabled={state === 'sending'}>
        {state === 'sending' ? 'Joining…' : 'Join the E-Club'}
      </button>
      {error && <p id="eclub-err" role="alert" className="field-error">{error}</p>}
    </form>
  );
}
