// App.jsx

import HeaderContent from './Components/HeaderContent/HeaderContent'
import BodyComponent from "./Components/BoadyContent/BodyContent"
import HeroSection   from './Components/HeroSection/HeroSection'
import AboutSection  from './Components/AboutSection/AboutSection'
import './App.css';

function App() {

  return (
    <div>
     <HeaderContent/>
     <BodyComponent>
         <div><HeroSection/></div>
         <div><AboutSection/></div>
     </BodyComponent>
    </div>
  );
}

export default App;
