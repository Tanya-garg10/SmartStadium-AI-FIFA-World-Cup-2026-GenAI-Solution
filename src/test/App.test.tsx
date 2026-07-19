import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the fetch function
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      stadium: 'Test Stadium',
      overallOccupancy: 75,
      gates: [],
      sectors: [],
    }),
  })
) as any;

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/AURA/i)).toBeInTheDocument();
  });

  it('displays the header with correct title', () => {
    render(<App />);
    expect(screen.getByText('AURA \'26')).toBeInTheDocument();
  });

  it('shows smart stadium command OS subtitle', () => {
    render(<App />);
    expect(screen.getByText(/Smart Stadium Command OS/i)).toBeInTheDocument();
  });

  it('displays live status indicator', () => {
    render(<App />);
    expect(screen.getByText(/LIVE:/i)).toBeInTheDocument();
  });
});
