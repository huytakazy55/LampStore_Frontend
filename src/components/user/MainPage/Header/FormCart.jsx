import React, { useState, useEffect, useRef } from 'react'
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import laptop from '../../../../assets/images/laptop-2.jpg'
import computer from '../../../../assets/images/computer.jpg'

const FormCart = ({toggleCart, popupRef}) => {
  return (
    <div ref={popupRef} onClick={(e) => e.stopPropagation()} className={`w-[40rem] h-96 absolute shadow-sm -right-[5.7rem] top-14 z-[1000] border-t-2 bg-white border-[var(--hightlight-color)] text-white transition-all duration-3000 ease-in-out ${toggleCart ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-2'}`} id='FormCart'>
        <div className='w-full h-4/5 p-4 overflow-y-scroll'>
            <div className='flex justify-between items-center w-full h-28 border-b-[1px] border-gray-500 py-2 last:border-b-0'>
                <img className='w-1/4 h-full' src={iphone14} alt="" />
                <div className='w-[65%] h-[90%] align-middle'>
                    <p className='leading-[1.3] w-full text-normal mb-4 text-blue-600'>Iphone 14 Promax gray 512GB</p>
                    <div className='flex justify-start items-center gap-4'>
                        <input className='w-12 px-[3px]' type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='w-[3%] text-red-600'>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className='flex justify-between items-center w-full h-28 border-b-[1px] border-gray-500 py-2 last:border-b-0'>
                <img className='w-1/4 h-full' src={computer} alt="" />
                <div className='w-[65%] h-[90%] align-middle'>
                    <p className='leading-[1.3] w-full text-normal mb-4 text-blue-600'>Tablet Red EliteBook  Revolve 810 G2</p>
                    <div className='flex justify-start items-center gap-4'>
                        <input className='w-12 px-[3px]' type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='w-[3%] text-red-600'>
                    <i className='bx bx-x'></i>
                </div>
            </div>
            <div className='flex justify-between items-center w-full h-28 border-b-[1px] border-gray-500 py-2 last:border-b-0'>
                <img className='w-1/4 h-full' src={laptop} alt="" />
                <div className='w-[65%] h-[90%] align-middle'>
                    <p className='leading-[1.3] w-full text-normal mb-4 text-blue-600'>Iphone 14 Promax gray 512GB Tablet Red EliteBook Revolve 810 G2</p>
                    <div className='flex justify-start items-center gap-4'>
                        <input className='w-12 px-[3px]' type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='w-[3%] text-red-600'>
                    <i className='bx bx-x'></i>
                </div>
            </div>
        </div>
        <div className='h-1/5 flex justify-end items-center gap-6 p-4'>
            <div className='py-2 px-6 rounded-[5px] text-normal bg-gray-400 hover:bg-black hover:text-white'>View cart</div>
            <div className='py-2 px-6 rounded-[5px] text-normal bg-[var(--hightlight-color)] hover:bg-black hover:text-white'>Checkout</div>
        </div>
    </div>
  )
}

export default FormCart