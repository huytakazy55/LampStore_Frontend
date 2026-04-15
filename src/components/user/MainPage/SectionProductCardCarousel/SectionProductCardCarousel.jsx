import React from 'react'
import Slider2 from "react-slick";
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import tablet from '../../../../assets/images/apptablet.jpg'
import camera from '../../../../assets/images/camera2.jpg'
import camera2 from '../../../../assets/images/cameras-2.jpg'
import compute from '../../../../assets/images/computer.jpg'
import consal from '../../../../assets/images/consalGame.jpg'
import printer from '../../../../assets/images/printer.jpg'


const CustomPrevArrow = ({ onClick }) => (
  <button
    className='absolute -top-[50px] md:-top-[70px] right-8 bg-gray-300 hover:bg-gray-400'
    onClick={onClick}
  >
    <i className="bx bx-chevron-left text-2xl md:text-3xl text-white"></i>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className='absolute -top-[50px] md:-top-[70px] right-0 bg-gray-300 hover:bg-gray-400'
    onClick={onClick}
  >
    <i className="bx bx-chevron-right text-2xl md:text-3xl text-white"></i>
  </button>
);

const ProductCardItem = ({ image }) => (
  <div className='!w-[99%] h-[12rem] md:h-[14.2rem] p-3 md:p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
    <div className='!flex justify-between items-center h-[8.5rem] md:h-[10.5rem]'>
      <div className='w-[40%] md:w-[45%]'>
        <img src={image} alt="" className='w-full' />
      </div>
      <div className='flex flex-col h-32 md:h-40 relative pr-1 md:pr-2 pb-2 md:pb-4 pl-2 md:pl-4'>
        <div>
          <div className='text-[10px] md:text-smaller'>Smartphone</div>
          <div className='text-blue-400 text-xs md:text-normal font-bold line-clamp-2'>Camera C430W 4k with Waterproof cover</div>
        </div>
        <div className='mt-auto flex justify-between items-center'>
          <div className='text-sm md:text-h3'>25.000.000<span>₫</span></div>
          <div className='w-8 h-8 md:w-10 md:h-10 text-lg md:text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400 flex items-center justify-center'>
            <i className='bx bxs-cart-add'></i>
          </div>
        </div>
      </div>
    </div>
    <div className='hidden md:flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
      <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
        <i className='bx bx-heart text-h3'></i>
        <p>Thêm vào ưa thích</p>
      </div>
    </div>
  </div>
);

const SectionProductCardCarousel = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 3000,
    rows: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
        }
      }
    ]
  };
  return (
    <div className='w-full overflow-visible xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0 mb-8'>
      <div className='border-b border-gray-300 pb-1 relative mb-6 md:mb-8 after:w-[30%] md:after:w-[16%] after:h-[1px] after:bg-yellow-400 after:absolute after:bottom-0 after:left-0'>
        <h3 className='font-medium text-sm md:text-h3 text-black'>Laptops & Computers</h3>
      </div>
      <div>
        <Slider2 {...settings}>
          <ProductCardItem image={iphone14} />
          <ProductCardItem image={camera} />
          <ProductCardItem image={compute} />
          <ProductCardItem image={consal} />
          <ProductCardItem image={camera2} />
          <ProductCardItem image={printer} />
          <ProductCardItem image={tablet} />
          <ProductCardItem image={iphone14} />
          <ProductCardItem image={compute} />
          <ProductCardItem image={consal} />
        </Slider2>
      </div>
    </div>
  )
}

export default SectionProductCardCarousel