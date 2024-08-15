import React, { useEffect, useState } from 'react'
import "./TopBar.css"
import AuthService from '../Services/AuthService';

const TopBar = () => {
    const [name, setName] = useState('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        if (token) {
            AuthService.profile()
            .then((res) => {
                setName(res.fullName);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
        }
    }, [token]);
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
                        <li><i class='bx bx-user'></i> {name ? name : 'My Account'}</li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default TopBar