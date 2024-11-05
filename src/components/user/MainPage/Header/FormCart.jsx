import React, { useState, useEffect, useRef } from 'react'
import './FormCart.css'
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import laptop from '../../../../assets/images/laptop-2.jpg'
import computer from '../../../../assets/images/computer.jpg'

const FormCart = ({toggleCart, popupRef}) => {
  return (
    <div ref={popupRef} onClick={(e) => e.stopPropagation()} className={`FormCart ${toggleCart ? 'active' : ''}`} id='FormCart'>
        <div className='cart-content'>
            <div className='cart-product'>
                <img src={iphone14} alt="" />
                <div className='cart-product-content'>
                    <p className='cart-product-title'>Iphone 14 Promax gray 512GB</p>
                    <div className='quantity-price'>
                        <input type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='cart-product-remove'>
                    <i class='bx bx-x'></i>
                </div>
            </div>
            <div className='cart-product'>
                <img src={computer} alt="" />
                <div className='cart-product-content'>
                    <p className='cart-product-title'>Tablet Red EliteBook  Revolve 810 G2</p>
                    <div className='quantity-price'>
                        <input type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='cart-product-remove'>
                    <i class='bx bx-x'></i>
                </div>
            </div>
            <div className='cart-product'>
                <img src={laptop} alt="" />
                <div className='cart-product-content'>
                    <p className='cart-product-title'>Iphone 14 Promax gray 512GB Tablet Red EliteBook Revolve 810 G2</p>
                    <div className='quantity-price'>
                        <input type="number" name="" id="" />
                        <p className="price">25.000.000 <span>₫</span></p>
                    </div>
                </div>
                <div className='cart-product-remove'>
                    <i class='bx bx-x'></i>
                </div>
            </div>
        </div>
        <div className='view-checkout'>
            <div className='view'>View cart</div>
            <div className="checkout">Checkout</div>
        </div>
    </div>
  )
}

export default FormCart