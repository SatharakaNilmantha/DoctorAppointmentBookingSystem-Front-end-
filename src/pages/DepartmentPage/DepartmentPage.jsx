import React from 'react'
import './DepartmentPage.css'
import DepartmentSection from '../../Components/DepartmentSection/DepartmentSection'
import HeaderContent from '../../Components/HeaderContent/HeaderContent'

function DepartmentPage() {
  return (
    <>
      <HeaderContent/>
      <div className='depSection'><DepartmentSection/> </div>
    </>
  )
}

export default DepartmentPage