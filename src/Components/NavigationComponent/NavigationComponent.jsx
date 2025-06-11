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

import axios from 'axios';


import { FiBell } from 'react-icons/fi'; // Feather Bell Icon


function NavigationComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    image: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const patientId = localStorage.getItem('patientId');

    setIsLoggedIn(loggedIn);

    if (loggedIn && patientId) {
      // Get patient's name
      axios.get(`http://localhost:8080/api/patient/${patientId}`)
        .then(response => {
          const patient = response.data;
          setUserData(prev => ({
            ...prev,
            name: patient.fullName || 'Patient'
          }));
        })
        .catch(() => {
          setUserData(prev => ({
            ...prev,
            name: 'Patient'
          }));
        });

      // Get patient image separately
      axios.get(`http://localhost:8080/api/patient/image/${patientId}`, {
        responseType: 'blob'
      })
        .then(response => {
          const imageUrl = URL.createObjectURL(response.data);
          setUserData(prev => ({
            ...prev,
            image: imageUrl
          }));
        })
        .catch(() => {
          setUserData(prev => ({
            ...prev,
            image: null
          }));
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('patientId');
    setIsLoggedIn(false);
    setUserData({ name: '', image: null });
    navigate('/');
  };

  const handleClick = () => {
    window.scrollTo({ top: 0 });
  };

  const notificationCount = 2;

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
              <DropdownButton
                align="end"
                title={
                  <div className="d-flex align-items-center gap-2">
                    {userData.image ? (
                      <Image src={userData.image} roundedCircle width="42" height="42" className="user-avatar" />
                    ) : (
                      <FaUserCircle size={28} className="text-primary" />
                    )}
                    <span className="d-none d-lg-inline">{userData.name}</span>
                  </div>
                }
                id="user-dropdown"
                className="user-dropdown"
              >
                <Dropdown.Item as={Link} to="/myProfile" onClick={handleClick}>My Profile</Dropdown.Item>
                <Dropdown.Item as={Link} to="/upcomingAppointments" onClick={handleClick}>Upcoming Visits	</Dropdown.Item>
                <Dropdown.Item as={Link} to="/history" onClick={handleClick}>Appointment History</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  <IoLogOutOutline className="me-2" /> Logout
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Link to="/login" className="login-button">Create Account</Link>
            )}
          </Nav>
        </Navbar.Collapse>
        <Link to="/notifications" onClick={handleClick} className={`bell-container ${location.pathname === '/notifications' ? 'active' : ''}`}>
            <FiBell size={30} />
           {notificationCount > 0 && (
           <span className="notification-badge">{notificationCount}</span>
             )}
        </Link>
      </Container>
    </Navbar>
  );
}

export default NavigationComponent;
