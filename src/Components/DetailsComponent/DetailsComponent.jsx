import React from 'react'
import './DetailsComponent.css'

import { IoMailOpenOutline } from "react-icons/io5";
import { MdPhoneIphone} from "react-icons/md";
import { BsTwitterX ,BsInstagram ,BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa6";




function DetailsComponent() {
  return (
    <>
   
    
      <div className='detailsection'>

        <div className='part1'>
           <div className='part2'><span className='icon'><IoMailOpenOutline /></span>Example@gmail.com</div>
           <div className='part2'><span className='icon'><MdPhoneIphone /></span>+1 5589 55488 55</div>
        </div>

        <div className='part3'>
           <span className='icon'><BsTwitterX /></span>
           <span className='icon'><BsFacebook /></span>
           <span className='icon'><BsInstagram /></span>
           <span className='icon'><FaLinkedin /></span>
        </div>

      </div>
     
      
    </>
   
  )
}

export default DetailsComponent