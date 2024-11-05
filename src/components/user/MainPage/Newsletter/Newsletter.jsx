import React from 'react'
import './Newsletter.css'

const Newsletter = () => {
  return (
    <div className='Newsletter'>
        <div className='Newsletter-content container'>
            <div className='Newsletter-signup'>
                <i class='bx bxl-telegram'></i>
                <div className='Signup-letter-text'>
                    Sign up to Newsletter
                </div>
            </div>
            <div className='Newsletter-receive'>
                ...and receive <b>$20 coupon for first shopping</b>
            </div>
            <div className='Newsletter-input'>
                <div className="Border-newsletter-input">
                    <input type="text" placeholder='Enter your email address' />
                    <button>SignUp</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newsletter