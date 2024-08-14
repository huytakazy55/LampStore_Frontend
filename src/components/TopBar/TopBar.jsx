import React, { useEffect } from 'react'
import "./TopBar.css"
import AuthService from '../Services/AuthService';

const TopBar = () => {
    const fetchProfile = async () => {
        try {
            const data = await AuthService.profile();
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    };
    const username = localStorage.getItem('username');
    return (
        <div className='TopBar'>
            <nav className='nav container'>
                <div className='menu-top-bar-left'>
                    <p>Welcome to Worldwide Lamp Store</p>
                </div>
                <div className='menu-top-bar-right'>
                    <ul>
                        <li><i class='bx bx-map' ></i> Store Locator</li>
                        <li className='sepa'>|</li>
                        <li><i class='bx bx-rocket'></i> Track your order</li>
                        <li className='sepa'>|</li>
                        <li><i class='bx bx-shopping-bag' ></i> Shop</li>
                        <li className='sepa'>|</li>
                        <li><i class='bx bx-user'></i> {username ? username : 'My Account'}</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopBar