
import React from 'react';
import Navbar from '@/components/Navbar';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import { MapPin, Clock, Phone, Calendar, Cloud, Utensils } from 'lucide-react';

/**
 * Info page that provides useful information for tourists
 * This page uses the InfoSection component and adds additional tourist information
 */
const Info = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Информация для туристов
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Полезная информация для планирования вашего путешествия в Калугу —
              как добраться, где остановиться, что посмотреть.
            </p>
          </div>
        </div>
        
        {/* Main content - using the existing InfoSection component */}
        <InfoSection />
        
        {/* Additional tourist information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Полезная информация
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Weather card */}
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Cloud className="text-kaluga-500 mr-3" size={24} />
                  <h3 className="text-xl font-medium text-kaluga-800">Климат и погода</h3>
                </div>
                <p className="text-kaluga-600 mb-3">
                  Калуга расположена в умеренно-континентальной климатической зоне.
                </p>
                <ul className="space-y-2">
                  <li className="text-kaluga-600">
                    <span className="font-medium">Лето:</span> Тёплое, средняя температура +19°C до +25°C
                  </li>
                  <li className="text-kaluga-600">
                    <span className="font-medium">Зима:</span> Умеренно холодная, средняя температура от -9°C до -4°C
                  </li>
                  <li className="text-kaluga-600">
                    <span className="font-medium">Осадки:</span> Равномерно распределены по всему году
                  </li>
                </ul>
              </div>
              
              {/* Best time to visit card */}
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Calendar className="text-kaluga-500 mr-3" size={24} />
                  <h3 className="text-xl font-medium text-kaluga-800">Лучшее время для визита</h3>
                </div>
                <p className="text-kaluga-600 mb-3">
                  Калугу можно посещать круглый год, но наиболее комфортные сезоны:
                </p>
                <ul className="space-y-2">
                  <li className="text-kaluga-600">
                    <span className="font-medium">Май-сентябрь:</span> Тёплая погода, идеальна для прогулок 
                    и осмотра достопримечательностей
                  </li>
                  <li className="text-kaluga-600">
                    <span className="font-medium">Декабрь-февраль:</span> Период новогодних праздников, 
                    когда город особенно красиво украшен
                  </li>
                </ul>
              </div>
              
              {/* Cuisine card */}
              <div className="glass-card p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <Utensils className="text-kaluga-500 mr-3" size={24} />
                  <h3 className="text-xl font-medium text-kaluga-800">Местная кухня</h3>
                </div>
                <p className="text-kaluga-600 mb-3">
                  Калужская кухня — это сочетание традиционных русских блюд с местными особенностями.
                </p>
                <ul className="space-y-2">
                  <li className="text-kaluga-600">
                    <span className="font-medium">Калужское тесто:</span> Особый вид пресного теста для 
                    пирогов и кулебяк
                  </li>
                  <li className="text-kaluga-600">
                    <span className="font-medium">Колобки:</span> Местная вариация пельменей с начинкой из 
                    картофеля и грибов
                  </li>
                  <li className="text-kaluga-600">
                    <span className="font-medium">Медовуха:</span> Традиционный напиток из мёда с пряностями
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-serif font-medium text-kaluga-800 mb-6 text-center">
                Контактная информация
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                <div className="flex items-start">
                  <MapPin className="text-kaluga-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-kaluga-800 mb-1">Туристско-информационный центр</h4>
                    <p className="text-kaluga-600">г. Калуга, ул. Ленина, 124</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-kaluga-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-kaluga-800 mb-1">Телефон для справок</h4>
                    <p className="text-kaluga-600">+7 (4842) 56-25-78</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-kaluga-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-kaluga-800 mb-1">Часы работы</h4>
                    <p className="text-kaluga-600">Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-kaluga-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-kaluga-800 mb-1">Экстренные службы</h4>
                    <p className="text-kaluga-600">Единый номер: 112</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Info;
