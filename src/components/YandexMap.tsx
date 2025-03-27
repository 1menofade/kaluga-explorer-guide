
import React, { useEffect, useRef } from 'react';
import { Point } from '@/types/map';
import { loadYandexMapsApi, waitForYandexMapsReady } from '@/utils/mapLoader';
import { createYandexMap } from '@/utils/mapInitializer';
import { addPointsAndRouteToMap } from '@/utils/routeCreator';

// Props for the YandexMap component
interface YandexMapProps {
  points: Point[];
}

/**
 * YandexMap component renders an interactive map with the provided points
 * 
 * @param points - Array of locations to display on the map
 */
const YandexMap: React.FC<YandexMapProps> = ({ points }) => {
  // References to hold the map container and the Yandex map instance
  const mapRef = useRef<HTMLDivElement>(null);
  const yandexMapRef = useRef<any>(null);

  useEffect(() => {
    // Function to initialize the entire map process
    const initializeMapProcess = async () => {
      if (!mapRef.current) {
        console.error("Map container ref not available");
        return;
      }
      
      try {
        // Load the Yandex Maps API
        await loadYandexMapsApi();
        
        // Wait for the API to be ready
        await waitForYandexMapsReady();
        
        // Clean up existing map instance if it exists
        if (yandexMapRef.current) {
          yandexMapRef.current.destroy();
          yandexMapRef.current = null;
        }
        
        // Create a new map
        yandexMapRef.current = createYandexMap(mapRef.current);
        
        if (!yandexMapRef.current) {
          console.error("Failed to create map");
          return;
        }
        
        // Add points and create route
        await addPointsAndRouteToMap(yandexMapRef.current, points);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    // Start initializing the map
    console.log("Starting YandexMap component with points:", points);
    initializeMapProcess();

    // Clean up function to destroy the map when component unmounts
    return () => {
      console.log("Cleaning up YandexMap component");
      if (yandexMapRef.current) {
        yandexMapRef.current.destroy();
        yandexMapRef.current = null;
      }
    };
  }, [points]);

  return (
    <div ref={mapRef} className="w-full h-full" id="yandex-map">
      <div className="flex items-center justify-center w-full h-full bg-kaluga-50">
        <p className="text-kaluga-500">Загрузка карты...</p>
      </div>
    </div>
  );
};

export default YandexMap;
