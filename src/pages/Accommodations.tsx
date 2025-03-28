
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, MapPin, Phone, Globe, Tag, Users, Bed, Bath, Car, CreditCard, Wifi, Coffee, Building, HomeIcon } from 'lucide-react';

/**
 * Страница с вариантами размещения в Калуге
 * Показывает отели, хостелы и апартаменты
 */
const Accommodations = () => {
  // Варианты размещения в Калуге
  const accommodations = [
    {
      id: 1,
      name: "Гостиница Калуга",
      type: "Отель",
      priceRange: "3500 - 7000 ₽",
      rating: 4.5,
      address: "ул. Ленина, 74",
      phone: "+7 (4842) 57-14-20",
      website: "https://kalugahotel.ru",
      description: "Комфортабельный отель в центре города с прекрасным видом на исторические достопримечательности. Ресторан, конференц-зал, бесплатный Wi-Fi.",
      amenities: ["Ресторан", "Конференц-зал", "Бесплатный Wi-Fi", "Парковка", "Трансфер"],
      image: "/hotels/kaluga_hotel.jpg"
    },
    {
      id: 2,
      name: "Амбассадор Отель",
      type: "Отель",
      priceRange: "4800 - 12000 ₽",
      rating: 4.8,
      address: "ул. Автомобильная, 6",
      phone: "+7 (4842) 92-20-00",
      website: "https://ambassador-kaluga.ru",
      description: "Современный отель бизнес-класса с высоким уровнем сервиса. Роскошные номера, фитнес-центр, спа-салон и отличный ресторан.",
      amenities: ["Спа-центр", "Фитнес-зал", "Ресторан", "Бар", "Бесплатный Wi-Fi", "Конференц-залы"],
      image: "/hotels/ambassador.jpg"
    },
    {
      id: 3,
      name: "Хостел 'Достоевский'",
      type: "Хостел",
      priceRange: "800 - 1800 ₽",
      rating: 4.3,
      address: "ул. Достоевского, 25",
      phone: "+7 (4842) 40-05-15",
      website: "https://hostel-kaluga.ru",
      description: "Уютный хостел в историческом центре города. Доступные цены, дружелюбный персонал и удобное расположение.",
      amenities: ["Общая кухня", "Лаундж-зона", "Бесплатный Wi-Fi", "Камера хранения"],
      image: "/hotels/dostoevsky.jpg"
    },
    {
      id: 4,
      name: "Бутик-отель 'Купеческий'",
      type: "Бутик-отель",
      priceRange: "6000 - 15000 ₽",
      rating: 4.9,
      address: "ул. Воскресенская, 14",
      phone: "+7 (4842) 57-98-75",
      website: "https://kupecheskiy-hotel.ru",
      description: "Изысканный бутик-отель в старинном купеческом особняке. Уникальный дизайн интерьеров, высокий уровень обслуживания и авторская кухня.",
      amenities: ["Ресторан высокой кухни", "Сауна", "Массаж", "Трансфер на премиум-авто", "Индивидуальное обслуживание"],
      image: "/hotels/kupecheskiy.jpg"
    },
    {
      id: 5,
      name: "Апартаменты 'Домашний уют'",
      type: "Апартаменты",
      priceRange: "2800 - 5500 ₽",
      rating: 4.7,
      address: "ул. Кирова, 43, кв. 12",
      phone: "+7 (920) 617-89-21",
      website: "https://airbnb.com/kaluga-cozy",
      description: "Современные апартаменты с домашней атмосферой. Полностью оборудованная кухня, стиральная машина, быстрый интернет и все необходимое для комфортного проживания.",
      amenities: ["Полноценная кухня", "Стиральная машина", "Высокоскоростной интернет", "Кондиционер", "Smart TV"],
      image: "/hotels/apartments.jpg"
    },
    {
      id: 6,
      name: "Загородный отель 'Лесная сказка'",
      type: "Загородный отель",
      priceRange: "5500 - 12500 ₽",
      rating: 4.6,
      address: "Калужская область, 15 км от города",
      phone: "+7 (4842) 22-35-47",
      website: "https://lesnaya-skazka.ru",
      description: "Загородный отель в окружении соснового леса. Идеальное место для отдыха от городской суеты. Экологически чистая зона, свежий воздух, природа.",
      amenities: ["Ресторан русской кухни", "Баня", "Бассейн", "Детская площадка", "Рыбалка", "Прокат велосипедов"],
      image: "/hotels/forest_tale.jpg"
    },
    {
      id: 7,
      name: "Гостевой дом 'У Оки'",
      type: "Гостевой дом",
      priceRange: "2200 - 4500 ₽",
      rating: 4.4,
      address: "ул. Набережная, 9",
      phone: "+7 (910) 523-67-89",
      website: "https://oka-house.ru",
      description: "Уютный гостевой дом с видом на реку Оку. Домашняя атмосфера, вкусные завтраки и гостеприимные хозяева.",
      amenities: ["Домашние завтраки", "Терраса с видом на реку", "Бесплатный Wi-Fi", "Бесплатная парковка"],
      image: "/hotels/oka_house.jpg"
    },
    {
      id: 8,
      name: "Мини-отель 'Старый город'",
      type: "Мини-отель",
      priceRange: "2600 - 4800 ₽",
      rating: 4.2,
      address: "ул. Пушкина, 7",
      phone: "+7 (4842) 40-78-52",
      website: "https://oldtown-hotel.ru",
      description: "Небольшой уютный отель в историческом центре. Каждый номер оформлен в индивидуальном стиле, отражающем историю Калуги.",
      amenities: ["Кафе-кондитерская", "Экскурсионное бюро", "Бесплатный Wi-Fi", "Трансфер"],
      image: "/hotels/oldtown.jpg"
    },
    {
      id: 9,
      name: "Апарт-отель 'Центральный'",
      type: "Апарт-отель",
      priceRange: "3800 - 7200 ₽",
      rating: 4.5,
      address: "пл. Победы, 5",
      phone: "+7 (4842) 59-15-27",
      website: "https://central-apart.ru",
      description: "Современный апарт-отель с просторными номерами-студиями. Полностью оборудованная кухня, эргономичное рабочее пространство и стильный дизайн.",
      amenities: ["Кухня в номере", "Рабочая зона", "Фитнес-зал", "Прачечная", "Подземная парковка"],
      image: "/hotels/central_apart.jpg"
    },
    {
      id: 10,
      name: "Эко-отель 'Зеленый бор'",
      type: "Эко-отель",
      priceRange: "4500 - 9000 ₽",
      rating: 4.7,
      address: "Калужская область, 10 км от центра",
      phone: "+7 (4842) 75-98-32",
      website: "https://greenforest-hotel.ru",
      description: "Экологичный отель в живописном месте. Деревянные коттеджи, органические продукты в ресторане и множество эко-активностей.",
      amenities: ["Органический ресторан", "Спа с натуральной косметикой", "Йога-студия", "Эко-тропы", "Мастер-классы"],
      image: "/hotels/eco_hotel.jpg"
    }
  ];

  // Группировка вариантов по типу размещения
  const accommodationTypes = {
    "Отель": accommodations.filter(item => item.type === "Отель" || item.type === "Бутик-отель"),
    "Хостел": accommodations.filter(item => item.type === "Хостел"),
    "Апартаменты": accommodations.filter(item => item.type === "Апартаменты" || item.type === "Апарт-отель"),
    "Загородный отдых": accommodations.filter(item => 
      item.type === "Загородный отель" || 
      item.type === "Гостевой дом" || 
      item.type === "Эко-отель"
    ),
    "Другое": accommodations.filter(item => 
      item.type !== "Отель" && 
      item.type !== "Бутик-отель" && 
      item.type !== "Хостел" && 
      item.type !== "Апартаменты" && 
      item.type !== "Апарт-отель" && 
      item.type !== "Загородный отель" && 
      item.type !== "Гостевой дом" && 
      item.type !== "Эко-отель"
    )
  };

  // Функция для отображения рейтинга в виде звезд
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="text-yellow-400 fill-yellow-400 w-4 h-4" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="text-yellow-400 w-4 h-4 half-filled" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300 w-4 h-4" />);
    }
    
    return stars;
  };

  // Иконки для различных удобств
  const amenityIcons: Record<string, React.ReactNode> = {
    "Ресторан": <Coffee className="w-4 h-4 mr-1" />,
    "Бесплатный Wi-Fi": <Wifi className="w-4 h-4 mr-1" />,
    "Парковка": <Car className="w-4 h-4 mr-1" />,
    "Конференц-зал": <Building className="w-4 h-4 mr-1" />,
    "Спа-центр": <Bath className="w-4 h-4 mr-1" />,
    "Фитнес-зал": <Users className="w-4 h-4 mr-1" />,
    "Бар": <Coffee className="w-4 h-4 mr-1" />,
    "Общая кухня": <Coffee className="w-4 h-4 mr-1" />,
    "Трансфер": <Car className="w-4 h-4 mr-1" />,
    "Кухня в номере": <Coffee className="w-4 h-4 mr-1" />,
    "Стиральная машина": <HomeIcon className="w-4 h-4 mr-1" />
  };

  const getIcon = (amenity: string) => {
    return amenityIcons[amenity] || <Tag className="w-4 h-4 mr-1" />;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Заголовок страницы */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Где остановиться в Калуге
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              От роскошных отелей до уютных хостелов – выберите подходящее место для проживания
              во время вашего визита в удивительную Калугу.
            </p>
          </div>
        </div>
        
        {/* Основной контент */}
        <section className="py-16">
          <div className="container-custom">
            {/* Секция фильтрации - можно реализовать позже */}
            
            {/* Список вариантов размещения по категориям */}
            {Object.entries(accommodationTypes).map(([type, items]) => items.length > 0 && (
              <div key={type} className="mb-16 last:mb-0">
                <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-6 flex items-center">
                  {type === "Отель" && <Building className="mr-2" />}
                  {type === "Хостел" && <Users className="mr-2" />}
                  {type === "Апартаменты" && <HomeIcon className="mr-2" />}
                  {type === "Загородный отдых" && <MapPin className="mr-2" />}
                  {type === "Другое" && <Bed className="mr-2" />}
                  {type}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((accommodation) => (
                    <div key={accommodation.id} className="glass-card hover:shadow-md transition-shadow rounded-lg overflow-hidden">
                      <div className="h-48 bg-kaluga-100 relative">
                        {accommodation.image ? (
                          <img 
                            src={accommodation.image} 
                            alt={accommodation.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Если изображение не загружается, устанавливаем заглушку
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-kaluga-100">
                            <Bed size={64} className="text-kaluga-300" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <span className="text-white font-medium">{accommodation.type}</span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-kaluga-800">{accommodation.name}</h3>
                          <div className="flex items-center">
                            {renderStars(accommodation.rating)}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-start mb-2">
                            <MapPin size={16} className="text-kaluga-500 mr-2 mt-1 flex-shrink-0" />
                            <span className="text-kaluga-600 text-sm">{accommodation.address}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            <Phone size={16} className="text-kaluga-500 mr-2 flex-shrink-0" />
                            <span className="text-kaluga-600 text-sm">{accommodation.phone}</span>
                          </div>
                          {accommodation.website && (
                            <div className="flex items-center">
                              <Globe size={16} className="text-kaluga-500 mr-2 flex-shrink-0" />
                              <a href={accommodation.website} target="_blank" rel="noopener noreferrer" className="text-kaluga-500 text-sm hover:text-kaluga-700 transition-colors">
                                Веб-сайт
                              </a>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-kaluga-600 text-sm mb-4 line-clamp-3">
                          {accommodation.description}
                        </p>
                        
                        <div className="mb-4">
                          <div className="flex items-center text-kaluga-800 mb-2">
                            <CreditCard size={16} className="mr-2" />
                            <span className="font-medium">{accommodation.priceRange}</span>
                            <span className="text-xs text-kaluga-500 ml-1">за ночь</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {accommodation.amenities.slice(0, 4).map((amenity, index) => (
                            <span key={index} className="inline-flex items-center text-xs bg-kaluga-50 text-kaluga-600 rounded-full px-2 py-1">
                              {getIcon(amenity)}
                              {amenity}
                            </span>
                          ))}
                          {accommodation.amenities.length > 4 && (
                            <span className="inline-flex items-center text-xs bg-kaluga-50 text-kaluga-600 rounded-full px-2 py-1">
                              +{accommodation.amenities.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Советы по бронированию */}
        <section className="py-12 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Советы по бронированию
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Лучшее время для посещения</h3>
                <p className="text-kaluga-600">
                  Май-июнь и сентябрь-октябрь — идеальное время для посещения Калуги. 
                  Комфортная погода и меньше туристов. В эти периоды легче найти жилье по 
                  выгодным ценам.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Районы для проживания</h3>
                <p className="text-kaluga-600">
                  Центр города и район улиц Кирова и Ленина наиболее удобны для туристов. 
                  Отсюда легко добраться до основных достопримечательностей, ресторанов и 
                  магазинов.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-medium text-kaluga-800 mb-3">Бронирование заранее</h3>
                <p className="text-kaluga-600">
                  Рекомендуем бронировать жилье минимум за 2-3 недели до поездки. 
                  В праздничные дни и во время фестивалей лучше позаботиться о бронировании 
                  за 1-2 месяца.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Accommodations;
