import React, { useEffect, useRef } from 'react';

interface Point {
  id: number;
  name: string;
  address?: string;
}

interface YandexMapProps {
  points: Point[];
}

const YandexMap: React.FC<YandexMapProps> = ({ points }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const yandexMapRef = useRef<any>(null);

  useEffect(() => {
    // Load Yandex Maps API script
    const loadYandexMap = () => {
      if (!window.ymaps) {
        const script = document.createElement('script');
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=your_API_key&lang=ru_RU';
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (!window.ymaps || !mapRef.current) return;

      window.ymaps.ready(() => {
        if (yandexMapRef.current) {
          yandexMapRef.current.destroy();
        }

        yandexMapRef.current = new window.ymaps.Map(mapRef.current, {
          center: [54.513845, 36.261615], // Примерные координаты центра Калуги
          zoom: 12,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
        });

        const myGeoObjects: any[] = [];
        
        points.forEach((point, index) => {
          // Создаем геокодер для поиска по адресу
          const geocoder = window.ymaps.geocode(`Калуга, ${point.address || point.name}`);
          
          geocoder.then((res: any) => {
            const coordinates = res.geoObjects.get(0).geometry.getCoordinates();
            
            // Создаем метку для точки маршрута
            const placemark = new window.ymaps.Placemark(
              coordinates, 
              { 
                balloonContent: `<div style="padding: 10px">
                  <h3 style="font-weight: bold; margin-bottom: 5px">${point.name}</h3>
                  <p>${point.address || ''}</p>
                </div>`,
                iconCaption: `${index + 1}. ${point.name}`
              }, 
              { 
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
            
            // Если это последняя точка, центрируем и масштабируем карту
            if (index === points.length - 1 && myGeoObjects.length > 0) {
              yandexMapRef.current.setBounds(
                yandexMapRef.current.geoObjects.getBounds(), 
                { checkZoomRange: true, zoomMargin: 30 }
              );
              
              // Если точек больше одной, строим маршрут
              if (points.length > 1) {
                const multiRoute = new window.ymaps.multiRouter.MultiRoute(
                  {
                    referencePoints: points.map(p => `Калуга, ${p.address || p.name}`),
                    params: { routingMode: 'pedestrian' }
                  }, 
                  {
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
