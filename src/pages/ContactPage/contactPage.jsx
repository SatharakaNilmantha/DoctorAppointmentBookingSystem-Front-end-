import React from 'react'
import ContactSection from '../../Components/ContactSection/ContactSection'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import FooterContent from '../../Components/FooterContent/FooterContent'
import './contactPage.css'


function contactPage() {
  return (
    <>
      <HeaderContent/>
      <div className='contactsection'><ContactSection/></div>
      <FooterContent/>
    </>
  )
}

export default contactPage