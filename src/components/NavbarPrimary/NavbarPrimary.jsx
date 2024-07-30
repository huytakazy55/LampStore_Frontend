import React from 'react'
import './NavbarPrimary.css'

const NavbarPrimary = () => {
  return (
    <div className='NavbarPrimary'>
        <nav className='nav-primary container'>
            <ul>
                <li>
                    <a href="#">Home</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu container'></div>
                </li>
                <li>
                    <a href="#">TV& Audio</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>
                </li>
                <li>
                    <a href="#">Smash Phone</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>
                </li>
                <li>
                    <a href="#">Laptop & Desktop</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>
                </li>
                <li>
                    <a href="#">Gadgets</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>
                </li>
                <li>
                    <a href="#">GPS & Car</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>
                </li>
                <li>
                    <a href="#">Camera & Accessories</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu'></div>          
                </li>
                <li>
                    <a href="#">Movies & Games</a><i class='bx bx-chevron-down' ></i>
                    <div className='dropdown-menu container'></div>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default NavbarPrimary