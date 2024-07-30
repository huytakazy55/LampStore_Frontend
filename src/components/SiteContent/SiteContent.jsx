import React from 'react'
import './SiteContent.css'
import Slider from "react-slick";
import Banner1 from '../../assets/images/banner1.jpg'
import Banner2 from '../../assets/images/banner2.jpg'
import Banner3 from '../../assets/images/banner3.jpg'

export const SiteContent = () => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 200,
        fade: true,
        cssEase: 'linear'
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
