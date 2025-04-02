
import React, { useState, useEffect, useRef } from 'react';
import { Map, Navigation, X, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import YandexMap from './YandexMap';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  address?: string;
}

interface RoutePlannerProps {
  selectedAttractions: Attraction[];
  onClose: () => void;
  onClearAll: () => void;
}

const RoutePlanner: React.FC<RoutePlannerProps> = ({ 
  selectedAttractions, 
  onClose,
  onClearAll
}) => {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    setAttractions(selectedAttractions);
  }, [selectedAttractions]);

  const handleDragStart = (index: number) => {
    dragItem.current = index;
    setDraggingIndex(index);
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) {
      setDraggingIndex(null);
      return;
    }
    
    const _attractions = [...attractions];
    const draggedItem = _attractions[dragItem.current];
    _attractions.splice(dragItem.current, 1);
    _attractions.splice(dragOverItem.current, 0, draggedItem);
    
    setAttractions(_attractions);
    setDraggingIndex(null);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  if (selectedAttractions.length === 0) {
    return (
      <Card className="mb-8 animate-scale-in">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-kaluga-100 flex items-center justify-center mb-4">
              <Map size={24} className="text-kaluga-500" />
            </div>
            <h3 className="text-xl font-medium mb-2">Маршрут не составлен</h3>
            <p className="text-kaluga-600 mb-4">
              Выберите достопримечательности, которые хотите посетить, и мы поможем составить маршрут
            </p>
            <button 
              className="text-kaluga-500 hover:text-kaluga-700"
              onClick={onClose}
            >
              Закрыть планировщик
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 animate-scale-in">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-serif">Ваш маршрут</CardTitle>
        <div className="flex gap-2">
          <button 
            className="text-kaluga-500 hover:text-kaluga-700 p-1"
            onClick={onClearAll}
            title="Очистить маршрут"
          >
            <Trash2 size={18} />
          </button>
          <button 
            className="text-kaluga-500 hover:text-kaluga-700 p-1"
            onClick={onClose}
            title="Закрыть"
          >
            <X size={18} />
          </button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <p className="text-kaluga-600 mb-4">
            {attractions.length === 1 
              ? 'У вас выбрана 1 достопримечательность' 
              : `У вас выбрано ${attractions.length} достопримечательностей`}. 
            Вы можете изменить порядок точек маршрута, перетаскивая их.
          </p>
          
          <div className="space-y-2">
            {attractions.map((attraction, index) => (
              <div 
                key={attraction.id}
                className={`p-3 border rounded-md bg-white transition-colors cursor-move ${
                  draggingIndex === index ? 'opacity-50 border-dashed' : ''
                }`}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => handleDragEnter(index)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-kaluga-100 text-kaluga-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium">{attraction.name}</h4>
                    {attraction.address && (
                      <p className="text-sm text-kaluga-500">{attraction.address}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button
          className="w-full flex items-center justify-center px-4 py-3 bg-kaluga-700 text-white rounded-md hover:bg-kaluga-800 transition-colors"
          onClick={() => setShowMap(!showMap)}
        >
          <Map size={16} className="mr-2" />
          {showMap ? 'Скрыть карту' : 'Показать на карте'}
        </button>
        
        {showMap && (
          <div className="mt-4 h-96 rounded-md overflow-hidden">
            <YandexMap points={attractions} key={attractions.map(a => a.id).join(',')} />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <a 
          href={`https://yandex.ru/maps/?mode=routes&rtext=${attractions.map(a => a.address?.replace(/,\s*Калуга/, '') || a.name).join('~')}&rtt=pd`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-kaluga-100 text-kaluga-700 rounded-md hover:bg-kaluga-200 transition-colors"
        >
          <Navigation size={16} className="mr-2" />
          Открыть в Яндекс.Картах
        </a>
      </CardFooter>
    </Card>
  );
};

export default RoutePlanner;
