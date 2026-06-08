import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, Phone, MessageCircleCode } from 'lucide-react';

export default function ApplyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    location: '',
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
      alert("कृपया आवश्यक जानकारी (नाम, फोन नंबर, कोर्स) भरें।");
      return;
    }
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', course: '', location: '', message: '' });
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Glassmorphic Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brandNavy/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20 w-full max-w-lg relative z-10"
          >
            {/* Header wave bar */}
            <div className="bg-brandNavy text-white p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
              <h3 className="text-xl font-bold font-sans">Admission Application 2026</h3>
              <p className="text-xs font-hindi text-brandGold-light font-medium mt-1">निःशुल्क परामर्श एवं मार्गदर्शन फॉर्म</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 bg-brandGray/30">
              {isSuccess ? (
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-brandGreen/10 text-brandGreen flex items-center justify-center mb-5">
                    <CheckCircle size={36} className="animate-bounce" />
                  </div>
                  <h4 className="text-lg font-bold text-brandNavy font-sans mb-1">Application Submitted!</h4>
                  <p className="text-xs font-hindi text-brandNavy-light/95 max-w-sm mb-6 leading-relaxed">
                    विवरण सुरक्षित कर लिया गया है। हमारे काउंसलर आपसे शीघ्र ही संपर्क करेंगे। त्वरित सहायता के लिए सीधे व्हाट्सएप चैट करें:
                  </p>
                  
                  <div className="flex flex-col gap-3 w-full">
                    <a
                      href="https://wa.me/916206177982?text=Hello%20Career%20Compass,%20I%20just%20submitted%20my%20enquiry%20form%20online."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-brandGreen hover:bg-brandGreen-light text-white font-bold rounded-xl shadow transition-all flex items-center justify-center gap-2"
                    >
                      <MessageCircleCode size={18} />
                      <span>Chat on WhatsApp</span>
                    </a>
                    
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-brandNavy/10 hover:bg-brandNavy/25 text-brandNavy font-semibold rounded-xl transition-all"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-1.5">
                      Student Name * / छात्र का नाम *
                    </label>
                    <input
                      type="text"
                      id="modal-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter student's full name"
                      className="w-full px-4 py-2.5 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-white"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="modal-phone" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-1.5">
                      Phone Number * / मोबाइल नंबर *
                    </label>
                    <input
                      type="tel"
                      id="modal-phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter active phone number"
                      className="w-full px-4 py-2.5 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-white"
                    />
                  </div>

                  {/* Course dropdown */}
                  <div>
                    <label htmlFor="modal-course" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-1.5">
                      Select Course * / कोर्स *
                    </label>
                    <select
                      id="modal-course"
                      name="course"
                      required
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-white text-brandNavy"
                    >
                      <option value="">Choose Course</option>
                      <option value="B.Ed">B.Ed (बैचलर ऑफ एजुकेशन)</option>
                      <option value="D.El.Ed">D.El.Ed (डिप्लोमा इन एलीमेंट्री एजुकेशन)</option>
                      <option value="B.P.Ed">B.P.Ed (बैचलर ऑफ फिजिकल एजुकेशन)</option>
                      <option value="B.P.E.S">B.P.E.S (बैचलर ऑफ फिजिकल एजुकेशन एंड स्पोर्ट्स)</option>
                    </select>
                  </div>

                  {/* City/Location */}
                  <div>
                    <label htmlFor="modal-location" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-1.5">
                      City / District / शहर या जिला
                    </label>
                    <input
                      type="text"
                      id="modal-location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Bhagalpur, Patna"
                      className="w-full px-4 py-2.5 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="modal-message" className="block text-xs font-bold text-brandNavy uppercase tracking-wider mb-1.5">
                      Any Query (Optional) / प्रश्न
                    </label>
                    <textarea
                      id="modal-message"
                      name="message"
                      rows={2}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your query here..."
                      className="w-full px-4 py-2.5 rounded-xl border border-brandNavy/10 focus:outline-none focus:ring-2 focus:ring-brandNavy/20 font-sans text-sm bg-white"
                    />
                  </div>

                  {/* Submit buttons */}
                  <div className="pt-4 border-t border-brandNavy/5 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="w-1/3 py-3 bg-brandNavy/5 hover:bg-brandNavy/15 text-brandNavy font-semibold rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-3 bg-brandGold hover:bg-brandGold-light disabled:bg-brandGold/50 text-brandNavy font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-brandNavy border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Submit Form</span>
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
