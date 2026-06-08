import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageSquare, Instagram, Facebook } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.course) {
      alert("कृपया नाम, फोन नंबर और कोर्स का चयन करें।");
      return;
    }
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', email: '', course: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-brandGray-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-bold text-brandGold uppercase tracking-widest bg-brandNavy/5 px-4 py-1.5 rounded-full inline-block mb-3 border border-brandNavy/10">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandNavy font-sans mb-4">
            प्रवेश हेतु हमसे संपर्क करें (Contact Us)
          </h2>
          <div className="w-24 h-1.5 bg-brandGold mx-auto rounded-full"></div>
          <p className="mt-4 text-brandNavy-light font-sans text-base sm:text-lg">
            हमारे काउंसलर्स आपकी सहायता के लिए तैयार हैं। आज ही संपर्क करें!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info & clickable buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-brandNavy/5">
              <h3 className="text-2xl font-bold font-sans text-brandNavy mb-1">Career Compass Consultancy</h3>
              <p className="text-xs font-hindi text-brandGold-dark font-semibold mb-6">शिक्षा एवं उज्जवल भविष्य का मार्गदर्शक</p>

              {/* Direct Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brandNavy/5 text-brandNavy flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-brandNavy-light font-sans font-bold block uppercase tracking-wider">Office Location</span>
                    <span className="text-sm text-brandNavy font-semibold block mt-0.5">Bhagalpur, Bihar</span>
                    <span className="text-xs text-brandNavy-light/70 font-hindi font-light block">भागलपुर, बिहार</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brandNavy/5 text-brandNavy flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-brandNavy-light font-sans font-bold block uppercase tracking-wider">Call or WhatsApp</span>
                    <span className="text-sm text-brandNavy font-bold block mt-0.5">+91 6206177982</span>
                    <span className="text-xs text-brandNavy-light/70 font-hindi font-light block">सुबह 9:00 बजे से शाम 7:00 बजे तक</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-brandNavy/5">
                <a
                  href="tel:+916206177982"
                  className="px-5 py-3.5 bg-brandNavy hover:bg-brandNavy-light text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  <Phone size={16} />
                  <span>Call Now</span>
                </a>

                <a
                  href="https://wa.me/916206177982?text=Hello%20Career%20Compass,%20I%20am%20interested%20in%20admission%20guidance."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 bg-brandGreen hover:bg-brandGreen-light text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group text-sm"
                >
                  <MessageSquare size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="bg-brandNavy text-white p-8 rounded-2xl shadow-lg relative overflow-hidden border border-white/10">
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-white/5 rounded-full"></div>
              <h4 className="text-lg font-bold font-sans tracking-wide mb-1">Follow Us on Social Media</h4>
              <p className="text-xs font-hindi text-brandGold-light mb-6">सोशल मीडिया पर हमारे साथ जुड़ें</p>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://instagram.com/careercompass05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-brandGold/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-white/10 text-brandGold group-hover:scale-110 transition-transform">
                    <Instagram size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-sans uppercase">Instagram</span>
                    <span className="text-xs font-semibold font-sans">@careercompass05</span>
                  </div>
                </a>

                <a
                  href="https://facebook.com/careercompass05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 hover:border-brandGold/30 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-white/10 text-brandGold group-hover:scale-110 transition-transform">
                    <Facebook size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-white/60 font-sans uppercase">Facebook</span>
                    <span className="text-xs font-semibold font-sans">@careercompass05</span>
                  </div>
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Dynamic admission/enquiry form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-brandNavy/5"
          >
            <h3 className="text-2xl font-bold font-sans text-brandNavy mb-1">Enquiry Form</h3>
            <p className="text-xs font-hindi text-brandGold-dark font-semibold mb-8">निशुल्क मार्गदर्शन के लिए विवरण दर्ज करें</p>

            {isSuccess ? (
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-brandGreen/10 text-brandGreen flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <h4 className="text-xl font-bold text-brandNavy font-sans mb-2">Details Submitted Successfully!</h4>
                <p className="text-sm font-hindi text-brandNavy-light/95 max-w-sm mb-6">
                  आपका विवरण सफलतापूर्वक जमा हो गया है। हमारे शैक्षिक सलाहकार अगले 24 घंटों में आपसे व्हाट्सएप या फोन पर संपर्क करेंगे।
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 bg-brandNavy hover:bg-brandNavy-light text-white font-bold rounded-xl transition-all shadow"
                >
                  Submit Another Query
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">
                      Full Name * / नाम *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-brandGray/20 text-brandNavy placeholder-brandNavy/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">
                      Phone Number * / फोन नंबर *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter mobile number"
                      className="w-full px-4 py-3 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-brandGray/20 text-brandNavy placeholder-brandNavy/40"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">
                      Email Address (Optional) / ईमेल
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-brandGray/20 text-brandNavy placeholder-brandNavy/40"
                    />
                  </div>

                  <div>
                    <label htmlFor="course" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">
                      Preferred Course * / कोर्स चयन *
                    </label>
                    <select
                      id="course"
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-brandGray/20 text-brandNavy"
                    >
                      <option value="">Select a course / कोर्स चुनें</option>
                      <option value="B.Ed">B.Ed (बैचलर ऑफ एजुकेशन)</option>
                      <option value="D.El.Ed">D.El.Ed (डिप्लोमा इन एलीमेंट्री एजुकेशन)</option>
                      <option value="B.P.Ed">B.P.Ed (बैचलर ऑफ फिजिकल एजुकेशन)</option>
                      <option value="B.P.E.S">B.P.E.S (बैचलर ऑफ फिजिकल एजुकेशन एंड स्पोर्ट्स)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-2">
                    Your Message / Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ask any question or write your message here..."
                    className="w-full px-4 py-3 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-brandGray/20 text-brandNavy placeholder-brandNavy/40"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brandGold hover:bg-brandGold-light disabled:bg-brandGold/50 text-brandNavy font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 group text-base"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-brandNavy border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Submit Details</span>
                        <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
