import React from 'react'
import './ServicePage.css'
import ServiceSection from '../../Components/ServiceSection/ServiceSection'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import FooterContent from '../../Components/FooterContent/FooterContent'


function ServicePage() {
  return (
    <>
      <HeaderContent/>
      <div className='servicsection'><ServiceSection/></div>
      <FooterContent/>
    </>
  )
}

export default ServicePage