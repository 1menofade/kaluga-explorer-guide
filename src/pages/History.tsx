
import React from 'react';
import Navbar from '@/components/Navbar';
import HistorySection from '@/components/HistorySection';
import Footer from '@/components/Footer';
import { Clock, MapPin, BookOpen } from 'lucide-react';

/**
 * History page that showcases Kaluga's historical timeline
 * This page provides detailed historical information about Kaluga
 */
const History = () => {
  // Historical periods of Kaluga
  const historicalPeriods = [
    {
      period: "Основание и средневековый период (1371-1600)",
      description: "Первое упоминание о Калуге датируется 1371 годом в грамоте литовского князя Ольгерда. Город был основан как пограничная крепость Московского княжества на его юго-западных рубежах. В этот период Калуга неоднократно подвергалась нападениям со стороны Литвы и татар. К концу XVI века Калуга становится важным укрепленным пунктом, защищающим южные рубежи Московского государства.",
      events: [
        "1371 г. - Первое упоминание Калуги в исторических документах",
        "XV век - Строительство деревянной крепости",
        "1505 г. - Калуга входит в состав Московского княжества",
        "1512 г. - Город выдерживает осаду крымских татар"
      ]
    },
    {
      period: "Смутное время и XVII век (1601-1700)",
      description: "В начале XVII века, во время Смутного времени, Калуга играла значительную роль в событиях этого периода. Здесь находился лагерь Лжедмитрия II, а в 1606-1607 годах город стал центром восстания под предводительством Ивана Болотникова. После окончания Смутного времени Калуга постепенно восстанавливается и развивается как торговый центр, связывающий центральные регионы России с Украиной и Польшей.",
      events: [
        "1606-1607 гг. - Восстание под предводительством Ивана Болотникова",
        "1610-1611 гг. - Калуга — столица Лжедмитрия II",
        "1618 г. - Отражение польско-литовского нашествия",
        "1622 г. - Начало строительства каменного кремля",
        "Конец XVII века - Развитие торговли и ремесел"
      ]
    },
    {
      period: "XVIII век: Расцвет торговли и промышленности (1701-1800)",
      description: "XVIII век стал временем экономического и культурного расцвета Калуги. В 1719 году город становится центром Калужской провинции, а в 1776 году — центром Калужского наместничества. При Екатерине II в 1777 году был утвержден генеральный план застройки Калуги, согласно которому город приобрел регулярную радиально-кольцевую планировку с прямыми улицами. В этот период активно развивается торговля, появляются первые мануфактуры и заводы.",
      events: [
        "1719 г. - Калуга становится центром провинции",
        "1776 г. - Образование Калужского наместничества",
        "1777 г. - Утверждение генерального плана города",
        "1785 г. - Строительство Гостиного двора",
        "1799 г. - Учреждение городской думы"
      ]
    },
    {
      period: "XIX век: Калуга губернская (1801-1900)",
      description: "В XIX веке Калуга продолжает развиваться как губернский центр. Город становится крупным торговым узлом с развитой промышленностью. В 1892 году в Калугу приезжает работать учителем К.Э. Циолковский, положивший начало эре теоретической космонавтики. В 1874 году через Калугу прошла Сызрано-Вяземская железная дорога, что способствовало дальнейшему экономическому развитию города. В это время в Калуге строятся театры, музеи, библиотеки, развивается культурная жизнь.",
      events: [
        "1812 г. - Участие калужан в Отечественной войне",
        "1826 г. - Открытие первого театра",
        "1848 г. - Строительство водопровода",
        "1874 г. - Проведение железной дороги",
        "1892 г. - Приезд К.Э. Циолковского в Калугу"
      ]
    },
    {
      period: "XX век и современность (1901-настоящее время)",
      description: "ХХ век принес Калуге как испытания, так и новые возможности. Город пережил революционные события, стал центром развития космической науки благодаря наследию К.Э. Циолковского. Во время Великой Отечественной войны Калуга была оккупирована немецкими войсками с 12 октября по 30 декабря 1941 года. Послевоенные годы ознаменовались восстановлением и развитием промышленности. В 1957 году в городе был открыт первый в мире музей истории космонавтики. В конце XX - начале XXI века Калуга стала одним из центров автомобильной промышленности России благодаря созданию автомобильного кластера.",
      events: [
        "1935 г. - Смерть К.Э. Циолковского в Калуге",
        "1941 г. - Оккупация и освобождение города во время Великой Отечественной войны",
        "1957 г. - Открытие Государственного музея истории космонавтики им. К.Э. Циолковского",
        "1967 г. - Празднование 600-летия города",
        "2007 г. - Создание автомобильного кластера",
        "2021 г. - Празднование 650-летия города"
      ]
    }
  ];

  // Historical landmarks in Kaluga
  const historicalLandmarks = [
    {
      name: "Каменный мост",
      description: "Один из старейших каменных виадуков в России, построенный в конце XVIII века. Является визитной карточкой Калуги и памятником архитектуры федерального значения.",
      year: "1785"
    },
    {
      name: "Гостиный двор",
      description: "Архитектурный комплекс в стиле классицизма, построенный в конце XVIII века по проекту П.Р. Никитина. Был центром торговли в губернской Калуге.",
      year: "1784-1796"
    },
    {
      name: "Дом-музей К.Э. Циолковского",
      description: "Деревянный дом на окраине Калуги, где великий ученый и изобретатель жил с 1904 по 1935 годы. Здесь были написаны многие его труды по космонавтике.",
      year: "1904-1935"
    },
    {
      name: "Палаты Коробовых",
      description: "Старейшее каменное гражданское здание Калуги, построенное в XVII веке. Памятник архитектуры федерального значения.",
      year: "XVII век"
    },
    {
      name: "Свято-Троицкий кафедральный собор",
      description: "Главный православный храм Калуги, построенный в XVIII веке в стиле позднего барокко.",
      year: "1786-1819"
    }
  ];

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
              основанного более 650 лет назад и прошедшего путь от пограничной крепости 
              до современного промышленного и культурного центра.
            </p>
          </div>
        </div>
        
        {/* Main content - historical timeline from HistorySection component */}
        <HistorySection />
        
        {/* Extended historical periods section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Исторические периоды развития города
            </h2>
            
            <div className="space-y-12">
              {historicalPeriods.map((period, index) => (
                <div 
                  key={index} 
                  className="glass-card p-8 rounded-lg shadow-sm animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-kaluga-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <Clock size={24} className="text-kaluga-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-kaluga-800">{period.period}</h3>
                  </div>
                  
                  <p className="text-kaluga-600 mb-6 leading-relaxed">
                    {period.description}
                  </p>
                  
                  <div className="bg-kaluga-50 p-4 rounded-md">
                    <h4 className="font-medium text-kaluga-700 mb-2">Ключевые события:</h4>
                    <ul className="space-y-1">
                      {period.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="flex items-start">
                          <span className="text-kaluga-500 mr-2">•</span>
                          <span className="text-kaluga-600">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Historical landmarks section */}
        <section className="py-16 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Исторические достопримечательности
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {historicalLandmarks.map((landmark, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm animate-on-scroll opacity-0"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-kaluga-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <MapPin size={18} className="text-kaluga-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-kaluga-800">{landmark.name}</h3>
                      <p className="text-sm text-kaluga-500">{landmark.year}</p>
                    </div>
                  </div>
                  
                  <p className="text-kaluga-600">
                    {landmark.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Historical figures section */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Выдающиеся личности в истории Калуги
            </h2>
            
            <div className="glass-card p-8 rounded-lg shadow-sm">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-kaluga-100 flex items-center justify-center mr-4 flex-shrink-0">
                      <BookOpen size={24} className="text-kaluga-600" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-kaluga-800">К.Э. Циолковский</h3>
                  </div>
                  
                  <p className="text-kaluga-600 mb-4 leading-relaxed">
                    Константин Эдуардович Циолковский (1857-1935) — выдающийся ученый, основоположник 
                    теоретической космонавтики. Жил и работал в Калуге с 1892 по 1935 год. Именно здесь 
                    были написаны его знаменитые труды по освоению космического пространства.
                  </p>
                  
                  <p className="text-kaluga-600 leading-relaxed">
                    В Калуге Циолковский работал учителем физики и математики, проводил научные 
                    исследования в области аэродинамики, ракетной техники и космонавтики. Его 
                    имя неразрывно связано с историей города, который часто называют "колыбелью 
                    космонавтики".
                  </p>
                </div>
                
                <div className="md:w-1/2">
                  <h4 className="font-medium text-kaluga-700 mb-3">Другие выдающиеся калужане:</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-kaluga-50 p-4 rounded-md">
                      <h5 className="font-medium text-kaluga-800 mb-1">А.Л. Чижевский (1897-1964)</h5>
                      <p className="text-kaluga-600">
                        Ученый-биофизик, основоположник гелиобиологии, изобретатель аэроионизации. 
                        Был другом и соратником К.Э. Циолковского.
                      </p>
                    </div>
                    
                    <div className="bg-kaluga-50 p-4 rounded-md">
                      <h5 className="font-medium text-kaluga-800 mb-1">Д.И. Малинин (1879-1933)</h5>
                      <p className="text-kaluga-600">
                        Выдающийся краевед, историк Калужского края, автор множества трудов по 
                        истории Калуги и Калужской губернии.
                      </p>
                    </div>
                    
                    <div className="bg-kaluga-50 p-4 rounded-md">
                      <h5 className="font-medium text-kaluga-800 mb-1">П.М. Голубицкий (1845-1911)</h5>
                      <p className="text-kaluga-600">
                        Изобретатель в области телефонии, создавший один из первых многоканальных телефонов. 
                        Жил и работал в Калужской губернии.
                      </p>
                    </div>
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

export default History;
