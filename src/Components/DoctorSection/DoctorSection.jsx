import React, { useEffect } from 'react';
import './DoctorSection.css'
import { Link } from 'react-router-dom';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import { BsTwitterX ,BsInstagram ,BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";

import doctor1 from "../../images/doctors/doctors-1.jpg";
import doctor2 from "../../images/doctors/doctors-2.jpg";
import doctor3 from "../../images/doctors/doctors-3.jpg";
import doctor4 from "../../images/doctors/doctors-4.jpg";
import doctor5 from "../../images/doctors/doctors-5.jpg";
import doctor6 from "../../images/doctors/doctors-6.jpg";







function DoctorSection() {

    const Doctors = [
        {
          eventKey: "Dental",
          Name: "Walter White",
          title: "Chief Medical Officer",
          description: "Qui laudantium consequatur laborum sit qui ad sapiente dila parde ",
          imgSrc:doctor1
        },
        {
          eventKey: "Cardialogy",
          Name:"Sarah Jhonson",
          title: "Cardialogy",
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. ",
          imgSrc: doctor2
        },
        {
          eventKey: "Neurology",
          Name:"William Anderson",
          title :"Neurology" ,
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt.",
          imgSrc: doctor3
        },
        {
          eventKey: "Pediatrics",
          Name:"Amanda Jepson",
          title: "Pediatrics",
          description: "Description for Pediatrics goes here  Odio similique illum id quidem non enim fuga",
          imgSrc: doctor4
        },
        {
          eventKey:  "Neurology" ,  
          Name:"HarissonThomasn",
          title: "Neurology" ,
          description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga",
          imgSrc: doctor5
        },

        {
            eventKey:  "Pediatrics",  
            Name:"HarissonThomas",
            title:  "Pediatrics",
            description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga",
            imgSrc: doctor6
          },

        ];


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
        <h1  className='text-with-underline1'>Doctors</h1>
        <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
     </div>

    {/*--------------------------------------card section -------------------------------------------------*/ }
    <div className='cardSection1 '>

      <Tabs defaultActiveKey="All_Department" id="fill-tab-example" className="mb-3 scroll-animation" fill>
        <Tab eventKey="All_Department" title="All Department">
            <Row xs={1} md={2} className="cards ">
            {Doctors.map((doctor) => (
                <Col key={doctor.Name} className='scroll-animation'>
                <Card className="card1">
                    <Card.Img src={doctor.imgSrc} className="image" />
                    <Card.Body style={{ textAlign: "left" }}>
                    <h4 style={{ margin: "0px",padding:"0px" ,fontWeight: 800 ,color: "#2c4964" }}>{doctor.Name}</h4>
                    <p style={{ margin: "0px" ,padding:"0px",color: "#444444",fontWeight: 600 }}>{doctor.title}</p>
                    <hr style={{ width:"50px"}} /> 
                    <p style={{color: "#444444" }}>{doctor.description}</p>
                    <div className='iconpart'>
                      <span className='iconsvg'><BsTwitterX /></span>
                      <span className='iconsvg'><BsFacebook /></span>
                      <span className='iconsvg'><BsInstagram /></span>
                      <span className='iconsvg'><FaLinkedin /></span>
                      <span><Link to="/appointment" className="book-button1">Appointment</Link></span>
                    </div>
                    </Card.Body>
                </Card>
                <br />
                </Col>
            ))}
            </Row>
        </Tab>

        {["Dental", "Cardialogy", "Neurology", "Pediatrics"].map((department) => (
        <Tab key={department} eventKey={department} title={department}>
            <Row xs={1} md={2} className="cards">
                {Doctors.filter((doctor) => doctor.eventKey === department).map((doctor) => (
                <Col key={doctor.Name}>
                    <Card className="card1">
                    <Card.Img src={doctor.imgSrc} className="image" />
                    <Card.Body style={{ textAlign: "left" }}>
                    <h4 style={{ margin: "0px",padding:"0px" ,fontWeight: 800 ,color: "#2c4964" }}>{doctor.Name}</h4>
                    <p style={{ margin: "0px" ,padding:"0px",color: "#444444",fontWeight: 600  }}>{doctor.title}</p>
                    <hr style={{ width:"50px"}} /> 
                    <p style={{color: "#444444" }}>{doctor.description}</p>

                    <div className='iconpart'>
                      <span className='iconsvg'><BsTwitterX /></span>
                      <span className='iconsvg'><BsFacebook /></span>
                      <span className='iconsvg'><BsInstagram /></span>
                      <span className='iconsvg'><FaLinkedin /></span>
                      <span><Link to="/appointment" className="book-button1">Appointment</Link></span>
                    </div>
                    </Card.Body>
                    </Card>
                    <br />
                </Col>
                ))}
            </Row>
        </Tab>
        ))}

     </Tabs>

    </div>
    
    </>
  )
}

export default DoctorSection