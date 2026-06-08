import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Mission, Vision, Slogans */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <span className="text-sm font-bold text-brandGold uppercase tracking-widest bg-brandNavy/5 px-4 py-1.5 rounded-full inline-block mb-3 border border-brandNavy/10">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-sans mb-6">
              About Career Compass Consultancy
            </h2>
            <div className="w-20 h-1.5 bg-brandGold rounded-full mb-8"></div>
            
            <p className="text-base sm:text-lg text-brandNavy-light/95 font-sans leading-relaxed mb-6">
              Career Compass Consultancy provides trusted admission guidance for teacher education and physical education programs. We bridging the gap between aspiring students and premium educational institutions, ensuring a smooth and transparent admission process.
            </p>
            
            <p className="text-sm sm:text-base font-hindi text-brandNavy/80 leading-relaxed mb-8 bg-brandGray/40 p-4 border-l-4 border-brandGold rounded-r-xl">
              कैरियर कंपास कंसलटेंसी शिक्षक शिक्षा (B.Ed, D.El.Ed) और शारीरिक शिक्षा (B.P.Ed, B.P.E.S) कार्यक्रमों के लिए विश्वसनीय प्रवेश मार्गदर्शन प्रदान करती है। हमारा उद्देश्य छात्रों को सही पाठ्यक्रम और कॉलेज का चयन करने में मदद करना है ताकि उनका भविष्य सुरक्षित हो सके।
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Mission Card */}
              <div className="p-5 rounded-2xl border border-brandNavy/10 bg-brandGray/10 hover:bg-white transition-all hover:shadow-lg group">
                <div className="w-10 h-10 rounded-lg bg-brandGold/10 text-brandGold-dark flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <Target size={22} />
                </div>
                <h3 className="text-lg font-bold font-sans text-brandNavy mb-1">Our Mission</h3>
                <h4 className="text-xs font-hindi text-brandGold-dark font-medium mb-3">हमारा संकल्प</h4>
                <p className="text-sm text-brandNavy-light/90 font-sans leading-relaxed">
                  Help students choose the right course and college for a bright, successful future.
                </p>
                <p className="text-xs font-hindi text-brandNavy/70 font-light mt-2 leading-relaxed border-t border-brandNavy/5 pt-2">
                  छात्रों को सही पाठ्यक्रम और कॉलेज चुनने में मदद करना ताकि उनका भविष्य उज्ज्वल हो।
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-5 rounded-2xl border border-brandNavy/10 bg-brandGray/10 hover:bg-white transition-all hover:shadow-lg group">
                <div className="w-10 h-10 rounded-lg bg-brandGreen/10 text-brandGreen flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <Eye size={22} />
                </div>
                <h3 className="text-lg font-bold font-sans text-brandNavy mb-1">Our Vision</h3>
                <h4 className="text-xs font-hindi text-brandGreen font-medium mb-3">हमारा दृष्टिकोण</h4>
                <p className="text-sm text-brandNavy-light/90 font-sans leading-relaxed">
                  To be Bihar's most trusted educational partner for career path counseling.
                </p>
                <p className="text-xs font-hindi text-brandNavy/70 font-light mt-2 leading-relaxed border-t border-brandNavy/5 pt-2">
                  करियर काउंसलिंग के लिए बिहार का सबसे विश्वसनीय और सुलभ शैक्षिक भागीदार बनना।
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Key details / values */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Visual Value Cards */}
            <div className="p-6 rounded-2xl bg-brandNavy text-white shadow-xl relative overflow-hidden border border-white/10 group">
              <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/5"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/15 rounded-xl text-brandGold shrink-0">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans">NCTE & UGC Approved</h3>
                  <p className="text-xs font-hindi text-brandGold-light font-medium mt-0.5">मान्यता प्राप्त संस्थान</p>
                  <p className="text-sm text-white/80 font-sans leading-relaxed mt-2">
                    We only recommend colleges approved by National Council for Teacher Education (NCTE) and University Grants Commission (UGC).
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-brandGreen text-white shadow-xl relative overflow-hidden border border-white/10 group">
              <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-white/5"></div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/15 rounded-xl text-white shrink-0">
                  <HeartHandshake size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-sans">Transparent Fees & Process</h3>
                  <p className="text-xs font-hindi text-brandGold-light font-medium mt-0.5">पारदर्शी और स्पष्ट प्रक्रिया</p>
                  <p className="text-sm text-white/80 font-sans leading-relaxed mt-2">
                    No hidden charges. Complete clarity on fees structure, registration fees, examination schedules, and scholarship opportunities.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Stats Panel */}
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="bg-brandGray/60 rounded-2xl p-5 border border-brandNavy/5 text-center">
                <span className="block text-3xl font-bold font-sans text-brandNavy">100%</span>
                <span className="text-xs text-brandNavy-light/80 block mt-1 font-hindi">विश्वसनीय मार्गदर्शन</span>
              </div>
              <div className="bg-brandGray/60 rounded-2xl p-5 border border-brandNavy/5 text-center">
                <span className="block text-3xl font-bold font-sans text-brandNavy">Bihar</span>
                <span className="text-xs text-brandNavy-light/80 block mt-1 font-hindi">व समीपवर्ती राज्यों में सेवा</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
