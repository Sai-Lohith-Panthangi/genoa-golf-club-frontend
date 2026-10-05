import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

beforeEach(() => {
  document.cookie = 'ggc_popup_1=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
});

describe('routing', () => {
  it.each([
    ['/', /Golf the way it should feel/],
    ['/lakes-course', /Lakes Course/],
    ['/ranch-course', /Ranch Course/],
    ['/golf-outings', /Golf Outings/],
    ['/membership', /Membership/],
  ])('renders %s', async (path, heading) => {
    renderAt(path);
    expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });

  it('shows a 404 page', async () => {
    renderAt('/nope');
    expect(await screen.findByText(/could not find that page/i)).toBeInTheDocument();
  });
});

describe('popup', () => {
  it('shows on home and stays dismissed via cookie', async () => {
    const first = renderAt('/');
    const dialog = await screen.findByRole('dialog', { name: /Member Appreciation/i });
    expect(dialog).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close announcement'));
    expect(document.cookie).toContain('ggc_popup_1=1');
    first.unmount();

    renderAt('/');
    await screen.findByRole('heading', { level: 1 });
    await new Promise((r) => setTimeout(r, 50));
    expect(screen.queryByRole('dialog', { name: /Member Appreciation/i })).toBeNull();
  });
});

describe('enquiry form', () => {
  it('shows validation errors, then a reference number on success', async () => {
    renderAt('/golf-outings');
    await screen.findByRole('heading', { level: 1 });

    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByText('Full name is required.')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Full name'), { target: { name: 'fullName', value: 'Jordan M' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { name: 'email', value: 'j@example.com' } });
    fireEvent.change(screen.getByLabelText('Phone'), { target: { name: 'phone', value: '775 555 0142' } });
    fireEvent.change(screen.getByLabelText('First choice date'), { target: { name: 'date1', value: '2999-01-01' } });
    fireEvent.change(screen.getByLabelText('Estimated guests'), { target: { name: 'estimatedGuests', value: '40' } });
    fireEvent.click(screen.getByRole('button', { name: /send enquiry/i }));

    await waitFor(() => expect(screen.getByText(/GGC-DEMO-/)).toBeInTheDocument(), { timeout: 3000 });
  });
});

describe('E-Club signup', () => {
  it('rejects a bad email and accepts a good one', async () => {
    renderAt('/membership');
    await screen.findByRole('heading', { level: 1 });
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'bad' } });
    fireEvent.click(screen.getByRole('button', { name: /join the e-club/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i);

    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'a@b.co' } });
    fireEvent.click(screen.getByRole('button', { name: /join the e-club/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/on the list/i);
  });
});

describe('gallery lightbox', () => {
  it('opens, navigates and closes with Escape', async () => {
    renderAt('/lakes-course');
    await screen.findByRole('heading', { level: 1 });
    fireEvent.click(screen.getAllByRole('button', { name: /Enlarge photo/ })[0]);
    expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Photo viewer' })).toBeNull();
  });
});
