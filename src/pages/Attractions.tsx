
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Search, Filter, Route } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoutePlanner from '@/components/RoutePlanner';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  address?: string;
}

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
    description: 'Архитектурный комплекс конца XVIII века, построенный в стиле классицизма.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Ленина, 126, Калуга'
  },
  {
    id: 6,
    name: 'Палаты Коробовых',
    description: 'Один из редких образцов гражданской архитектуры XVII века в России.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Плеханова, 88, Калуга'
  }
];

const categories = ['Все', 'Музей', 'Культура', 'Архитектура', 'Парки'];

const Attractions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(attractionsData);
  const [showRoutePlanner, setShowRoutePlanner] = useState(false);
  const [selectedAttractions, setSelectedAttractions] = useState<Attraction[]>([]);

  useEffect(() => {
    let result = attractionsData;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        attraction => 
          attraction.name.toLowerCase().includes(query) || 
          attraction.description.toLowerCase().includes(query) ||
          (attraction.address && attraction.address.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory !== 'Все') {
      result = result.filter(attraction => attraction.category === selectedCategory);
    }
    
    setFilteredAttractions(result);
  }, [searchQuery, selectedCategory]);

  const toggleAttractionSelection = (attraction: Attraction) => {
    setSelectedAttractions(prev => {
      if (prev.some(a => a.id === attraction.id)) {
        return prev.filter(a => a.id !== attraction.id);
      } else {
        return [...prev, attraction];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Title section with consistent styling */}
      <div className="bg-kaluga-50 py-16 pt-24">
        <div className="container-custom">
          <span className="section-subtitle">Путеводитель</span>
          <h1 className="section-title">Достопримечательности Калуги</h1>
          <p className="text-kaluga-600 text-lg max-w-3xl mt-4">
            Исследуйте самые интересные места Калуги: от Музея космонавтики до исторических памятников архитектуры.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12 bg-gradient-radial from-white to-kaluga-50">
        <div className="container-custom">
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-kaluga-500" size={18} />
              <Input
                className="pl-10 border-kaluga-100 focus-visible:ring-kaluga-500"
                placeholder="Поиск достопримечательностей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-4">
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
              
              <button
                className={`flex items-center px-4 py-2 border rounded-md shadow-sm transition-colors ${
                  showRoutePlanner || selectedAttractions.length > 0
                    ? 'bg-kaluga-700 border-kaluga-700 text-white hover:bg-kaluga-800'
                    : 'bg-white border-kaluga-100 text-kaluga-700 hover:bg-kaluga-50'
                }`}
                onClick={() => setShowRoutePlanner(!showRoutePlanner)}
              >
                <Route size={16} className="mr-2" />
                <span>Составить маршрут {selectedAttractions.length > 0 && `(${selectedAttractions.length})`}</span>
              </button>
            </div>
          </div>

          {showRoutePlanner && (
            <RoutePlanner 
              selectedAttractions={selectedAttractions}
              onClose={() => setShowRoutePlanner(false)}
              onClearAll={() => setSelectedAttractions([])}
            />
          )}

          {filteredAttractions.length === 0 && (
            <div className="text-center py-12 bg-kaluga-50/50 rounded-lg">
              <p className="text-kaluga-600 mb-2">По вашему запросу ничего не найдено</p>
              <button 
                className="text-kaluga-500 hover:text-kaluga-700 font-medium"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Все');
                }}
              >
                Сбросить фильтры
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {filteredAttractions.map((attraction, index) => (
              <Card 
                key={attraction.id}
                className={`overflow-hidden transition-all hover:shadow-md ${
                  selectedAttractions.some(a => a.id === attraction.id) 
                    ? 'ring-2 ring-kaluga-500' 
                    : ''
                }`}
                style={{
                  opacity: 0,
                  animation: 'fade-in 0.5s ease-out forwards',
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="h-48 relative">
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
                  <div className="absolute top-4 right-4">
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        selectedAttractions.some(a => a.id === attraction.id)
                          ? 'bg-kaluga-500 text-white'
                          : 'bg-white/80 backdrop-blur-sm text-kaluga-700 hover:bg-kaluga-100'
                      }`}
                      onClick={() => toggleAttractionSelection(attraction)}
                      title={selectedAttractions.some(a => a.id === attraction.id) ? "Удалить из маршрута" : "Добавить в маршрут"}
                    >
                      <Route size={16} />
                    </button>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-serif">{attraction.name}</CardTitle>
                  {attraction.address && (
                    <CardDescription className="flex items-center text-kaluga-500">
                      <MapPin size={14} className="mr-1" />
                      {attraction.address}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-kaluga-600">{attraction.description}</p>
                </CardContent>
                <CardFooter className="pt-0 justify-between">
                  <Link 
                    to={`/attraction/${attraction.id}`}
                    className="inline-block text-kaluga-500 hover:text-kaluga-700 font-medium transition-colors nav-link"
                  >
                    Подробнее
                  </Link>
                  <button
                    className="text-kaluga-500 hover:text-kaluga-700 font-medium"
                    onClick={() => toggleAttractionSelection(attraction)}
                  >
                    {selectedAttractions.some(a => a.id === attraction.id) 
                      ? "Удалить из маршрута" 
                      : "В маршрут"}
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Attractions;
