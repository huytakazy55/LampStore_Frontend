import React from 'react'
import Slider from "react-slick";
import Banner1 from '../../../../assets/images/banner_nen_01.jpeg'
import Banner2 from '../../../../assets/images/banner_nen_02.jpeg'
import Banner3 from '../../../../assets/images/banner_nen_03.jpeg'

export const SiteContent = () =>
{
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1200,
    fade: true,
    cssEase: '2s cubic-bezier(.26,.62,.77,.46)'
  };
  return (
    <div className="w-full h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[25rem] bg-black mb-4 md:mb-6">
      <Slider {...settings}>
        <div>
          <img className='w-full h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[25rem] object-cover' src={Banner1} alt="Banner 1" />
        </div>
        <div>
          <img className='w-full h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[25rem] object-cover' src={Banner2} alt="Banner 2" />
        </div>
        <div>
          <img className='w-full h-[12rem] sm:h-[16rem] md:h-[20rem] lg:h-[25rem] object-cover' src={Banner3} alt="Banner 3" />
        </div>
      </Slider>
    </div>
  )
}
