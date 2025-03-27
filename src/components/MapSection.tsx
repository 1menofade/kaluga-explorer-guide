
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Link } from 'react-router-dom';

// Define structure for map locations
interface MapLocation {
  id: number;
  name: string;
  category: string;
  address: string;
  coordinates: {
    top: string;
    left: string;
  };
}

// Pre-defined locations for the map
// You can modify or add more locations by updating this array
const mapLocations: MapLocation[] = [
  {
    id: 1,
    name: 'Музей космонавтики',
    category: 'Музей',
    address: 'ул. Академика Королёва, 2',
    coordinates: {
      top: '30%',
      left: '45%'
    }
  },
  {
    id: 2,
    name: 'Каменный мост',
    category: 'Архитектура',
    address: 'ул. Пушкина',
    coordinates: {
      top: '55%',
      left: '30%'
    }
  },
  {
    id: 3,
    name: 'Калужский драматический театр',
    category: 'Культура',
    address: 'пл. Театральная, 1',
    coordinates: {
      top: '40%',
      left: '65%'
    }
  },
  {
    id: 4,
    name: 'Дом-музей К.Э. Циолковского',
    category: 'Музей',
    address: 'ул. Циолковского, 79',
    coordinates: {
      top: '70%',
      left: '55%'
    }
  }
];

// Available categories for filtering
const categories = ['Все', 'Музей', 'Культура', 'Архитектура'];

/**
 * MapSection component renders an interactive map with search and filtering functionality
 */
