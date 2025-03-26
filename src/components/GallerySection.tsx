
import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Старый город Калуги',
    width: 'col-span-2'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Река Ока',
    width: 'col-span-1'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Панорама Калуги',
    width: 'col-span-1'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Архитектура Калуги',
    width: 'col-span-1'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Музей космонавтики',
    width: 'col-span-2'
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: number]: boolean}>({});

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({
      ...prev,
      [id]: true
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className="py-24 bg-kaluga-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Галерея</span>
          <h2 className="section-title">Красота Калуги в фотографиях</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className={`relative overflow-hidden rounded-lg cursor-pointer ${image.width} h-64 md:h-80 image-container`}
              onClick={() => openLightbox(image)}
            >
              {!imagesLoaded[image.id] && (
                <div className="absolute inset-0 flex items-center justify-center bg-kaluga-100">
                  <Image className="text-kaluga-300 animate-pulse" size={32} />
                </div>
              )}
              <img 
                src={image.src} 
                alt={image.alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imagesLoaded[image.id] ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => handleImageLoad(image.id)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kaluga-900/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium text-lg">{image.alt}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div 
              className="max-w-5xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <button 
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                onClick={closeLightbox}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-white text-center mt-2">{selectedImage.alt}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
