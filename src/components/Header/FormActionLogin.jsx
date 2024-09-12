import React, {useState, useEffect, useRef} from 'react'
import './FormActionLogin.css'
import avatar from '../../assets/images/Avatar.jpg'
import AuthService from '../Services/AuthService'

const FormActionLogin = ({toggleActionLogin, popupActionRef, setToggleActionLogin, setToggleProfile, buttonProfileRef}) => {
    const token = localStorage.getItem("token");
    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
    const [profileData, setProfileData] = useState({
        Email: '',
        ProfileAvatar: ''
    });
    useEffect(() => {
        if (toggleActionLogin && token) {
            AuthService.profile()
            .then((res) => {
                setProfileData({
                    Email: res?.email,
                    ProfileAvatar: res?.profileAvatar
                });
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
        }
    }, [toggleActionLogin]);

    const handleLogout = () => {
        AuthService.logout();
    }
    const handleProfileClick = () => {
        setToggleActionLogin(false);
        setToggleProfile(true);
    }

    return (
        <div ref={popupActionRef} onClick={(e) => e.stopPropagation()} className={`FormActionLogin ${toggleActionLogin ? 'active' : ''}`} id='FormActionLogin'>
            <div className='avatar-info'>
                <div className='border-avatar'>
                    <img src={profileData.ProfileAvatar ? `${API_ENDPOINT}${profileData.ProfileAvatar}` : avatar} alt="" />
                </div>
                <p>{profileData.Email != '' ? profileData.Email : <a href='#' onClick={handleProfileClick}>Cập nhật tài khoản</a>}</p>
            </div>
            <ul>
                <li onClick={handleProfileClick} ref={buttonProfileRef} className='action_button'><i class='bx bx-user-pin' ></i>
                    Thông Tin Tài Khoản
                </li>
                <li className='action_button'><i class='bx bx-globe'></i>Tiếng Việt (Vietnamese)</li>
                <li className='action_button'><i class='bx bx-cog' ></i>Thiết Lập Shop</li>
                <li className='action_button'><i class='bx bx-message-square-detail' ></i>Phản hồi ý kiến</li>
            </ul>
            <div onClick={() => handleLogout()} className='logout_bt action_button'><i class='bx bx-exit'></i>Đăng Xuất</div>
        </div>
    )
}

export default FormActionLogin