import React from 'react';
import { ArrowUp, Instagram, Facebook, MessageSquare, Heart } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brandNavy-dark text-white pt-16 pb-8 border-t border-white/5 relative">
      
      {/* Scroll to top floating button */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={handleScrollToTop}
          className="w-12 h-12 rounded-full bg-brandGold hover:bg-brandGold-light text-brandNavy flex items-center justify-center shadow-lg transition-transform duration-300 hover:-translate-y-1 focus:outline-none"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="animate-bounce" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/10">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white p-1 overflow-hidden">
                <img src="/images/logo.png" alt="Career Compass Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-wide text-lg sm:text-xl font-sans">
                  Career Compass
                </span>
                <span className="text-xs text-brandGold font-semibold -mt-1 uppercase tracking-wider">
                  Consultancy
                </span>
              </div>
            </div>

            <p className="text-brandGold-light font-hindi text-lg font-medium leading-relaxed max-w-sm mb-4">
              "आज छात्रों का मार्गदर्शन, कल सफलता की पहचान!"
            </p>
            
            <p className="text-xs text-white/60 font-sans leading-relaxed max-w-sm">
              Empowering students from Bihar and nearby states with seamless admission guidance in standard teacher education and sports science programs.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-4 md:pl-8">
            <h4 className="text-sm uppercase tracking-wider text-brandGold font-bold mb-4 font-sans">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              <li>
                <a href="#home" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>Home</span>
                  <span className="text-[10px] text-white/40 font-hindi">मुख्य पृष्ठ</span>
                </a>
              </li>
              <li>
                <a href="#courses" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>Courses</span>
                  <span className="text-[10px] text-white/40 font-hindi">पाठ्यक्रम</span>
                </a>
              </li>
              <li>
                <a href="#why-choose-us" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>Why Choose Us</span>
                  <span className="text-[10px] text-white/40 font-hindi">हमारा चयन</span>
                </a>
              </li>
              <li>
                <a href="#process" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>Admission Process</span>
                  <span className="text-[10px] text-white/40 font-hindi">प्रवेश प्रक्रिया</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>About Us</span>
                  <span className="text-[10px] text-white/40 font-hindi">हमारे बारे में</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-white/70 hover:text-brandGold transition-colors flex flex-col">
                  <span>Contact</span>
                  <span className="text-[10px] text-white/40 font-hindi">संपर्क</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-3">
            <h4 className="text-sm uppercase tracking-wider text-brandGold font-bold mb-4 font-sans">Connect With Us</h4>
            <p className="text-xs text-white/60 font-sans mb-4">
              Get regular admission updates, guidelines, and announcements.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com/careercompass05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brandGold hover:text-brandNavy transition-all flex items-center justify-center text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>

              <a
                href="https://facebook.com/careercompass05"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brandGold hover:text-brandNavy transition-all flex items-center justify-center text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>

              <a
                href="https://wa.me/916206177982"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-brandGreen hover:text-white transition-all flex items-center justify-center text-white"
                aria-label="WhatsApp"
              >
                <MessageSquare size={20} />
              </a>
            </div>

            {/* Helpline status */}
            <div className="mt-4 flex items-center gap-2 text-xs text-white/80">
              <div className="w-2 h-2 rounded-full bg-brandGreen animate-pulse"></div>
              <span>Helpline Active: +91 6206177982</span>
            </div>
          </div>

        </div>

        {/* Bottom copyright info */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-white/50 font-sans gap-4">
          <p>© 2026 Career Compass Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart size={10} className="text-brandRed fill-brandRed" />
            <span>for Career Success</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
