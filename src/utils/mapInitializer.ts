
/**
 * Utility functions for initializing and working with the Yandex map
 */
import { Point } from '@/types/map';

/**
 * Creates a new Yandex Map instance
 * @param container DOM element to hold the map
 * @returns The created map instance
 */
export const createYandexMap = (container: HTMLDivElement): any => {
  if (typeof window.ymaps === 'undefined') {
    console.error("Yandex Maps API not available");
    return null;
  }
  
  try {
    console.log("Creating Yandex Map...");
    // Create a new map centered on Kaluga
    const map = new window.ymaps.Map(container, {
      center: [54.513845, 36.261615], // Approximate coordinates of the center of Kaluga
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
    });
    
    console.log("Map created successfully");
    return map;
  } catch (error) {
    console.error("Error creating map:", error);
    return null;
  }
};

/**
 * Geocodes a point in Kaluga and returns its coordinates
 * @param point The point to geocode
 * @param index The index of the point in the route
 * @returns Promise that resolves to the coordinates [lat, lng] or null if geocoding fails
 */
export const geocodePoint = async (point: Point, index: number): Promise<number[] | null> => {
  if (typeof window.ymaps === 'undefined') {
    return null;
  }
  
  const searchQuery = `Калуга, ${point.address || point.name}`;
  console.log(`Geocoding point ${index + 1}: ${searchQuery}`);
  
  try {
    const result = await window.ymaps.geocode(searchQuery);
    const firstGeoObject = result.geoObjects.get(0);
    
    if (!firstGeoObject) {
      console.error(`No geocoding results for: ${searchQuery}`);
      return null;
    }
    
    const coordinates = firstGeoObject.geometry.getCoordinates();
    console.log(`Found coordinates for ${point.name}:`, coordinates);
    return coordinates;
  } catch (error) {
    console.error(`Error geocoding ${point.name}:`, error);
    return null;
  }
};
