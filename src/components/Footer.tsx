
import React from 'react';
import { Heart, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-kaluga-800 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Калуга Гид</h3>
            <p className="text-kaluga-200 mb-4">
              Путеводитель по одному из старейших городов России. Откройте для себя 
              Калугу с нашим подробным гидом.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Разделы сайта</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-kaluga-200 hover:text-white transition-colors">Главная</a>
              </li>
              <li>
                <a href="#attractions" className="text-kaluga-200 hover:text-white transition-colors">Достопримечательности</a>
              </li>
              <li>
                <a href="#history" className="text-kaluga-200 hover:text-white transition-colors">История</a>
              </li>
              <li>
                <a href="#gallery" className="text-kaluga-200 hover:text-white transition-colors">Галерея</a>
              </li>
              <li>
                <a href="#map" className="text-kaluga-200 hover:text-white transition-colors">Карта</a>
              </li>
              <li>
                <a href="#info" className="text-kaluga-200 hover:text-white transition-colors">Информация</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="text-kaluga-300 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-kaluga-200">
                  Туристско-информационный центр<br />
                  г. Калуга, ул. Ленина, 124
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-kaluga-300 mr-2 flex-shrink-0" />
                <span className="text-kaluga-200">+7 (4842) 56-25-78</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-kaluga-300 mr-2 flex-shrink-0" />
                <span className="text-kaluga-200">info@kaluga-guide.ru</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif font-medium mb-4">Подписка</h3>
            <p className="text-kaluga-200 mb-4">
              Подпишитесь на нашу рассылку, чтобы получать новости о событиях и мероприятиях в Калуге.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Ваш email" 
                className="px-4 py-2 rounded-l-lg text-kaluga-800 focus:outline-none flex-grow"
              />
              <button 
                type="submit" 
                className="bg-kaluga-500 hover:bg-kaluga-600 transition-colors px-4 py-2 rounded-r-lg"
              >
                OK
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-kaluga-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-kaluga-300 text-sm mb-4 md:mb-0">
            © {currentYear} Путеводитель по Калуге. Все права защищены.
          </p>
          <p className="text-kaluga-300 text-sm flex items-center">
            Сделано с <Heart size={14} className="text-kaluga-500 mx-1" /> для любителей путешествий
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
