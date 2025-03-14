import React from 'react'
import Slider from "react-slick";
import Brand from '../../../../assets/images/Brand.png'

const BrandCarousel = () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        rows: 1
      };
  return (
    <div className='h-28 border-y border-gray-300 mt-16 xl:mx-auto xl:max-w-[1440px]'>
        <Slider {...settings}>
            <div className='h-28 !flex justify-center items-center group'>
                <img className='opacity-50 group-hover:opacity-100 group-hover:cursor-pointer' src={Brand} alt="" />
            </div>
            <div className='h-28 !flex justify-center items-center group'>
                <img className='opacity-50 group-hover:opacity-100 group-hover:cursor-pointer' src={Brand} alt="" />
            </div>
            <div className='h-28 !flex justify-center items-center group'>
                <img className='opacity-50 group-hover:opacity-100 group-hover:cursor-pointer' src={Brand} alt="" />
            </div>
            <div className='h-28 !flex justify-center items-center group'>
                <img className='opacity-50 group-hover:opacity-100 group-hover:cursor-pointer' src={Brand} alt="" />
            </div>
            <div className='h-28 !flex justify-center items-center group'>
                <img className='opacity-50 group-hover:opacity-100 group-hover:cursor-pointer' src={Brand} alt="" />
            </div>
        </Slider>
    </div>
  )
}

export default BrandCarousel