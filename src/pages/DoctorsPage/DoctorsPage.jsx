import React from 'react'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import DoctorSection from '../../Components/DoctorSection/DoctorSection'
import FooterContent from '../../Components/FooterContent/FooterContent'
import './DoctorsPage.css'

function DoctorsPage() {
  return (
    <>
       <HeaderContent/>
       <div className='docsection'><DoctorSection/></div>
       <FooterContent/>
    </>
  )
}

export default DoctorsPage