import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import defaultUser from "../../images/logo/logo.png";
import { FaRobot, FaListUl, FaSync } from "react-icons/fa";
import { RiStethoscopeFill } from "react-icons/ri";
import { LuSend } from "react-icons/lu";
import { GiMedicines } from "react-icons/gi";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function Chatbot() {
  const patientId = localStorage.getItem('patientId');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [userImage, setUserImage] = useState(defaultUser);
  const [isRefreshingDoctors, setIsRefreshingDoctors] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  const GEMINI_API_KEY = 'AIzaSyBtQ0pa0QyRAqwBbaS7ZLVhXxLcjyrJJNI';

  // Medical departments mapping with symptoms
  const departmentKeywords = {
    'Cardiology': ['heart', 'chest pain', 'blood pressure', 'cardiovascular', 'palpitations', 'shortness of breath', 'arrhythmia'],
    'Neurology': ['headache', 'migraine', 'stroke', 'seizure', 'nerve', 'parkinson', 'alzheimer', 'dizziness', 'numbness', 'tingling','neurologists'],
    'Orthopedics': ['bone', 'fracture', 'joint', 'back pain', 'arthritis', 'spine', 'knee pain', 'hip pain', 'muscle pain', 'sports injury'],
    'Pediatrics': ['child', 'baby', 'pediatric', 'infant', 'newborn', 'toddler', 'vaccine', 'growth', 'development'],
    'Dermatology': ['skin', 'rash', 'acne', 'eczema', 'psoriasis', 'dermatitis', 'allergy', 'hives', 'itching', 'boil'],
    'Gastroenterology': ['stomach', 'digestive', 'diarrhea', 'constipation', 'ibs', 'ulcer', 'bloating', 'indigestion', 'acid reflux'],
    'Hepatology': ['liver', 'hepatitis', 'jaundice', 'cirrhosis', 'fatty liver', 'gallbladder'],
    'Gynecology': ['gynecological', 'pregnancy', 'menstrual', 'ovarian', 'vaginal', 'pcos', 'menopause', 'fertility'],
    'Ophthalmology': ['eye', 'vision', 'glaucoma', 'cataract', 'retina', 'red eye', 'dry eyes', 'blurry vision'],
    'ENT': ['ear', 'nose', 'throat', 'sinus', 'tonsil', 'hearing', 'vertigo', 'sore throat'],
    'Psychiatry': ['depression', 'anxiety', 'stress', 'mental health', 'insomnia', 'bipolar', 'ocd'],
    'General': ['fever', 'cold', 'flu', 'vomit', 'cough', 'general checkup', 'fatigue', 'weakness']
  };

  // Department-wise default fees
  const defaultFees = {
    'Cardiology': 1500,
    'Neurology': 1200,
    'Orthopedics': 1000,
    'Pediatrics': 800,
    'Dermatology': 900,
    'Gastroenterology': 1100,
    'Hepatology': 1200,
    'Gynecology': 1000,
    'Ophthalmology': 900,
    'ENT': 800,
    'Psychiatry': 1300,
    'General': 500
  };

  // Common medications lookup
  const commonMedications = {
    'fever': 'Paracetamol (consult dosage with doctor)',
    'headache': 'Ibuprofen or Paracetamol (avoid if allergic)',
    'allergy': 'Antihistamines like Cetirizine',
    'acid reflux': 'Antacids like Omeprazole (short-term use only)',
    'muscle pain': 'Topical pain relievers or Ibuprofen',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load user image when component mounts
  useEffect(() => {
    const fetchUserImage = async () => {
      if (patientId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/patient/image/${patientId}`, {
            responseType: 'blob'
          });
          const imageUrl = URL.createObjectURL(response.data);
          setUserImage(imageUrl);
        } catch (error) {
          console.error('Error fetching user image:', error);
          setUserImage(defaultUser);
        }
      }
    };

    fetchUserImage();

    return () => {
      if (userImage !== defaultUser) {
        URL.revokeObjectURL(userImage);
      }
    };
  }, [patientId]);

  // Enhance doctor data with default values
  const enhanceDoctorData = (doctors) => {
    return doctors.map(doctor => ({
      ...doctor,
      fees: doctor.fees !== undefined ? doctor.fees : (defaultFees[doctor.department] || 800),
      shiftStartTime: doctor.shiftStartTime || '9:00 AM',
      shiftEndTime: doctor.shiftEndTime || '5:00 PM',
      weekendStartTime: doctor.weekendStartTime || '10:00 AM',
      weekendEndTime: doctor.weekendEndTime || '3:00 PM',
      phoneNumber: doctor.phoneNumber || 'Not provided'
    }));
  };

  // Fetch fresh doctor data
  const fetchDoctors = async () => {
    setIsRefreshingDoctors(true);
    try {
      const response = await axios.get('http://localhost:8080/api/doctors/getDoctor');
      const activeDoctors = enhanceDoctorData(response.data.filter(doctor => doctor.status === 'Active'));
      setDoctors(activeDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setMessages(prev => [...prev, {
        text: "Failed to update doctor list. Please try again later.",
        sender: 'ai',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsRefreshingDoctors(false);
    }
  };

  // Load doctors data when component mounts
  useEffect(() => {
    fetchDoctors();
  }, []);

  const refreshDoctors = async () => {
    setMessages(prev => [...prev, {
      text: "Updating doctor list...",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }]);
    await fetchDoctors();
  };

  const getRecommendedDoctors = (inputText) => {
    const lowerInput = inputText.toLowerCase();
    let recommendedDepartment = null;
    let maxMatches = 0;

    // Find the most relevant department
    for (const [dept, keywords] of Object.entries(departmentKeywords)) {
      const matches = keywords.filter(keyword => lowerInput.includes(keyword.toLowerCase())).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        recommendedDepartment = dept;
      }
    }

    // Check explicit department mentions
    const explicitDepartment = Object.keys(departmentKeywords).find(dept => 
      lowerInput.includes(dept.toLowerCase())
    );

    recommendedDepartment = explicitDepartment || recommendedDepartment;

    // Filter doctors
    let recommendedDoctors = recommendedDepartment 
      ? doctors.filter(doctor => doctor.department === recommendedDepartment)
      : doctors;

    // Check for specific queries
    const askedAboutFees = lowerInput.includes('fee') || 
                          lowerInput.includes('price') || 
                          lowerInput.includes('cost');
    
    const askedForCount = lowerInput.includes('how many') || 
                         lowerInput.includes('number of');

    const askedForAvailability = lowerInput.includes('available') || 
                               lowerInput.includes('schedule') ||
                               lowerInput.includes('timing');

    return { 
      recommendedDoctors, 
      recommendedDepartment, 
      askedAboutFees, 
      askedForCount,
      askedForAvailability
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      text: input.replace(/\n/g, "<br/>"),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Check for medication query
      const isMedicationQuery = Object.keys(commonMedications).some(condition => 
        input.toLowerCase().includes(condition.toLowerCase())
      );

      if (isMedicationQuery) {
        const condition = Object.keys(commonMedications).find(cond => 
          input.toLowerCase().includes(cond.toLowerCase())
        );
        
        const medicationInfo = commonMedications[condition];
        const responseText = `For ${condition}, common medication is ${medicationInfo}. \n\n*Remember:* Always consult with your doctor before taking any medication, especially if you have existing conditions or are taking other medicines.`;
        
        setMessages(prev => [...prev, {
          text: responseText,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }]);
        
        return;
      }

      // Handle doctor-related queries
      const isDoctorQuery = input.toLowerCase().includes('doctor') || 
                          input.toLowerCase().includes('specialist') ||
                          input.toLowerCase().includes('physician') ||
                          Object.keys(departmentKeywords).some(dept => 
                            input.toLowerCase().includes(dept.toLowerCase())) ||
                          doctors.some(doctor => 
                            input.toLowerCase().includes(doctor.department.toLowerCase()) ||
                            input.toLowerCase().includes(doctor.fullName.toLowerCase())
                          );

      if (isDoctorQuery) {
        // Ensure we have the latest doctor data before showing results
        if (!isRefreshingDoctors) {
          await fetchDoctors();
        }

        let { recommendedDoctors, recommendedDepartment, askedAboutFees, askedForCount, askedForAvailability } = getRecommendedDoctors(input);
        
        let responseText = '';
        
        if (recommendedDoctors.length === 0) {
          responseText = recommendedDepartment 
            ? `We currently don't have any active ${recommendedDepartment} specialists. Here are all our available doctors:`
            : "I couldn't find any doctors matching your needs. Here are all our available doctors:";
          recommendedDoctors = doctors;
        } else if (askedForCount) {
          responseText = recommendedDepartment 
            ? `We have ${recommendedDoctors.length} active ${recommendedDepartment} specialists available.`
            : `We have ${recommendedDoctors.length} active doctors available.`;
          
          if (recommendedDepartment) {
            responseText += ` Here they are:`;
          }
        } else {
          responseText = recommendedDepartment 
            ? `For "${input}", I recommend these ${recommendedDepartment} specialists:`
            : "Here are our available doctors:";
        }

        // Format doctor information
        let doctorInfo = recommendedDoctors.map(doctor => {
          let info = `**${doctor.fullName || 'Name not available'}**  
          - **Specialty**: ${doctor.department || 'Not specified'}  
          - **Qualifications**: ${doctor.degree || 'Not specified'}  
          - **Status**: ${doctor.status || 'Availability unknown'}`;

          // Always show consultation fee
          info += `\n  - **Consultation Fee**: Rs. ${(doctor.fees || 0).toFixed(2)}`;

          // Enhanced availability information
          if (askedForAvailability) {
            info += `\n  - **Weekday Hours**: ${doctor.shiftStartTime || 'Not specified'} to ${doctor.shiftEndTime || 'Not specified'}`;
            info += `\n  - **Weekend Hours**: ${doctor.weekendStartTime || 'Not specified'} to ${doctor.weekendEndTime || 'Not specified'}`;
          } else {
            info += `\n  - **Availability**: ${doctor.shiftStartTime || 'Not specified'} to ${doctor.shiftEndTime || 'Not specified'} (Weekdays), ${doctor.weekendStartTime || 'Not specified'} to ${doctor.weekendEndTime || 'Not specified'} (Weekends)`;
          }

          // Contact information
          info += `\n  - **Contact**: ${doctor.phoneNumber || 'Contact not available'}`;

          return info;
        }).join('\n\n');

     
        const refreshText = "";

        setMessages(prev => [...prev, {
          text: `${responseText}\n\n${doctorInfo}${refreshText}`,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }]);
      } else {
        // For general medical questions, use Gemini API
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are a medical assistant chatbot. Provide helpful, accurate medical information in a professional but friendly tone. 
                If the question is about symptoms or conditions, first identify the most relevant medical specialty from these options: 
                ${Object.keys(departmentKeywords).join(', ')}.
                Then provide concise but thorough information, and recommend consulting a specialist if needed.
                For medication questions, always remind users to consult their doctor before taking any medication.
                If the question is not medical-related, politely explain you can only answer health-related questions.
                
                Question: ${input}`
              }]
            }]
          })
        });

        const data = await response.json();
        let aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "I'm sorry, I couldn't process your request. Please try again.";

        // Check if the response suggests a specialist
        const suggestedDepartment = Object.keys(departmentKeywords).find(dept => 
          aiResponse.toLowerCase().includes(dept.toLowerCase())
        );
        
        if (suggestedDepartment) {
          const specialists = doctors.filter(doctor => 
            doctor.department === suggestedDepartment && doctor.status === 'Active'
          );
          
          if (specialists.length > 0) {
            aiResponse += `\n\nWe have ${specialists.length} active ${suggestedDepartment} specialists available:\n`;
            aiResponse += specialists.map(doctor => 
              `- ${doctor.fullName} (${doctor.degree}) - Fee: Rs. ${doctor.fees.toFixed(2)} - Contact: ${doctor.phoneNumber}`
            ).join('\n');
          }
        }

        setMessages(prev => [...prev, {
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "Sorry, I encountered an error while processing your request.",
        sender: 'ai',
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = async (prompt) => {
    setInput(prompt);
    const event = { preventDefault: () => {} };
    await handleSubmit(event);
  };

  // Handle refresh button clicks
  useEffect(() => {
    const handleRefreshClick = () => refreshDoctors();
    window.addEventListener('refreshDoctors', handleRefreshClick);
    return () => window.removeEventListener('refreshDoctors', handleRefreshClick);
  }, []);

  return (
    <div className='main'>
      <div className='nav'>
        <p>Medical Assistant</p>
      </div>

      <div className='main-container'>
        {messages.length === 0 ? (
          <>
            <div className='greet'>
              <p><span>Hello, Patient.</span></p>
              <p>How may I assist today?</p>
            </div>

            <div className='cards'>
              <div className='card' onClick={() => handleQuickPrompt("I have chest pain, recommend a cardiologist")}>
                <p>I have chest pain, recommend a cardiologist</p>
                <div className='card-icon'><RiStethoscopeFill /></div>
              </div>

              <div className='card' onClick={() => handleQuickPrompt("How many Neurology specialists are available?")}>
                <p>How many Neurology specialists are available?</p>
                <div className='card-icon'><FaListUl /></div>
              </div>

              <div className='card' onClick={() => handleQuickPrompt("What can I take for back bone pain?")}>
                <p>What can I take for back bone pain?</p>
                <div className='card-icon'><GiMedicines /></div>
              </div>
            </div>
          </>
        ) : (
          <div className='chat-container'>
            <div className='chat-messages'>
              {messages.map((message, index) => (
                <div key={index} className={`chat-bubble ${message.sender}`}>
                  <div className="avatar">
                    {message.sender === 'user'
                      ? <img 
                          src={userImage} 
                          alt="User" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = defaultUser;
                          }} 
                        />
                      : <span className="ai-icon"><FaRobot /></span>
                    }
                  </div>
                  <div className="bubble-content">
                    {message.sender === 'ai' ? (
                      <div className="message-text markdown">
                        <ReactMarkdown>{message.text}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="message-text" dangerouslySetInnerHTML={{ __html: message.text }} />
                    )}
                    <div className="message-timestamp">
                      {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}

              {loading && (
                <div className='chat-bubble ai'>
                  <div className="avatar"><span className="ai-icon"><FaRobot /></span></div>
                  <div className="bubble-content typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        <div className='main-bottom'>
          <form onSubmit={handleSubmit} className='search-box'>
            <input 
              type="text" 
              placeholder="Describe your symptoms or ask about doctors..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
            <div>
              <button type="submit"><LuSend /></button>
            </div>
          </form>
          <p className='bottom-info'>
            This is a medical assistant chatbot. For emergencies, please contact your local emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;