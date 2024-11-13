import React, { useEffect } from 'react';

import './HeaderContent.css'
import DetailsComponent from '../DetailsComponent/DetailsComponent'
import NavigationComponent from '../NavigationComponent/NavigationComponent'


function HeaderContent() {

    useEffect(() => {
        const scrollFunction = () => {
    
          const navbar = document.getElementById('navbar');
          const details = document.getElementById('details');
    
          if (window.scrollY > 30) {
            navbar.style.top = '0';
            details.style.top = '-40px'; 
          } else {
            navbar.style.top = '40px';
            details.style.top = '0'; 
          }
        };
    
        window.addEventListener('scroll', scrollFunction);
        return () => window.removeEventListener('scroll', scrollFunction);
      }, []);

  return (
    <>

      <div id="details">
        <DetailsComponent />
      </div>

      <div id="navbar">
         <NavigationComponent/>
      </div>

    </>
  )
}

export default HeaderContent