import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Courses from './components/Courses';
import WhyChooseUs from './components/WhyChooseUs';
import AdmissionProcess from './components/AdmissionProcess';
import AboutUs from './components/AboutUs';
import ContactSection from './components/ContactSection';
import ApplyModal from './components/ApplyModal';
import Footer from './components/Footer';

export default function App() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleOpenApplyModal = () => {
    setIsApplyModalOpen(true);
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-brandGray flex flex-col font-sans select-none">
      {/* Navigation Bar */}
      <Navbar onOpenApplyModal={handleOpenApplyModal} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Hero Banner Section */}
        <Hero onOpenApplyModal={handleOpenApplyModal} />

        {/* Courses Cards Section */}
        <Courses onOpenApplyModal={handleOpenApplyModal} />

        {/* Why Choose Us Features Grid */}
        <WhyChooseUs />

        {/* Admission Timeline Section */}
        <AdmissionProcess />

        {/* About Section */}
        <AboutUs />

        {/* Contact Form & Actions Section */}
        <ContactSection />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating Application Modal */}
      <ApplyModal isOpen={isApplyModalOpen} onClose={handleCloseApplyModal} />
    </div>
  );
}
