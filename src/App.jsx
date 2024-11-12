// App.jsx

import React, { useEffect ,useRef  } from 'react';
import NavigationComponent from "./Components/NavigationComponent/NavigationComponent"
import DetailsComponent from "./Components/DetailsComponent/DetailsComponent"
import BodyComponent from "./Components/BoadyContent/BodyContent"
import './App.css';

function App() {

  // Ref for DetailsComponent to scroll into view
  const detailsRef = useRef(null);

  // Function to scroll to DetailsComponent
  const scrollToDetails = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    <div>
    
        <div id="details">
        <DetailsComponent />
      </div>

      <div id="navbar">
         <NavigationComponent/>
      </div>

     <BodyComponent/>
      <div style={{ padding: '15px 15px 2500px', fontSize: '30px' }}>
        <p><b>This example demonstrates how to slide down a navbar when the user starts to scroll the page.</b></p>
        <p>Scroll down this frame to see the effect!</p>
        <p>Scroll to the top to hide the navbar.</p>
        <p>Lorem ipsum dolor dummy text sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
}

export default App;
