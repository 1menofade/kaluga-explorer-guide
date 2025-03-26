
import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width?: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Старый город Калуги'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Река Ока'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Панорама Калуги'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Архитектура Калуги'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Музей космонавтики'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Цветы в парке Калуги'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1543005240-6a7191a66372?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Исторические здания Калуги'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    alt: 'Городской парк'
  }
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<{[key: number]: boolean}>({});
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

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
        <div className="text-center mb-12">
          <span className="section-subtitle">Галерея</span>
          <h2 className="section-title">Красота Калуги в фотографиях</h2>
          <div className="flex justify-center gap-4 mt-6 mb-8">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'grid' 
                ? 'bg-kaluga-600 text-white' 
                : 'bg-kaluga-100 text-kaluga-700 hover:bg-kaluga-200'}`}
            >
              Сетка
            </button>
            <button 
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-2 rounded-md transition-colors ${viewMode === 'carousel' 
                ? 'bg-kaluga-600 text-white' 
                : 'bg-kaluga-100 text-kaluga-700 hover:bg-kaluga-200'}`}
            >
              Карусель
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image) => (
              <div 
                key={image.id} 
                className="relative overflow-hidden rounded-lg cursor-pointer h-64 image-container"
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
                <div className="absolute inset-0 bg-gradient-to-t from-kaluga-900/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-white font-medium text-lg">{image.alt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 mb-4">
            <Carousel className="w-full max-w-5xl mx-auto">
              <CarouselContent>
                {galleryImages.map((image) => (
                  <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="relative h-80 rounded-lg overflow-hidden cursor-pointer mx-2"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-kaluga-900/70 to-transparent hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white font-medium text-lg">{image.alt}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8">
                <CarouselPrevious className="relative static left-0 translate-y-0 mr-4" />
                <CarouselNext className="relative static right-0 translate-y-0" />
              </div>
            </Carousel>
          </div>
        )}
        
        <div className="text-center mt-12">
          <p className="text-kaluga-600 max-w-3xl mx-auto">
            Фотографии Калуги показывают красоту её исторических улиц, парков и набережных. 
            Город сочетает в себе архитектурное наследие и природную привлекательность, 
            делая его прекрасным местом для посещения в любое время года.
          </p>
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
