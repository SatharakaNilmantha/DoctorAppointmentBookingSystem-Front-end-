import React, { useEffect, useState ,useRef } from 'react';

import { GiDrippingTube } from "react-icons/gi";
import { FaPumpMedical ,FaHeartCirclePlus,FaUserDoctor  } from "react-icons/fa6";
import { FaHospitalUser,FaAward } from "react-icons/fa";
import { ImLab } from "react-icons/im";



import Row from 'react-bootstrap/Row';


import AboutImg from '../../images/about.jpg'
import './AboutSection.css'


function AboutSection() {

  // State to store the current progress and whether animation should run 
  const [progressValues, setProgressValues] = useState([0, 0, 0, 0]);  // Single array state for all progress values
  const [isAnimating, setIsAnimating] = useState(false);

  // Target values for each section
  const targetValues = [85, 15, 12, 160];

  // Reference for the component
  const progressDialRef = useRef(null); 

  


  // useEffect to handle the progress animation
  useEffect(() => {
      if (isAnimating) {
        const interval = setInterval(() => {
          setProgressValues((prevValues) => {
              // Check and update each progress value individually
              return prevValues.map((value, index) => {
                  if (value >= targetValues[index]) {
                      return targetValues[index]; // Stop at the target value for each section
                  }
                  return value + 1; // Increase progress by 1% for each section
              });
          });
        },20); // Update every 20ms

          // Cleanup interval when animation stops
          return () => clearInterval(interval);
      }
  }, [isAnimating, targetValues]);



   // Handle scroll event with IntersectionObserver to trigger animation
   useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            // If the component is in view, start the animation
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setProgressValues([0, 0, 0, 0]); // Reset progress; // Reset progress to 0
                    setIsAnimating(true); // Start animation
                } else {
                    setIsAnimating(false); // Stop animation if out of view
                }
            });
        },
        { threshold: 0.5 } // Trigger when 50% of the component is in view
    );

    if (progressDialRef.current) {
        observer.observe(progressDialRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
        if (progressDialRef.current) {
            observer.unobserve(progressDialRef.current);
        }
    };
}, []);

  return (
   <> 

{/* -------------------------About us section1 --------------------------------------------------- */}

    <div className='cont1'>
      <div className='aboutpart1'>
       
        <p className='aboutimgs'><img className='aboutimg' src={AboutImg} alt="" /></p>

        <div >

           <h1 style={{color:'#2c4964', fontWeight:'800'}}>About Us</h1>
           <p style={{textAlign:'justify',color:'#444444'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
             Beatae alias rem libero numquam dolorum magni natus possimus. Dolorem facilis nulla blanditiis qui,
             placeat deserunt quas maxime iusto quos dignissimos ex. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Sunt incidunt possimus quibusdam, </p>

          
              <Row className='aboutpart2'>
                <div className='icon2'><GiDrippingTube /></div>
                <div>
                  <h3 style={{color:'#2c4964', fontWeight:'800'}}>Precision Testing for Accurate Diagnosis</h3>
                  <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos </p>
                </div>
              </Row>

              <Row className='aboutpart2'>
                <div className='icon2'><FaPumpMedical /></div>
                <div>
                  <h3 style={{color:'#2c4964', fontWeight:'800'}}>Trusted Results for Better Care</h3>
                  <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos  </p>
                </div>
              </Row>
              <Row className='aboutpart2 b'>
                <div className='icon2'><FaHeartCirclePlus /></div>
                <div>  
                  <h3 style={{color:'#2c4964', fontWeight:'800'}}>Precision Testing for Accurate Diagnosis</h3>
                  <p style={{textAlign:'justify',color:'#444444'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure odio atque deserunt eos  </p>
                  </div>
              </Row> 
        </div>
      </div>
    </div>


{/* -------------------------About us section2 --------------------------------------------------- */}

    <div className='cont2' ref={progressDialRef}>

       <div className='aboutpart3'>
        <h1 className='icon3'><FaUserDoctor /></h1>
        <p id='num'>{progressValues[0]}</p>
        <p className='word'>Doctors</p>
       </div>

       <div className='aboutpart3'>
        <h1 className='icon3'><FaHospitalUser /></h1>
        <p id='num'>{progressValues[1]}</p>
        <p className='word'>department</p>
       </div>

       <div className='aboutpart3'>
         <h1 className='icon3'><ImLab /></h1>
         <p id='num'>{progressValues[2]}</p>
         <p className='word'>Research Labs</p>
       </div>

       <div className='aboutpart3'>
         <h1 className='icon3'><FaAward /></h1>
         <p id='num'>{progressValues[3]}</p>
         <p className='word'>Awards</p>

       </div>
    </div>

   </>
  )
}

export default AboutSection