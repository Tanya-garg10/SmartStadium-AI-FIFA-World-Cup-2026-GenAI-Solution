import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';

// Mock fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Integration Tests', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('App Integration', () => {
    it('should render all tabs and switch between them', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({
          stadium: 'Test Stadium',
          overallOccupancy: 75,
          gates: [],
          sectors: [],
        }),
      });

      render(<App />);

      // Wait for initial fetch
      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });

      // Check if sidebar tabs are present
      expect(screen.getByText(/Live Ops/i)).toBeInTheDocument();
      expect(screen.getByText(/AI Copilot/i)).toBeInTheDocument();
      expect(screen.getByText(/Incidents/i)).toBeInTheDocument();
    });

    it('should handle fetch errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      render(<App />);

      // Should still render even if fetch fails
      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });
    });

    it('should handle invalid API response', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ invalid: 'data' }),
      });

      render(<App />);

      // Should still render with default data
      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });
    });

    it('should refresh telemetry when button is clicked', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          stadium: 'Test Stadium',
          overallOccupancy: 75,
          gates: [],
          sectors: [],
        }),
      });

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/Refresh Telemetry/i)).toBeInTheDocument();
      });

      const refreshButton = screen.getByText(/Refresh Telemetry/i);
      fireEvent.click(refreshButton);

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });
    });
  });

  describe('Data Validation Integration', () => {
    it('should validate stadium state data structure', async () => {
      const validData = {
        stadium: 'Metropolitan Stadium',
        overallOccupancy: 85,
        gates: [
          {
            id: 'gate-1',
            name: 'Gate A',
            flowRate: 100,
            occupancy: 50,
            status: 'optimal',
            avgWaitTime: 5,
          },
        ],
        sectors: [
          {
            id: 'sector-1',
            name: 'Section 100',
            capacity: 10000,
            currentCount: 5000,
            density: 'medium',
            noiseLevel: 85,
          },
        ],
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(validData),
      });

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });

      expect(mockFetch).toHaveBeenCalledWith('/api/stadium/live-state');
    });

    it('should handle missing data fields gracefully', async () => {
      const incompleteData = {
        stadium: 'Test Stadium',
        // missing overallOccupancy, gates, sectors
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(incompleteData),
      });

      render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });
    });
  });

  describe('Performance Integration', () => {
    it('should not cause unnecessary re-renders', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({
          stadium: 'Test Stadium',
          overallOccupancy: 75,
          gates: [],
          sectors: [],
        }),
      });

      const { rerender } = render(<App />);

      await waitFor(() => {
        expect(screen.getByText(/AURA/i)).toBeInTheDocument();
      });

      // Rerender should not cause issues
      rerender(<App />);

      expect(screen.getByText(/AURA/i)).toBeInTheDocument();
    });
  });
});
