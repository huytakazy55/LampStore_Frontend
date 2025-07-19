import React, {useState, useEffect, useRef} from 'react'
import FormLogin from './FormLogin'
import FormCart from './FormCart';
import FormActionLogin from './FormActionLogin';
import { useSelector } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css';
import Logo from "../../../../assets/images/LogoLamp3D.jpg"
import avatarimg from '../../../../assets/images/Avatar.jpg'
import AuthService from '../../../../Services/AuthService';
import FormProfile from './FormProfile';

const Header = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleActionLogin, setToggleActionLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false);
  const [avatar, setAvatar] = useState({ProfileAvatar: ''})
  const [arrowIcon, setArrowIcon] = useState(false);
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
    } else {
      setAvatar({ProfileAvatar: ''});
    }
  }, [token]);
  
  const toggleLoginForm = () => {
    setToggleLogin(!toggleLogin);
  }

  const toggleArrow = () => {
    setArrowIcon(!arrowIcon);
  };

  const closeArrow = () => {
    setArrowIcon(false);
  };

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
    <div className='w-full xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-28'>
      <div className='h-24'>
        <a href="/"><img className='h-full max-w-full' src={Logo} alt="Logo" srcset="" /></a>        
      </div>
      <div>
        <i className='bx bx-menu leading-none align-middle text-h2'></i>
      </div>
      <div className='flex border-2 border-yellow-400 rounded-[30px] w-1/2 h-11 overflow-hidden'>
        <input className='caret-y border-yellow-400 outline-0 border-0 w-3/5 py-[2px] px-[20px] h-full' autoFocus type="text" placeholder='Search for Products ...' />
        <div className='w-1/3 h-full relative'> 
          <i className={`bx ${arrowIcon ? 'bxs-up-arrow' : 'bxs-down-arrow'} text-[0.7rem] text-gray-600 absolute leading-[3.5] h-full right-2`}></i>
          <select onClick={toggleArrow} onBlur={closeArrow} className='appearance-none pr-24 pl-4 bg-white border-gray-300 rounded text-gray-600 cursor-pointer outline-0 border-0 text-small py-2 px-5 font-medium w-full h-full' name="">
            <option selected value="1">All Categories</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
            <option value="1">All Category</option>
          </select>
        </div>
        <button className='w-[10%] h-full bg-y bg-yellow-400 text-slate-100 group'><i className='bx bx-search -mt-[3px] text-slate-100 leading-none align-middle text-h3 transition-transform duration-100 group-hover:scale-110'></i></button>
      </div>
      <div className='w-1/5 text-black'> 
        <ul className='flex justify-between items-center'>
          <li className='group'><i className='bx bx-heart text-h2 leading-none align-middle text-red-600 cursor-pointer transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i></li>
          <li className='flex justify-center items-center gap-1 cursor-pointer group' onClick={toggleFormcart} ref={buttonRef} >
            <div className='relative'>
                <i className='bx bx-shopping-bag text-h2 leading-none align-middle transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i>
                <FormCart popupRef={popupRef} toggleCart={toggleCart} setToggleCart={setToggleCart} />
                <div className='absolute right-[-7px] bottom-[-10px] w-5 h-5 bg-yellow-400 rounded-[50%] text-center text-xs leading-5 text-gray-700 font-medium'>10</div>
            </div>
            <div className='text-small ml-1 p-[2px] relative font-medium'>
              <div className='absolute w-1 h-1 -top-[2px] -left-[7px] text-small'>₫</div>
              10.000.000
            </div>
          </li>
          <div onClick={toggleLoginForm} className={`fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-[1000] justify-center items-center max-h-screen ${toggleLogin ? 'flex' : 'hidden'}`}>
            <FormLogin toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
          </div>
          <div onClick={toggleFormProfile} >
              <FormProfile popupProfileRef={popupProfileRef} toggleProfile={toggleProfile} />
          </div>
          {
            isAuthenticated ? 
            <>
              <li onClick={toggleActionLoginForm} ref={buttonActionRef} className='relative w-8 h-8 leading-8 border-2 border-yellow-400 rounded-[20%] p-[1px] cursor-pointer'>
                <img className='rounded-[20%] h-full w-full ' src={ avatarURL ? avatarURL : (avatar.ProfileAvatar ? (avatar.ProfileAvatar.startsWith('http') ? avatar.ProfileAvatar : `${API_ENDPOINT}${avatar.ProfileAvatar}`) : avatarimg)} alt="" />
                <FormActionLogin toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} buttonProfileRef={buttonProfileRef} popupActionRef={popupActionRef} toggleActionLogin={toggleActionLogin} setToggleActionLogin={setToggleActionLogin} />
              </li>
            </> : 
            <>
              <li className='group' onClick={toggleLoginForm}>
                <i className='bx bx-user text-h2 leading-none align-middle cursor-pointer transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i>   
              </li>          
            </>
          }
        </ul>
      </div>
    </div>
  )
}

export default Header