
import React from 'react';
import { Calendar, Clock, MapPin, Phone, Umbrella, Thermometer } from 'lucide-react';

const InfoSection = () => {
  return (
    <section id="info" className="py-24 bg-kaluga-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="section-subtitle">Информация</span>
          <h2 className="section-title">Полезная информация для туристов</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <Calendar size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Лучшее время для посещения</h3>
            </div>
            <p className="text-kaluga-600">
              Оптимальное время для посещения Калуги — с мая по сентябрь. В этот период устанавливается теплая погода, 
              город утопает в зелени, а фестивали и городские праздники делают отдых более насыщенным.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <Clock size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Время работы музеев</h3>
            </div>
            <p className="text-kaluga-600">
              Большинство музеев работают с 10:00 до 18:00, выходной день — понедельник. 
              Планируйте посещение заранее и проверяйте расписание на официальных сайтах музеев.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <MapPin size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Как добраться</h3>
            </div>
            <p className="text-kaluga-600">
              От Москвы до Калуги можно доехать на электричке или автобусе за 2-2,5 часа. 
              Расстояние от Москвы составляет около 180 км.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <Thermometer size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Климат</h3>
            </div>
            <p className="text-kaluga-600">
              Климат Калуги умеренно-континентальный. Зимы довольно холодные, со средней температурой -8°C, 
              лето теплое, средняя температура июля +18°C.
            </p>
          </div>

          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <Phone size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Полезные телефоны</h3>
            </div>
            <ul className="text-kaluga-600 space-y-2">
              <li className="flex justify-between">
                <span>Экстренные службы</span>
                <span className="font-medium">112</span>
              </li>
              <li className="flex justify-between">
                <span>Туристический информационный центр</span>
                <span className="font-medium">+7 (4842) 56-25-78</span>
              </li>
              <li className="flex justify-between">
                <span>Музей космонавтики</span>
                <span className="font-medium">+7 (4842) 70-50-25</span>
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-lg opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-start mb-4">
              <div className="w-10 h-10 bg-kaluga-100 rounded-full flex items-center justify-center text-kaluga-500 mr-4 flex-shrink-0">
                <Umbrella size={20} />
              </div>
              <h3 className="text-xl font-serif font-medium text-kaluga-800">Сувениры</h3>
            </div>
            <p className="text-kaluga-600">
              В качестве сувениров из Калуги можно привезти калужское тесто, пастилу, космические сувениры, 
              изделия народных промыслов и многое другое.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
