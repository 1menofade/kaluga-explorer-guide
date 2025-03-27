
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Wifi, Coffee, Building, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Accommodations page showcasing hotels and lodging options in Kaluga
 */
const Accommodations = () => {
  // Accommodation data
  const accommodations = [
    {
      id: 1,
      name: "Гостиница 'Калуга'",
      type: "Отель",
      description: "Один из старейших и известных отелей города с хорошим расположением в центре. Предлагает комфортабельные номера различных категорий и ресторан с русской кухней.",
      address: "ул. Ленина, 74, Калуга",
      phone: "+7 (4842) 57-83-64",
      priceRange: "₽₽₽",
      amenities: ["Wi-Fi", "Ресторан", "Парковка", "Конференц-зал"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 3
    },
    {
      id: 2,
      name: "Four Points by Sheraton Kaluga",
      type: "Отель",
      description: "Современный отель международного уровня с высоким стандартом обслуживания. Предлагает просторные номера, бизнес-услуги и качественное питание.",
      address: "ул. Академика Королёва, 16, Калуга",
      phone: "+7 (4842) 22-00-44",
      priceRange: "₽₽₽₽",
      amenities: ["Wi-Fi", "Бассейн", "Фитнес-центр", "Ресторан", "Бар", "Конференц-залы"],
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 4
    },
    {
      id: 3,
      name: "Гостевой дом 'Старый город'",
      type: "Гостевой дом",
      description: "Уютный гостевой дом в историческом здании XIX века. Аутентичная атмосфера и домашний комфорт в сочетании с современными удобствами.",
      address: "ул. Воскресенская, 14, Калуга",
      phone: "+7 (4842) 56-22-33",
      priceRange: "₽₽",
      amenities: ["Wi-Fi", "Кухня", "Сад", "Трансфер"],
      image: "https://images.unsplash.com/photo-1587985064135-0366536eab42?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 3
    },
    {
      id: 4,
      name: "Апарт-отель 'Калуга Сити'",
      type: "Апартаменты",
      description: "Современные апартаменты с кухней и всем необходимым для комфортного проживания. Идеально подходят для длительного пребывания и семейного отдыха.",
      address: "ул. Кирова, 59, Калуга",
      phone: "+7 (4842) 76-45-12",
      priceRange: "₽₽₽",
      amenities: ["Wi-Fi", "Кухня", "Стиральная машина", "Парковка"],
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 4
    },
    {
      id: 5,
      name: "Хостел 'Космос'",
      type: "Хостел",
      description: "Бюджетный хостел с тематическим космическим дизайном. Предлагает койко-места в общих номерах и отдельные номера для тех, кто путешествует экономно.",
      address: "ул. Циолковского, 6, Калуга",
      phone: "+7 (4842) 58-11-87",
      priceRange: "₽",
      amenities: ["Wi-Fi", "Общая кухня", "Лаундж-зона", "Камера хранения"],
      image: "https://images.unsplash.com/photo-1555854877-5175c597d6a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 2
    },
    {
      id: 6,
      name: "Загородный отель 'Воробьи'",
      type: "Загородный отель",
      description: "Загородный эко-отель в живописном месте в 15 км от Калуги. Предлагает комфортные номера, коттеджи, ресторан с местной кухней и множество развлечений на природе.",
      address: "д. Воробьи, Калужская область (15 км от Калуги)",
      phone: "+7 (4842) 59-34-75",
      priceRange: "₽₽₽",
      amenities: ["Wi-Fi", "Ресторан", "Сауна", "Барбекю", "Рыбалка", "Прокат велосипедов"],
      image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      stars: 4
    }
  ];

  // Categorize accommodations by type
  const accommodationsByType = accommodations.reduce((acc, accommodation) => {
    if (!acc[accommodation.type]) {
      acc[accommodation.type] = [];
    }
    acc[accommodation.type].push(accommodation);
    return acc;
  }, {} as Record<string, typeof accommodations>);

  // Get icon for accommodation type
  const getAccommodationIcon = (type: string) => {
    switch (type) {
      case "Отель":
        return <Building size={20} className="mr-2" />;
      case "Гостевой дом":
        return <Bed size={20} className="mr-2" />;
      case "Апартаменты":
        return <Building size={20} className="mr-2" />;
      case "Хостел":
        return <Bed size={20} className="mr-2" />;
      case "Загородный отель":
        return <Building size={20} className="mr-2" />;
      default:
        return <Building size={20} className="mr-2" />;
    }
  };

  // Render stars for rating
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-lg ${index < count ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Где остановиться в Калуге
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Обзор лучших отелей, гостевых домов и других вариантов размещения для вашего 
              комфортного пребывания в Калуге.
            </p>
          </div>
        </div>
        
        {/* General accommodation information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="glass-card p-8 rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                О размещении в Калуге
              </h2>
              <p className="text-kaluga-600 mb-4">
                Калуга предлагает разнообразные варианты размещения для туристов и бизнес-путешественников: 
                от комфортабельных отелей международного уровня до уютных гостевых домов, хостелов и апартаментов. 
                Большинство гостиниц расположены в центральной части города, что обеспечивает удобный доступ 
                к основным достопримечательностям и деловым районам.
              </p>
              <p className="text-kaluga-600 mb-4">
                В городе также есть несколько загородных отелей, расположенных в живописных местах 
                в окрестностях Калуги, которые идеально подходят для тех, кто предпочитает отдых 
                на природе или планирует более длительное пребывание.
              </p>
              <p className="text-kaluga-600">
                Высокий сезон в Калуге приходится на период с мая по сентябрь, а также на новогодние 
                праздники. В это время рекомендуется бронировать проживание заранее.
              </p>
            </div>
          </div>
        </section>
        
        {/* Accommodations by type */}
        {Object.keys(accommodationsByType).map((type) => (
          <section key={type} className="py-12 bg-kaluga-50/50">
            <div className="container-custom">
              <div className="flex items-center mb-8">
                <div className="bg-kaluga-100 p-3 rounded-full mr-3">
                  {getAccommodationIcon(type)}
                </div>
                <h2 className="text-3xl font-serif font-medium text-kaluga-800">
                  {type === "Отель" ? "Отели" : 
                   type === "Гостевой дом" ? "Гостевые дома" : 
                   type === "Апартаменты" ? "Апартаменты" : 
                   type === "Хостел" ? "Хостелы" : 
                   type === "Загородный отель" ? "Загородные отели" : type}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {accommodationsByType[type].map((accommodation, index) => (
                  <Card 
                    key={accommodation.id} 
                    className="overflow-hidden hover:shadow-md transition-all"
                    style={{
                      opacity: 0,
                      animation: 'fade-in 0.5s ease-out forwards',
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="h-48 relative">
                      <img 
                        src={accommodation.image} 
                        alt={accommodation.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-kaluga-700">
                          {accommodation.priceRange}
                        </span>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl font-serif">{accommodation.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <div className="flex mt-1">
                          {renderStars(accommodation.stars)}
                        </div>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-kaluga-600">{accommodation.description}</p>
                      
                      <div className="flex items-start">
                        <MapPin size={18} className="text-kaluga-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-kaluga-600">{accommodation.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone size={18} className="text-kaluga-500 mr-2 flex-shrink-0" />
                        <span className="text-kaluga-600">{accommodation.phone}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {accommodation.amenities.map((amenity, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-kaluga-50 text-kaluga-600 text-sm rounded-full flex items-center"
                          >
                            {amenity === "Wi-Fi" ? <Wifi size={14} className="mr-1" /> : 
                             amenity === "Ресторан" || amenity === "Бар" ? <Coffee size={14} className="mr-1" /> : null}
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <a 
                        href={`https://yandex.ru/maps/?text=${encodeURIComponent(accommodation.address)}`}
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
        
        {/* Tips for booking accommodation */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Советы по бронированию
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Выбор района</h3>
                <p className="text-kaluga-600">
                  Для туристов, планирующих осматривать достопримечательности, 
                  рекомендуется выбирать отели в центральной части города (улицы Ленина, 
                  Кирова, Театральная). Для бизнес-поездок может быть удобнее размещение 
                  в районе Правобережья, ближе к промышленным зонам.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Бронирование заранее</h3>
                <p className="text-kaluga-600">
                  Рекомендуется бронировать проживание не менее чем за 2-3 недели до поездки, 
                  особенно если вы планируете посетить Калугу в высокий сезон (май-сентябрь) 
                  или во время крупных городских мероприятий.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Спецпредложения</h3>
                <p className="text-kaluga-600">
                  Многие отели Калуги предлагают специальные пакеты, включающие проживание 
                  и экскурсионное обслуживание. Также есть выгодные тарифы выходного дня 
                  и праздничные предложения. Уточняйте информацию на официальных сайтах 
                  или при бронировании.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Seasonal information */}
        <section className="py-16 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Сезонная информация
            </h2>
            
            <div className="glass-card p-8 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium text-kaluga-800 mb-4">Высокий сезон (май-сентябрь)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Цены на проживание примерно на 15-20% выше</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Необходимо бронировать заранее, особенно центральные отели</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Все туристические объекты работают в полном режиме</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Доступны летние террасы в ресторанах при отелях</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-kaluga-800 mb-4">Низкий сезон (октябрь-апрель)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Более доступные цены на проживание</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Меньше туристов, нет очередей в музеях</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Специальные зимние предложения в загородных отелях</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-kaluga-500 mr-2">•</span>
                      <span className="text-kaluga-600">Новогодние праздники — исключение, цены повышаются</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Accommodations;
