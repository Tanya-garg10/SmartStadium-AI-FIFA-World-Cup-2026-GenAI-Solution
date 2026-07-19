import { describe, it, expect } from 'vitest';
import type { GateStatus, SectorStatus, Incident, NavigationRoute, Message } from '../types';

describe('Type Definitions', () => {
  describe('GateStatus', () => {
    it('should have valid gate status structure', () => {
      const gate: GateStatus = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: 100,
        occupancy: 50,
        status: 'optimal',
        avgWaitTime: 5,
      };
      expect(gate.id).toBe('gate-1');
      expect(gate.status).toBe('optimal');
    });

    it('should accept all valid status values', () => {
      const statuses: Array<GateStatus['status']> = ['optimal', 'moderate', 'congested'];
      statuses.forEach(status => {
        expect(['optimal', 'moderate', 'congested']).toContain(status);
      });
    });
  });

  describe('SectorStatus', () => {
    it('should have valid sector status structure', () => {
      const sector: SectorStatus = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 10000,
        currentCount: 5000,
        density: 'medium',
        noiseLevel: 85,
      };
      expect(sector.id).toBe('sector-1');
      expect(sector.density).toBe('medium');
    });

    it('should accept all valid density values', () => {
      const densities: Array<SectorStatus['density']> = ['low', 'medium', 'high', 'critical'];
      densities.forEach(density => {
        expect(['low', 'medium', 'high', 'critical']).toContain(density);
      });
    });
  });

  describe('Incident', () => {
    it('should have valid incident structure', () => {
      const incident: Incident = {
        id: 'inc-1',
        category: 'medical',
        title: 'Medical Emergency',
        description: 'Fan needs assistance',
        location: 'Section 100',
        reportedTime: '12:00',
        status: 'reported',
        severity: 'high',
      };
      expect(incident.id).toBe('inc-1');
      expect(incident.category).toBe('medical');
    });

    it('should accept all valid categories', () => {
      const categories: Array<Incident['category']> = [
        'medical',
        'security',
        'facilities',
        'lost_found',
        'accessibility',
      ];
      categories.forEach(category => {
        expect(['medical', 'security', 'facilities', 'lost_found', 'accessibility']).toContain(category);
      });
    });
  });

  describe('NavigationRoute', () => {
    it('should have valid navigation route structure', () => {
      const route: NavigationRoute = {
        id: 'route-1',
        name: 'Gate to Seat',
        from: 'Gate A',
        to: 'Section 100',
        distance: '500m',
        estimatedTime: '5 min',
        steps: ['Walk straight', 'Turn left'],
        isWheelchairAccessible: true,
        crowdLevel: 'moderate',
      };
      expect(route.id).toBe('route-1');
      expect(route.isWheelchairAccessible).toBe(true);
    });
  });

  describe('Message', () => {
    it('should have valid message structure', () => {
      const message: Message = {
        id: 'msg-1',
        sender: 'user',
        text: 'Hello',
        timestamp: '12:00',
      };
      expect(message.id).toBe('msg-1');
      expect(message.sender).toBe('user');
    });

    it('should accept all valid sender types', () => {
      const senders: Array<Message['sender']> = ['user', 'assistant', 'system'];
      senders.forEach(sender => {
        expect(['user', 'assistant', 'system']).toContain(sender);
      });
    });
  });
});
