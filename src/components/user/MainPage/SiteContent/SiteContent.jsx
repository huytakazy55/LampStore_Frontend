import React from 'react'
import './SiteContent.css'
import Slider from "react-slick";
import Banner1 from '../../../../assets/images/Banner_DenNgu01.jpg'
import Banner2 from '../../../../assets/images/Banner_Denngu02.jpg'
import Banner3 from '../../../../assets/images/Banner_DenNgu03.jpg'

export const SiteContent = () => {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1200,
    fade: true,
    cssEase: '2s cubic-bezier(.26,.62,.77,.46)'
  };
  return (
    <div className="SiteContent">
      <Slider {...settings}>
        <div>
          <img src={Banner1} alt="Banner 1" />
        </div>
        <div>
          <img src={Banner2} alt="Banner 2" />
        </div>
        <div>
          <img src={Banner3} alt="Banner 3" />
        </div>
      </Slider>
    </div>
  )
}
