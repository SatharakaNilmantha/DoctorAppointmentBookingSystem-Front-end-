import React from 'react'
import './SubSection.css'

import Accordion from 'react-bootstrap/Accordion';






function SubSection() {
  return (
    
  <>
    <div className='quesionSection'>

        {/*--------------------------------------title section -------------------------------------------------*/ }
        <div className='scroll-animation'>
            <h1  className='text-with-underline2'>Frequently Asked Questions</h1>
            <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
        </div>

        <div className='AccordionSection'>
        <Accordion  style={{ color: "#444444"}} >
            <Accordion.Item eventKey="0" className='scroll-animation'>
                <Accordion.Header><h5>Non consectetur a erat nam at lectus urna duis?</h5></Accordion.Header>
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
                <Accordion.Header><h5>Feugiat scelerisque varius morbi enim nunc faucibus?</h5></Accordion.Header>
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
                <Accordion.Header><h5>Dolor sit amet consectetur adipiscing elit pellentesque?</h5></Accordion.Header>
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
                <Accordion.Header><h5>Tempus quam pellentesque nec nam aliquam sem et tortor?</h5></Accordion.Header>
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

    <div>

    </div>
  </>
  )
}

export default SubSection