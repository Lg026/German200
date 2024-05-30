import React from 'react'
import { NavLink } from 'react-router-dom'
import navStyles from '../styles/nav.module.css'

export const Navbar = () => {
  return (
    <nav className={navStyles.nav}>
        <ul className={navStyles.ul}>
            <li><NavLink className={navStyles.a} to='/'>Home</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar