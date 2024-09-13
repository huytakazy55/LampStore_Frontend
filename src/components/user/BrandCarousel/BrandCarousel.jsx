import React from 'react'
import './BrandCarousel.css'
import Slider from "react-slick";
import Brand from '../../../assets/images/Brand.png'

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
    <div className='BrandCarousel container'>
        <Slider {...settings}>
            <div className='Border-BrandImage'>
                <img src={Brand} alt="" />
            </div>
            <div className='Border-BrandImage'>
                <img src={Brand} alt="" />
            </div>
            <div className='Border-BrandImage'>
                <img src={Brand} alt="" />
            </div>
            <div className='Border-BrandImage'>
                <img src={Brand} alt="" />
            </div>
            <div className='Border-BrandImage'>
                <img src={Brand} alt="" />
            </div>
        </Slider>
    </div>
  )
}

export default BrandCarousel