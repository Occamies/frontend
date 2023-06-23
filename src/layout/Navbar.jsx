import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/Energidata">Energidata</NavLink></li>
        <li><NavLink to="/Nyheder">Nyheder</NavLink></li>
        <li><NavLink to="/Vejrdata">Vejrdata</NavLink></li>
        <li><NavLink to="/ViborghaveserviceForside">ViborghaveserviceForside</NavLink></li>
        <li><NavLink to="/ViborghaveserviceSlider">ViborghaveserviceSlider</NavLink></li>

        <li><NavLink to="/admin">Admin</NavLink></li>
      </ul>
    </nav >
  )
}

export default Navbar