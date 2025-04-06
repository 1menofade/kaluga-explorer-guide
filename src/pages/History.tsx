import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Clock, MapPin, BookOpen, Calendar, Award, FileText } from 'lucide-react';

/**
 * Страница истории, демонстрирующая хронологию Калуги
 * Содержит подробную историческую информацию о городе
 */
const History = () => {
  // Исторические периоды развития Калуги
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

  // Исторические достопримечательности Калуги
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

  // Важные исторические фигуры Калуги
  const historicalFigures = [
    {
      name: "К.Э. Циолковский",
      years: "1857-1935",
      description: "Великий русский ученый, основоположник современной космонавтики. Жил и работал в Калуге с 1892 по 1935 год. Разработал теорию ракетного движения, способы преодоления земного притяжения, идеи о межпланетных полетах и космических станциях.",
      achievements: [
        "Разработка теории многоступенчатых ракет",
        "Создание теории межпланетных сообщений",
        "Опубликование более 400 научных работ",
        "Предложение использования жидкого топлива для ракет"
      ]
    },
    {
      name: "А.Л. Чижевский",
      years: "1897-1964",
      description: "Биофизик, основоположник гелиобиологии и аэроионификации. Исследовал влияние космических факторов на биологические процессы. Был близким другом и соратником К.Э. Циолковского.",
      achievements: [
        "Создание теории о влиянии солнечной активности на земные процессы",
        "Изобретение люстры Чижевского (ионизатора воздуха)",
        "Фундаментальные исследования в области космической биологии"
      ]
    },
    {
      name: "П.М. Голубицкий",
      years: "1845-1911",
      description: "Выдающийся русский изобретатель в области телефонии. Жил и работал в селе Тарусово Калужской губернии, где создал одну из первых в России телефонных станций.",
      achievements: [
        "Изобретение многоканального телефона",
        "Создание телефонов для железных дорог",
        "Получение 10 патентов на изобретения в области телефонии"
      ]
    }
  ];

  // Хронология по векам
  const centuryTimeline = [
    {
      century: "XIV век",
      events: [
        { year: "1371", event: "Первое упоминание Калуги в грамоте литовского князя Ольгерда" }
      ]
    },
    {
      century: "XV век",
      events: [
        { year: "1480-е", event: "Строительство деревянной крепости на высоком берегу Оки" },
        { year: "1485", event: "Калуга входит в состав Московского княжества" }
      ]
    },
    {
      century: "XVI век",
      events: [
        { year: "1512", event: "Успешная оборона города от набега крымских татар" },
        { year: "1565-1572", event: "Калуга входит в опричнину Ивана Грозного" },
        { year: "1595", event: "Упоминание о Калуге как крупном торговом центре" }
      ]
    },
    {
      century: "XVII век",
      events: [
        { year: "1606-1607", event: "Восстание под предводительством Ивана Болотникова" },
        { year: "1610-1611", event: "Калуга – столица «царя» Лжедмитрия II" },
        { year: "1617", event: "Строительство новых укреплений" },
        { year: "1622", event: "Начало строительства каменного кремля" },
        { year: "1681", event: "Большой пожар в Калуге" }
      ]
    },
    {
      century: "XVIII век",
      events: [
        { year: "1719", event: "Калуга становится центром провинции" },
        { year: "1775", event: "Образование Калужского наместничества" },
        { year: "1777", event: "Утверждение регулярного плана застройки города" },
        { year: "1784-1796", event: "Строительство Гостиного двора" },
        { year: "1785", event: "Строительство Каменного моста" },
        { year: "1799", event: "Учреждение городской думы" }
      ]
    },
    {
      century: "XIX век",
      events: [
        { year: "1812", event: "Отечественная война, Калужская губерния становится тыловой базой русской армии" },
        { year: "1823-1831", event: "Строительство Присутственных мест" },
        { year: "1826", event: "Открытие первого в городе театра" },
        { year: "1859", event: "Открытие женской гимназии" },
        { year: "1874", event: "Через Калугу прошла Сызрано-Вяземская железная дорога" },
        { year: "1892", event: "В Калугу приезжает К.Э. Циолковский" },
        { year: "1897", event: "Первая всеобщая перепись населения, в Калуге проживало 49,5 тыс. человек" }
      ]
    },
    {
      century: "XX век",
      events: [
        { year: "1908", event: "Начало работы электростанции и появление электрического освещения" },
        { year: "1917", event: "Установление Советской власти в Калуге" },
        { year: "1929", event: "Калуга становится центром Калужского округа Московской области" },
        { year: "1935", event: "Смерть К.Э. Циолковского" },
        { year: "1941, 12 октября", event: "Оккупация Калуги немецкими войсками" },
        { year: "1941, 30 декабря", event: "Освобождение Калуги" },
        { year: "1944", event: "Образование Калужской области с центром в Калуге" },
        { year: "1957", event: "Открытие первого в мире Государственного музея истории космонавтики" },
        { year: "1967", event: "Празднование 600-летия города" },
        { year: "1980-е", event: "Развитие промышленности, строительство новых микрорайонов" }
      ]
    },
    {
      century: "XXI век",
      events: [
        { year: "2002", event: "Открытие второй очереди музея космонавтики" },
        { year: "2007", event: "Создание автомобильного кластера" },
        { year: "2016", event: "Калуга признана самым благоустроенным областным центром России" },
        { year: "2021", event: "Празднование 650-летия основания Калуги" }
      ]
    }
  ];

  // Добавляем эффект анимации при прокрутке
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add('opacity-100');
          element.classList.remove('opacity-0');
          element.classList.add('translate-y-0');
          element.classList.remove('translate-y-10');
        }
      });
    };
    
    // Вызываем один раз для элементов, которые уже видны при загрузке
    setTimeout(animateOnScroll, 100);
    
    // Добавляем обработчик прокрутки
    window.addEventListener('scroll', animateOnScroll);
    
    return () => {
      window.removeEventListener('scroll', animateOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        {/* Заголовок страницы */}
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
        
        {/* Исторические периоды */}
        <section className="py-16 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Исторические периоды развития Калуги
            </h2>
            
            <div className="space-y-10">
              {historicalPeriods.map((period, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-500 ease-out glass-card p-8 rounded-lg shadow-sm"
                  style={{ transitionDelay: `${index * 0.2}s` }}
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
        
        {/* Исторические личности */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Выдающиеся исторические личности
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {historicalFigures.map((figure, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-500 ease-out glass-card p-6 rounded-lg"
                  style={{ transitionDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-kaluga-100 flex items-center justify-center mr-4">
                      <BookOpen size={20} className="text-kaluga-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-kaluga-800">{figure.name}</h3>
                      <p className="text-kaluga-500 text-sm">{figure.years}</p>
                    </div>
                  </div>
                  
                  <p className="text-kaluga-600 mb-4 text-sm leading-relaxed">
                    {figure.description}
                  </p>
                  
                  <div className="bg-kaluga-50 p-3 rounded-md">
                    <h4 className="text-sm font-medium text-kaluga-700 mb-2">Основные достижения:</h4>
                    <ul className="text-xs space-y-1">
                      {figure.achievements.map((achievement, achieveIndex) => (
                        <li key={achieveIndex} className="flex items-start">
                          <Award size={12} className="text-kaluga-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-kaluga-600">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Исторические достопримечательности */}
        <section className="py-16 bg-kaluga-50">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Исторические памятники и достопримечательности
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {historicalLandmarks.map((landmark, index) => (
                <div 
                  key={index} 
                  className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-500 ease-out bg-white p-6 rounded-lg shadow-sm"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-kaluga-100 flex items-center justify-center mr-3">
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
        
        {/* Исторические источники */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-serif font-medium text-kaluga-800 mb-8 text-center">
              Источники и литература о Калуге
            </h2>
            
            <div className="glass-card p-6 md:p-8 rounded-lg animate-on-scroll opacity-0 translate-y-10 transition-all duration-500 ease-out">
              <div className="flex items-center mb-6">
                <FileText size={24} className="text-kaluga-600 mr-3" />
                <h3 className="text-2xl font-medium text-kaluga-800">Рекомендуемые книги и источники</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-kaluga-700 mb-3">Исторические монографии</h4>
                  <ul className="space-y-2">
                    <li className="text-kaluga-600">
                      <span className="font-medium">Малинин Д.И.</span> - "Калуга. Опыт исторического путеводителя по Калуге и главнейшим центрам губернии"
                    </li>
                    <li className="text-kaluga-600">
                      <span className="font-medium">Морозова Г.М.</span> - "Прогулки по старой Калуге"
                    </li>
                    <li className="text-kaluga-600">
                      <span className="font-medium">Писарев С.И.</span> - "Калуга на рубеже веков"
                    </li>
                    <li className="text-kaluga-600">
                      <span className="font-medium">Продувнов В.Е.</span> - "Это моя Калуга"
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-kaluga-700 mb-3">Архивные материалы и источники</h4>
                  <ul className="space-y-2">
                    <li className="text-kaluga-600">
                      Государственный архив Калужской области (ГАКО)
                    </li>
                    <li className="text-kaluga-600">
                      Калужский областной краеведческий музей
                    </li>
                    <li className="text-kaluga-600">
                      Летописи и хроники XVII-XIX веков
                    </li>
                    <li className="text-kaluga-600">
                      "Памятные книжки Калужской губернии" (издавались с 1856 года)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      <style>
        {`
        .animate-on-scroll {
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        `}
      </style>
    </div>
  );
};

export default History;
