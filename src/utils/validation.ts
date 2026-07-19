/**
 * Input validation and sanitization utilities
 */

/**
 * Sanitize string input to prevent XSS attacks
 */
export function sanitizeString(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

/**
 * Validate and sanitize numeric input
 */
export function validateNumber(input: any, min?: number, max?: number): number {
  const num = Number(input);
  if (isNaN(num)) return 0;
  if (min !== undefined && num < min) return min;
  if (max !== undefined && num > max) return max;
  return num;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate that a value is within allowed enum values
 */
export function validateEnum<T>(value: any, allowedValues: readonly T[], defaultValue: T): T {
  return allowedValues.includes(value) ? value : defaultValue;
}

/**
 * Validate array structure
 */
export function validateArray<T>(input: any, validator?: (item: any) => boolean): T[] {
  if (!Array.isArray(input)) return [];
  if (validator) {
    return input.filter(validator) as T[];
  }
  return input as T[];
}

/**
 * Validate object structure
 */
export function validateObject(input: any, requiredKeys: string[] = []): boolean {
  if (typeof input !== 'object' || input === null) return false;
  return requiredKeys.every(key => key in input);
}

/**
 * Sanitize incident data
 */
export function sanitizeIncidentData(data: any): any {
  if (!data || typeof data !== 'object') return null;
  
  return {
    id: sanitizeString(data.id || ''),
    category: validateEnum(data.category, ['medical', 'security', 'facilities', 'lost_found', 'accessibility'], 'facilities'),
    title: sanitizeString(data.title || ''),
    description: sanitizeString(data.description || ''),
    location: sanitizeString(data.location || ''),
    reportedTime: sanitizeString(data.reportedTime || ''),
    status: validateEnum(data.status, ['reported', 'triaging', 'dispatched', 'resolved'], 'reported'),
    severity: validateEnum(data.severity, ['low', 'medium', 'high', 'critical'], 'medium'),
    recommendedAction: data.recommendedAction ? sanitizeString(data.recommendedAction) : undefined,
    assignedTeam: data.assignedTeam ? sanitizeString(data.assignedTeam) : undefined,
    broadcastDraft: data.broadcastDraft ? sanitizeString(data.broadcastDraft) : undefined,
  };
}

/**
 * Validate gate status data
 */
export function validateGateStatus(data: any): boolean {
  if (!validateObject(data, ['id', 'name', 'flowRate', 'occupancy', 'status', 'avgWaitTime'])) {
    return false;
  }
  
  const validStatuses = ['optimal', 'moderate', 'congested'];
  if (!validStatuses.includes(data.status)) return false;
  
  if (typeof data.flowRate !== 'number' || data.flowRate < 0) return false;
  if (typeof data.occupancy !== 'number' || data.occupancy < 0 || data.occupancy > 100) return false;
  if (typeof data.avgWaitTime !== 'number' || data.avgWaitTime < 0) return false;
  
  return true;
}

/**
 * Validate sector status data
 */
export function validateSectorStatus(data: any): boolean {
  if (!validateObject(data, ['id', 'name', 'capacity', 'currentCount', 'density', 'noiseLevel'])) {
    return false;
  }
  
  const validDensities = ['low', 'medium', 'high', 'critical'];
  if (!validDensities.includes(data.density)) return false;
  
  if (typeof data.capacity !== 'number' || data.capacity <= 0) return false;
  if (typeof data.currentCount !== 'number' || data.currentCount < 0) return false;
  if (typeof data.noiseLevel !== 'number' || data.noiseLevel < 0) return false;
  
  return true;
}
