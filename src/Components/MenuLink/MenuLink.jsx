import React from 'react'
import { Link } from "react-router-dom";

import './MenuLink.css'

function MenuLink(props) {
  return (
    <div className="menu menu-2">
       <Link to={props.url}>{props.linkName}</Link>
    </div>
  )
}

export default MenuLink