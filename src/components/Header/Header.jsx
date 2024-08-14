import React, {useState, useEffect, useRef} from 'react'
import "./Header.css"
import FormLogin from './FormLogin'
import FormCart from './FormCart';
import FormActionLogin from './FormActionLogin';
import 'react-tooltip/dist/react-tooltip.css';
import Logo from "../../assets/images/FIgureAZlogo.jpg"
import avatar from '../../assets/images/Avatar.jpg'

const Header = () => {
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleActionLogin, setToggleActionLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const popupRef = useRef(null);
  const popupActionRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonActionRef = useRef(null);
  const toggleLoginForm = () => {
    setToggleLogin(!toggleLogin);
  }

  const token = localStorage.getItem('token');

  const toggleActionLoginForm = () => {
    setToggleActionLogin(!toggleActionLogin);
  }

  const toggleFormcart = () => {
    setToggleCart(!toggleCart);
  }

  const handleClickOutside = (event, ref, buttonRef, toggleFunction) => {
    if (ref.current && !ref.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
      toggleFunction(false);
    }
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutside(event, popupRef, buttonRef, setToggleCart);
      handleClickOutside(event, popupActionRef, buttonActionRef, setToggleActionLogin);
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
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
          <li><i class='bx bx-heart'></i></li>
          <li onClick={toggleFormcart} ref={buttonRef} >
            <div className='shopping-cart'>
              <i class='bx bx-shopping-bag' ></i>
                <FormCart popupRef={popupRef} toggleCart={toggleCart} setToggleCart={setToggleCart} />
              <div className='cart-number'>10</div>
            </div>
            <div className='total-cart'>
              <div className='icon-money'>₫</div>
              10.000.000
            </div>
          </li>
          {
            token ? 
            <>
              <li onClick={toggleActionLoginForm} ref={buttonActionRef} id='LoginActionForm'>
                <img src={avatar} alt="" />
                <FormActionLogin popupActionRef={popupActionRef} toggleActionLogin={toggleActionLogin} setToggleActionLogin={setToggleActionLogin} />
              </li>
            </> : 
            <>
              <li onClick={toggleLoginForm} id='LoginForm'>
                <i class='bx bx-user'></i>
              </li>          
            </>
          }
          <div onClick={toggleLoginForm} className={`overlay-login ${toggleLogin ? 'active' : ''}`}>
            <FormLogin toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Header