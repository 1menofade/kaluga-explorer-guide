
/**
 * Common map-related type definitions
 */

// Basic point structure for map locations
export interface Point {
  id: number;
  name: string;
  address?: string;
}

// Extend Window interface to include ymaps property
declare global {
  interface Window {
    ymaps: any;
  }
}
