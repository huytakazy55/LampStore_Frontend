import React from 'react'

const Newsletter = () => {
  return (
    <div className='h-20 bg-yellow-400 mt-16'>
        <div className='flex justify-between items-center h-20 xl:mx-auto xl:max-w-[1440px]'>
            <div className='text-h3 font-medium flex justify-center items-center gap-4'>
                <i className='bx bxl-telegram text-h1'></i>
                <div className='Signup-letter-text'>
                    Sign up to Newsletter
                </div>
            </div>
            <div className='text-normal'>
                ...and receive <b>$20 coupon for first shopping</b>
            </div>
            <div className='w-[35%]'>
                <div className="bg-white h-10 pl-5 flex justify-center items-center rounded-3xl overflow-hidden">
                    <input className='h-full border-none outline-none w-9/12' type="text" placeholder='Enter your email address' />
                    <button className='w-1/4 h-full font-medium bg-black text-white'>SignUp</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newsletter