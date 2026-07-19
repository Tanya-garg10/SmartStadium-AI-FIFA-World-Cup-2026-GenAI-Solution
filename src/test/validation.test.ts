import { describe, it, expect } from 'vitest';
import {
  sanitizeString,
  validateNumber,
  isValidEmail,
  validateEnum,
  validateArray,
  validateObject,
  sanitizeIncidentData,
  validateGateStatus,
  validateSectorStatus,
} from '../utils/validation';

describe('Validation Utilities', () => {
  describe('sanitizeString', () => {
    it('should sanitize HTML tags', () => {
      expect(sanitizeString('<script>alert("xss")</script>')).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
    });

    it('should trim whitespace', () => {
      expect(sanitizeString('  test  ')).toBe('test');
    });

    it('should handle non-string input', () => {
      expect(sanitizeString(123 as any)).toBe('');
      expect(sanitizeString(null as any)).toBe('');
    });

    it('should escape quotes', () => {
      expect(sanitizeString('"test"')).toBe('&quot;test&quot;');
      expect(sanitizeString("'test'")).toBe('&#x27;test&#x27;');
    });
  });

  describe('validateNumber', () => {
    it('should convert valid numbers', () => {
      expect(validateNumber('123')).toBe(123);
      expect(validateNumber(456)).toBe(456);
    });

    it('should return 0 for invalid input', () => {
      expect(validateNumber('abc')).toBe(0);
      expect(validateNumber(NaN)).toBe(0);
    });

    it('should enforce minimum value', () => {
      expect(validateNumber(5, 10)).toBe(10);
      expect(validateNumber(15, 10)).toBe(15);
    });

    it('should enforce maximum value', () => {
      expect(validateNumber(15, undefined, 10)).toBe(10);
      expect(validateNumber(5, undefined, 10)).toBe(5);
    });

    it('should enforce both min and max', () => {
      expect(validateNumber(5, 10, 20)).toBe(10);
      expect(validateNumber(25, 10, 20)).toBe(20);
      expect(validateNumber(15, 10, 20)).toBe(15);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email formats', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('test example.com')).toBe(false);
    });
  });

  describe('validateEnum', () => {
    it('should return value if in allowed values', () => {
      expect(validateEnum('red', ['red', 'green', 'blue'], 'blue')).toBe('red');
    });

    it('should return default if value not in allowed values', () => {
      expect(validateEnum('yellow', ['red', 'green', 'blue'], 'blue')).toBe('blue');
    });

    it('should handle non-matching types', () => {
      expect(validateEnum(123 as any, ['red', 'green', 'blue'], 'blue')).toBe('blue');
    });
  });

  describe('validateArray', () => {
    it('should return empty array for non-array input', () => {
      expect(validateArray('not an array')).toEqual([]);
      expect(validateArray(null)).toEqual([]);
      expect(validateArray(undefined)).toEqual([]);
    });

    it('should return array if valid', () => {
      expect(validateArray([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it('should filter using validator function', () => {
      const isEven = (n: number) => n % 2 === 0;
      expect(validateArray([1, 2, 3, 4], isEven)).toEqual([2, 4]);
    });
  });

  describe('validateObject', () => {
    it('should return true for valid object with required keys', () => {
      expect(validateObject({ a: 1, b: 2 }, ['a', 'b'])).toBe(true);
    });

    it('should return false for non-object', () => {
      expect(validateObject('string', ['a'])).toBe(false);
      expect(validateObject(null, ['a'])).toBe(false);
      expect(validateObject(undefined, ['a'])).toBe(false);
    });

    it('should return false if missing required keys', () => {
      expect(validateObject({ a: 1 }, ['a', 'b'])).toBe(false);
    });

    it('should return true if no required keys specified', () => {
      expect(validateObject({ a: 1 }, [])).toBe(true);
    });
  });

  describe('sanitizeIncidentData', () => {
    it('should sanitize incident data', () => {
      const input = {
        id: '<script>alert("xss")</script>',
        category: 'medical',
        title: 'Test Incident',
        description: 'Test description',
        location: 'Test location',
        reportedTime: '12:00',
        status: 'reported',
        severity: 'high',
      };

      const result = sanitizeIncidentData(input);
      expect(result?.id).toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
      expect(result?.category).toBe('medical');
    });

    it('should return null for invalid input', () => {
      expect(sanitizeIncidentData(null)).toBe(null);
      expect(sanitizeIncidentData('string' as any)).toBe(null);
    });

    it('should use default values for invalid enum values', () => {
      const input = {
        id: 'test',
        category: 'invalid' as any,
        title: 'Test',
        description: 'Test',
        location: 'Test',
        reportedTime: '12:00',
        status: 'invalid' as any,
        severity: 'invalid' as any,
      };

      const result = sanitizeIncidentData(input);
      expect(result?.category).toBe('facilities');
      expect(result?.status).toBe('reported');
      expect(result?.severity).toBe('medium');
    });
  });

  describe('validateGateStatus', () => {
    it('should validate correct gate status', () => {
      const validGate = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: 100,
        occupancy: 50,
        status: 'optimal',
        avgWaitTime: 5,
      };

      expect(validateGateStatus(validGate)).toBe(true);
    });

    it('should reject invalid status', () => {
      const invalidGate = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: 100,
        occupancy: 50,
        status: 'invalid' as any,
        avgWaitTime: 5,
      };

      expect(validateGateStatus(invalidGate)).toBe(false);
    });

    it('should reject negative flow rate', () => {
      const invalidGate = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: -10,
        occupancy: 50,
        status: 'optimal',
        avgWaitTime: 5,
      };

      expect(validateGateStatus(invalidGate)).toBe(false);
    });

    it('should reject occupancy outside 0-100 range', () => {
      const invalidGate = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: 100,
        occupancy: 150,
        status: 'optimal',
        avgWaitTime: 5,
      };

      expect(validateGateStatus(invalidGate)).toBe(false);
    });

    it('should reject missing required fields', () => {
      const incompleteGate = {
        id: 'gate-1',
        name: 'Gate A',
        flowRate: 100,
        occupancy: 50,
        status: 'optimal',
      };

      expect(validateGateStatus(incompleteGate)).toBe(false);
    });
  });

  describe('validateSectorStatus', () => {
    it('should validate correct sector status', () => {
      const validSector = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 10000,
        currentCount: 5000,
        density: 'medium',
        noiseLevel: 85,
      };

      expect(validateSectorStatus(validSector)).toBe(true);
    });

    it('should reject invalid density', () => {
      const invalidSector = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 10000,
        currentCount: 5000,
        density: 'invalid' as any,
        noiseLevel: 85,
      };

      expect(validateSectorStatus(invalidSector)).toBe(false);
    });

    it('should reject zero or negative capacity', () => {
      const invalidSector = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 0,
        currentCount: 5000,
        density: 'medium',
        noiseLevel: 85,
      };

      expect(validateSectorStatus(invalidSector)).toBe(false);
    });

    it('should reject negative current count', () => {
      const invalidSector = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 10000,
        currentCount: -100,
        density: 'medium',
        noiseLevel: 85,
      };

      expect(validateSectorStatus(invalidSector)).toBe(false);
    });

    it('should reject negative noise level', () => {
      const invalidSector = {
        id: 'sector-1',
        name: 'Section 100',
        capacity: 10000,
        currentCount: 5000,
        density: 'medium',
        noiseLevel: -10,
      };

      expect(validateSectorStatus(invalidSector)).toBe(false);
    });
  });
});
