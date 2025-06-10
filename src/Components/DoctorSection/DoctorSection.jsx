import React, { useEffect, useState } from 'react';
import './DoctorSection.css'
import { Link } from 'react-router-dom';
import axios from "axios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { BsTwitterX, BsInstagram, BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";

function DoctorSection() {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/doctors/getDoctor");
                // Filter doctors with status = "Active"
                const activeDoctors = response.data.filter(doctor => doctor.status === "Active");
                setDoctors(activeDoctors);
            } catch (err) {
                setError(err.message);
            } 
        };

        fetchDoctors();
    }, []);

    // Get unique departments from active doctors
    const uniqueDepartments = Array.from(new Set(doctors.map(doctor => doctor.department)));

    // IntersectionObserver for scroll animation
    useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-up');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        const animatedDivs = document.querySelectorAll('.scroll-animation');
        animatedDivs.forEach(div => { observer.observe(div); });

        return () => {
            observer.disconnect();
        };
    }, [doctors]); // Re-run when doctors data changes


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {/* Title section */}
            <div className='scroll-animation'>
                <h1 className='text-with-underline1'>Doctors</h1>
                <p style={{ textAlign: 'center', marginTop: '30px' }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aspernatur qui molestiae minus at soluta quaerat, officiis minima placeat nisi voluptatibus
                </p>
            </div>

            {/* Card section */}
            <div className='cardSection1 '>
                <Tabs defaultActiveKey="All_Department" id="fill-tab-example" className="mb-3 scroll-animation" fill>
                    <Tab eventKey="All_Department" title="All Department">
                        <Row xs={1} md={2} className="cards ">
                            {doctors.map((doctor) => (
                                <Col key={doctor.doctorId} className='scroll-animation'>
                                    <Card className="card1">
                                        <Card.Img src={`http://localhost:8080/api/doctors/image/${doctor.doctorId}`} className="image" />
                                        <Card.Body style={{ textAlign: "left" }}>
                                            <h4 style={{ margin: "0px", padding: "0px", fontWeight: 800, color: "#2c4964" }}>{doctor.fullName}</h4>
                                            <p style={{ margin: "0px", padding: "0px", color: "#444444", fontWeight: 600 }}>{doctor.title}</p>
                                            <hr style={{ width: "50px" }} />
                                            <p style={{ color: "#444444" }}>{doctor.description}</p>
                                            <div className='iconpart'>
                                                <span className='iconsvg'><BsTwitterX /></span>
                                                <span className='iconsvg'><BsFacebook /></span>
                                                <span className='iconsvg'><BsInstagram /></span>
                                                <span className='iconsvg'><FaLinkedin /></span>
                                                <span><Link to={`/appointment/${doctor.doctorId}`} className="book-button1">Appointment</Link></span>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <br />
                                </Col>
                            ))}
                        </Row>
                    </Tab>

                    {uniqueDepartments.map((department) => (
                        <Tab key={department} eventKey={department.replace(/\s+/g, '_')} title={department}>
                            <Row xs={1} md={2} className="cards">
                                {doctors
                                    .filter((doctor) => doctor.department === department)
                                    .map((doctor) => (
                                        <Col key={doctor.doctorId} className='scroll-animation'>
                                            <Card className="card1">
                                                <Card.Img src={`http://localhost:8080/api/doctors/image/${doctor.doctorId}`} className="image" />
                                                <Card.Body style={{ textAlign: "left" }}>
                                                    <h4 style={{ margin: "0px", padding: "0px", fontWeight: 800, color: "#2c4964" }}>{doctor.fullName}</h4>
                                                    <p style={{ margin: "0px", padding: "0px", color: "#444444", fontWeight: 600 }}>{doctor.title}</p>
                                                    <hr style={{ width: "50px" }} />
                                                    <p style={{ color: "#444444" }}>{doctor.description}</p>
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
    );
}

export default DoctorSection;