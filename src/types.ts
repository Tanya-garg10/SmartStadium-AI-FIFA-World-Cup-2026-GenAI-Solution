export interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language?: string;
}

export interface GateStatus {
  id: string;
  name: string;
  flowRate: number; // people per minute
  occupancy: number; // percentage 0-100
  status: 'optimal' | 'moderate' | 'congested';
  avgWaitTime: number; // minutes
}

export interface SectorStatus {
  id: string;
  name: string;
  capacity: number;
  currentCount: number;
  density: 'low' | 'medium' | 'high' | 'critical';
  noiseLevel: number; // decibels
}

export interface Incident {
  id: string;
  category: 'medical' | 'security' | 'facilities' | 'lost_found' | 'accessibility';
  title: string;
  description: string;
  location: string;
  reportedTime: string;
  status: 'reported' | 'triaging' | 'dispatched' | 'resolved';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  recommendedAction?: string;
  assignedTeam?: string;
  broadcastDraft?: string;
}

export interface NavigationRoute {
  id: string;
  name: string;
  from: string;
  to: string;
  distance: string;
  estimatedTime: string;
  steps: string[];
  isWheelchairAccessible: boolean;
  crowdLevel: 'low' | 'moderate' | 'high';
}
