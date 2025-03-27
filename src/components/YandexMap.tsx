
import React, { useEffect, useRef } from 'react';

// This interface defines the structure of each point on the map
interface Point {
  id: number;
  name: string;
  address?: string;
}

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
    // Function to load the Yandex Maps API script
    const loadYandexMap = () => {
      // Check if ymaps already exists in window
      if (typeof window.ymaps === 'undefined') {
        console.log("Loading Yandex Maps API script...");
        const script = document.createElement('script');
        // Using the provided API key
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d00a65f6-ace0-4359-bfec-61603bf77861&lang=ru_RU';
        script.async = true;
        script.onload = () => {
          console.log("Yandex Maps API script loaded, initializing map...");
          initializeMap();
        };
        script.onerror = (e) => {
          console.error("Error loading Yandex Maps API:", e);
        };
        document.body.appendChild(script);
      } else {
        console.log("Yandex Maps API already loaded, initializing map...");
        initializeMap();
      }
    };

    // Function to initialize the map once the API is loaded
    const initializeMap = () => {
      if (typeof window.ymaps === 'undefined') {
        console.error("Yandex Maps API not available");
        return;
      }
      
      if (!mapRef.current) {
        console.error("Map container ref not available");
        return;
      }

      // Wait for the API to be ready
      window.ymaps.ready(() => {
        console.log("Yandex Maps API ready, creating map...");
        
        // Clean up existing map instance if it exists
        if (yandexMapRef.current) {
          yandexMapRef.current.destroy();
          yandexMapRef.current = null;
        }

        try {
          // Create a new map centered on Kaluga
          yandexMapRef.current = new window.ymaps.Map(mapRef.current, {
            center: [54.513845, 36.261615], // Approximate coordinates of the center of Kaluga
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
          });
          
          console.log("Map created successfully, adding points...");
          
          // If there are no points, just return
          if (!points || points.length === 0) {
            console.log("No points to add to map");
            return;
          }
          
          // Add points and create route
          addPointsToMap();
        } catch (error) {
          console.error("Error creating map:", error);
        }
      });
    };

    // Function to add points to the map
    const addPointsToMap = () => {
      if (!yandexMapRef.current || !window.ymaps) return;
      
      console.log("Adding points to map:", points);
      const myGeoObjects: any[] = [];
      
      // Create a collection for storing point coordinates after geocoding
      const pointCoordinates: any[] = [];
      let geocodingPromises: Promise<any>[] = [];
      
      // Create geocoding promises for each point
      points.forEach((point, index) => {
        const searchQuery = `Калуга, ${point.address || point.name}`;
        console.log(`Geocoding point ${index + 1}: ${searchQuery}`);
        
        // Create a geocoder to search by address
        const geocodePromise = window.ymaps.geocode(searchQuery)
          .then((res: any) => {
            if (!res.geoObjects.get(0)) {
              console.error(`No geocoding results for: ${searchQuery}`);
              return null;
            }
            
            const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            console.log(`Found coordinates for ${point.name}:`, coordinates);
            
            // Store coordinates for later use in route building
            pointCoordinates[index] = coordinates;
            
            // Create a placemark for the route point
            const placemark = new window.ymaps.Placemark(
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
                  : index === points.length - 1 
                    ? 'islands#darkGreenCircleDotIconWithCaption' 
                    : 'islands#blueCircleDotIconWithCaption',
                iconCaptionMaxWidth: '200'
              }
            );
            
            yandexMapRef.current.geoObjects.add(placemark);
            myGeoObjects.push(placemark);
            return coordinates;
          })
          .catch((error: any) => {
            console.error(`Error geocoding ${point.name}:`, error);
            return null;
          });
          
        geocodingPromises.push(geocodePromise);
      });
      
      // After all points are geocoded, build a route
      Promise.all(geocodingPromises).then((results) => {
        // Filter out any null results
        const validPoints = results.filter(point => point !== null);
        
        if (validPoints.length < 2) {
          console.log("Not enough valid points to build a route");
          // Center the map on the first valid point
          if (validPoints.length === 1) {
            yandexMapRef.current.setCenter(validPoints[0], 15);
          }
          return;
        }
        
        console.log("All points geocoded, building route between points...");
        
        // Create a multi-route object for pedestrian navigation
        try {
          const multiRoute = new window.ymaps.multiRouter.MultiRoute(
            {
              referencePoints: validPoints,
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
          yandexMapRef.current.geoObjects.add(multiRoute);
          
          // Set the map bounds to include all points
          if (myGeoObjects.length > 0) {
            console.log("Setting map bounds...");
            yandexMapRef.current.setBounds(
              yandexMapRef.current.geoObjects.getBounds(), 
              { checkZoomRange: true, zoomMargin: 30 }
            );
          }
        } catch (error) {
          console.error("Error creating route:", error);
        }
      });
    };

    // Start loading the map
    console.log("Starting YandexMap component with points:", points);
    loadYandexMap();

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

// Add interface for global window object with ymaps property
declare global {
  interface Window {
    ymaps: any;
  }
}

export default YandexMap;
