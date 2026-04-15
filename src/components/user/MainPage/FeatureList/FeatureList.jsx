import React from 'react'

const FeatureList = () => {
  return (
    <div className='w-full mb-4 md:mb-6 px-4 xl:px-0 xl:mx-auto xl:max-w-[1440px]'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-0 rounded-[5px] shadow-sm ring-1 ring-gray-900/15'>
        <div className='flex justify-center items-center gap-2 md:gap-4 p-3 md:p-4 lg:border-r border-gray-400'>
          <div className='text-xl md:text-h1 leading-[1] align-middle text-yellow-400'>
            <i className='bx bx-rocket'></i>
          </div>
          <div className='feature-text'>
            <strong className='text-xs md:text-sm'>Free Delivery</strong>
            <p className='text-xs md:text-sm'>from 50%</p> 
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 md:gap-4 p-3 md:p-4 lg:border-r border-gray-400'>
          <div className='text-xl md:text-h1 leading-[1] align-middle text-yellow-400'>
            <i className='bx bx-like'></i>
          </div>
          <div className='feature-text'>
            <strong className='text-xs md:text-sm'>99% Positive</strong>
            <p className='text-xs md:text-sm'>Feedbacks</p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 md:gap-4 p-3 md:p-4 lg:border-r border-gray-400'>
          <div className='text-xl md:text-h1 leading-[1] align-middle text-yellow-400'>
            <i className='bx bx-revision'></i>
          </div>
          <div className='feature-text'>
            <strong className='text-xs md:text-sm'>1 week</strong>
            <p className='text-xs md:text-sm'>for free return</p>
          </div>
        </div>
        <div className='flex justify-center items-center gap-2 md:gap-4 p-3 md:p-4 lg:border-r border-gray-400'>
          <div className='text-xl md:text-h1 leading-[1] align-middle text-yellow-400'>
            <i className='bx bxl-visa'></i>
          </div>
          <div className='feature-text'>
            <strong className='text-xs md:text-sm'>Payment</strong>
            <p className='text-xs md:text-sm'>Secure System</p>
          </div>
        </div>
        <div className='col-span-2 md:col-span-1 flex justify-center items-center gap-2 md:gap-4 p-3 md:p-4'>
          <div className='text-xl md:text-h1 leading-[1] align-middle text-yellow-400'>
            <i className='bx bx-purchase-tag'></i>
          </div>
          <div className='feature-text'>
            <strong className='text-xs md:text-sm'>Only Best</strong>
            <p className='text-xs md:text-sm'>Brands</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureList