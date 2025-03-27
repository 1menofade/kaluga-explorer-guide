
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

/**
 * Navbar component for site navigation
 * Contains both desktop and mobile navigation menus
 */
const Navbar = () => {
  // State to track if the user has scrolled down the page
  const [isScrolled, setIsScrolled] = useState(false);
  // State to track if the mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Get current location to highlight active links
  const location = useLocation();

  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links configuration
  // You can modify this array to add/remove/change menu items
  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Достопримечательности', href: '/attractions' },
    { name: 'Маршруты', href: '/routes' },
    { name: 'История', href: '/history' },
    { name: 'Рестораны', href: '/restaurants' },
    { name: 'Ночлег', href: '/accommodations' },
    { name: 'Карта', href: '/map' },
    { name: 'Информация', href: '/info' },
  ];

  // Helper function to determine if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo/Site Title */}
        <Link to="/" className="flex items-center">
          <span className="text-kaluga-800 font-serif text-2xl font-medium">Калуга</span>
          <span className="ml-1 text-kaluga-500 font-serif text-xl">Гид</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              className={cn(
                "nav-link transition-colors",
                isActive(link.href) ? "text-kaluga-600 font-medium" : "text-kaluga-700 hover:text-kaluga-500"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-kaluga-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
