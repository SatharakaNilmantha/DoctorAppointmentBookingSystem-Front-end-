import React from 'react'
import './DepartmentPage.css'
import DepartmentSection from '../../Components/DepartmentSection/DepartmentSection'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'
import FooterContent from '../../Components/FooterContent/FooterContent'

function DepartmentPage() {
  return (
    <>
      <HeaderContent/>
      <div className='depSection'><DepartmentSection/> </div>
      <FooterContent/>
    </>
  )
}

export default DepartmentPage