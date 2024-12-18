import React from 'react'
import './DoctorSection.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function DoctorSection() {
  return (
    
    <>
    {/*--------------------------------------title section -------------------------------------------------*/ }
     <div className='scroll-animation'>
        <h1  className='text-with-underline1'>Doctors</h1>
        <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
     </div>

    {/*--------------------------------------card section -------------------------------------------------*/ }
    <div className='cardSection'>
        <Tabs defaultActiveKey="profile" id="fill-tab-example" className="mb-3 " fill>
        <Tab eventKey="home" title="Home">
            Tab content for Home
        </Tab>
        <Tab eventKey="profile" title="Profile">
            Tab content for Profile
        </Tab>
        <Tab eventKey="longer-tab" title="Loooonger Tab">
            Tab content for Loooonger Tab
        </Tab>
        <Tab eventKey="contact" title="Contact" >
            Tab content for Contact
        </Tab>
        </Tabs>
    </div>

    
    </>
  )
}

export default DoctorSection