import React, {useState, useEffect, useRef} from 'react'
import avatar from '../../../../assets/images/Avatar.jpg'
import AuthService from '../../../../Services/AuthService'

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
        <div ref={popupActionRef} onClick={(e) => e.stopPropagation()} className={`w-[17rem] absolute shadow-lg -right-[0.3rem] top-14 z-[1000] border-t-2 border-[var(--hightlight-color)] bg-white transition-all duration-3000 ease-in-out ${toggleActionLogin ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'}`} id='FormActionLogin'>
            <div className='w-full mb-2'>
                <div className='rounded-[50%] w-12 h-12 mt-[15px] mx-auto mb-[5px] overflow-hidden'>
                    <img className='w-full h-full' src={profileData.ProfileAvatar ? `${API_ENDPOINT}${profileData.ProfileAvatar}` : avatar} alt="" />
                </div>
                <p className='text-center'>{profileData.Email != '' ? profileData.Email : <a href='#' onClick={handleProfileClick}>Cập nhật tài khoản</a>}</p>
            </div>
            <ul className='block my-2 relative py-4 after:absolute after:w-[90%] after:h-[1px] after:bg-gray-500 after:left-1/2 after:-translate-x-1/2 after:top-0 before:absolute before:w-[90%] before:h-[1px] before:bg-gray-500 before:left-1/2 before:-translate-x-1/2 before:bottom-0'>
                <li onClick={handleProfileClick} ref={buttonProfileRef} className='w-full h-8 mb-[2px] leading-[2] flex px-[10px] items-center justify-start hover:bg-gray-300'><i className='bx bx-user-pin align-middle text-xl mr-[5px]' ></i>
                    Thông Tin Tài Khoản
                </li>
                <li className='w-full h-8 mb-[2px] leading-[2] flex px-[10px] items-center justify-start hover:bg-gray-300'><i className='bx bx-globe align-middle text-xl mr-[5px]'></i>Tiếng Việt (Vietnamese)</li>
                <li className='w-full h-8 mb-[2px] leading-[2] flex px-[10px] items-center justify-start hover:bg-gray-300'><i className='bx bx-cog align-middle text-xl mr-[5px]'></i>Thiết Lập Shop</li>
                <li className='w-full h-8 mb-[2px] leading-[2] flex px-[10px] items-center justify-start hover:bg-gray-300'><i className='bx bx-message-square-detail align-middle text-xl mr-[5px]' ></i>Phản hồi ý kiến</li>
            </ul>
            <div onClick={() => handleLogout()} className='px-3 py-[5px] w-full h-8 mb-2 leading-8 flex justify-start items-center hover:bg-gray-300'><i className='bx bx-exit mr-[5px] align-middle text-xl'></i>Đăng Xuất</div>
        </div>
    )
}

export default FormActionLogin