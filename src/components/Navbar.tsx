
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

/**
 * Компонент навигационной панели для сайта
 * Содержит настольное и мобильное меню
 */
const Navbar = () => {
  // Состояние для отслеживания прокрутки страницы
  const [isScrolled, setIsScrolled] = useState(false);
  // Состояние для отслеживания открытия мобильного меню
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Получение текущего местоположения для подсветки активных ссылок
  const location = useLocation();

  useEffect(() => {
    // Функция для обработки событий прокрутки
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Конфигурация навигационных ссылок
  // Вы можете изменить этот массив, чтобы добавить/удалить/изменить пункты меню
  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Достопр.', href: '/attractions' },
    { name: 'Маршруты', href: '/routes' },
    { name: 'История', href: '/history' },
    { name: 'Рестораны', href: '/restaurants' },
    { name: 'Ночлег', href: '/accommodations' },
    { name: 'Карта', href: '/map' },
    { name: 'Инфо', href: '/info' },
  ];

  // Вспомогательная функция для определения активной ссылки
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-2',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Логотип/Название сайта */}
        <Link to="/" className="flex items-center">
          <span className="text-kaluga-800 font-serif text-xl font-medium">Калуга</span>
          <span className="ml-1 text-kaluga-500 font-serif text-lg">Гид</span>
        </Link>

        {/* Настольное меню */}
        <div className="hidden md:flex space-x-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={cn(
                "nav-link text-sm transition-colors",
                isActive(link.href) ? "text-kaluga-600 font-medium" : "text-kaluga-700 hover:text-kaluga-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Кнопка мобильного меню */}
        <button 
          className="md:hidden text-kaluga-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Мобильное меню */}
      <div 
        className={cn(
          'md:hidden absolute w-full bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 ease-in-out overflow-hidden',
          mobileMenuOpen ? 'max-h-80 py-4 border-b border-kaluga-100' : 'max-h-0'
        )}
      >
        <div className="container-custom flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={cn(
                "py-2 transition-colors",
                isActive(link.href) ? "text-kaluga-600 font-medium" : "text-kaluga-800 hover:text-kaluga-500"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
