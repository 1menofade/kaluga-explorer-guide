
import React from 'react';
import Navbar from '@/components/Navbar';
import GallerySection from '@/components/GallerySection';
import Footer from '@/components/Footer';

/**
 * Gallery page that showcases beautiful photos of Kaluga
 * This page uses the GallerySection component
 */
const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Page title section */}
        <div className="bg-kaluga-50 py-16">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-kaluga-800 mb-4">
              Фотогалерея Калуги
            </h1>
            <p className="text-kaluga-600 text-lg max-w-3xl">
              Откройте для себя красоту Калуги через фотографии её исторических мест, 
              природных ландшафтов и городской жизни.
            </p>
          </div>
        </div>
        
        {/* Main content - using the existing GallerySection component */}
        <GallerySection />
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
