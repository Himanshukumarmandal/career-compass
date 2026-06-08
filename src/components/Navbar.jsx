import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onOpenApplyModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home', hindiName: 'मुख्य पृष्ठ' },
    { name: 'Courses', href: '#courses', hindiName: 'पाठ्यक्रम' },
    { name: 'Why Choose Us', href: '#why-choose-us', hindiName: 'हमारा चयन क्यों' },
    { name: 'Process', href: '#process', hindiName: 'प्रवेश प्रक्रिया' },
    { name: 'About Us', href: '#about', hindiName: 'हमारे बारे में' },
    { name: 'Contact', href: '#contact', hindiName: 'संपर्क' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-brandNavy/95 backdrop-blur-md shadow-lg border-b border-white/10' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand Name */}
          <a href="#home" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden transition-transform duration-300 group-hover:rotate-12 shadow-md">
              <img src="/images/logo.png" alt="Career Compass Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-wide text-lg sm:text-xl font-sans group-hover:text-brandGold transition-colors">
                Career Compass
              </span>
              <span className="text-xs text-brandGold font-semibold -mt-1 uppercase tracking-wider">
                Consultancy
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-lg text-white hover:text-brandGold hover:bg-white/5 transition-all text-sm font-medium flex flex-col items-center"
              >
                <span>{item.name}</span>
                <span className="text-[10px] text-brandGold/80 font-hindi font-normal tracking-wide">{item.hindiName}</span>
              </a>
            ))}
            <button
              onClick={onOpenApplyModal}
              className="ml-4 px-5 py-2.5 bg-brandGold hover:bg-brandGold-light text-brandNavy font-semibold text-sm rounded-lg transition-all shadow-md flex items-center gap-1.5 group transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Apply Now</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-brandGold p-2 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-brandNavy border-t border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
      }`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-brandNavy-dark/95 backdrop-blur-lg">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-white hover:text-brandGold hover:bg-white/5 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold font-sans">{item.name}</span>
                <span className="text-xs text-brandGold font-hindi font-light">{item.hindiName}</span>
              </div>
            </a>
          ))}
          <div className="pt-4 border-t border-white/5">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenApplyModal();
              }}
              className="w-full py-3 bg-brandGold hover:bg-brandGold-light text-brandNavy font-bold rounded-lg text-center shadow-lg flex items-center justify-center gap-2 group"
            >
              <span>Apply Now</span>
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
