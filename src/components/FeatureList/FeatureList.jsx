import React from 'react'
import './FeatureList.css'

const FeatureList = () => {
  return (
    <div className='FeatureList container'>
      <div className='feature'>
        <div className='feature-icon'>
          <i class='bx bx-rocket'></i>
        </div>
        <div className='feature-text'>
          <strong>Free Delivery</strong>
          <p>from 50%</p>
        </div>
      </div>
      <div className='feature'>
        <div className='feature-icon'>
          <i class='bx bx-like'></i>
        </div>
        <div className='feature-text'>
          <strong>99% Positive</strong>
          <p>Feedbacks</p>
        </div>
      </div>
      <div className='feature'>
        <div className='feature-icon'>
          <i class='bx bx-revision'></i>
        </div>
        <div className='feature-text'>
          <strong>1 week</strong>
          <p>for free return</p>
        </div>
      </div>
      <div className='feature'>
        <div className='feature-icon'>
          <i class='bx bxl-visa'></i>
        </div>
        <div className='feature-text'>
          <strong>Payment</strong>
          <p>Secure System</p>
        </div>
      </div>
      <div className='feature'>
        <div className='feature-icon'>
          <i class='bx bx-purchase-tag'></i>
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