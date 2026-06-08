import React from 'react';
import { motion } from 'framer-motion';
import { Compass, School, ClipboardEdit, FolderOpen, ShieldCheck, Heart } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      title: 'Expert Counseling',
      hindiTitle: 'विशेषज्ञ परामर्श',
      description: 'Our certified counselors guide you to make informed decisions based on your qualifications, interests, and career ambitions.',
      hindiDescription: 'हमारे योग्य सलाहकार आपकी योग्यता और करियर की आकांक्षाओं के आधार पर सही दिशा चुनने में मदद करते हैं।',
      icon: Compass,
      color: 'border-brandNavy/10 hover:border-brandNavy/30',
      iconColor: 'bg-brandNavy/10 text-brandNavy'
    },
    {
      title: 'College Selection',
      hindiTitle: 'कॉलेज चयन',
      description: 'We help you select the best NCTE / UGC-approved colleges that fit your budget, location preferences, and academic criteria.',
      hindiDescription: 'हम आपके बजट और प्राथमिकताओं के अनुरूप मान्यता प्राप्त सर्वश्रेष्ठ शिक्षण संस्थानों के चयन में मदद करते हैं।',
      icon: School,
      color: 'border-brandGreen/10 hover:border-brandGreen/30',
      iconColor: 'bg-brandGreen/10 text-brandGreen'
    },
    {
      title: 'Application Assistance',
      hindiTitle: 'आवेदन में सहायता',
      description: 'Complete guidance throughout the application process, ensuring zero errors and timely submission to secure your seat.',
      hindiDescription: 'आवेदन प्रक्रिया के दौरान पूरी सहायता, ताकि कोई त्रुटि न हो और आपका प्रवेश समय पर सुनिश्चित हो सके।',
      icon: ClipboardEdit,
      color: 'border-brandGold/20 hover:border-brandGold/40',
      iconColor: 'bg-brandGold/10 text-brandGold-dark'
    },
    {
      title: 'Documentation Support',
      hindiTitle: 'दस्तावेज़ सत्यापन',
      description: 'Expert verification of eligibility, certificates, and marks sheets to avoid administrative blockages during admission stages.',
      hindiDescription: 'दस्तावेजों और प्रमाणपत्रों का विशेषज्ञ सत्यापन, ताकि प्रवेश प्रक्रिया में कोई प्रशासनिक बाधा न आए।',
      icon: FolderOpen,
      color: 'border-brandRed/10 hover:border-brandRed/30',
      iconColor: 'bg-brandRed/10 text-brandRed'
    },
    {
      title: 'End-to-End Admission Support',
      hindiTitle: 'प्रवेश तक पूर्ण सहायता',
      description: 'Continuous assistance from the initial counseling stage until you successfully register and join the classes at your college.',
      hindiDescription: 'परामर्श के पहले चरण से लेकर कॉलेज में पंजीकरण और कक्षाएं शुरू होने तक निरंतर मार्गदर्शन और समर्थन।',
      icon: ShieldCheck,
      color: 'border-brandNavy/10 hover:border-brandNavy/30',
      iconColor: 'bg-brandNavy/10 text-brandNavy'
    }
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-brandGold uppercase tracking-widest bg-brandGold/10 px-4 py-1.5 rounded-full inline-block mb-3 border border-brandGold/20">
            Our Key Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-sans mb-4">
            हमारा चयन क्यों करें? (Why Choose Us)
          </h2>
          <div className="w-24 h-1.5 bg-brandGold mx-auto rounded-full"></div>
          <p className="mt-4 text-brandNavy-light font-sans text-base sm:text-lg">
            हम हर छात्र के उज्ज्वल भविष्य के लिए समर्पित हैं और विश्वसनीय प्रवेश सेवाएं प्रदान करते हैं।
          </p>
        </div>

        {/* Feature Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.slice(0, 3).map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-2xl border bg-brandGray/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:bg-white group ${feat.color}`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feat.iconColor}`}>
                  <IconComponent size={28} />
                </div>
                
                {/* Title and Slogan */}
                <h3 className="text-xl font-bold font-sans text-brandNavy mb-1">
                  {feat.title}
                </h3>
                <h4 className="text-sm font-hindi font-medium text-brandGold-dark mb-4">
                  {feat.hindiTitle}
                </h4>

                <p className="text-sm text-brandNavy-light/90 font-sans leading-relaxed mb-3">
                  {feat.description}
                </p>
                <p className="text-xs font-hindi text-brandNavy/70 font-light leading-relaxed border-t border-brandNavy/5 pt-3">
                  {feat.hindiDescription}
                </p>
              </motion.div>
            );
          })}

          {/* Centering the last two items on larger screens */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:max-w-4xl lg:mx-auto w-full">
            {features.slice(3).map((feat, idx) => {
              const IconComponent = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx + 3) * 0.1 }}
                  className={`p-8 rounded-2xl border bg-brandGray/40 backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:bg-white group ${feat.color}`}
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feat.iconColor}`}>
                    <IconComponent size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold font-sans text-brandNavy mb-1">
                    {feat.title}
                  </h3>
                  <h4 className="text-sm font-hindi font-medium text-brandGold-dark mb-4">
                    {feat.hindiTitle}
                  </h4>

                  <p className="text-sm text-brandNavy-light/90 font-sans leading-relaxed mb-3">
                    {feat.description}
                  </p>
                  <p className="text-xs font-hindi text-brandNavy/70 font-light leading-relaxed border-t border-brandNavy/5 pt-3">
                    {feat.hindiDescription}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Brand highlight banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-brandNavy to-brandNavy-light text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10"
        >
          <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
            <div className="w-12 h-12 rounded-full bg-brandGold/20 flex items-center justify-center text-brandGold shrink-0">
              <Heart size={26} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-sans">Empowering Future Educators & Sports Coaches</h3>
              <p className="text-sm text-white/80 font-hindi mt-1">
                बिहार एवं उत्तर प्रदेश के सैकड़ों छात्रों ने हमारे मार्गदर्शन से अपने सपनों को सच किया है।
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="w-full md:w-auto px-6 py-3 bg-brandGold hover:bg-brandGold-light text-brandNavy font-bold rounded-xl text-center shadow-lg transition-all hover:scale-105"
          >
            Start Free Counseling
          </a>
        </motion.div>

      </div>
    </section>
  );
}
