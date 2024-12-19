import React, { useState ,useEffect } from 'react';
import './SubSection.css'

import Accordion from 'react-bootstrap/Accordion';

//----------------------------------Testimonialsection-----------------------------------------------------------------//
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Card from 'react-bootstrap/Card';
import { CardTitle } from 'react-bootstrap';

import test1 from '../../images/testimonials/testimonials-1.jpg';
import test2 from '../../images/testimonials/testimonials-2.jpg';
import test3 from '../../images/testimonials/testimonials-3.jpg';
import test4 from '../../images/testimonials/testimonials-4.jpg';
import test5 from '../../images/testimonials/testimonials-5.jpg';

import { FaStar } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

//----------------------------------------gallery section------------------------------------------------------------//   

import gallery1 from "../../images/gallery/gallery-1.jpg"
import gallery2 from "../../images/gallery/gallery-2.jpg"
import gallery3 from "../../images/gallery/gallery-3.jpg"
import gallery4 from "../../images/gallery/gallery-4.jpg"
import gallery5 from "../../images/gallery/gallery-5.jpg"
import gallery6 from "../../images/gallery/gallery-6.jpg"
import gallery7 from "../../images/gallery/gallery-7.jpg"
import gallery8 from "../../images/gallery/gallery-8.jpg"



function SubSection() {


    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1, // Display only one slide at a time
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
      };

    const Comments = [
             {
               eventKey: 1,
               Name: "Walter White",
               title: "Chief Medical Officer",
               description: "Qui laudantium consequatur dio similique illum id quidem non enim fug. laborum sit qui ad sapiente dila parde ,for Eye Care goes here  Odim non efor Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc:test1
             },
             {
               eventKey: 2,
               Name:"Sarah Jhonson",
               title: "Cardialogy",
               description: "Eos voluptatibus quo.dio similique illum id quidem non enim fugOdio similique illum id quidem non enim fuga. for Eye Care goes here  Odio similique ill for Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc: test2
             },
             {
               eventKey: 3,
               Name:"William Anderson",
               title :"Neurology" ,
               description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt.dio similique illum id quidem non enim for Eye Care goes here  Odio similique illum id quidem non e fug",
               imgSrc: test3
             },
             {
               eventKey: 4,
               Name:"Amanda Jepson",
               title: "Pediatrics",
               description: "Description for Pediatrics goes here  Odio similique illum id quidem non enim fuga.dio similique illum id quidem non enim fug for Eye Care goes here  Odio similique illum id quidem non e",
               imgSrc: test4
             },
             {
               eventKey: 5 ,  
               Name:"HarissonThomasn",
               title: "Neurology" ,
               description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga.dio similique illum id for Eye Care goes here  Odio similique illum id quidem non e quidem non enim fug",
               imgSrc: test5
             },

     
      ];
     
      
//----------------------------------------gallery section------------------------------------------------------------//    
    
    const images = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, gallery7, gallery8];

        const [isOpen, setIsOpen] = useState(false);  // For opening and closing modal
        const [currentImageIndex, setCurrentImageIndex] = useState(0);  // For tracking the current image in the carousel
      
        // Function to open the modal with the clicked image
        const openModal = (index) => {
          setCurrentImageIndex(index);
          setIsOpen(true);
        };
      
        // Function to close the modal
        const closeModal = () => {
          setIsOpen(false);
        };
      
        // Function to go to the next image
        const nextImage = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        };
          // Function to go to the previous image
    const prevImage = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      };


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

 {/*----------------------------------quesionSection-------------------------------------------------------------------*/} 
    <div className='quesionSection'>
        {/*--------------------------------------title section -------------------------------------------------*/ }
        <div className='scroll-animation'>
            <h1  className='text-with-underline2'>Frequently Asked Questions</h1>
            <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
        </div>

        <div className='AccordionSection'>
        <Accordion   >
            <Accordion.Item eventKey="0" className='scroll-animation'>
                <Accordion.Header><h5 style={{ color: "#444444" }}>Non consectetur a erat nam at lectus urna duis?</h5></Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
            <br />
            <Accordion.Item eventKey="1" className='scroll-animation'>
                <Accordion.Header><h5 style={{ color: "#444444" }}>Feugiat scelerisque varius morbi enim nunc faucibus?</h5></Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <br />
            <Accordion.Item eventKey="2" className='scroll-animation'>
                <Accordion.Header><h5 style={{ color: "#444444" }}>Dolor sit amet consectetur adipiscing elit pellentesque?</h5></Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <br />
            <Accordion.Item eventKey="3" className='scroll-animation'>
                <Accordion.Header><h5 style={{ color: "#444444" }}>Tempus quam pellentesque nec nam aliquam sem et tortor?</h5></Accordion.Header>
                <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. 
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </div>
    </div>

{/*----------------------------------Testimonialsection-----------------------------------------------------------------*/}
    <div className='Testimonialsection scroll-animation'>
        <div style={{ textAlign:"justify" ,paddingRight:"20px" }}>
           <h2 style={{ color: "#2c4964",fontWeight: 800 }}>Testimonials</h2>
           <p style={{   fontSize: "18px", color: "#444444",marginTop:"10px"}}>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        </div>

        <div className="slidesection ">
        <Slider {...settings}>

            {Comments.map( Comment =>(
            <div key={Comment.Name}>
            <Card className="slidecard"  style={{ border: "none" }}  >
                    
                    <div className="cardtitle">
                        <img src={Comment.imgSrc} className="pimg" />
                        <div className="pname">
                        <CardTitle style={{ margin: "0px" ,padding:"0px",color: "#2c4964",fontWeight: 600 }}>{Comment.Name}</CardTitle>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#444444"}}>{Comment.title}</p>
                        <p style={{ margin: "0px" ,padding:"0px",color: "#ffc107"}}><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p>
                        </div>
                    </div>
                    
                    <Card.Body>
                        <p style={{  fontSize: "18px" ,color: "#444444" ,textAlign:"justify" }}> <em> <span style={{fontSize: "25px",color: "#0283e658"}}><RiDoubleQuotesL /></span> {Comment.description} <span style={{ fontSize: "25px" ,color: "#0283e658"}}><RiDoubleQuotesR /></span> </em></p>
                    </Card.Body>
            </Card>
            </div>
            ))}
        </Slider>
        </div>
    </div>

{/*----------------------------------gallarysection---------------------------------------------------------------------*/}
  <div className="gallery-container">
      
    {/*--------------------------------------title section -------------------------------------------------*/ }
        <div className='scroll-animation'>
                <h1  className='text-with-underline2'>Gallery</h1>
                <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
        </div>

    {/*--------------------------------------gallery -------------------------------------------------*/ }  
        <div className="gallery-grid ">
            {images.map((image, index) => (
            <div className="gallery-item  scroll-animation " key={index} onClick={() => openModal(index)}>
                <img src={image} alt={`gallery-${index + 1}`} className="gallery-image" />
                dhhshdh
            </div>
            ))}
        </div>

        {/* Modal for Carousel */}
        {isOpen && (
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="carousel">
                <button className="prev" onClick={prevImage}>❮</button>
                <img src={images[currentImageIndex]} alt={`carousel-${currentImageIndex + 1}`} className="carousel-image" />
                <button className="next" onClick={nextImage}>❯</button>
                </div>
            </div>
            </div>
        )}

  </div>

  </>
  )
}

export default SubSection