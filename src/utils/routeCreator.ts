
/**
 * Utility functions for creating and managing map routes
 */
import { Point } from '@/types/map';
import { geocodePoint } from './mapInitializer';

/**
 * Creates a placemark for a given point at the specified coordinates
 * @param coordinates The coordinates where to place the marker
 * @param point The point data for the marker
 * @param index The index of the point in the route
 * @returns The created placemark object
 */
export const createPlacemark = (coordinates: number[], point: Point, index: number): any => {
  if (typeof window.ymaps === 'undefined') return null;
  
  // Create a placemark for the route point
  return new window.ymaps.Placemark(
    coordinates, 
    { 
      // Balloon content shown when clicking on the placemark
      balloonContent: `<div style="padding: 10px">
        <h3 style="font-weight: bold; margin-bottom: 5px">${point.name}</h3>
        <p>${point.address || ''}</p>
      </div>`,
      iconCaption: `${index + 1}. ${point.name}`
    }, 
    { 
      // Different icons for start, end, and intermediate points
      preset: index === 0 
        ? 'islands#redCircleDotIconWithCaption' 
        : index === Infinity  // This will be replaced with actual last index
          ? 'islands#darkGreenCircleDotIconWithCaption' 
          : 'islands#blueCircleDotIconWithCaption',
      iconCaptionMaxWidth: '200'
    }
  );
};

/**
 * Add points to the map and create a route between them
 * @param map The Yandex map instance
 * @param points Array of points to place on the map
 * @returns Promise that resolves when all points are added
 */
export const addPointsAndRouteToMap = async (map: any, points: Point[]): Promise<void> => {
  if (!map || !window.ymaps || !points.length) {
    console.log("Cannot add points to map - incomplete data");
    return;
  }
  
  console.log("Adding points to map:", points);
  const placemarks: any[] = [];
  
  // Clear any existing geoObjects
  map.geoObjects.removeAll();
  
  // Geocode all points
  const geocodingPromises = points.map((point, index) => geocodePoint(point, index));
  const coordinates = await Promise.all(geocodingPromises);
  
  // Filter out failed geocoding results
  const validCoordinates = coordinates.filter((coord): coord is number[] => coord !== null);
  
  if (validCoordinates.length < 1) {
    console.log("No valid points could be geocoded");
    return;
  }
  
  // Add placemarks for each point
  points.forEach((point, index) => {
    if (coordinates[index]) {
      const placemark = createPlacemark(coordinates[index]!, point, index);
      if (placemark) {
        map.geoObjects.add(placemark);
        placemarks.push(placemark);
      }
    }
  });
  
  // Create a route if we have at least 2 valid points
  if (validCoordinates.length >= 2) {
    try {
      console.log("Building route between points...");
      
      // Create a multi-route object for pedestrian navigation
      const multiRoute = new window.ymaps.multiRouter.MultiRoute(
        {
          referencePoints: validCoordinates,
          params: { routingMode: 'pedestrian' }
        }, 
        {
          // Route styling options
          boundsAutoApply: true,
          wayPointStartIconLayout: "default#image",
          wayPointStartIconImageHref: "",
          wayPointFinishIconLayout: "default#image",
          wayPointFinishIconImageHref: "",
          routeActiveStrokeWidth: 4,
          routeActiveStrokeColor: "#8B5CF6"
        }
      );
      
      // Add the route to the map
      map.geoObjects.add(multiRoute);
      
      // Set the map bounds to include all placemarks
      if (placemarks.length > 0) {
        console.log("Setting map bounds...");
        map.setBounds(
          map.geoObjects.getBounds(), 
          { checkZoomRange: true, zoomMargin: 30 }
        );
      }
    } catch (error) {
      console.error("Error creating route:", error);
    }
  } else if (validCoordinates.length === 1) {
    // If we only have one point, center the map on it
    map.setCenter(validCoordinates[0], 15);
  }
};
