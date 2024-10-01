import React, {useState, useContext, useEffect, useRef} from 'react'
import { useSelector } from 'react-redux';
import Logo from '../../../../assets/images/LogoLamp3D.jpg'
import England from '../../../../assets/images/England-img.jpg'
import VietNam from '../../../../assets/images/VietNam-icon.jpg'
import './AppBar.css'
import { useDispatch } from 'react-redux';
import { setLeftBar } from '../../../../redux/slices/leftBarAdminSlice';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';
import AuthService from '../../../../Services/AuthService';
import { toast } from 'react-toastify';

const AppBar = () => {
    const dispatch = useDispatch();

    const leftbar = useSelector(state => state.leftbar.leftbar);

    const toggleHideLeftBar = () => {
        dispatch(setLeftBar(!leftbar));
    }

    const [showLanguage, setShowLanguage] = useState(false);
    const [showUserService, setShowUserService] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const {themeColors, changeTheme } = useContext(ThemeContext);
    const languageRef = useRef(null);
    const colorRef = useRef(null);
    const serviceRef = useRef(null);
    const buttonColorRef = useRef(null);
    const buttonLanguageRef = useRef(null);
    const buttonServiceRef = useRef(null);
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const toggleShowLanguage = () => {
        setShowLanguage(!showLanguage);
    }

    const toggleShowColor = () => {
        setShowColor(!showColor);
    }

    const toggleShowUserService = () => {
        setShowUserService(!showUserService);
    }

    const handleClickOutside = (event, ref, buttonRef, functionRef) => {
        if (ref.current && !ref.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
            functionRef(false);
        }
    };
    useEffect(() => {
        const handleClickOutsideClick = (event) => {
            handleClickOutside(event, colorRef, buttonColorRef, setShowColor);
            handleClickOutside(event, languageRef, buttonLanguageRef, setShowLanguage);
            handleClickOutside(event, serviceRef, buttonServiceRef, setShowUserService);
        }

        document.addEventListener('click', handleClickOutsideClick, true);
        return () => {
        document.removeEventListener('click', handleClickOutsideClick, true);
        };
    }, []);

    const Logout = () => {
        AuthService.logout()
    }

    return (
        <div className='AppBar'>
            <div className='AppBar-logo'>
                <img src={Logo} alt="" />
            </div>
            <div onClick={() => toggleHideLeftBar()} className='AppBar-icon'>
                <i class='bx bx-menu'></i>
            </div>
            <div className='AppBar-middle'>

            </div>
            <div className='AppBar-service'>
                <div ref={buttonColorRef} onClick={toggleShowColor} className='color-change'>
                    <div style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}} className='current-color'></div>
                        <div ref={colorRef} style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}} className={`change-color-select ${showColor ? 'active' : ''}`}>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(136,70,249,1)', EndColorLinear: 'rgba(255,175,0,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(136,70,249,1) 0%, rgba(255,175,0,1) 100%)",}} className="select"></div>
                                <div>Defaul Color</div>
                            </div>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(100,90,255,1)', EndColorLinear: 'rgba(255,100,100,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(100,90,255,1) 0%, rgba(255,100,100,1) 100%)",}} className="select"></div>
                                <div>Red - Blue</div>
                            </div>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(112,254,255,1)', EndColorLinear: 'rgba(80,80,255,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(112,255,255,1) 0%, rgba(80,80,255,1) 100%)",}} className="select"></div>
                                <div>Blue - Cyan</div>
                            </div>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(247,255,60,1)', EndColorLinear: 'rgba(250,74,255,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(247,255,60,1) 0%, rgba(250,74,255,1) 100%)",}} className="select"></div>
                                <div>Pink - Yellow</div>
                            </div>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(145,0,255,1)', EndColorLinear: 'rgba(0,255,149,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(145,0,255,1) 0%, rgba(0,255,149,1) 100%)",}} className="select"></div>
                                <div>Green - Puple</div>
                            </div>
                            <div className='border-select' onClick={() => changeTheme({StartColorLinear: 'rgba(150,150,150,1)', EndColorLinear: 'rgba(0,0,0,1)'})}>
                                <div style={{backgroundImage: "linear-gradient(0deg, rgba(150,150,150,1) 0%, rgba(0,0,0,1) 100%)",}} className="select"></div>
                                <div>Black - Light</div>
                            </div>
                        </div>
                </div>

                <div ref={buttonLanguageRef} onClick={toggleShowLanguage} className='language-icon'>
                    <img src={i18n.language == 'vi' ? VietNam : England} alt="" />
                    <div ref={languageRef} style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}} className={`AppBar-service-changelanguage ${showLanguage ? 'active' : ''}`}>
                        <div onClick={() => changeLanguage('vi')} className='language-button'>
                            <img src={VietNam} alt="" />
                            Tiếng việt
                        </div>
                        <div onClick={() => changeLanguage('en')} className='language-button'>
                            <img src={England} alt="" />
                            English
                        </div>
                    </div>
                </div>
                <div className='noti-icon'>
                    <i class='bx bx-bell' ></i>
                </div>
                <div className='mail-icon'>
                    <i class='bx bx-envelope' ></i>
                </div>
                <div className='user-icon' ref={buttonServiceRef} onClick={toggleShowUserService}> 
                    <i class='bx bx-user'></i>
                    <div ref={serviceRef} className={`service-user ${showUserService ? 'active' : ''}`} style={{background: `linear-gradient(0deg, ${themeColors.StartColorLinear} 0%, ${themeColors.EndColorLinear} 100%)`}}>
                        <ul>
                            <li onClick={() => Logout()}>
                                <i class="bx bx-exit"></i>
                                <a href="#">Đăng xuất</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppBar