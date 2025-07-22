import React, { useState, useEffect } from 'react'
import { Modal } from 'antd';
import AuthService from '../../../../Services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../../../../redux/slices/authSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';

const FormLogin = ({ toggleLogin, setToggleLogin }) => {
    const dispatch = useDispatch();
    const [stateSignin, setStateSignin] = useState({ username: '', password: '', rememberMe: false });
    const [stateSignup, setStateSignup] = useState({ username: '', email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [changeForm, setChangeForm] = useState(false);
    const [showPasswordLogin, setShowPasswordLogin] = useState(false);
    const [showPasswordSignup, setShowPasswordSignup] = useState(false);
    const [focusPasswordLogin, setFocusPasswordLogin] = useState(false);
    const [focusPasswordSignup, setFocusPasswordSignup] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [isRememberedAccount, setIsRememberedAccount] = useState(false);
    const role = useSelector((state) => state.auth.role);
    const navigate = useNavigate();

    const showToast = (message, type = 'success') => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    useEffect(() => {
        if (role === 'Administrator') {
            navigate('/admin');
        }
    }, [role, navigate]);

    // Load remembered username when component mounts
    useEffect(() => {
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const isRemembered = localStorage.getItem('rememberMe') === 'true';
        
        if (rememberedUsername && isRemembered) {
            setStateSignin(prevState => ({
                ...prevState,
                username: rememberedUsername,
                rememberMe: true
            }));
            setIsRememberedAccount(true);
        }
    }, []);
    
    const ChangeFormLogin = () => {
        setChangeForm(!changeForm);
        // Reset form errors when switching forms
        setFormErrors({});
        // Reset password visibility when switching forms
        setShowPasswordLogin(false);
        setShowPasswordSignup(false);
        // Reset focus states when switching forms
        setFocusPasswordLogin(false);
        setFocusPasswordSignup(false);
    }

    const handleModalClose = () => {
        setToggleLogin(false);
        // Reset forms when modal closes
        setChangeForm(false);
        setFormErrors({});
        setShowPasswordLogin(false);
        setShowPasswordSignup(false);
        setFocusPasswordLogin(false);
        setFocusPasswordSignup(false);
        setShowForgotPassword(false);
        
        // Reload remembered account if exists
        const rememberedUsername = localStorage.getItem('rememberedUsername');
        const isRemembered = localStorage.getItem('rememberMe') === 'true';
        
        if (rememberedUsername && isRemembered) {
            setStateSignin(prevState => ({
                ...prevState,
                username: rememberedUsername,
                rememberMe: true
            }));
            setIsRememberedAccount(true);
        } else {
            setStateSignin({ username: '', password: '', rememberMe: false });
            setIsRememberedAccount(false);
        }
        setStateSignup({ username: '', email: '', password: '' });
    }

    const togglePasswordLoginVisibility = () => {
        setShowPasswordLogin(!showPasswordLogin);
    };

    const togglePasswordSignupVisibility = () => {
        setShowPasswordSignup(!showPasswordSignup);
    };

    const handlePasswordLoginFocus = () => {
        setFocusPasswordLogin(true);
    };

    const handlePasswordLoginBlur = () => {
        setFocusPasswordLogin(false);
    };

    const handlePasswordSignupFocus = () => {
        setFocusPasswordSignup(true);
    };

    const handlePasswordSignupBlur = () => {
        setFocusPasswordSignup(false);
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setShowForgotPassword(true);
    };

    const handleForgotPasswordClose = () => {
        setShowForgotPassword(false);
    };

    const handleGoogleLoginSuccess = async (googleUserData) => {
        try {
            // Gọi API backend để xử lý Google login
            const response = await AuthService.googleSignIn(googleUserData);
            
            showToast('Đăng nhập Google thành công!');
            localStorage.setItem("token", response.data);
            window.dispatchEvent(new Event('userLoginStatusChanged'));
            
            // Clear remember me for Google login (since we don't save Google credentials)
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberMe');
            
            handleModalClose();

            const decoded = jwtDecode(response.data);
            dispatch(loginAction({ token: response.data, role: decoded.role }));
        } catch (error) {
            console.error('Google login error:', error);
            showToast('Đăng nhập Google thất bại!', 'error');
        }
    };

    const handleGoogleLoginError = (error) => {
        console.error('Google login error:', error);
        showToast('Có lỗi xảy ra khi đăng nhập Google!', 'error');
    };

    const validateFormSignin = () => {
        let errors = {};
        if (!stateSignin.username) {
            errors.username = 'Username is required';
        }
        if (!stateSignin.password) {
            errors.password = 'Password is required';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateFormSignup = () => {
        let errors = {};
        if (!stateSignup.username) {
            errors.username = 'Tên đăng nhập là bắt buộc';
        }
        if (!stateSignup.email) {
            errors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(stateSignup.email)) {
            errors.email = 'Email không hợp lệ';
        }
        if (!stateSignup.password) {
            errors.password = 'Mật khẩu là bắt buộc';
        } else if (stateSignup.password.length < 6) {
            errors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignin = (e) => {
        e.preventDefault();
        
        if (validateFormSignin()) {
            AuthService.signin(stateSignin.username, stateSignin.password, stateSignin.rememberMe)
                .then((res) => {
                    showToast('Đăng nhập thành công!');
                    localStorage.setItem("token", res.data);
                    window.dispatchEvent(new Event('userLoginStatusChanged'));
                    
                    // Handle Remember Me functionality
                    if (stateSignin.rememberMe) {
                        localStorage.setItem('rememberedUsername', stateSignin.username);
                        localStorage.setItem('rememberMe', 'true');
                    } else {
                        localStorage.removeItem('rememberedUsername');
                        localStorage.removeItem('rememberMe');
                    }
                    
                    handleModalClose();

                    const decoded = jwtDecode(res.data);
                    dispatch(loginAction({ token: res.data, role: decoded.role }));                  
                })
                .catch((err) => {
                    if (err.response) {
                        const errorMessage = err.response.data || "Có lỗi xảy ra!";
                        showToast(errorMessage, "error");
                    } else {
                        console.log(err);
                        showToast("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.", "error");
                    }
                });
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (validateFormSignup()) {
            AuthService.signup(stateSignup.username, stateSignup.email, stateSignup.password)
                .then((res) => {
                    showToast('Đăng ký thành công!');
                    // Reset form after successful signup
                    setStateSignup({ username: '', email: '', password: '' });
                    setChangeForm(false); // Switch back to login form
                })
                .catch((err) => {
                    const errorMessage = err.response?.data?.errors?.$values?.[0] || err.response?.data || "Có lỗi xảy ra khi đăng ký!";
                    showToast(errorMessage, "error");
                });
        }
    }

    const HandleOnChangeStateSignin = (e) => {
        const { name, value, type, checked } = e.target;
        setStateSignin((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Handle Remember Me checkbox change
        if (name === 'rememberMe' && !checked) {
            // If unchecking Remember Me, remove stored credentials
            localStorage.removeItem('rememberedUsername');
            localStorage.removeItem('rememberMe');
        }

        // Reset remembered account indicator when username is manually changed
        if (name === 'username' && isRememberedAccount) {
            const rememberedUsername = localStorage.getItem('rememberedUsername');
            if (value !== rememberedUsername) {
                setIsRememberedAccount(false);
            }
        }

        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }

    const HandleOnChangeStateSignup = (e) => {
        const { name, value } = e.target;
        setStateSignup((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear error for this field when user starts typing
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    }
    return (
        <>
            <style>
                {`
                    .login-modal .ant-modal-content {
                        background: transparent !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                    }
                    .login-modal .ant-modal-body {
                        padding: 0 !important;
                    }
                    .login-modal input::placeholder {
                        color: rgba(255, 255, 255, 0.7) !important;
                    }
                    .login-modal input {
                        color: white !important;
                    }
                    .login-modal .ant-modal-mask {
                        background: rgba(0, 0, 0, 0.5) !important;
                    }
                `}
            </style>
            <Modal
                open={toggleLogin}
                onCancel={handleModalClose}
                footer={null}
                width={450}
                centered
                closable={false}
                className="login-modal"
                styles={{
                    body: { padding: 0 },
                    content: { padding: 0, background: 'transparent' }
                }}
            >
                <div 
                    onClick={(e) => e.stopPropagation()} 
                    className='form-login w-[25rem] h-[38rem] bg-white/13 backdrop-blur-2xl border-[2px] border-white rounded-[10px] p-10 text-white text-center overflow-hidden shadow-lg shadow-gray-400'
                >
            <div className='relative'>
                <form className={`absolute w-full transition-all duration-1000 ease-in-out ${changeForm ? 'opacity-0 invisible -rotate-90 -top-[500px] -left-[500px]' : 'visible opacity-100 rotate-0 top-0 left-0'}`} action="" autoComplete="off">
                    <div className='text-h1 font-medium mb-20' style={{ textShadow: '1px 0 10px #fff' }}>Đăng nhập</div>
                    <div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-user text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="text" autoFocus name="username" value={stateSignin.username} onChange={HandleOnChangeStateSignin} id="LoginUsername" placeholder='Username' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                            {isRememberedAccount && stateSignin.username && (
                                <i className='bx bxs-check-circle text-green-400 text-sm' title='Tài khoản đã được nhớ'></i>
                            )}
                            <div className='absolute top-[0.8rem] left-32 text-red-600 font-black'>{formErrors.username && <p>{formErrors.username}</p>}</div>
                        </div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-lock-alt text-h3'></i>
                            <input 
                                className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' 
                                type={showPasswordLogin ? "text" : "password"} 
                                name="password" 
                                value={stateSignin.password} 
                                onChange={HandleOnChangeStateSignin} 
                                onFocus={handlePasswordLoginFocus}
                                onBlur={handlePasswordLoginBlur}
                                id="LoginPass" 
                                placeholder='Password' 
                                autoComplete="off"
                            />
                            {(focusPasswordLogin || stateSignin.password.length > 0) && (
                                <i className={`bx ${showPasswordLogin ? 'bx-hide' : 'bx-show'} text-h3 cursor-pointer`} onClick={togglePasswordLoginVisibility}></i>
                            )}
                            <div className='absolute top-[0.8rem] left-32 text-red-600 font-black'>{formErrors.password && <p>{formErrors.password}</p>}</div>                   
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-4 mt-16'>
                        <div>
                            <input className='mr-[5px] leading-none align-middle' type="checkbox" name="rememberMe" checked={stateSignin.rememberMe} onChange={HandleOnChangeStateSignin} id="LoginCheckbox" />
                            <span className='leading-none align-middle'>Remember me</span>
                        </div>
                        <div>
                            <a className='text-white cursor-pointer' onClick={handleForgotPasswordClick}>Forget password!</a>
                        </div>
                    </div>
                    <button className='w-full py-[5px] rounded-2xl mb-4 border-2 border-white' type="submit" onClick={handleSignin}>Login</button>
                    <div className='mb-6'>Or</div>
                    <div className='w-full flex justify-around mb-4'>
                        <div className='border-[1px] rounded-sm p-[5px] w-[35%] bg-white/30 flex justify-center items-center gap-1 cursor-pointer'><i className='bx bxl-facebook-circle text-h3'></i> Facebook</div>
                        <GoogleSignIn 
                            onGoogleLoginSuccess={handleGoogleLoginSuccess}
                            onGoogleLoginError={handleGoogleLoginError}
                        />
                    </div>
                    <div>
                        <p onClick={ChangeFormLogin}>Don't have an account? <a className='ml-1 text-yellow-400' href="#">Register</a></p>
                    </div>
                </form>
                <form className={`absolute w-full transition-all duration-1000 ease-in-out ${!changeForm ? 'opacity-0 invisible rotate-90 top-[500px] left-[500px]' : 'visible opacity-100 rotate-0 top-0 left-0'}`} action="" autoComplete="off">
                    <div className='text-h1 font-medium mb-20' style={{ textShadow: '1px 0 10px #fff' }}>Đăng ký</div>
                    <div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-user text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="text" name="username" value={stateSignup.username} onChange={HandleOnChangeStateSignup} id="SignupUsername" placeholder='Tên đăng nhập' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                            {formErrors.username && <div className='absolute top-[0.8rem] left-32 text-red-600 font-black text-xs'>{formErrors.username}</div>}
                        </div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-lock-alt text-h3'></i>
                            <input 
                                className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' 
                                type={showPasswordSignup ? "text" : "password"} 
                                name="password" 
                                value={stateSignup.password} 
                                onChange={HandleOnChangeStateSignup} 
                                onFocus={handlePasswordSignupFocus}
                                onBlur={handlePasswordSignupBlur}
                                id="SignupPass" 
                                placeholder='Mật khẩu' 
                                autoComplete="off"
                            />
                            {(focusPasswordSignup || stateSignup.password.length > 0) && (
                                <i className={`bx ${showPasswordSignup ? 'bx-hide' : 'bx-show'} text-h3 cursor-pointer`} onClick={togglePasswordSignupVisibility}></i>
                            )}
                            {formErrors.password && <div className='absolute top-[0.8rem] left-32 text-red-600 font-black text-xs'>{formErrors.password}</div>}
                        </div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-envelope text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="email" name="email" value={stateSignup.email} onChange={HandleOnChangeStateSignup} id="SignupEmail" placeholder='Email' autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
                            {formErrors.email && <div className='absolute top-[0.8rem] left-32 text-red-600 font-black text-xs'>{formErrors.email}</div>}
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-4 mt-8'>
                        <div className='accept'>
                            <input className='mr-[5px] leading-none align-middle' type="checkbox" name="acceptTerms" onChange={HandleOnChangeStateSignup} id="SignupAcceptTerms" />
                            <span className='leading-none align-middle text-sm'>Tôi đồng ý với điều khoản sử dụng</span>
                        </div>
                    </div>
                    <button className='w-full py-[5px] rounded-2xl mb-4 border-2 border-white' type="submit" onClick={handleSignup}>Đăng ký</button>
                    <div>
                        <p onClick={ChangeFormLogin}>Đã có tài khoản? <a className='ml-1 text-yellow-400' href="#">Đăng nhập ngay</a></p>
                    </div>
                </form>
            </div>
            
                <ForgotPassword 
                    visible={showForgotPassword}
                    onCancel={handleForgotPasswordClose}
                />
                </div>
            </Modal>
        </>
    )
}

export default FormLogin;