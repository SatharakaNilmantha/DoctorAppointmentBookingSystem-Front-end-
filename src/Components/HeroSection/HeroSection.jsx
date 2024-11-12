import React from 'react'
import './HeroSection.css'
import heroImage from "../../images/heroimg.jpg"

function HeroSection() {
  return (
    <>
      <div className='cont'>
        <img  src={heroImage} alt="" />
      </div>
    </>
  )
}

export default HeroSection