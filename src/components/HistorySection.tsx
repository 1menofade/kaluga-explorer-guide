
import React, { useEffect, useRef } from 'react';
import { Clock } from 'lucide-react';

interface HistoricalEvent {
  year: string;
  title: string;
  description: string;
}

const historicalEvents: HistoricalEvent[] = [
  {
    year: '1371',
    title: 'Первое упоминание',
    description: 'Первое достоверное упоминание о Калуге в грамоте литовского князя Ольгерда.'
  },
  {
    year: '1606-1607',
    title: 'Калужское восстание',
    description: 'Восстание под предводительством Ивана Болотникова в период Смутного времени.'
  },
  {
    year: '1776',
    title: 'Статус губернского города',
    description: 'Калуга становится центром Калужского наместничества, а затем губернским городом.'
  },
  {
    year: '1892-1935',
    title: 'Эпоха Циолковского',
    description: 'Время жизни и работы в Калуге К.Э. Циолковского, основоположника теоретической космонавтики.'
  },
  {
    year: '1941',
    title: 'Оккупация и освобождение',
    description: 'Во время Великой Отечественной войны город был частично оккупирован немецкими войсками и освобожден 30 декабря 1941 года.'
  }
];

const HistorySection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach(item => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="history" className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">История</span>
          <h2 className="section-title">Исторический путь Калуги</h2>
          <p className="max-w-3xl mx-auto text-kaluga-600">
            Калуга — один из древнейших городов центральной России с богатой историей, 
            простирающейся более чем на 6 веков.
          </p>
        </div>

        <div className="relative" ref={timelineRef}>
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-kaluga-200"></div>
          
          {historicalEvents.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-item relative flex ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              } opacity-0 mb-16 last:mb-0`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className={`glass-card p-6 rounded-lg ${index % 2 === 0 ? 'ml-auto' : ''} max-w-md`}>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-kaluga-100 text-kaluga-800 mb-3">
                    <Clock size={12} className="mr-1" />
                    {event.year}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-kaluga-800 mb-2">{event.title}</h3>
                  <p className="text-kaluga-600">{event.description}</p>
                </div>
              </div>
              
              <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-kaluga-500 z-10"></div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 rounded-full border border-kaluga-200 text-kaluga-700 hover:bg-kaluga-50 transition-colors font-medium"
          >
            Узнать больше об истории
          </a>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
