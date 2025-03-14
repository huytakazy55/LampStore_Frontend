import React from 'react'
import Banner1 from '../../../../assets/images/Banners_03.jpg'
import Banner2 from '../../../../assets/images/Banners_02.jpg'

const BannerImage = () => {
  return (
    <div className='w-full h-40 mt-16 xl:mx-auto xl:max-w-[1440px]'>
        <div className='flex justify-between items-center w-full h-40'>
            <img className='w-[49%] h-full' src={Banner1} alt="" />
            <img className='w-[49%] h-full' src={Banner2} alt="" />
        </div>
    </div>
  )
}

export default BannerImage