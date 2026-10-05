import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

const clearCookie = () => {
  document.cookie = 'ggc_popup_1=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};
beforeEach(clearCookie);

describe('routing', () => {
  it.each([
    ['/', /Golf at the foot of the Sierra Nevada/],
    ['/lakes-course', /The Lakes Course/],
    ['/ranch-course', /The Ranch Course/],
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

  it('puts the E-Club band and footer on every page', async () => {
    renderAt('/membership');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByRole('heading', { name: 'Stay Connected' })).toBeInTheDocument();
    expect(within(screen.getByRole('navigation', { name: 'Footer' })).getAllByRole('link').length).toBeGreaterThanOrEqual(6);
  });
});

describe('Lakes Course page', () => {
  it('carries the client sample content', async () => {
    renderAt('/lakes-course');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByText(/Luxury and performance are the name of the game/)).toBeInTheDocument();
    expect(screen.getByText('7,359', { selector: 'dd' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hours of Operation' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'The Lakes Golf Course Rates' })).toBeInTheDocument();
    expect(screen.getAllByText('Gold Tees').length).toBeGreaterThan(0);
  });

  it('toggles the full scorecard', async () => {
    renderAt('/lakes-course');
    await screen.findByRole('heading', { level: 1 });
    const btn = screen.getByRole('button', { name: /view full scorecard/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(btn);
    expect(screen.getByRole('button', { name: /hide full scorecard/i })).toHaveAttribute('aria-expanded', 'true');
  });
});

describe('popup', () => {
  it('shows on home and stays dismissed via cookie', async () => {
    const first = renderAt('/');
    expect(await screen.findByRole('dialog', { name: /Member Appreciation/i }, { timeout: 3000 })).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close announcement'));
    expect(document.cookie).toContain('ggc_popup_1=1');
    first.unmount();

    renderAt('/');
    await screen.findByRole('heading', { level: 1 });
    await new Promise((r) => setTimeout(r, 1200));
    expect(screen.queryByRole('dialog', { name: /Member Appreciation/i })).toBeNull();
  });

  it('closes on Escape', async () => {
    renderAt('/');
    await screen.findByRole('dialog', { name: /Member Appreciation/i }, { timeout: 3000 });
    fireEvent.keyDown(document, { key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog', { name: /Member Appreciation/i })).toBeNull());
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

describe('E-Club band', () => {
  it('rejects a bad email and accepts a good one', async () => {
    renderAt('/membership');
    await screen.findByRole('heading', { level: 1 });
    fireEvent.change(screen.getByLabelText('E-Mail'), { target: { value: 'bad' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/valid email/i);

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sai Lohith' } });
    fireEvent.change(screen.getByLabelText('E-Mail'), { target: { value: 'a@b.co' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/on the list/i);
  });
});

describe('gallery lightbox', () => {
  it('opens, navigates and closes with Escape', async () => {
    renderAt('/lakes-course');
    await screen.findByRole('heading', { level: 1 });
    fireEvent.click(screen.getAllByRole('button', { name: /Enlarge photo/ })[0]);
    expect(screen.getByRole('dialog', { name: 'Photo viewer' })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Photo viewer' })).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});

describe('video previews', () => {
  it('opens a modal player from a tour card and closes with Escape', async () => {
    renderAt('/');
    fireEvent.click(await screen.findByLabelText('Close announcement', {}, { timeout: 3000 }));
    fireEvent.click(screen.getByRole('button', { name: /Play video: The Lakes Course/ }));
    const dialog = screen.getByRole('dialog', { name: 'The Lakes Course' });
    expect(dialog.querySelector('video')).toHaveAttribute('src', expect.stringContaining('media/river.mp4'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'The Lakes Course' })).toBeNull();
  });
});

describe('mobile menu', () => {
  it('toggles and closes on route change', async () => {
    renderAt('/');
    await screen.findByRole('heading', { level: 1 });
    const toggle = screen.getByRole('button', { name: /open menu/i });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(within(screen.getByRole('navigation', { name: 'Primary' })).getByText('Membership'));
    expect(await screen.findByRole('heading', { level: 1, name: /Membership/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toHaveAttribute('aria-expanded', 'false');
  });
});
