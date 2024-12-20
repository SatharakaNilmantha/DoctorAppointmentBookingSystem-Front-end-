// App.jsx
import './App.css';

import HeaderContent from './Components/HeaderContent/HeaderContent'
import BodyContent from "./Components/BoadyContent/BodyContent"
import HeroSection   from './Components/HeroSection/HeroSection'
import AboutSection  from './Components/AboutSection/AboutSection'

import ServiceSection from './Components/ServiceSection/ServiceSection';
import DepartmentSection from './Components/DepartmentSection/DepartmentSection';
import DoctorSection from './Components/DoctorSection/DoctorSection';
import SubSection from './Components/SubSection/SubSection';
import ContactSection from './Components/ContactSection/ContactSection';

function App() {

  return (
    <div>
     <HeaderContent/>
     <BodyContent>
         <div><HeroSection/></div>
         <div><AboutSection/></div>
         <div><ServiceSection/></div>
         <div><DepartmentSection/></div>
         <div><DoctorSection/></div>
         <div><SubSection/></div>
         <div><ContactSection/></div>
     </BodyContent>
    </div>
  );
}

export default App;
