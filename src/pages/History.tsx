
import React from 'react';
import Navbar from '@/components/Navbar';
import HistorySection from '@/components/HistorySection';
import Footer from '@/components/Footer';

/**
 * History page that showcases Kaluga's historical timeline
 * This page uses the HistorySection component
 */
const History = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              История Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Познакомьтесь с богатой историей древнего города на берегах Оки, 
              основанного более 650 лет назад.
            </p>
          </div>
        </div>
        
        {/* Main content - using the existing HistorySection component */}
        <HistorySection />
        
        {/* Additional historical information */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                  Древняя Калуга
                </h2>
                <p className="text-kaluga-600 mb-4">
                  История Калуги начинается с первого официального упоминания в 1371 году, 
                  хотя археологические находки свидетельствуют о более раннем заселении этих мест. 
                  Город был основан как пограничная крепость на юго-западных рубежах Московского княжества.
                </p>
                <p className="text-kaluga-600">
                  На протяжении веков Калуга развивалась как важный торговый и ремесленный центр, 
                  особенно в период расцвета в XVIII веке, когда город получил статус губернского центра.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-serif font-medium text-kaluga-800 mb-4">
                  Калуга в современной истории
                </h2>
                <p className="text-kaluga-600 mb-4">
                  XX век принес Калуге как испытания, так и новые возможности. 
                  Город пережил революцию, стал свидетелем научных открытий К.Э. Циолковского, 
                  пережил оккупацию во время Великой Отечественной войны.
                </p>
                <p className="text-kaluga-600">
                  Послевоенное восстановление и развитие промышленности сформировали современный облик города. 
                  Сегодня Калуга — это динамично развивающийся региональный центр, 
                  сочетающий историческое наследие и современные технологии.
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

export default History;
