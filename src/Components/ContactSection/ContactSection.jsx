import React, { useEffect } from 'react';
import './ContactSection.css'

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import { SlLocationPin } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";






function ContactSection() {
    
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
     {/*--------------------------------------title section -------------------------------------------------*/ }
        <div className='scroll-animation'>
            <h1  className='text-with-underline3'>Contact</h1>
            <p style={{textAlign:'center',marginTop:'30px',marginBottom:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
        </div>
       
        <div className='scroll-animation'><iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126582.79700551226!2d79.7044445972656!3d7.496970000000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2cf002348252f%3A0x5ebae604d6d30c8c!2sMedical%20Center!5e0!3m2!1sen!2slk!4v1734672449328!5m2!1sen!2slk" width="100%" height="350" style={{border:0}} loading="lazy" allowFullScreen="true" referrerPolicy="no-referrer" ></iframe></div>
       
    <div className='contactSection scroll-animation'>
        
        <div >
            <div className='section1'>
            <div ><p className='con_icon'><SlLocationPin /></p></div>
                <div style={{paddingLeft:'10px'}}>
                   <h4 style={{color:'#2c4964', fontWeight:'800'}}>Location</h4>
                    <p style={{textAlign:'justify',color:'#444444'}}>A108 Adam Street, New York, NY 535022</p>
                </div>
            </div>

            <div className='section1'>
              <div ><p className='con_icon'><FiPhoneCall /></p></div>
                <div style={{paddingLeft:'10px'}}>
                  <h4 style={{color:'#2c4964', fontWeight:'800'}}>Call Us</h4>
                  <p style={{textAlign:'justify',color:'#444444'}}>+1 5589 55488 55</p>
                </div>
            </div>

            <div className='section1'>
            <div ><p className='con_icon'><MdOutlineAttachEmail /></p></div>
                <div style={{paddingLeft:'10px'}}>
                  <h4 style={{color:'#2c4964', fontWeight:'800'}}>Email Us</h4>
                  <p style={{textAlign:'justify',color:'#444444'}}>Example@gmail.com</p>
                </div>
            </div>
        </div>
   <div>     
    <Form >
        <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail" >
            <Form.Control type="email" style={{height:'40px'}} placeholder="Your Email" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
            <Form.Control type="password" style={{height:'40px'}}  placeholder="Your Password" />
            </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1" >
        <Form.Control type="text" style={{height:'40px'}}  placeholder="Subject" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Control as="textarea"   rows={5} placeholder="Write your message here..." />
        </Form.Group>

        <p style={{textAlign:"center",marginTop:'50px'}}> <a href="#createAcount" className="send-button">Send Message</a></p>
        </Form>
        </div>  
    </div>   



   

    </>



  )
}

export default ContactSection