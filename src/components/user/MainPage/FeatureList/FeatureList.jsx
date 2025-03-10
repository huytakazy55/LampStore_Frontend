import React from 'react'

const FeatureList = () => {
  return (
    <div className='w-full h-20 flex justify-between mb-6 xl:mx-auto xl:max-w-[1440px] items-center gap-[10px] rounded-[5px] shadow-sm ring-1 ring-gray-900/15'>
      <div className='w-1/5 border-r border-gray-400 flex justify-center items-center gap-4'>
        <div className='text-h1 leading-[1] align-middle text-[var(--hightlight-color)]'>
          <i className='bx bx-rocket'></i>
        </div>
        <div className='feature-text'>
          <strong>Free Delivery</strong>
          <p>from 50%</p> 
        </div>
      </div>
      <div className='w-1/5 border-r border-gray-400 flex justify-center items-center gap-4'>
        <div className='text-h1 leading-[1] align-middle text-[var(--hightlight-color)]'>
          <i className='bx bx-like'></i>
        </div>
        <div className='feature-text'>
          <strong>99% Positive</strong>
          <p>Feedbacks</p>
        </div>
      </div>
      <div className='w-1/5 border-r border-gray-400 flex justify-center items-center gap-4'>
        <div className='text-h1 leading-[1] align-middle text-[var(--hightlight-color)]'>
          <i className='bx bx-revision'></i>
        </div>
        <div className='feature-text'>
          <strong>1 week</strong>
          <p>for free return</p>
        </div>
      </div>
      <div className='w-1/5 border-r border-gray-400 flex justify-center items-center gap-4'>
        <div className='text-h1 leading-[1] align-middle text-[var(--hightlight-color)]'>
          <i className='bx bxl-visa'></i>
        </div>
        <div className='feature-text'>
          <strong>Payment</strong>
          <p>Secure System</p>
        </div>
      </div>
      <div className='w-1/5 border-r-0 border-gray-400 flex justify-center items-center gap-4'>
        <div className='text-h1 leading-[1] align-middle text-[var(--hightlight-color)]'>
          <i className='bx bx-purchase-tag'></i>
        </div>
        <div className='feature-text'>
          <strong>Only Best</strong>
          <p>Brands</p>
        </div>
      </div>
    </div>
  )
}

export default FeatureList