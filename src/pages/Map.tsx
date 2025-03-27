
import React from 'react';
import Navbar from '@/components/Navbar';
import MapSection from '@/components/MapSection';
import Footer from '@/components/Footer';

/**
 * Map page that provides an interactive map of Kaluga
 * This page uses the MapSection component
 */
const Map = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Карта Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Интерактивная карта города с отмеченными достопримечательностями, 
              маршрутами и полезными местами для туристов.
            </p>
          </div>
        </div>
        
        {/* Main content - using the existing MapSection component */}
        <MapSection />
        
        {/* Additional map information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                  Как пользоваться картой
                </h2>
                <ul className="text-kaluga-600 space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-kaluga-100 text-kaluga-600 text-center mr-2 flex-shrink-0">1</span>
                    <span>Используйте поиск для нахождения конкретных мест и достопримечательностей</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-kaluga-100 text-kaluga-600 text-center mr-2 flex-shrink-0">2</span>
                    <span>Фильтруйте точки на карте по категориям</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-kaluga-100 text-kaluga-600 text-center mr-2 flex-shrink-0">3</span>
                    <span>Нажимайте на маркеры для получения дополнительной информации</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-6 h-6 rounded-full bg-kaluga-100 text-kaluga-600 text-center mr-2 flex-shrink-0">4</span>
                    <span>Используйте функцию "Построить маршрут" для навигации</span>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                  Транспорт в Калуге
                </h2>
                <p className="text-kaluga-600 mb-4">
                  В Калуге хорошо развит общественный транспорт. Основные виды — 
                  автобусы, троллейбусы и маршрутные такси, которые связывают все районы города.
                </p>
                <p className="text-kaluga-600 mb-4">
                  Центр города компактен и удобен для пеших прогулок. Большинство 
                  исторических достопримечательностей расположены в пешей доступности друг от друга.
                </p>
                <p className="text-kaluga-600">
                  Для передвижения между отдаленными точками города можно воспользоваться
                  такси или арендовать автомобиль.
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

export default Map;
