
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Check, Filter, Navigation } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import RoutePlanner from '@/components/RoutePlanner';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  address?: string;
}

// Данные о достопримечательностях
const attractionsData: Attraction[] = [
  {
    id: 1,
    name: 'Музей космонавтики',
    description: 'Один из крупнейших в России музеев космической тематики. Расположен в Калуге, считающейся родиной теоретической космонавтики.',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    address: 'ул. Академика Королёва, 2, Калуга'
  },
  {
    id: 2,
    name: 'Дом-музей К.Э. Циолковского',
    description: 'Мемориальный дом-музей, где жил и работал основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    address: 'ул. Циолковского, 79, Калуга'
  },
  {
    id: 3,
    name: 'Калужский областной драматический театр',
    description: 'Один из старейших драматических театров России, основанный в 1777 году.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Культура',
    address: 'пл. Театральная, 1, Калуга'
  },
  {
    id: 4,
    name: 'Каменный мост',
    description: 'Визитная карточка города, построенная в 1785 году по проекту П.Р. Никитина.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Пушкина, Калуга'
  },
  {
    id: 5,
    name: 'Гостиный двор',
    description: 'Историческое здание XVIII века, памятник архитектуры федерального значения.',
    image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Ленина, 126, Калуга'
  },
  {
    id: 6,
    name: 'Палаты Коробовых',
    description: 'Старейшее гражданское здание Калуги, построенное в XVII веке.',
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Плеханова, 88, Калуга'
  },
  {
    id: 7,
    name: 'Государственный музей истории космонавтики',
    description: 'Крупнейший в России музей космической тематики, открытый при участии С.П. Королёва и Ю.А. Гагарина.',
    image: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    address: 'ул. Академика Королёва, 2, Калуга'
  },
  {
    id: 8,
    name: 'Дом Губернатора',
    description: 'Историческое здание XIX века, в котором сейчас располагается художественный музей.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    address: 'ул. Ленина, 74, Калуга'
  },
  {
    id: 9,
    name: 'Парк культуры и отдыха',
    description: 'Центральный городской парк с аттракционами, тенистыми аллеями и спортивными площадками.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Отдых',
    address: 'ул. Марата, 2, Калуга'
  }
];

// Категории достопримечательностей
const categories = ['Все', ...Array.from(new Set(attractionsData.map(a => a.category)))];

const Attractions = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);
  const { toast } = useToast();

  // Фильтрация достопримечательностей по категории
  const filteredAttractions = selectedCategory === 'Все' 
    ? attractionsData 
    : attractionsData.filter(attraction => attraction.category === selectedCategory);

  // Добавление достопримечательности в маршрут
  const handleAddToRoute = (attraction: Attraction) => {
    if (selectedAttractions.some(a => a.id === attraction.id)) {
      // Если достопримечательность уже в маршруте, удаляем её
      setSelectedAttractions(prev => prev.filter(a => a.id !== attraction.id));
      toast({
        title: "Удалено из маршрута",
        description: `"${attraction.name}" удалено из вашего маршрута`,
      });
    } else {
      // Иначе добавляем в маршрут
      setSelectedAttractions(prev => [...prev, attraction]);
      toast({
        title: "Добавлено в маршрут",
        description: `"${attraction.name}" добавлено в ваш маршрут`,
      });
      // Если это первая достопримечательность, показываем планировщик
      if (selectedAttractions.length === 0) {
        setShowRoutePlanner(true);
      }
    }
  };

  // Очистка маршрута
  const handleClearRoute = () => {
    setSelectedAttractions([]);
    toast({
      title: "Маршрут очищен",
      description: "Все достопримечательности удалены из маршрута",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Достопримечательности Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Откройте для себя богатую историю и культуру города через его уникальные достопримечательности.
            </p>
          </div>
        </div>
        
        {/* Планировщик маршрута */}
        {showRoutePlanner && (
          <div className="container-custom py-8">
            <RoutePlanner 
              selectedAttractions={selectedAttractions} 
              onClose={() => setShowRoutePlanner(false)}
              onClearAll={handleClearRoute}
            />
          </div>
        )}
        
        {/* Фильтр категорий */}
        <div className="container-custom py-8 border-b">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-kaluga-500" />
              <span className="font-medium">Фильтр:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-kaluga-700 hover:bg-kaluga-800" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {selectedAttractions.length > 0 && !showRoutePlanner && (
              <Button 
                onClick={() => setShowRoutePlanner(true)}
                variant="default"
                className="bg-kaluga-700 hover:bg-kaluga-800"
              >
                <Navigation size={16} className="mr-2" />
                Мой маршрут ({selectedAttractions.length})
              </Button>
            )}
          </div>
        </div>
        
        {/* Main content section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAttractions.map((attraction) => (
                <div key={attraction.id} className="glass-card overflow-hidden rounded-lg transition-all hover:shadow-md">
                  <div className="h-48 md:h-56 relative">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name} 
                      className="w-full h-full object-cover" 
                      loading="lazy" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-kaluga-700">
                        <MapPin size={12} className="mr-1" />
                        {attraction.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-serif font-medium text-kaluga-800 mb-2">
                      {attraction.name}
                    </h2>
                    <p className="text-kaluga-600 line-clamp-3 mb-4">
                      {attraction.description}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <Link 
                        to={`/attraction/${attraction.id}`} 
                        className="text-kaluga-500 hover:text-kaluga-700 font-medium"
                      >
                        Подробнее
                      </Link>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className={
                          selectedAttractions.some(a => a.id === attraction.id)
                            ? "border-green-500 text-green-600 hover:border-green-600 hover:text-green-700"
                            : "border-kaluga-300 hover:border-kaluga-400"
                        }
                        onClick={() => handleAddToRoute(attraction)}
                      >
                        {selectedAttractions.some(a => a.id === attraction.id) ? (
                          <>
                            <Check size={16} className="mr-1" />
                            В маршруте
                          </>
                        ) : (
                          <>
                            <Plus size={16} className="mr-1" />
                            В маршрут
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Attractions;
