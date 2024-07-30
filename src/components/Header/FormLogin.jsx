import React, {useState} from 'react'
import './FormLogin.css'

const FormLogin = ({toggleLogin, setToggleLogin}) => {
    const [changeForm, setChangeForm] = useState(false);
    const ChangeFormLogin = () => {
        setChangeForm(!changeForm);
    }
  return (
    <div onClick={(e) => e.stopPropagation()} className='FormLogin'>
        <div className='FormLogin-content'>
            <form className={changeForm ? 'Login' : 'Login active'} action="">
                <div className='FormLogin-title'>Login</div>
                <div className='border-input'>
                    <div className='user-input'>
                        <i class='bx bxs-user'></i>
                        <input type="text" autoFocus name="Email" id="LoginEmail" placeholder='Email' />
                    </div>
                    <div className='pass-input'>
                        <i class='bx bxs-lock-alt' ></i>
                        <input type="password" name="Password" id="LoginPass" placeholder='Password' />
                        <i class='bx bx-low-vision'></i>
                    </div>
                </div>
                <div className='form-action'>
                    <div className='remember-name'>
                        <input type="checkbox" name="" id="LoginCheckbox" />
                        <span>remember me</span>
                    </div>
                    <div className='forget-pass'>
                        <a href="#">Forget password!</a>
                    </div>
                </div>
                <button type="submit">Login</button>
                <div className='or'>
                    Or
                </div>
                <div className='with-socialmedia'>
                    <div className='Facebook'><i class='bx bxl-facebook-circle' ></i> Facebook</div>
                    <div className='Google'><i class='bx bxl-google' ></i> Google</div>
                </div>
                <div className='dont-have-acc'>
                    <p onClick={ChangeFormLogin}>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
            <form className={!changeForm ? 'Signup' : 'Signup active'} action="">
                <div className='FormLogin-title'>Sign up</div>
                <div className='border-input'>
                    <div className='user-input'>
                        <i class='bx bxs-user'></i>
                        <input type="text" autoFocus name="Username" id="SignupUsername" placeholder='Username' />
                    </div>
                    <div className='user-input'>
                        <i class='bx bxl-gmail' ></i>
                        <input type="text" name="Email" id="SignupEmail" placeholder='Email' />
                    </div>
                    <div className='pass-input'>
                        <i class='bx bxs-lock-alt' ></i>
                        <input type="password" name="Password" id="SignupPass" placeholder='Password' />
                        <i class='bx bx-low-vision'></i>
                    </div>
                    <div className='user-input'>
                        <i class='bx bxs-phone' ></i>
                        <input type="text" name="Phonenumber" id="SignupPhone" placeholder='Phone number' />
                    </div>
                </div>
                <div className='form-action'>
                    <div className='accept'>
                        <input type="checkbox" name="" id="" />
                        <span>i accept the personal data processing</span>
                    </div>
                </div>
                <button type="submit">Sign up</button>
                <div className='dont-have-acc'>
                    <p onClick={ChangeFormLogin}>have account? <a href="#">Login now</a></p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default FormLogin