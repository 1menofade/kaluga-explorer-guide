
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Attraction {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  fullDescription?: string;
  workingHours?: string;
  address?: string;
  rating?: number;
}

// Расширенные данные о достопримечательностях
const attractionsData: Attraction[] = [
  {
    id: 1,
    name: 'Музей космонавтики',
    description: 'Один из крупнейших в России музеев космической тематики. Расположен в Калуге, считающейся родиной теоретической космонавтики.',
    fullDescription: 'Государственный музей истории космонавтики имени К. Э. Циолковского в Калуге — первый в мире и крупнейший в России музей космической тематики, созданный при непосредственном участии С. П. Королёва и Ю. А. Гагарина. Музей космонавтики был открыт в 1967 году, в год 110-летия со дня рождения Константина Циолковского. В музее представлены экспонаты, рассказывающие о теории космических полетов, истории ракетостроения и развитии космической программы СССР и России.',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    workingHours: 'Вт-Вс: 10:00-18:00, Пн: выходной',
    address: 'ул. Академика Королёва, 2, Калуга',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Дом-музей К.Э. Циолковского',
    description: 'Мемориальный дом-музей, где жил и работал основоположник теоретической космонавтики Константин Эдуардович Циолковский.',
    fullDescription: 'Мемориальный дом-музей К.Э. Циолковского расположен в небольшом деревянном доме на окраине города, где ученый прожил последние 29 лет своей жизни (1904-1935 гг.). Дом был приобретен на деньги, полученные от Академии наук. Здесь были написаны многие важнейшие работы учёного по воздухоплаванию, авиации, космонавтике, философии и другим вопросам. В музее сохранилась подлинная обстановка дома, личные вещи ученого и членов его семьи.',
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Музей',
    workingHours: 'Вт-Вс: 9:30-17:30, Пн: выходной',
    address: 'ул. Циолковского, 79, Калуга',
    rating: 4.6
  },
  {
    id: 3,
    name: 'Калужский областной драматический театр',
    description: 'Один из старейших драматических театров России, основанный в 1777 году.',
    fullDescription: 'Калужский областной драматический театр был основан в 1777 году и является одним из старейших театров России. Нынешнее здание театра было построено в 1958 году в классическом стиле советского неоклассицизма. В репертуаре театра произведения русской и зарубежной классики, а также современных авторов. За свою долгую историю театр стал центром культурной жизни Калуги.',
    image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Культура',
    workingHours: 'Касса: 11:00-19:00, спектакли по расписанию',
    address: 'пл. Театральная, 1, Калуга',
    rating: 4.5
  },
  {
    id: 4,
    name: 'Каменный мост',
    description: 'Визитная карточка города, построенная в 1785 году по проекту П.Р. Никитина.',
    fullDescription: 'Каменный мост — один из символов Калуги, построенный в 1785 году по проекту архитектора Петра Романовича Никитина в стиле классицизма. Этот виадук был частью Березуевского оврага, через который проходил водопровод, и соединял центр города с его южной частью. Мост является памятником архитектуры федерального значения и остаётся действующим транспортным сооружением до настоящего времени.',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Архитектура',
    address: 'ул. Пушкина, Калуга',
    rating: 4.7
  }
];

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const attraction = attractionsData.find(a => a.id === parseInt(id || '0'));

  if (!attraction) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-serif mb-4">Достопримечательность не найдена</h2>
            <Link to="/" className="inline-flex items-center text-kaluga-500 hover:text-kaluga-700">
              <ArrowLeft size={16} className="mr-2" />
              Вернуться на главную
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="h-96 relative">
          <img 
            src={attraction.image} 
            alt={attraction.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="container-custom">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/80 backdrop-blur-sm text-kaluga-700 mb-4">
                <MapPin size={12} className="mr-1" />
                {attraction.category}
              </span>
              <h1 className="text-4xl font-serif font-medium text-white mb-2">{attraction.name}</h1>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <Link to="/" className="inline-flex items-center text-kaluga-500 hover:text-kaluga-700 mb-8">
            <ArrowLeft size={16} className="mr-2" />
            Вернуться к списку
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">Описание</h2>
              <p className="text-kaluga-600 mb-6 leading-relaxed">
                {attraction.fullDescription || attraction.description}
              </p>
              
              {/* Здесь можно добавить дополнительные секции, например фотогалерею */}
            </div>
            
            <div>
              <div className="glass-card p-6 rounded-lg mb-6">
                <h3 className="text-xl font-serif font-medium text-kaluga-800 mb-4">Информация</h3>
                
                {attraction.address && (
                  <div className="flex items-start mb-4">
                    <MapPin size={18} className="text-kaluga-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-kaluga-700 mb-1">Адрес</h4>
                      <p className="text-kaluga-600">{attraction.address}</p>
                    </div>
                  </div>
                )}
                
                {attraction.workingHours && (
                  <div className="flex items-start mb-4">
                    <Clock size={18} className="text-kaluga-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-kaluga-700 mb-1">Часы работы</h4>
                      <p className="text-kaluga-600">{attraction.workingHours}</p>
                    </div>
                  </div>
                )}
                
                {attraction.rating && (
                  <div className="flex items-start">
                    <Star size={18} className="text-kaluga-500 mr-3 mt-1" />
                    <div>
                      <h4 className="font-medium text-kaluga-700 mb-1">Рейтинг</h4>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={`${i < Math.floor(attraction.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} mr-1`}
                            />
                          ))}
                        </div>
                        <span className="text-kaluga-600 ml-2">{attraction.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h3 className="text-xl font-serif font-medium text-kaluga-800 mb-4">Местоположение</h3>
                <div className="bg-kaluga-50 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-kaluga-500 text-center p-4">
                    Здесь будет карта с местоположением достопримечательности
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AttractionDetail;