const MapSection = () => {
  // State for selected location, search query, category filter and filtered locations
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [filteredLocations, setFilteredLocations] = useState<MapLocation[]>(mapLocations);
  
  // Refs for the map container and Yandex map instance
  const mapRef = useRef<HTMLDivElement>(null);
  const yandexMapRef = useRef<any>(null);

  // Filter locations based on search query and selected category
  useEffect(() => {
    let result = mapLocations;
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        location => 
          location.name.toLowerCase().includes(query) || 
          location.address.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'Все') {
      result = result.filter(location => location.category === selectedCategory);
    }
    
    setFilteredLocations(result);
    
    // Reset selected location if it's no longer visible after filtering
    if (selectedLocation && !result.some(loc => loc.id === selectedLocation.id)) {
      setSelectedLocation(null);
    }
  }, [searchQuery, selectedCategory, selectedLocation]);

  // Initialize Yandex Maps
  useEffect(() => {
    // Load Yandex Maps API
    const loadYandexMap = () => {
      if (!window.ymaps) {
        const script = document.createElement('script');
        // API key is defined here - replace if needed
        script.src = 'https://api-maps.yandex.ru/2.1/?apikey=d00a65f6-ace0-4359-bfec-61603bf77861&lang=ru_RU';
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    // Initialize the map after the API is loaded
    const initializeMap = () => {
      if (!window.ymaps || !mapRef.current) return;

      window.ymaps.ready(() => {
        // Create new map
        yandexMapRef.current = new window.ymaps.Map(mapRef.current, {
          center: [54.513845, 36.261615], // Approximate coordinates of Kaluga center
          zoom: 13,
          controls: ['zoomControl', 'fullscreenControl', 'geolocationControl']
        });

        // Add placemarks to the map
        addPlacemarksToMap();
      });
    };

    // Function to add placemarks for each location
    const addPlacemarksToMap = () => {
      if (!window.ymaps || !yandexMapRef.current) return;

      // Clear existing placemarks
      yandexMapRef.current.geoObjects.removeAll();

      // Add placemarks for filtered locations
      filteredLocations.forEach(location => {
        window.ymaps.geocode(`Калуга, ${location.address}`).then((res: any) => {
          const firstGeoObject = res.geoObjects.get(0);
          const coordinates = firstGeoObject.geometry.getCoordinates();

          // Create and configure the placemark
          const placemark = new window.ymaps.Placemark(coordinates, {
            balloonContentHeader: location.name,
            balloonContentBody: `
              <div>
                <p>${location.category}</p>
                <p>${location.address}</p>
              </div>
            `,
            hintContent: location.name
          }, {
            preset: 'islands#blueCircleDotIconWithCaption',
            iconCaption: location.name,
            iconCaptionMaxWidth: '100'
          });

          // Add click event to the placemark
          placemark.events.add('click', () => {
            setSelectedLocation(location);
          });

          // Add the placemark to the map
          yandexMapRef.current.geoObjects.add(placemark);
        });
      });

      // Adjust map bounds to show all placemarks
      if (filteredLocations.length > 0) {
        setTimeout(() => {
          if (yandexMapRef.current.geoObjects.getLength() > 0) {
            yandexMapRef.current.setBounds(
              yandexMapRef.current.geoObjects.getBounds(), 
              { checkZoomRange: true, zoomMargin: 30 }
            );
          }
        }, 1000);
      }
    };

    loadYandexMap();

    // Cleanup function
    return () => {
      if (yandexMapRef.current) {
        yandexMapRef.current.destroy();
      }
    };
  }, [filteredLocations]);

  return (
    <section id="map" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Карта</span>
          <h2 className="section-title">Исследуйте Калугу</h2>
        </div>

        {/* Search and filter panel */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search input */}
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kaluga-500" size={18} />
            <Input
              className="pl-10 border-kaluga-100 focus-visible:ring-kaluga-500"
              placeholder="Поиск на карте..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Category filter */}
          <Popover>
            <PopoverTrigger asChild>
              <button 
                className="flex items-center px-4 py-2 bg-white border border-kaluga-100 rounded-md shadow-sm hover:bg-kaluga-50 transition-colors text-kaluga-700"
              >
                <Filter size={16} className="mr-2" />
                <span>{selectedCategory === 'Все' ? 'Категории' : selectedCategory}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
              <div className="py-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`w-full px-4 py-2 text-left hover:bg-kaluga-50 transition-colors ${
                      selectedCategory === category ? 'bg-kaluga-100 font-medium' : ''
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Map container */}
        <div className="relative w-full h-[500px] rounded-lg overflow-hidden glass-card">
          {/* Yandex map */}
          <div ref={mapRef} className="absolute inset-0 bg-kaluga-50">
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-kaluga-500">Загрузка карты...</p>
            </div>
          </div>
          
          {/* Location details card */}
          {selectedLocation && (
            <div className="absolute right-4 bottom-4 glass-card rounded-lg p-4 max-w-xs animate-scale-in">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-serif font-medium text-kaluga-800">{selectedLocation.name}</h3>
                <button 
                  className="text-kaluga-500 hover:text-kaluga-700"
                  onClick={() => setSelectedLocation(null)}
                  aria-label="Закрыть"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <span className="inline-block px-2 py-0.5 rounded bg-kaluga-100 text-kaluga-600 text-xs mb-2">
                {selectedLocation.category}
              </span>
              <p className="text-kaluga-700 text-sm mb-3">{selectedLocation.address}</p>
              <div className="flex flex-col space-y-2">
                <Link 
                  to={`/attraction/${selectedLocation.id}`}
                  className="inline-block text-kaluga-500 hover:text-kaluga-700 text-sm font-medium"
                >
                  Подробнее
                </Link>
                <a 
                  href={`https://yandex.ru/maps/?text=Калуга, ${selectedLocation.address}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-kaluga-500 hover:text-kaluga-700 text-sm font-medium"
                >
                  <Navigation size={14} className="mr-1" />
                  Построить маршрут
                </a>
              </div>
            </div>
          )}
        </div>
        
        {/* Help text */}
        <div className="text-center mt-8">
          {filteredLocations.length === 0 ? (
            <p className="text-kaluga-600">
              По вашему запросу ничего не найдено. 
              <button 
                className="ml-2 text-kaluga-500 hover:text-kaluga-700 font-medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Все');
                }}
              >
                Сбросить фильтры
              </button>
            </p>
          ) : (
            <p className="text-kaluga-600">
              Нажмите на маркеры, чтобы узнать больше о достопримечательностях города.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

// Add interface for global window object with ymaps property
declare global {
  interface Window {
    ymaps: any;
  }
}

export default MapSection;
