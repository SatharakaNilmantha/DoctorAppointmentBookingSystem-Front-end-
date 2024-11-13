import React from 'react'
import './HeroSection.css'


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaChevronRight ,FaHandHoldingHeart} from "react-icons/fa";
import { MdOutlineAddChart } from "react-icons/md";
import { FaGem } from "react-icons/fa";

import heroImage from "../../images/heroimg.jpg"


function HeroSection() {
  return (
    <>
      <div className='cont'>

        <img  src={heroImage} alt="" />

         <div className='title'> 
             <h1>WELCOME TO BOOKMYDOCTOR</h1>
             <h4>Your reliable, streamlined solution for effortlessly booking doctor appointments.</h4>
         </div>

        <div className='discription'>
           <h1 style={{ marginBottom:"40px"}}>Why Choose <br />BOOKMYDOCTOR?</h1>
           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
             Aspernatur non eius ullam beatae modi! Consequuntur sunt animi quisquam quidem,
             quos maxime quas incidunt ullam quis repellendus consectetur itaque velit ex.</p>
          <div style={{textAlign:"center", marginBottom:"20px"}}><button  className='button'>Learn More <FaChevronRight /></button></div>

        </div>  
        
            <Row className='rowcontent'>
              <Col xs={4}  className='discription2 P1' >
                <p className='icon1'><MdOutlineAddChart /></p>
                <h4 style={{marginTop:"40px"}}><b>Physical comfort is the same</b></h4>
                <p style={{marginTop:"20px"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur non eius ullam beatae modi!</p>
              </Col>
              <Col xs={4}   className='discription2 P1'>
                <p className='icon1'><FaGem /></p>
                <h4 style={{marginTop:"40px"}}><b>Easy and Convenient Care</b></h4>
                <p style={{marginTop:"20px"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur non eius ullam beatae modi! </p>
              </Col>

              <Col xs={4}  className='discription2 P3' >
                <p className='icon1'><FaHandHoldingHeart /></p>
                <h4 style={{marginTop:"40px"}}><b>Connecting You to Quality Care</b></h4>
                <p style={{marginTop:"20px"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur non eius ullam beatae modi!</p>
              </Col>
            </Row>
      
      </div>
    </>
  )
}

export default HeroSection