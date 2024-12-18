import React from 'react';
import { NavLink } from "react-router-dom";
import './MenuLink.css';

function MenuLink(props) {
  function handleClick() {
    window.scrollTo({
      top: 0, // Scroll to the top
    });
  }

  return (
    <div className="menu menu-2">
      <NavLink to={props.url} className={({ isActive }) => (isActive ? "active" : "")}  onClick={handleClick}> {props.linkName}</NavLink>
    </div>
  );
}

export default MenuLink;
