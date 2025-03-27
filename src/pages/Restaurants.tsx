
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Phone, Utensils, Coffee, Wine } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Restaurants page showcasing dining options in Kaluga
 */
const Restaurants = () => {
  // Restaurant data
  const restaurants = [
    {
      id: 1,
      name: "Гастрономъ",
      cuisine: "Русская, Европейская",
      description: "Элегантный ресторан с авторской кухней, сочетающей традиционные русские рецепты и современные кулинарные техники.",
      address: "ул. Ленина, 126, Калуга",
      hours: "12:00 - 23:00",
      phone: "+7 (4842) 57-65-55",
      priceRange: "₽₽₽",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "restaurant"
    },
    {
      id: 2,
      name: "Кафе Дома",
      cuisine: "Домашняя, Европейская",
      description: "Уютное кафе с домашней атмосферой, где готовят блюда из локальных продуктов по семейным рецептам.",
      address: "ул. Кирова, 45, Калуга",
      hours: "08:00 - 22:00",
      phone: "+7 (4842) 22-61-93",
      priceRange: "₽₽",
      image: "https://images.unsplash.com/photo-1554679665-f5537f187268?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "cafe"
    },
    {
      id: 3,
      name: "Трактиръ на Оке",
      cuisine: "Русская",
      description: "Традиционный русский трактир с видом на реку Оку, предлагающий старинные блюда русской кухни.",
      address: "Набережная Оки, 10, Калуга",
      hours: "11:00 - 23:00",
      phone: "+7 (4842) 56-28-40",
      priceRange: "₽₽₽",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "restaurant"
    },
    {
      id: 4,
      name: "Кофейня Калуга",
      cuisine: "Кофе, Десерты",
      description: "Стильная кофейня с большим выбором кофейных напитков и домашней выпечки.",
      address: "ул. Театральная, 18, Калуга",
      hours: "07:30 - 21:00",
      phone: "+7 (4842) 59-11-63",
      priceRange: "₽",
      image: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "cafe"
    },
    {
      id: 5,
      name: "Винотека Калуга",
      cuisine: "Винный бар, Тапас",
      description: "Изысканная винотека с большим выбором вин и легких закусок в европейском стиле.",
      address: "ул. Дзержинского, 81, Калуга",
      hours: "16:00 - 00:00",
      phone: "+7 (4842) 22-54-76",
      priceRange: "₽₽₽",
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "bar"
    },
    {
      id: 6,
      name: "Космическое Кафе",
      cuisine: "Фьюжн",
      description: "Тематическое кафе с космическим дизайном и инновационным меню, отдающим дань уважения К.Э. Циолковскому.",
      address: "ул. Академика Королёва, 14, Калуга",
      hours: "10:00 - 22:00",
      phone: "+7 (4842) 76-24-51",
      priceRange: "₽₽",
      image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      category: "cafe"
    }
  ];

  // Categorize restaurants
  const categories = {
    restaurant: { name: "Рестораны", icon: <Utensils size={20} className="mr-2" /> },
    cafe: { name: "Кафе", icon: <Coffee size={20} className="mr-2" /> },
    bar: { name: "Бары", icon: <Wine size={20} className="mr-2" /> }
  };
  
  // Group restaurants by category
  const groupedRestaurants = restaurants.reduce((acc, restaurant) => {
    if (!acc[restaurant.category]) {
      acc[restaurant.category] = [];
    }
    acc[restaurant.category].push(restaurant);
    return acc;
  }, {} as Record<string, typeof restaurants>);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Рестораны и кафе Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Познакомьтесь с гастрономическим разнообразием Калуги: от традиционной русской кухни 
              до современных кулинарных тенденций.
            </p>
          </div>
        </div>
        
        {/* Local cuisine description */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="glass-card p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                Калужская кухня
              </h2>
              <p className="text-kaluga-600 mb-4">
                Калужская кухня сочетает в себе традиции русской кухни с местными особенностями, 
                сформированными благодаря расположению региона и его историческому развитию. 
                Основу калужской кухни составляют блюда из речной рыбы, дичи, грибов и ягод, 
                которыми богаты местные леса.
              </p>
              <p className="text-kaluga-600 mb-4">
                Среди традиционных калужских блюд можно выделить калужское тесто (особый вид 
                дрожжевого теста), пирожки с грибами, щи по-калужски, уху из окской рыбы, 
                квашеную капусту по старинным рецептам и медовые пряники.
              </p>
              <p className="text-kaluga-600">
                В современной кулинарной сцене Калуги гармонично сочетаются традиционные 
                рецепты и новые гастрономические тенденции, что делает город привлекательным 
                для гурманов и любителей хорошей кухни.
              </p>
            </div>
          </div>
        </section>
        
        {/* Restaurants by category */}
        {Object.keys(groupedRestaurants).map((category) => (
          <section key={category} className="py-12 bg-kaluga-50/50">
            <div className="container-custom">
              <div className="flex items-center mb-8">
                <div className="bg-kaluga-100 p-3 rounded-full mr-3">
                  {categories[category as keyof typeof categories].icon}
                </div>
                <h2 className="text-3xl font-serif font-medium text-kaluga-800">
                  {categories[category as keyof typeof categories].name}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedRestaurants[category].map((restaurant, index) => (
                  <Card 
                    key={restaurant.id} 
                    className="overflow-hidden hover:shadow-md transition-all"
                    style={{
                      opacity: 0,
                      animation: 'fade-in 0.5s ease-out forwards',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="h-48 relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-kaluga-700">
                          {restaurant.priceRange}
                        </span>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-serif">{restaurant.name}</CardTitle>
                      <CardDescription>{restaurant.cuisine}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-kaluga-600">{restaurant.description}</p>
                      
                      <div className="flex items-start">
                        <MapPin size={18} className="text-kaluga-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-kaluga-600">{restaurant.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock size={18} className="text-kaluga-500 mr-2 flex-shrink-0" />
                        <span className="text-kaluga-600">{restaurant.hours}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone size={18} className="text-kaluga-500 mr-2 flex-shrink-0" />
                        <span className="text-kaluga-600">{restaurant.phone}</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <a 
                        href={`https://yandex.ru/maps/?text=${encodeURIComponent(restaurant.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-kaluga-500 hover:text-kaluga-700 font-medium"
                      >
                        Показать на карте
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        ))}
        
        {/* Food festivals section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Гастрономические события
            </h2>
            
            <div className="glass-card p-8 rounded-lg shadow-sm">
              <div className="space-y-6">
                <div className="pb-6 border-b border-kaluga-100">
                  <h3 className="text-xl font-medium text-kaluga-800 mb-2">Калужский фестиваль еды</h3>
                  <p className="text-kaluga-600 mb-3">
                    Ежегодный гастрономический фестиваль, на котором представлены лучшие рестораны 
                    и производители продуктов Калужской области. Посетители могут попробовать 
                    разнообразные блюда, посетить мастер-классы и кулинарные шоу.
                  </p>
                  <p className="text-kaluga-500">
                    <strong>Время проведения:</strong> Июнь-июль
                  </p>
                </div>
                
                <div className="pb-6 border-b border-kaluga-100">
                  <h3 className="text-xl font-medium text-kaluga-800 mb-2">Праздник калужского теста</h3>
                  <p className="text-kaluga-600 mb-3">
                    Фестиваль, посвященный традиционной калужской выпечке. На празднике можно 
                    увидеть и попробовать различные виды пирогов, пирожков и других изделий 
                    из знаменитого калужского теста.
                  </p>
                  <p className="text-kaluga-500">
                    <strong>Время проведения:</strong> Сентябрь
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-kaluga-800 mb-2">Фестиваль "Калужская осень"</h3>
                  <p className="text-kaluga-600 mb-3">
                    Гастрономический праздник урожая, на котором представлены сезонные продукты 
                    местных фермеров, дары леса (грибы, ягоды), мед и другие экологически 
                    чистые продукты Калужской области.
                  </p>
                  <p className="text-kaluga-500">
                    <strong>Время проведения:</strong> Октябрь
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tips for visitors */}
        <section className="py-16 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Советы для посетителей
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Бронирование столиков</h3>
                <p className="text-kaluga-600">
                  В популярных ресторанах Калуги, особенно в выходные дни, рекомендуется 
                  бронировать столики заранее. Это можно сделать по телефону или через 
                  специальные сервисы бронирования.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Местные специалитеты</h3>
                <p className="text-kaluga-600">
                  Обязательно попробуйте блюда калужской кухни: уху из окской рыбы, 
                  калужское тесто, медовые пряники и местные напитки на травах и ягодах.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Время обеда и ужина</h3>
                <p className="text-kaluga-600">
                  Традиционное время обеда в Калуге — с 12:00 до 15:00, а ужина — с 18:00 до 21:00. 
                  В это время рестораны обычно предлагают специальные комплексные меню и бизнес-ланчи.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurants;
