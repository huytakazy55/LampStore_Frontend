import React, { useEffect, useState } from 'react'
import AuthService from '../../../../Services/AuthService';

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
        <div className='h-12 bg-[var(--main-background-color)] border-b border-[var(--dark-color)]'> 
            <nav className='xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-full'> 
                <div>
                    <p>Welcome to Worldwide Lamp Store</p>
                </div>
                <div>
                    <ul className='flex justify-between gap-4'>
                        <li className='cursor-pointer'><i className='bx bx-map text-h3 relative top-[3px]' ></i> Store Locator</li>
                        <li className='text-slate-300 relative top-[3px]'>|</li>
                        <li className='cursor-pointer'><i className='bx bx-rocket text-h3 relative top-[3px]'></i> Track your order</li>
                        <li className='text-slate-300 relative top-[3px]'>|</li>
                        <li className='cursor-pointer'  ><i className='bx bx-shopping-bag text-h3 relative top-[3px]'></i> Shop</li>
                        <li className='text-slate-300 relative top-[3px]'>|</li>
                        <li className='cursor-pointer'><i className='bx bx-user text-h3 relative top-[3px]'></i> {name ? name : 'My Account'}</li>
                    </ul>
                </div>
            </nav>
        </div>
        )
    }

export default TopBar