import React from 'react'
import './CategorySale.css'
import Product1 from '../../../../assets/images/cameras-2.jpg'
import Product2 from '../../../../assets/images/360-camers.jpg'
import Product3 from '../../../../assets/images/laptop-2.jpg'
import Product4 from '../../../../assets/images/computer.jpg'

const CategorySale = () => {
  return (
    <div className='CategorySale container'>
        <div className="inner">
            <div className='inner-img'>
                <img src={Product1} alt="" />
            </div>
            <div className='inner-content'>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a href='#'>shop now <i class='bx bx-chevron-right' ></i></a>
            </div>
        </div>
        <div className="inner">
            <div className='inner-img'>
                <img src={Product2} alt="" />
            </div>
            <div className='inner-content'>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a href='#'>shop now <i class='bx bx-chevron-right' ></i></a>
            </div>
        </div>
        <div className="inner">
            <div className='inner-img'>
                <img src={Product3} alt="" />
            </div>
            <div className='inner-content'>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a href='#'>shop now <i class='bx bx-chevron-right' ></i></a>
            </div>
        </div>
        <div className="inner">
            <div className='inner-img'>
                <img src={Product4} alt="" />
            </div>
            <div className='inner-content'>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a href='#'>shop now <i class='bx bx-chevron-right' ></i></a>
            </div>
        </div>
    </div>
  )
}

export default CategorySale