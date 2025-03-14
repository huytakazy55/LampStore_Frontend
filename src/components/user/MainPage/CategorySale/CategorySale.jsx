import React from 'react'
import Product1 from '../../../../assets/images/cameras-2.jpg'
import Product2 from '../../../../assets/images/360-camers.jpg'
import Product3 from '../../../../assets/images/laptop-2.jpg'
import Product4 from '../../../../assets/images/computer.jpg'

const CategorySale = () => {
  return (
    <div className='w-full h-36 flex justify-between mb-6 xl:mx-auto xl:max-w-[1440px] items-center'>
        <div className="w-[23.5%] bg-gray-300 flex justify-between p-4">
            <div className='w-4/5 mr-[10px]'>
                <img className='w-full h-full mt-[5px]' src={Product1} alt="" />
            </div>
            <div>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a className='text-black font-extrabold' href='#'>shop now <i className='bx bx-chevron-right text-h3 leading-none align-middle bg-yellow-400 rounded-[50%] text-white' ></i></a>
            </div>
        </div>
        <div className="w-[23.5%] bg-gray-300 flex justify-between p-4">
            <div className='w-4/5 mr-[10px]'>
                <img className='w-full h-full mt-[5px]' src={Product2} alt="" />
            </div>
            <div>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a className='text-black font-extrabold' href='#'>shop now <i className='bx bx-chevron-right text-h3 leading-none align-middle bg-yellow-400 rounded-[50%] text-white' ></i></a>
            </div>
        </div>
        <div className="w-[23.5%] bg-gray-300 flex justify-between p-4">
            <div className='w-4/5 mr-[10px]'>
                <img className='w-full h-full mt-[5px]' src={Product3} alt="" />
            </div>
            <div>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a className='text-black font-extrabold' href='#'>shop now <i className='bx bx-chevron-right text-h3 leading-none align-middle bg-yellow-400 rounded-[50%] text-white' ></i></a>
            </div>
        </div>
        <div className="w-[23.5%] bg-gray-300 flex justify-between p-4">
            <div className='w-4/5 mr-[10px]'>
                <img className='w-full h-full mt-[5px]' src={Product4} alt="" />
            </div>
            <div>
                <p>CATCH THE HOTTES NEW</p>
                <p>DEALS</p>
                <p>IN CAMERAS</p>
                <a className='text-black font-extrabold' href='#'>shop now <i className='bx bx-chevron-right text-h3 leading-none align-middle bg-yellow-400 rounded-[50%] text-white' ></i></a>
            </div>
        </div>
    </div>
  )
}

export default CategorySale