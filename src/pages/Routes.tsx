import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Route, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import YandexMap from '@/components/YandexMap';

interface RoutePoint {
  id: number;
  name: string;
  address: string;
}

interface TourRoute {
  id: number;
  name: string;
  description: string;
  duration: string;
  distance: string;
  difficulty: 'Легкий' | 'Средний' | 'Сложный';
  image: string;
  points: RoutePoint[];
}

const tourRoutes: TourRoute[] = [
  {
    id: 1,
    name: 'Космическая Калуга',
    description: 'Маршрут по местам, связанным с космонавтикой и наследием К.Э. Циолковского.',
    duration: '3-4 часа',
    distance: '5 км',
    difficulty: 'Легкий',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    points: [{
      id: 1,
      name: 'Музей космонавтики',
      address: 'ул. Академика Королёва, 2, Калуга'
    }, {
      id: 2,
      name: 'Дом-музей К.Э. Циолковского',
      address: 'ул. Циолковского, 79, Калуга'
    }, {
      id: 3,
      name: 'Памятник К.Э. Циолковскому',
      address: 'площадь Мира, Калуга'
    }]
  }, {
    id: 2,
    name: 'Исторический центр',
    description: 'Прогулка по историческому центру города с посещением архитектурных памятников.',
    duration: '2-3 часа',
    distance: '3 км',
    difficulty: 'Легкий',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    points: [{
      id: 4,
      name: 'Каменный мост',
      address: 'ул. Пушкина, Калуга'
    }, {
      id: 5,
      name: 'Гостиный двор',
      address: 'ул. Ленина, 126, Калуга'
    }, {
      id: 6,
      name: 'Калужский областной драматический театр',
      address: 'пл. Театральная, 1, Калуга'
    }]
  }, {
    id: 3,
    name: 'Архитектурное наследие',
    description: 'Маршрут по старинным зданиям и архитектурным памятникам города.',
    duration: '4-5 часов',
    distance: '6 км',
    difficulty: 'Средний',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    points: [{
      id: 5,
      name: 'Гостиный двор',
      address: 'ул. Ленина, 126, Калуга'
    }, {
      id: 6,
      name: 'Палаты Коробовых',
      address: 'ул. Плеханова, 88, Калуга'
    }, {
      id: 4,
      name: 'Каменный мост',
      address: 'ул. Пушкина, Калуга'
    }, {
      id: 7,
      name: 'Дом Губернатора',
      address: 'ул. Ленина, 74, Калуга'
    }]
  }
];

const RoutesPage = () => {
  const [selectedRoute, setSelectedRoute] = useState<TourRoute | null>(null);
  const [showMap, setShowMap] = useState(false);

  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Title section with consistent styling */}
      <div className="bg-kaluga-50 py-16 pt-24">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
            Готовые маршруты по Калуге
          </h1>
          <p className="text-kaluga-600 text-lg max-w-3xl">
            Выбирайте один из наших тематических маршрутов для знакомства с городом или создайте свой собственный.
          </p>
        </div>
      </div>

      <main className="flex-1 py-12 bg-gradient-radial from-white to-kaluga-50">
        <div className="container-custom">
          {selectedRoute ? <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setSelectedRoute(null)} className="text-kaluga-500 hover:text-kaluga-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Назад к списку
                </button>
              </div>
              
              <Card className="overflow-hidden">
                <div className="h-64 sm:h-80 relative">
                  <img src={selectedRoute.image} alt={selectedRoute.name} className="w-full h-full object-cover" />
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl font-serif">{selectedRoute.name}</CardTitle>
                  <CardDescription className="text-base">{selectedRoute.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center text-kaluga-700">
                      <Clock size={18} className="mr-2" />
                      <span>{selectedRoute.duration}</span>
                    </div>
                    <div className="flex items-center text-kaluga-700">
                      <Route size={18} className="mr-2" />
                      <span>{selectedRoute.distance}</span>
                    </div>
                    <div className="flex items-center text-kaluga-700">
                      <Info size={18} className="mr-2" />
                      <span>Сложность: {selectedRoute.difficulty}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-4">Точки маршрута:</h3>
                  <div className="space-y-4 mb-6">
                    {selectedRoute.points.map((point, index) => <div key={point.id} className="p-4 border rounded-md bg-kaluga-50/50">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-kaluga-100 text-kaluga-800 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium">{point.name}</h4>
                            <p className="text-sm text-kaluga-500">{point.address}</p>
                          </div>
                        </div>
                      </div>)}
                  </div>
                  
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-kaluga-700 text-white rounded-md hover:bg-kaluga-800 transition-colors" onClick={() => setShowMap(!showMap)}>
                    <MapPin size={16} className="mr-2" />
                    {showMap ? 'Скрыть карту' : 'Показать на карте'}
                  </button>
                  
                  {showMap && <div className="mt-4 h-96 rounded-md overflow-hidden">
                      <YandexMap points={selectedRoute.points} />
                    </div>}
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Link to="/attractions" className="text-kaluga-500 hover:text-kaluga-700">
                    Все достопримечательности
                  </Link>
                  <a href={`https://yandex.ru/maps/?mode=routes&rtext=${selectedRoute.points.map(p => p.address.replace(/,\s*Калуга/, '')).join('~')}&rtt=pd`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 bg-kaluga-100 text-kaluga-700 rounded-md hover:bg-kaluga-200 transition-colors">
                    <Route size={16} className="mr-2" />
                    Открыть в Яндекс.Картах
                  </a>
                </CardFooter>
              </Card>
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tourRoutes.map((route, index) => <Card key={route.id} className="overflow-hidden hover:shadow-md transition-all cursor-pointer" onClick={() => setSelectedRoute(route)} style={{
            opacity: 0,
            animation: 'fade-in 0.5s ease-out forwards',
            animationDelay: `${index * 0.1}s`
          }}>
                  <div className="h-48 relative">
                    <img src={route.image} alt={route.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-kaluga-700">
                        {route.points.length} точек
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-serif">{route.name}</CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap gap-3 mt-1">
                        <div className="flex items-center text-kaluga-500 text-sm">
                          <Clock size={14} className="mr-1" />
                          <span>{route.duration}</span>
                        </div>
                        <div className="flex items-center text-kaluga-500 text-sm">
                          <Route size={14} className="mr-1" />
                          <span>{route.distance}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-kaluga-600">{route.description}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <button className="text-kaluga-500 hover:text-kaluga-700 font-medium">
                      Подробнее
                    </button>
                  </CardFooter>
                </Card>)}
            </div>}
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-serif font-medium mb-4">Создайте свой маршрут</h2>
            <p className="text-kaluga-600 max-w-2xl mx-auto mb-6">
              Выбирайте достопримечательности на свой вкус и создавайте уникальные маршруты по Калуге
            </p>
            <Link to="/attractions" className="inline-flex items-center px-6 py-3 bg-kaluga-700 text-white rounded-md hover:bg-kaluga-800 transition-colors">
              <Route size={18} className="mr-2" />
              Составить маршрут
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};

export default RoutesPage;
