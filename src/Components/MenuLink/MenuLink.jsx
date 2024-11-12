import React from 'react'

import './MenuLink.css'

function MenuLink(props) {
  return (
    <div className="menu menu-2">
       <a href={props.url}>{props.linkName}</a>
    </div>
  )
}

export default MenuLink