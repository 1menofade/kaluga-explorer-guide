
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Достопримечательности', href: '/attractions' },
    { name: 'Маршруты', href: '/routes' },
    { name: 'История', href: '/#history' },
    { name: 'Галерея', href: '/#gallery' },
    { name: 'Карта', href: '/#map' },
    { name: 'Информация', href: '/#info' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between">
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
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-kaluga-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
              className="text-kaluga-800 hover:text-kaluga-500 transition-colors py-2"
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
