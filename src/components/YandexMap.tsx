
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
      if (!window.ymaps) {
        const script = document.createElement('script');
        // API key is used here - replace if needed
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d00a65f6-ace0-4359-bfec-61603bf77861&lang=ru_RU';
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    // Function to initialize the map once the API is loaded
    const initializeMap = () => {
      if (!window.ymaps || !mapRef.current) return;

      window.ymaps.ready(() => {
        // Clean up existing map instance if it exists
        if (yandexMapRef.current) {
          yandexMapRef.current.destroy();
        }

        // Create a new map centered on Kaluga
        yandexMapRef.current = new window.ymaps.Map(mapRef.current, {
          center: [54.513845, 36.261615], // Approximate coordinates of the center of Kaluga
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
        });

        const myGeoObjects: any[] = [];
        
        // Add placemarks for each point in the points array
        points.forEach((point, index) => {
          // Create a geocoder to search by address
          const geocoder = window.ymaps.geocode(`Калуга, ${point.address || point.name}`);
          
          geocoder.then((res: any) => {
            const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            
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
            
            // If this is the last point, center and scale the map
            if (index === points.length - 1 && myGeoObjects.length > 0) {
              yandexMapRef.current.setBounds(
                yandexMapRef.current.geoObjects.getBounds(), 
                { checkZoomRange: true, zoomMargin: 30 }
              );
              
              // If there are more than one point, build a route
              if (points.length > 1) {
                // Create a multi-route object for pedestrian navigation
                const multiRoute = new window.ymaps.multiRouter.MultiRoute(
                  {
                    referencePoints: points.map(p => `Калуга, ${p.address || p.name}`),
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
                
                yandexMapRef.current.geoObjects.add(multiRoute);
              }
            }
          });
        });
      });
    };

    loadYandexMap();

    // Clean up function to destroy the map when component unmounts
    return () => {
      if (yandexMapRef.current) {
        yandexMapRef.current.destroy();
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
