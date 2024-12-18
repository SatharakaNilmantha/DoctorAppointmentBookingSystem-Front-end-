import React from 'react'
import './NavigationComponent.css'

import MenuLink from '../MenuLink/MenuLink';
import { Navbar, Nav, Container } from 'react-bootstrap';

import logo from "../../images/logo/logo.png"


function NavigationComponent() {
  return (
    <Navbar bg="light" expand="lg" data-bs-theme="light" className="Navbar">
    <Container>
        <Navbar.Brand href="#home" className="img"><img src={logo} alt="website logo" /></Navbar.Brand>
        
        {/* This will display the hamburger icon on smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* Collapsible section for nav links */}
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto d-flex align-items-center gap-4"> {/* Added d-flex, align-items-center, and gap */}
           <MenuLink linkName="Home" url="/" />
           <MenuLink linkName="About" url="/about" />
           <MenuLink linkName="Service" url="/service" />
           <MenuLink linkName="Department" url="/department" />
           <MenuLink linkName="Doctors" url="/doctors" />
           <MenuLink linkName="Contact" url="#contact" />
           <a href="#createAcount" className="book-button">Create Acount</a>
        </Nav>
        </Navbar.Collapse>
    </Container>
    </Navbar>

  )
}

export default NavigationComponent