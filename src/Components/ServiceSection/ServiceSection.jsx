import React, { useEffect,useState } from 'react';



import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import './ServiceSection.css'
import Serviceimg1 from '../../images/service/service-1.jpg'
import Serviceimg2 from '../../images/service/service-2.jpg'
import Serviceimg3 from '../../images/service/service-3.jpg'
import Serviceimg4 from '../../images/service/service-4.jpg'
import Serviceimg5 from '../../images/service/service-8.jpg'
import Serviceimg6 from '../../images/service/service-6.jpg'


import Departmentimg1 from '../../images/Department/departments-1.jpg'
import Departmentimg2 from '../../images/Department/departments-2.jpg'
import Departmentimg3 from '../../images/Department/departments-3.jpg'
import Departmentimg4 from '../../images/Department/departments-4.jpg'
import Departmentimg5 from '../../images/Department/departments-5.jpg'


function ServiceSection() {

    const [activeTab, setActiveTab] = useState(1);
   
    const cardData = [
        {
          index : 1,
          imgSrc: Serviceimg1,
          title: "Child care",
          text: "This is the description for Card 1. It contains unique content and details."
        },
        {
          index : 2,
          imgSrc: Serviceimg2,
          title: "Personal Care",
          text: "This is the description for Card 2. It highlights different contact information."
        },
        {
          index : 3,
          imgSrc: Serviceimg3,
          title: "CT scan",
          text: "This is the description for Card 3. A longer and detailed card description."
        },
        {
          index : 4,
          imgSrc: Serviceimg4,
          title: "Joint replacement",
          text: "This is the description for Card 4. Interesting facts are included."
        },
        {
            index : 5,
            imgSrc: Serviceimg5,
            title: "Alzheimer's disease",
            text: "This is the description for Card 5. Interesting facts are included."
        },
        {   
            index : 6,
            imgSrc: Serviceimg6,
            title: "Examination & Diagnosis",
            text: "This is the description for Card 6. Interesting facts are included."
        }
      ];

     
  
      const departmentData = [
        {
          eventKey: 1,
          title: "Cardiology",
          description: "Qui laudantium consequatur laborum sit qui ad sapiente dila parde sonata raqer a videna mareta paulona marka",
          content: "Et nobis maiores eius. Voluptatibus ut enim blanditiis atque harum sint. Laborum eos ipsum ipsa odit magni. Incidunt hic ut molestiae aut qui. Est repellat minima eveniet eius et quis magni nihil. Consequatur dolorem quaerat quos qui similique accusamus nostrum rem vero",
          imgSrc: Departmentimg1,
        },
        {
          eventKey: 2,
          title: "Neurology",
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit quaerat perferendis aut",
          content: "Ea ipsum voluptatem consequatur quis est. Illum error ullam omnis quia et reiciendis sunt sunt est. Non aliquid repellendus itaque accusamus eius et velit ipsa voluptates. Optio nesciunt eaque beatae accusamus.dolorem quaerat quos qui similique accusamus nostrum rem vero",
          imgSrc: Departmentimg2,
        },
        {
          eventKey: 3,
          title :"Hepatology",
          description: "Eos voluptatibus quo. Odio similique illum id quidem non enim fuga. Qui natus non sunt dicta dolor et. In asperiores velit quaerat perferendis aut",
          content: "Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel dolorem quaerat quos qui similique accusamus nostrum rem vero",
          imgSrc: Departmentimg3,
        },
        {
          eventKey: 4,
          title: "Pediatrics",
          description: "Description for Pediatrics goes here  Odio similique illum id quidem non enim fuga",
          content: "Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel dolorem quaerat quos qui similique accusamus nostrum rem vero",
          imgSrc: Departmentimg4,
        },
        {
          eventKey: 5,  
          title: "Eye Care",
          description: "Description for Eye Care goes here  Odio similique illum id quidem non enim fuga",
          content: "Exercitationem nostrum omnis. Ut reiciendis repudiandae minus. Omnis recusandae ut non quam ut quod eius qui. Ipsum quia odit vero atque qui quibusdam amet. Occaecati sed est sint aut vitae molestiae voluptate vel dolorem quaerat quos qui similique accusamus nostrum rem vero",
          imgSrc: Departmentimg5,
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
        <h1  className='text-with-underline'>Services</h1>
        <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
     </div>

    {/*--------------------------------------carg section -------------------------------------------------*/ }
     <div  className='cardSection '>
        <Row  md={3} className="g-5">
        {cardData.map((card) => (
            <Col  key={card.index}>
            <Card className='cardStyle scroll-animation'>
                <Card.Img className='imgstyle' variant="top" src={card.imgSrc} alt={card.title} />
                <Card.Body>
                <Card.Title style={{ color: '#2c4964', fontWeight: '800' , fontSize:'30px'}}>{card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </div>

     {/*--------------------------------------Department section -------------------------------------------------*/ }
    <div className='depsection'>
        <div className='scroll-animation'>
            <h1  className='text-with-underline'>Department</h1>
            <p style={{textAlign:'center',marginTop:'30px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus </p>
        </div>
        
        <div className='tabSection scroll-animation'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
        <Row className='minimize'>
            <Col sm={2} >
            <Nav variant="pills" className="flex-column linksec">
            {departmentData.map(department => (
                <Nav.Item>
                <Nav.Link eventKey={String(department.eventKey)}>{department.title}</Nav.Link>
                </Nav.Item>
            ))} 
            </Nav>
            </Col>
            <Col sm={10}>
            {departmentData.map(department => (
            <Tab.Content>
                <Tab.Pane eventKey={String(department.eventKey)}>
                <div className='Pane'>
                    <div className='aboutdep'>
                        <h2 style={{ fontWeight:'600' , color:'#2c4964'}}>{department.title}</h2>
                        <p style={{ marginTop:'20px ' ,color:'#444444 ', fontSize:'18px'}}><em>{department.description}</em></p>
                        <p style={{ marginTop:'20px ' ,color:'#444444' ,  fontSize:'18px'}}>{department.content}</p>
                    </div>
                    <div><img className='imgdep' src={department.imgSrc} alt={department.description} /></div>
                    </div>
                </Tab.Pane>
            </Tab.Content>
            ))} 
            </Col>
        </Row>
        </Tab.Container>
        </div>
     </div>   
  </>
  )
}

export default ServiceSection