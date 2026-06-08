import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall, Award, Users, CheckCircle } from 'lucide-react';

export default function Hero({ onOpenApplyModal }) {
  return (
    <section id="home" className="relative min-h-screen pt-24 pb-16 flex items-center justify-center overflow-hidden bg-brandNavy text-white">
      {/* Curved Background Graphic - Navy and Golden waves */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 800" className="absolute w-full h-full object-cover opacity-20 lg:opacity-30" preserveAspectRatio="none">
          <path 
            fill="#F5B21A" 
            d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,224C1248,203,1344,181,1392,170.7L1440,160L1440,800L1392,800C1344,800,1248,800,1152,800C1056,800,960,800,864,800C768,800,672,800,576,800C480,800,384,800,288,800C192,800,96,800,48,800L0,800Z"
          ></path>
        </svg>
        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brandGold/15 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brandNavy-light/35 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left"
          >
            {/* Top Compass Logo Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <motion.div 
                initial={{ rotate: -180, scale: 0.5 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1, type: "spring" }}
                className="w-16 h-16 rounded-full bg-white p-2 flex items-center justify-center shadow-lg border-2 border-brandGold"
              >
                <img src="/images/logo.png" alt="Career Compass Logo" className="w-full h-full object-contain" />
              </motion.div>
              <div className="h-10 w-[2px] bg-brandGold/40 hidden sm:block"></div>
              <div className="text-left">
                <span className="text-xs uppercase tracking-widest text-brandGold font-bold block">Career Compass</span>
                <span className="text-xxs uppercase tracking-wider text-white/70 block">Consultancy</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4 leading-tight font-sans">
              Career Compass <br/>
              <span className="text-brandGold drop-shadow-sm">Consultancy</span>
            </h1>

            {/* Slogan Hindi */}
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-3xl font-hindi font-semibold text-brandGold-light mb-6 tracking-wide"
            >
              "छात्रों को उनके लक्ष्य तक पहुँचाना हमारा संकल्प।"
            </motion.h2>

            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 mb-8 font-sans leading-relaxed">
              Admission Guidance & Counseling for top courses: <strong className="text-white">B.Ed, D.El.Ed, B.P.Ed, B.P.E.S</strong>. Leading consultancy helping students from Bihar and nearby states achieve secure futures.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button
                onClick={onOpenApplyModal}
                className="w-full sm:w-auto px-8 py-4 bg-brandGold hover:bg-brandGold-light text-brandNavy font-bold rounded-xl text-lg shadow-xl hover:shadow-brandGold/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Apply Now</span>
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
              
              <a
                href="#contact"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-xl text-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Contact Us</span>
                <PhoneCall size={20} className="text-brandGold transition-transform group-hover:scale-110" />
              </a>
            </div>

            {/* Key trust badges */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-brandGold mb-1 justify-center lg:justify-start">
                  <Award size={18} />
                  <span className="font-bold text-lg">100%</span>
                </div>
                <span className="text-xs text-white/60">Admission Guidance</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-brandGold mb-1 justify-center lg:justify-start">
                  <Users size={18} />
                  <span className="font-bold text-lg">500+</span>
                </div>
                <span className="text-xs text-white/60">Guided Students</span>
              </div>
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="flex items-center gap-1.5 text-brandGold mb-1 justify-center lg:justify-start">
                  <CheckCircle size={18} />
                  <span className="font-bold text-lg">Top</span>
                </div>
                <span className="text-xs text-white/60">Colleges & Universities</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Student Image and background graphics */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Outer Decorative Shape */}
            <div className="absolute inset-0 -m-4 rounded-3xl border-2 border-brandGold/20 scale-95 pointer-events-none transform -rotate-3 transition-transform duration-700 hover:rotate-0"></div>
            
            {/* Gold Highlight Ring */}
            <div className="absolute -top-6 -left-6 w-16 h-16 border-t-4 border-l-4 border-brandGold rounded-tl-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border-b-4 border-r-4 border-brandGold rounded-br-2xl"></div>

            {/* Primary Student Image with curved styling */}
            <div className="w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 relative group bg-brandNavy-dark">
              {/* Overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brandNavy/40 to-transparent z-10"></div>
              
              <img 
                src="/images/student.png" 
                alt="Successful College Students" 
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105" 
              />
              
              {/* Interactive tag badge on image */}
              <div className="absolute bottom-4 left-4 z-20 glass-panel py-2 px-3.5 rounded-lg flex items-center gap-2 shadow-lg border border-white/20">
                <div className="w-2.5 h-2.5 rounded-full bg-brandGreen animate-pulse"></div>
                <span className="text-xs text-brandNavy font-semibold">Admissions Open 2026</span>
              </div>
            </div>

            {/* Absolute badge floating behind image */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-4 top-1/4 bg-brandGold text-brandNavy p-3 rounded-xl shadow-xl font-bold text-center border-2 border-white z-20 hidden sm:block"
            >
              <span className="block text-xl">Bihar's</span>
              <span className="block text-[10px] tracking-widest uppercase text-brandNavy-dark">No. 1 Guide</span>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
