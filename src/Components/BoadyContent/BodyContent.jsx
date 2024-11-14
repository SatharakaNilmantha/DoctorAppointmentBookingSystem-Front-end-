import React from 'react'
import './BodyContent.css'
import HeroSection from '../HeroSection/HeroSection'
import AboutSection from '../AboutSection/AboutSection'

function BodyContent() {
  return (
    <>
     <HeroSection/> 
     <div className='about'><AboutSection/></div>
     
    </>
  )
}

export default BodyContent