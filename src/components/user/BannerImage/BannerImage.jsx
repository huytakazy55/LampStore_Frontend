import React from 'react'
import './BannerImage.css'
import Banner1 from '../../../assets/images/Banners_03.jpg'
import Banner2 from '../../../assets/images/Banners_02.jpg'

const BannerImage = () => {
  return (
    <div className='BannerImage container'>
        <div className='BannerImage-borderImage'>
            <img src={Banner1} alt="" />
            <img src={Banner2} alt="" />
        </div>
    </div>
  )
}

export default BannerImage