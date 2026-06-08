import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award, Trophy, ArrowUpRight } from 'lucide-react';

export default function Courses({ onOpenApplyModal }) {
  const courses = [
    {
      id: 'bed',
      title: 'B.Ed',
      subtitle: 'बैचलर ऑफ एजुकेशन',
      color: 'bg-brandNavy text-white hover:border-brandGold/50',
      badgeColor: 'bg-brandGold text-brandNavy',
      icon: GraduationCap,
      eligibility: [
        'स्नातक (Graduation) में न्यूनतम 50% अंक अनिवार्य।',
        'शिक्षण क्षेत्र में करियर बनाने की इच्छा।'
      ],
      description: 'Bachelor of Education is a professional degree that prepares students to work as teachers in schools.',
      themeColor: '#072B63'
    },
    {
      id: 'deled',
      title: 'D.El.Ed',
      subtitle: 'डिप्लोमा इन एलीमेंट्री एजुकेशन',
      color: 'bg-brandGreen text-white hover:border-brandGold/50',
      badgeColor: 'bg-white text-brandGreen font-bold',
      icon: BookOpen,
      eligibility: [
        '12वीं उत्तीर्ण न्यूनतम 50% अंक अनिवार्य।',
        'प्राथमिक शिक्षा शिक्षण योग्यता हेतु आवश्यक।'
      ],
      description: 'Diploma in Elementary Education is a 2-year full-time diploma course to train teachers for primary classes.',
      themeColor: '#0B7A3A'
    },
    {
      id: 'bped',
      title: 'B.P.Ed',
      subtitle: 'बैचलर ऑफ फिजिकल एजुकेशन',
      color: 'bg-brandNavy text-white hover:border-brandGold/50',
      badgeColor: 'bg-brandGold text-brandNavy',
      icon: Award,
      eligibility: [
        'स्नातक (Graduation) उत्तीर्ण होना आवश्यक।',
        'शारीरिक दक्षता परीक्षा (Physical Fitness) उत्तीर्ण करना आवश्यक।'
      ],
      description: 'Bachelor of Physical Education is a course designed to teach physical activities and sports coaching.',
      themeColor: '#072B63'
    },
    {
      id: 'bpes',
      title: 'B.P.E.S',
      subtitle: 'बैचलर ऑफ फिजिकल एजुकेशन एंड स्पोर्ट्स',
      color: 'bg-brandRed text-white hover:border-brandGold/50',
      badgeColor: 'bg-white text-brandRed font-bold',
      icon: Trophy,
      eligibility: [
        '12वीं उत्तीर्ण होना आवश्यक।',
        'खेल एवं शारीरिक गतिविधियों में विशेष रुचि आवश्यक।'
      ],
      description: 'Bachelor of Physical Education & Sports is a undergraduate program focusing on sports science and fitness.',
      themeColor: '#B11434'
    }
  ];

  return (
    <section id="courses" className="py-20 bg-brandGray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-brandGold uppercase tracking-widest bg-brandNavy/5 px-4 py-1.5 rounded-full inline-block mb-3 border border-brandNavy/10">
            Admission Guidance & Support
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-sans mb-4">
            प्रवेश मार्गदर्शन एवं सहायता
          </h2>
          <div className="w-24 h-1.5 bg-brandGold mx-auto rounded-full"></div>
          <p className="mt-4 text-brandNavy-light font-sans text-base sm:text-lg">
            हम छात्रों को उच्च गुणवत्ता वाले संस्थानों में प्रवेश पाने के लिए सटीक और विश्वसनीय मार्गदर्शन प्रदान करते हैं।
          </p>
        </div>

        {/* Courses Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, idx) => {
            const IconComponent = course.icon;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between p-6 rounded-2xl shadow-xl transition-all duration-300 border border-white/10 overflow-hidden ${course.color}`}
              >
                {/* Decorative background shape */}
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>

                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/15 backdrop-blur-sm rounded-xl text-white">
                      <IconComponent size={28} />
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full shadow-sm ${course.badgeColor}`}>
                      Admissions Open
                    </span>
                  </div>

                  {/* Course Titles */}
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold font-sans tracking-wide mb-1 flex items-center gap-1.5">
                      {course.title}
                    </h3>
                    <h4 className="text-lg font-hindi font-medium text-brandGold-light leading-tight">
                      {course.subtitle}
                    </h4>
                  </div>

                  {/* Course Details / Description */}
                  <p className="text-xs text-white/70 font-sans mb-5 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Eligibility Header */}
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-xs uppercase tracking-wider text-brandGold font-bold block mb-2">
                      Eligibility / योग्यता:
                    </span>
                    <ul className="space-y-2">
                      {course.eligibility.map((elig, itemIdx) => (
                        <li key={itemIdx} className="text-sm font-hindi leading-relaxed text-white/90 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-brandGold rounded-full mt-2 shrink-0"></span>
                          <span>{elig}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply CTA in card footer */}
                <div className="mt-8 pt-4 border-t border-white/5">
                  <button
                    onClick={onOpenApplyModal}
                    className="w-full py-2.5 bg-white text-brandNavy hover:bg-brandGold hover:text-brandNavy transition-all rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 shadow-md group"
                  >
                    <span>Get Admission Guidance</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Action bar */}
        <div className="mt-16 text-center">
          <p className="text-sm sm:text-base text-brandNavy font-semibold font-hindi bg-white/80 backdrop-blur border border-brandNavy/10 inline-block px-6 py-3.5 rounded-2xl shadow-md">
            📞 किसी भी पाठ्यक्रम के बारे में जानकारी के लिए तुरंत कॉल करें: <a href="tel:+916206177982" className="text-brandRed hover:underline font-bold">+91 6206177982</a>
          </p>
        </div>

      </div>
    </section>
  );
}
