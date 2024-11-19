import React from 'react'
import './ServicePage.css'
import ServiceSection from '../../Components/ServiceSection/ServiceSection'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'


function ServicePage() {
  return (
    <>
      <HeaderContent/>
      <div className='servicsection'><ServiceSection/></div>
    </>
  )
}

export default ServicePage