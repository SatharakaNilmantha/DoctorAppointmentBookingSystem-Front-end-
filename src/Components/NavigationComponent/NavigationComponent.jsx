import React from 'react'
import './NavigationComponent.css'

import MenuLink from '../MenuLink/MenuLink';
import { Navbar, Nav, Container } from 'react-bootstrap';


function NavigationComponent() {
  return (
    <Navbar bg="light" expand="lg" data-bs-theme="light" className="Navbar">
    <Container>
        <Navbar.Brand href="#home" className="icon">Navbar</Navbar.Brand>
        
        {/* This will display the hamburger icon on smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Collapsible section for nav links */}
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center gap-2"> {/* Added d-flex, align-items-center, and gap */}
            <Nav.Link><MenuLink linkName="Home" url="#home" /></Nav.Link>
            <Nav.Link><MenuLink linkName="About" url="#about" /></Nav.Link>
            <Nav.Link><MenuLink linkName="Service" url="#service" /></Nav.Link>
            <Nav.Link><MenuLink linkName="Department" url="#department" /></Nav.Link>
            <Nav.Link><MenuLink linkName="Contact" url="#contact" /></Nav.Link>
            <Nav.Link><MenuLink linkName="Login" url="#login" /></Nav.Link>
            <Nav.Link><a href="#makeanAppoinment" className="book-button">Make an Appointment</a></Nav.Link>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>

  )
}

export default NavigationComponent