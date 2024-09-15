import React from 'react'
import './LeftBar.css'
import { useSelector } from 'react-redux';

const LeftBar = () => {
    const leftBar = useSelector((state) => state.leftbar.leftbar);
  return (
    <div className={`LeftBar ${leftBar ? 'minimize' : ''}`}>
        <ul>
            <li>
                <i class='bx bxs-home' ></i>
                <a href="#">Home Page</a>
            </li>
            <li>
                <i class='bx bxs-user' ></i>
                <a href="#">Accounts</a>
            </li>
            <li>
                <i class='bx bxs-category' ></i>
                <a href="#">Categories</a>
            </li>
            <li>
                <i class='bx bxs-detail' ></i>
                <a href="#">Your Products</a>
            </li>
            <li>
                <i class='bx bxs-store-alt' ></i>
                <a href="#">Selling Mode</a>
            </li>
            <li>
                <i class='bx bxs-book-content' ></i>
                <a href="#">Orders</a>
            </li>
            <li>
                <i class='bx bxs-cog' ></i>
                <a href="#">Setting</a>
            </li>
        </ul>
    </div>
  )
}

export default LeftBar