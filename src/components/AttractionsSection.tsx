import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Link } from 'react-router-dom';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: 'Музей космонавтики',
    description: 'Один из крупнейших в России музеев космической тематики. Расположен в Калуге, считающейся родиной теоретической космонавтики.',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей'
  },
  {
    id: 2,
    name: 'Дом-музей К.Э. Циолковского',
    description: 'Мемориальный дом-музей, где жил и работал основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей'
  },
  {
    id: 3,
    name: 'Калужский областной драматический театр',
    description: 'Один из старейших драматических театров России, основанный в 1777 году.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Культура'
  },
  {
    id: 4,
    name: 'Каменный мост',
    description: 'Визитная карточка города, построенная в 1785 году по проекту П.Р. Никитина.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура'
  }
];

const categories = ['Все', 'Музей', 'Культура', 'Архитектура'];

const AttractionsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [filteredAttractions, setFilteredAttractions] = useState<Attraction[]>(attractions);

  useEffect(() => {
    let result = attractions;
    
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        attraction => 
          attraction.name.toLowerCase().includes(query) || 
          attraction.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory !== 'Все') {
      result = result.filter(attraction => attraction.category === selectedCategory);
    }
    
    setFilteredAttractions(result);
  }, [searchQuery, selectedCategory]);

  return (
    <section id="attractions" className="py-24 bg-gradient-radial from-white to-kaluga-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Достопримечательности</span>
          <h2 className="section-title">Что посмотреть в Калуге</h2>
        </div>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAttractions.map((attraction, index) => (
            <div 
              key={attraction.id}
              className="glass-card rounded-lg overflow-hidden transition-all hover:shadow-md"
              style={{
                opacity: 0,
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="image-container h-64 relative">
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
                <h3 className="text-xl font-serif font-medium text-kaluga-800 mb-2">{attraction.name}</h3>
                <p className="text-kaluga-600">{attraction.description}</p>
                <Link 
                  to={`/attraction/${attraction.id}`}
                  className="inline-block mt-4 text-kaluga-500 hover:text-kaluga-700 font-medium transition-colors nav-link"
                >
                  Подробнее
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/attractions"
            className="inline-flex items-center px-6 py-3 rounded-full bg-kaluga-800 text-white hover:bg-kaluga-700 transition-colors font-medium"
          >
            Все достопримечательности
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
