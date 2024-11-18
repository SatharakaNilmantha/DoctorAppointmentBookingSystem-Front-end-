import React, { useEffect} from 'react';



import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';




import './ServiceSection.css'
import Serviceimg1 from '../../images/service/service-1.jpg'
import Serviceimg2 from '../../images/service/service-2.jpg'
import Serviceimg3 from '../../images/service/service-3.jpg'
import Serviceimg4 from '../../images/service/service-4.jpg'
import Serviceimg5 from '../../images/service/service-8.jpg'
import Serviceimg6 from '../../images/service/service-6.jpg'





function ServiceSection() {

    
   
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


  </>
  )
}

export default ServiceSection