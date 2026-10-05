import { useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { subscribeEClub } from '../api/client';
import { ApiError } from '../api/types';
import { isValidEmail } from '../lib/validation';

/** "Stay Connected" signup that sits above the footer on every page. */
export default function EClubBand() {
  const { pathname } = useLocation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) return setError('Please enter a valid email address.');
    setError('');
    setState('sending');
    const [first, ...rest] = name.trim().split(/\s+/);
    try {
      await subscribeEClub({
        email: email.trim(),
        firstName: first || undefined,
        lastName: rest.join(' ') || undefined,
        sourcePage: pathname === '/' ? 'home' : pathname.slice(1),
      });
      setState('done');
    } catch (err) {
      setState('idle');
      setError(err instanceof ApiError ? err.message : 'Could not sign you up. Please try again.');
    }
  }

  return (
    <section className="eclub-band" aria-labelledby="eclub-title">
      <div className="container eclub-row">
        <div>
          <p className="label light">E-Club</p>
          <h2 id="eclub-title">Stay Connected</h2>
        </div>

        {state === 'done' ? (
          <p role="status" className="eclub-done">You are on the list. Watch your inbox for member offers and event news.</p>
        ) : (
          <form className="eclub-form" onSubmit={onSubmit} noValidate>
            <div className="eclub-fields">
              <label className="sr-only" htmlFor="eclub-name">Name</label>
              <input id="eclub-name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={160} />
              <label className="sr-only" htmlFor="eclub-email">E-Mail</label>
              <input
                id="eclub-email"
                type="email"
                placeholder="E-Mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? 'eclub-err' : undefined}
                autoComplete="email"
              />
              <button className="btn btn-outline" disabled={state === 'sending'}>{state === 'sending' ? 'Signing up…' : 'Sign Up'}</button>
            </div>
            {error && <p id="eclub-err" role="alert" className="eclub-error">{error}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
