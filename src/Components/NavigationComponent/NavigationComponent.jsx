import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationComponent.css';

import MenuLink from '../MenuLink/MenuLink';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logo from "../../images/logo/logo.png";
import { IoLogOutOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


import userImage from "../../images/testimonials/patient.jpg"; // Placeholder for user image

function NavigationComponent() {


  // State to check if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to hold user data
  const [userData, setUserData] = useState({
    name: '',
    image: null
  });


  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const storedUser = JSON.parse(localStorage.getItem('userData') || '{}');
      setUserData({
        name: storedUser.name || 'John Doe', // Default name if none provided
        image: storedUser.image || userImage // Use default image if none provided
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    setUserData({ name: '', image: null });
    navigate('/');
  };

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <Navbar bg="light" expand="lg" data-bs-theme="light" className="Navbar">
      <Container>
        <Navbar.Brand href="#home" className="img">
          <img src={logo} alt="website logo" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-4">
            <MenuLink linkName="Home" url="/" />
            <MenuLink linkName="About" url="/about" />
            <MenuLink linkName="Service" url="/service" />
            <MenuLink linkName="Department" url="/department" />
            <MenuLink linkName="Doctors" url="/doctors" />
            <MenuLink linkName="Contact" url="/contact" />
            
            {isLoggedIn ? (
              <DropdownButton align="end"
                title={
                  <div className="d-flex align-items-center gap-2">
                    {userData.image ? (
                      <Image  src={userData.image}  roundedCircle  width="42" height="42" className="user-avatar" />
                    ) : (
                      <FaUserCircle size={28} className="text-primary" />
                    )}
                    <span className="d-none d-lg-inline">{userData.name}</span>
                  </div>
                }
                id="user-dropdown"
                className="user-dropdown"
              >
                <Dropdown.Item as={Link} to="/myProfile" onClick={handleClick}> My Profile </Dropdown.Item>
                <Dropdown.Item as={Link} to="/myAppointment" onClick={handleClick}>My Appointments</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger"> <IoLogOutOutline className="me-2" /> Logout</Dropdown.Item>
              </DropdownButton>
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