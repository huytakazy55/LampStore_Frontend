import React, { useState } from 'react'
import './FormLogin.css'
import AuthService from '../../../Services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const FormLogin = ({ toggleLogin, setToggleLogin }) => {
    const [stateSignin, setStateSignin] = useState({ username: '', password: '', rememberMe: false });
    const [stateSignup, setStateSignup] = useState({ username: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [changeForm, setChangeForm] = useState(false);

    const showToast = (message, type = 'success') => {
        if (type === 'success') {
            toast.success(message);
        } else if (type === 'error') {
            toast.error(message);
        }
    };

    const ChangeFormLogin = () => {
        setChangeForm(!changeForm);
    }

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
            errors.username = 'Username is required';
        }
        if (!stateSignup.password) {
            errors.password = 'Password is required';
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
                    setToggleLogin(false);
    
                    const role = jwtDecode(res.data).role;
    
                    if (role === 'Customer') {
                        window.location.href = '/';
                    } else if (role === 'Administrator') {
                        window.location.href = '/admin';
                    }
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
            AuthService.signup(stateSignup.username, stateSignup.password)
                .then((res) => {
                    showToast('Signup successfully!');
                })
                .catch((err) => {
                    console.log(err.response.data.errors.$values);
                    toast.error(err.response.data.errors.$values[0] || "Có lỗi xảy ra!");
                });
        }
    }

    const HandleOnChangeStateSignin = (e) => {
        const { name, value, type, checked } = e.target;
        setStateSignin((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));

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
    }

    return (
        <div onClick={(e) => e.stopPropagation()} className='FormLogin'>
            <div className='FormLogin-content'>
                <form className={changeForm ? 'Login' : 'Login active'} action="">
                    <div className='FormLogin-title'>Login</div>
                    <div className='border-input'>
                        <div className='user-input'>
                            <i className='bx bxs-user'></i>
                            <input type="text" autoFocus name="username" value={stateSignin.username} onChange={HandleOnChangeStateSignin} id="LoginUsername" placeholder='Username' />
                            <div className='requirePass'>{formErrors.username && <p>{formErrors.username}</p>}</div>
                        </div>
                        <div className='pass-input'>
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" name="password" value={stateSignin.password} onChange={HandleOnChangeStateSignin} id="LoginPass" placeholder='Password' />
                            <i className='bx bx-low-vision'></i>
                            <div className='requirePass'>{formErrors.password && <p>{formErrors.password}</p>}</div>                   
                        </div>
                    </div>
                    <div className='form-action'>
                        <div className='remember-name'>
                            <input type="checkbox" name="rememberMe" checked={stateSignin.rememberMe} onChange={HandleOnChangeStateSignin} id="LoginCheckbox" />
                            <span>Remember me</span>
                        </div>
                        <div className='forget-pass'>
                            <a href="#">Forget password!</a>
                        </div>
                    </div>
                    <button type="submit" onClick={handleSignin}>Login</button>
                    <div className='or'>Or</div>
                    <div className='with-socialmedia'>
                        <div className='Facebook'><i className='bx bxl-facebook-circle'></i> Facebook</div>
                        <div className='Google'><i className='bx bxl-google'></i> Google</div>
                    </div>
                    <div className='dont-have-acc'>
                        <p onClick={ChangeFormLogin}>Don't have an account? <a href="#">Register</a></p>
                    </div>
                </form>
                <form className={!changeForm ? 'Signup' : 'Signup active'} action="">
                    <div className='FormLogin-title'>Sign up</div>
                    <div className='border-input'>
                        <div className='user-input'>
                            <i className='bx bxs-user'></i>
                            <input type="text" name="username" value={stateSignup.username} onChange={HandleOnChangeStateSignup} id="SignupUsername" placeholder='Username' />
                        </div>
                        <div className='pass-input'>
                            <i className='bx bxs-lock-alt'></i>
                            <input type="password" name="password" value={stateSignup.password} onChange={HandleOnChangeStateSignup} id="SignupPass" placeholder='Password' />
                            <i className='bx bx-low-vision'></i>
                        </div>
                    </div>
                    <div className='form-action'>
                        <div className='accept'>
                            <input type="checkbox" name="acceptTerms" onChange={HandleOnChangeStateSignup} id="SignupAcceptTerms" />
                            <span>I accept the personal data processing</span>
                        </div>
                    </div>
                    <button type="submit" onClick={handleSignup}>Sign up</button>
                    <div className='dont-have-acc'>
                        <p onClick={ChangeFormLogin}>Have account? <a href="#">Login now</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLogin;