import React, {useState, useEffect, useRef} from 'react'
import "./Header.css"
import FormLogin from './FormLogin'
import FormCart from './FormCart';
import FormActionLogin from './FormActionLogin';
import { useSelector } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css';
import Logo from "../../../assets/images/LogoLamp3D.jpg"
import avatarimg from '../../../assets/images/Avatar.jpg'
import AuthService from '../../../Services/AuthService';
import FormProfile from './FormProfile';

const Header = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const token = localStorage.getItem('token');
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleActionLogin, setToggleActionLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false);
  const [avatar, setAvatar] = useState({ProfileAvatar: ''})
  const popupRef = useRef(null);
  const popupActionRef = useRef(null);
  const popupProfileRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonActionRef = useRef(null);
  const buttonProfileRef = useRef(null);
  const avatarURL = useSelector((state) => state.avatar.avatar);

  useEffect(() => {
    if(token) {
      AuthService.profile()
        .then((res) => {
          setAvatar({
            ProfileAvatar: res?.profileAvatar
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, [token]);
  
  const toggleLoginForm = () => {
    setToggleLogin(!toggleLogin);
  }


  const toggleActionLoginForm = () => {
    setToggleActionLogin(!toggleActionLogin);
  }

  const toggleFormcart = () => {
    setToggleCart(!toggleCart);
  }

  const toggleFormProfile = () => {
    setToggleProfile(!toggleProfile);
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
      handleClickOutside(event, popupProfileRef, buttonProfileRef, setToggleProfile);
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
        <input className='navbar-search-input' autoFocus type="text" placeholder='Search for Products ...' />
        <div class="custom-select">
          <select name="" id="select-category">
            <option selected value="1">All Categories</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
          </select>
        </div>
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
          <div onClick={toggleLoginForm} className={`overlay-login ${toggleLogin ? 'active' : ''}`}>
            <FormLogin toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
          </div>
          <div onClick={toggleFormProfile} >
              <FormProfile popupProfileRef={popupProfileRef} toggleProfile={toggleProfile} />
          </div>
          {
            token ? 
            <>
              <li onClick={toggleActionLoginForm} ref={buttonActionRef} id='LoginActionForm'>
                <img src={ avatarURL ? avatarURL : (avatar.ProfileAvatar ? `${API_ENDPOINT}${avatar.ProfileAvatar}` : avatarimg)} alt="" />
                <FormActionLogin toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} buttonProfileRef={buttonProfileRef} popupActionRef={popupActionRef} toggleActionLogin={toggleActionLogin} setToggleActionLogin={setToggleActionLogin} />
              </li>
            </> : 
            <>
              <li onClick={toggleLoginForm} id='LoginForm'>
                <i class='bx bx-user'></i>
              </li>          
            </>
          }
        </ul>
      </div>
    </div>
  )
}

export default Header