import './App.css';

import React, { useState } from 'react';
import Chatbot from './Components/ChatBot/Chatbot';

import chatbot from './images/logo/chatbot.png';

import HeaderContent from './Components/HeaderContent/HeaderContent';
import BodyContent from "./Components/BoadyContent/BodyContent";
import HeroSection from './Components/HeroSection/HeroSection';
import AboutSection from './Components/AboutSection/AboutSection';
import ServiceSection from './Components/ServiceSection/ServiceSection';
import DepartmentSection from './Components/DepartmentSection/DepartmentSection';
import DoctorSection from './Components/DoctorSection/DoctorSection';
import SubSection from './Components/SubSection/SubSection';
import ContactSection from './Components/ContactSection/ContactSection';
import FooterContent from './Components/FooterContent/FooterContent';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div>
      {/* Floating Chatbot Icon */}
      <div className='chatbot-button' onClick={() => setShowChat(true)}>
        <img className='chatbot-image' src={chatbot} alt="Chatbot" />
      </div>

      {/* Modal Popup for Chatbot */}
      {showChat && (
        <div className='chatbot-modal'>
          <div className='chatbot-modal-content'>
            <button className='close-btn' onClick={() => setShowChat(false)}>×</button>
            <Chatbot />
          </div>
        </div>
      )}

      {/* Main website content */}
      <HeaderContent />
      <BodyContent>
        <HeroSection />
        <AboutSection />
        <ServiceSection />
        <DepartmentSection />
        <DoctorSection />
        <SubSection />
        <ContactSection />
        <FooterContent />
      </BodyContent>
    </div>
  );
}

export default App;
