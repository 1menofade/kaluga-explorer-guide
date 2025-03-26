
import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNextSection = () => {
    const attractionsSection = document.getElementById('attractions');
    if (attractionsSection) {
      attractionsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background z-10" />
        <img 
          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Калуга панорама" 
          className={`object-cover w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="eager"
        />
      </div>
      
      <div className="container-custom relative z-10 text-center mt-16">
        <div className={`transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-subtitle inline-block text-white bg-kaluga-800/80 px-3 py-1 rounded-full backdrop-blur-sm">
            Добро пожаловать
          </span>
        </div>
        
        <h1 className={`text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white drop-shadow-lg mb-6 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Путеводитель<br/>по Калуге
        </h1>
        
        <p className={`max-w-2xl mx-auto text-white/90 text-lg md:text-xl mb-8 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Откройте для себя историю, культуру и уникальные места одного из древнейших городов России
        </p>
        
        <button 
          onClick={scrollToNextSection}
          className={`mt-8 flex items-center mx-auto glass-card px-6 py-3 rounded-full text-kaluga-800 hover:bg-white/90 transition-all duration-300 hover:shadow-md group ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          Исследовать
          <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={18} />
        </button>
      </div>
      
      <div className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="animate-bounce">
          <ArrowDown className="text-white/70" size={24} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
