import { describe, it, expect } from 'vitest';

describe('Utility Functions', () => {
  describe('Gate Status Calculations', () => {
    it('should calculate congestion level based on occupancy', () => {
      const calculateStatus = (occupancy: number) => {
        if (occupancy < 50) return 'optimal';
        if (occupancy < 75) return 'moderate';
        return 'congested';
      };

      expect(calculateStatus(30)).toBe('optimal');
      expect(calculateStatus(60)).toBe('moderate');
      expect(calculateStatus(85)).toBe('congested');
    });
  });

  describe('Sector Density Calculations', () => {
    it('should calculate density based on occupancy percentage', () => {
      const calculateDensity = (current: number, capacity: number) => {
        const percentage = (current / capacity) * 100;
        if (percentage < 50) return 'low';
        if (percentage < 75) return 'medium';
        if (percentage < 90) return 'high';
        return 'critical';
      };

      expect(calculateDensity(4000, 10000)).toBe('low');
      expect(calculateDensity(6000, 10000)).toBe('medium');
      expect(calculateDensity(8500, 10000)).toBe('high');
      expect(calculateDensity(9500, 10000)).toBe('critical');
    });
  });

  describe('Incident Severity Assessment', () => {
    it('should assign severity based on incident type', () => {
      const getSeverity = (category: string) => {
        const severityMap: Record<string, string> = {
          medical: 'high',
          security: 'critical',
          facilities: 'medium',
          lost_found: 'low',
          accessibility: 'medium',
        };
        return severityMap[category] || 'medium';
      };

      expect(getSeverity('medical')).toBe('high');
      expect(getSeverity('security')).toBe('critical');
      expect(getSeverity('facilities')).toBe('medium');
      expect(getSeverity('lost_found')).toBe('low');
    });
  });

  describe('Time Formatting', () => {
    it('should format minutes to readable time', () => {
      const formatTime = (minutes: number) => {
        if (minutes < 60) return `${minutes} min`;
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
      };

      expect(formatTime(5)).toBe('5 min');
      expect(formatTime(30)).toBe('30 min');
      expect(formatTime(65)).toBe('1h 5m');
      expect(formatTime(120)).toBe('2h');
    });
  });

  describe('Crowd Level Assessment', () => {
    it('should assess crowd level based on density', () => {
      const getCrowdLevel = (density: string) => {
        const levelMap: Record<string, string> = {
          low: 'low',
          medium: 'moderate',
          high: 'high',
          critical: 'high',
        };
        return levelMap[density] || 'moderate';
      };

      expect(getCrowdLevel('low')).toBe('low');
      expect(getCrowdLevel('medium')).toBe('moderate');
      expect(getCrowdLevel('high')).toBe('high');
      expect(getCrowdLevel('critical')).toBe('high');
    });
  });
});
