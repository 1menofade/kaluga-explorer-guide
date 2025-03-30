import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Attractions = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Достопримечательности Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Откройте для себя богатую историю и культуру города через его уникальные достопримечательности.
            </p>
          </div>
        </div>
        
        {/* Main content section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example attraction card (replace with actual data) */}
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-xl font-serif font-medium text-kaluga-800 mb-2">Название места</h2>
                <p className="text-kaluga-600">Краткое описание достопримечательности.</p>
                <a href="#" className="text-kaluga-500 hover:text-kaluga-700 mt-4 inline-block">Подробнее</a>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-xl font-serif font-medium text-kaluga-800 mb-2">Название места</h2>
                <p className="text-kaluga-600">Краткое описание достопримечательности.</p>
                <a href="#" className="text-kaluga-500 hover:text-kaluga-700 mt-4 inline-block">Подробнее</a>
              </div>
              
              <div className="glass-card p-6 rounded-lg">
                <h2 className="text-xl font-serif font-medium text-kaluga-800 mb-2">Название места</h2>
                <p className="text-kaluga-600">Краткое описание достопримечательности.</p>
                <a href="#" className="text-kaluga-500 hover:text-kaluga-700 mt-4 inline-block">Подробнее</a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Attractions;
