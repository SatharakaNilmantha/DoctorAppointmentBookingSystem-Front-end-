import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationComponent.css';

import MenuLink from '../MenuLink/MenuLink';

import { Navbar, Nav, Container } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import logo from "../../images/logo/logo.png";

import { IoLogOutOutline } from "react-icons/io5";


function NavigationComponent() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track login status
  const navigate = useNavigate();   // Hook to navigate between pages

  // Checking the login status when the component mounts
  useEffect(() => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';   // Check login status from localStorage
      setIsLoggedIn(loggedIn);   // Update state based on the login status
     }, []);

  // Handle logout action
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');   // Remove login status from localStorage
    setIsLoggedIn(false);   // Update state to logged-out
    navigate('/');   // Redirect to home page after logout
  };


  function handleClick() {
    window.scrollTo({
      top: 0, // Scroll to the top
    });
  }

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
            <MenuLink linkName="Contact" url="/contact" />
            
            {/* Display Log Out button and dropdown if the user is logged in */}
            {isLoggedIn ? (
              <>
                <DropdownButton title="My Profile" className="custom-dropdown" >
                  <Dropdown.Item as="div" className="custom-dropdown-item"><Link to="/myProfile" style={{ textDecoration: 'none' }} onClick={handleClick}>My profile</Link></Dropdown.Item>
                  <Dropdown.Item as="div" className="custom-dropdown-item"><Link to="/myAppointment" style={{ textDecoration: 'none' }} onClick={handleClick}>My Appointments</Link></Dropdown.Item>
                  <Dropdown.Item as="div" onClick={handleLogout} className="custom-dropdown-item" style={{ color: 'red' }} >Log Out <span style={{ fontSize: '20px' }}><IoLogOutOutline /></span></Dropdown.Item>
                </DropdownButton>
              </>
            ) : (
              <Link to="/login" className="login-button">Create Account</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;
