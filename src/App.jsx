// App.jsx
import './App.css';

import HeaderContent from './Components/HeaderContent/HeaderContent'
import BodyComponent from "./Components/BoadyContent/BodyContent"
import HeroSection   from './Components/HeroSection/HeroSection'
import AboutSection  from './Components/AboutSection/AboutSection'

import ServiceSection from './Components/ServiceSection/ServiceSection';
import DepartmentSection from './Components/DepartmentSection/DepartmentSection';
import DoctorSection from './Components/DoctorSection/DoctorSection';
import SubSection from './Components/SubSection/SubSection';

function App() {

  return (
    <div>
     <HeaderContent/>
     <BodyComponent>
         <div><HeroSection/></div>
         <div><AboutSection/></div>
         <div><ServiceSection/></div>
         <div><DepartmentSection/></div>
         <div><DoctorSection/></div>
         <div><SubSection/></div>
     </BodyComponent>
    </div>
  );
}

export default App;
