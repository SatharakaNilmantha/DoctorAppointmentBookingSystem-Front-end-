import React, { useEffect} from 'react';
import './AboutPage.css'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import BodyContent from '../../Components/BoadyContent/BodyContent'
import AboutSection from '../../Components/AboutSection/AboutSection'
import FooterContent from '../../Components/FooterContent/FooterContent'


import AboutImg1 from '../../images/about/about-1.jpg'
import AboutImg2 from '../../images/about/about-2.jpg'
import AboutImg3 from '../../images/about/about-3.jpg'
import AboutImg4 from '../../images/about/about-4.jpg'

import img1 from '../../images/about/1.png'
import img2 from '../../images/about/2.png'
import img3 from '../../images/about/3.png'
import img4 from '../../images/about/4.png'
import img5 from '../../images/about/5.png'
import img6 from '../../images/about/6.png'

function AboutPage() {

//----------------------------------scroll direction code ------------------------------------//

// IntersectionObserver to trigger animation when elements come into the viewport
useEffect(() => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-up');
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, {
    threshold: 0.1 // Trigger when 10% of the element is in the viewport
  });

  // Observe all the elements with the 'scroll-animation' class
  const animatedDivs = document.querySelectorAll('.scroll-animation');

  animatedDivs.forEach(div => {observer.observe(div);});
  
  return () => {
    observer.disconnect(); // Clean up observer on component unmount
  };
   }, []);




  return (
    <>
      <HeaderContent/>

      <BodyContent>
        {/* -------------------------About us section1 & section1 --------------------------------------------------- */}
          <div id='AboutSection'><AboutSection/></div>

        {/* -------------------------About us section3 --------------------------------------------------- */}
          <div className='cont3'>
        <div className='aboutpart4 scroll-animation duration-3'>
          <p><img src={AboutImg1} alt="" /></p>
          <h4 style={{ color: '#2c4964', fontWeight: '800' }}>Healthcare for Kids</h4>
          <p style={{ color: '#444444',lineHeight: '30px' }}>Voluptate aperiam esse possimus maxime repellendus te aperiam esse possimus.</p>
        </div>

        <div className='aboutpart4 scroll-animation duration-1'>
          <p><img src={AboutImg2} alt="" /></p>
          <h4 style={{ color: '#2c4964', fontWeight: '800' }}>Medical Counseling</h4>
          <p style={{ color: '#444444', lineHeight: '30px'  }}>Voluptate aperiam esse possimus maxime repellendus te aperiam esse possimus.</p>
        </div>

        <div className='aboutpart4 scroll-animation duration-1'>
          <p><img src={AboutImg3} alt="" /></p>
          <h4 style={{ color: '#2c4964', fontWeight: '800' }}>Modern Equipment</h4>
          <p style={{ color: '#444444',lineHeight: '30px' }}>Voluptate aperiam esse possimus maxime repellendus te aperiam esse possimus.</p>
        </div>

        <div className='aboutpart4 scroll-animation duration-3'>
          <p><img src={AboutImg4} alt="" /></p>
          <h4 style={{ color: '#2c4964', fontWeight: '800' }}>Qualified Doctors</h4>
          <p style={{ color: '#444444' ,lineHeight: '30px'}}>Voluptate aperiam esse possimus maxime repellendus te aperiam esse possimus.</p>
        </div>
          </div>

        {/* -------------------------About us section4 --------------------------------------------------- */}
          <div className='cont4 scroll-animation duration-1'>
        <div className='titlesection '>
          <h1>Our Doctors <br /> Achievements</h1>
        </div>

        <div className='awardsection '>
          <p><img src={img1} alt="" /></p>
          <p><img src={img2} alt="" /></p>
          <p><img src={img5} alt="" /></p>
          <p className='p1'><img src={img3} alt="" /></p>
          <p className='p1'><img src={img6} alt="" /></p>
          <p className='p1'><img src={img4} alt="" /></p>
        </div>
          </div>
     </BodyContent>

     <FooterContent/>
     
     
    </>
  )
}

export default AboutPage