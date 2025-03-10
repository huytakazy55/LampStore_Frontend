import React, { useState } from 'react'
import AuthService from '../../../../Services/AuthService';
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
                    console.log(err);
                    //console.log(err.response.data.errors.$values);
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
        <div onClick={(e) => e.stopPropagation()} className='w-[25rem] h-[38rem] bg-white/13 backdrop-blur-2xl border-[2px] border-white rounded-[10px] p-10 text-white text-center overflow-hidden translate-y-[-15%] shadow-lg shadow-gray-400'>
            <div className='relative'>
                <form className={`absolute w-full transition-all duration-1000 ease-in-out ${changeForm ? 'opacity-0 invisible -rotate-90 -top-[500px] -left-[500px]' : 'visible opacity-100 rotate-0 top-0 left-0'}`} action="">
                    <div className='text-h1 font-medium mb-20' style={{ textShadow: '1px 0 10px var(--white-color)' }}>Login</div>
                    <div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-user text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="text" autoFocus name="username" value={stateSignin.username} onChange={HandleOnChangeStateSignin} id="LoginUsername" placeholder='Username' />
                            <div className='absolute top-[0.8rem] left-32 text-red-600 font-black'>{formErrors.username && <p>{formErrors.username}</p>}</div>
                        </div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-lock-alt text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="password" name="password" value={stateSignin.password} onChange={HandleOnChangeStateSignin} id="LoginPass" placeholder='Password' />
                            <i className='bx bx-low-vision text-h3'></i>
                            <div className='absolute top-[0.8rem] left-32 text-red-600 font-black'>{formErrors.password && <p>{formErrors.password}</p>}</div>                   
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-4 mt-16'>
                        <div>
                            <input className='mr-[5px] leading-none align-middle' type="checkbox" name="rememberMe" checked={stateSignin.rememberMe} onChange={HandleOnChangeStateSignin} id="LoginCheckbox" />
                            <span className='leading-none align-middle'>Remember me</span>
                        </div>
                        <div>
                            <a className='text-white' href="#">Forget password!</a>
                        </div>
                    </div>
                    <button className='w-full py-[5px] rounded-2xl mb-4 border-2 border-white' type="submit" onClick={handleSignin}>Login</button>
                    <div className='mb-6'>Or</div>
                    <div className='w-full flex justify-around mb-4'>
                        <div className='border-[1px] rounded-sm p-[5px] w-[35%] bg-white/30 flex justify-center items-center gap-1 cursor-pointer'><i className='bx bxl-facebook-circle text-h3'></i> Facebook</div>
                        <div className='border-[1px] rounded-sm p-[5px] w-[35%] bg-white/30 flex justify-center items-center gap-1 cursor-pointer'><i className='bx bxl-google text-h3'></i> Google</div>
                    </div>
                    <div>
                        <p onClick={ChangeFormLogin}>Don't have an account? <a className='ml-1 text-[var(--hightlight-color)]' href="#">Register</a></p>
                    </div>
                </form>
                <form className={`absolute w-full transition-all duration-1000 ease-in-out ${!changeForm ? 'opacity-0 invisible rotate-90 top-[500px] left-[500px]' : 'visible opacity-100 rotate-0 top-0 left-0'}`} action="">
                    <div className='text-h1 font-medium mb-20' style={{ textShadow: '1px 0 10px var(--white-color)' }}>Sign up</div>
                    <div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-user text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="text" name="username" value={stateSignup.username} onChange={HandleOnChangeStateSignup} id="SignupUsername" placeholder='Username' />
                        </div>
                        <div className='flex justify-between items-center border-b-2 border-white h-10 mb-6 relative'>
                            <i className='bx bxs-lock-alt text-h3'></i>
                            <input className='outline-none border-none bg-transparent w-full pt-[5px] pb-0 px-[10px] text-white' type="password" name="password" value={stateSignup.password} onChange={HandleOnChangeStateSignup} id="SignupPass" placeholder='Password' />
                            <i className='bx bx-low-vision text-h3'></i>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mb-4 mt-16'>
                        <div className='accept'>
                            <input className='mr-[5px] leading-none align-middle' type="checkbox" name="acceptTerms" onChange={HandleOnChangeStateSignup} id="SignupAcceptTerms" />
                            <span className='leading-none align-middle'>I accept the personal data processing</span>
                        </div>
                    </div>
                    <button className='w-full py-[5px] rounded-2xl mb-4 border-2 border-white' type="submit" onClick={handleSignup}>Sign up</button>
                    <div>
                        <p onClick={ChangeFormLogin}>Have account? <a className='ml-1 text-[var(--hightlight-color)]' href="#">Login now</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLogin;