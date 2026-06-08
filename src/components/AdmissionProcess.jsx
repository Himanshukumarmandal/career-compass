import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, Compass, School, FileCheck, PartyPopper } from 'lucide-react';

export default function AdmissionProcess() {
  const steps = [
    {
      number: '1',
      title: 'Enquiry',
      hindiTitle: 'पूछताछ',
      description: 'Fill out our online application form or call us directly to raise your query.',
      hindiDescription: 'वेबसाइट पर फॉर्म भरें या हमें सीधे कॉल करके अपनी पूछताछ दर्ज करें।',
      icon: MessageSquareText,
      color: 'border-brandNavy hover:bg-brandNavy/5',
      iconColor: 'bg-brandNavy text-white'
    },
    {
      number: '2',
      title: 'Counseling',
      hindiTitle: 'परामर्श',
      description: 'Receive a callback from our expert academic counselors to discuss your interests.',
      hindiDescription: 'हमारे विशेषज्ञ सलाहकारों द्वारा आपके करियर और योग्यताओं का निःशुल्क विश्लेषण।',
      icon: Compass,
      color: 'border-brandGreen hover:bg-brandGreen/5',
      iconColor: 'bg-brandGreen text-white'
    },
    {
      number: '3',
      title: 'College Selection',
      hindiTitle: 'कॉलेज का चयन',
      description: 'Shortlist the most suitable universities and colleges approved by NCTE / UGC.',
      hindiDescription: 'मान्यता प्राप्त और बजट-अनुकूल सर्वश्रेष्ठ कॉलेजों की सूची तैयार करना।',
      icon: School,
      color: 'border-brandGold hover:bg-brandGold/5',
      iconColor: 'bg-brandGold text-brandNavy'
    },
    {
      number: '4',
      title: 'Application',
      hindiTitle: 'आवेदन प्रक्रिया',
      description: 'Our team will assist with document verification and application submission.',
      hindiDescription: 'दस्तावेजों का सत्यापन कर त्रुटिहीन आवेदन पत्र जमा करना।',
      icon: FileCheck,
      color: 'border-brandRed hover:bg-brandRed/5',
      iconColor: 'bg-brandRed text-white'
    },
    {
      number: '5',
      title: 'Admission Secured',
      hindiTitle: 'प्रवेश सुनिश्चित',
      description: 'Get your official admission letter and start your educational journey.',
      hindiDescription: 'कॉलेज से अपना प्रवेश पत्र प्राप्त करें और कक्षाएं शुरू करें।',
      icon: PartyPopper,
      color: 'border-brandNavy hover:bg-brandNavy/5',
      iconColor: 'bg-brandNavy-dark text-brandGold'
    }
  ];

  return (
    <section id="process" className="py-20 bg-brandGray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-bold text-brandGold uppercase tracking-widest bg-brandNavy/5 px-4 py-1.5 rounded-full inline-block mb-3 border border-brandNavy/10">
            Admission Funnel
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-sans mb-4">
            प्रवेश प्रक्रिया (Admission Process)
          </h2>
          <div className="w-24 h-1.5 bg-brandGold mx-auto rounded-full"></div>
          <p className="mt-4 text-brandNavy-light font-sans text-base sm:text-lg">
            हमारे आसान 5-चरणों के साथ कॉलेज में अपना स्थान सुरक्षित करें।
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Central Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-4 right-4 h-1 bg-white/40 -translate-y-1/2 z-0">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-brandNavy via-brandGreen to-brandRed"
            />
          </div>

          {/* Vertical Connector Line (Mobile) */}
          <div className="lg:hidden absolute left-8 top-4 bottom-4 w-1 bg-white/40 z-0">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-brandNavy via-brandGreen to-brandRed"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-6 relative z-10">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-start lg:items-center text-left lg:text-center group pl-16 lg:pl-0"
                >
                  {/* Step Bubble with Icon */}
                  <div className="absolute lg:relative left-0 lg:left-auto flex items-center justify-center">
                    <div className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-115 group-hover:shadow-2xl z-10 ${step.iconColor}`}>
                      <IconComponent size={24} />
                    </div>
                    
                    {/* Floating Step Number */}
                    <div className="absolute -top-2 -right-2 bg-brandGold text-brandNavy text-xs font-black w-6 h-6 rounded-full border-2 border-white flex items-center justify-center shadow">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Info */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold font-sans text-brandNavy group-hover:text-brandGold-dark transition-colors mb-1">
                      {step.title}
                    </h3>
                    <h4 className="text-sm font-hindi font-medium text-brandNavy/80 mb-3">
                      {step.hindiTitle}
                    </h4>

                    <p className="text-sm text-brandNavy-light/95 font-sans leading-relaxed mb-2 max-w-[200px] lg:mx-auto">
                      {step.description}
                    </p>
                    <p className="text-xs font-hindi text-brandNavy/70 font-light leading-relaxed max-w-[200px] lg:mx-auto border-t border-brandNavy/5 pt-2">
                      {step.hindiDescription}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
