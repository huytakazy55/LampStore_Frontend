import React, {useState, useEffect, useRef} from 'react'
import "./Header.css"
import FormLogin from './FormLogin'
import FormCart from './FormCart';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import Logo from "../../assets/images/FIgureAZlogo.jpg"

const Header = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleLoginForm = () => {
    setToggleLogin(!toggleLogin);
  }

  const toggleFormcart = () => {
    setToggleCart(!toggleCart);
  }

  const handleClickOutside = (event) => {
    if (
      popupRef.current && !popupRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setToggleCart(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  
  return (
    <div className='header container'>
      <div className='logo'>
        <img src={Logo} alt="Logo" srcset="" />
      </div>
      <div className='navbar-toggler'>
        <i class='bx bx-menu'></i>
      </div>
      <div className='navbar-search'>
        <input type="text" placeholder='Search for Products' />
        <select name="" id="select-category">
          <option value="1">All Category</option>
          <option value="1">All Category</option>
          <option value="1">All Category</option>
          <option value="1">All Category</option>
          <option value="1">All Category</option>
          <option value="1">All Category</option>
          <option value="1">All Category</option>
        </select>
        <button className='search-icon'><i class='bx bx-search' ></i></button>
      </div>
      <div className='header-icons'>
        <ul>
          <li><i data-tip="Hello, I am a tooltip!" class='bx bx-repost'></i></li>
          <li><i class='bx bx-heart'></i></li>
          <li onClick={toggleLoginForm} id='LoginForm'><i class='bx bx-user'></i></li>
          <div onClick={toggleLoginForm} className={`overlay-login ${toggleLogin ? 'active' : ''}`}>
            <FormLogin toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
          </div>
          <li onClick={toggleFormcart} ref={buttonRef} >
            <div className='shopping-cart'>
              <i class='bx bx-shopping-bag' ></i>
                <FormCart popupRef={popupRef} toggleCart={toggleCart} setToggleCart={setToggleCart} />
              <div className='cart-number'>10</div>
            </div>
            <div className='total-cart'>
              <div className='icon-money'>₫</div>
              1.000.000
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header