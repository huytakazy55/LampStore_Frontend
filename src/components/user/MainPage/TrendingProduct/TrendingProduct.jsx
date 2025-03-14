import React from 'react'
import Slider3 from "react-slick";
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import tablet from '../../../../assets/images/apptablet.jpg'
import camera from '../../../../assets/images/camera2.jpg'
import camera2 from '../../../../assets/images/cameras-2.jpg'
import consal from '../../../../assets/images/consalGame.jpg'
import printer from '../../../../assets/images/printer.jpg'

const CustomPrevArrow = ({ onClick }) => (
    <button 
        className='absolute -top-[70px] right-8 bg-gray-300 hover:bg-gray-400'
        onClick={onClick}
    >
        <i className="bx bx-chevron-left text-3xl text-white"></i>
    </button>
);

const CustomNextArrow = ({ onClick }) => (
    <button 
        className='absolute -top-[70px] right-0 bg-gray-300 hover:bg-gray-400'
        onClick={onClick}
    >
        <i className="bx bx-chevron-right text-3xl text-white"></i>
    </button>
);

const TrendingProduct = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 3000,
    rows: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };
  return (
    <div className='w-full h-80 xl:mx-auto xl:max-w-[1440px]'>
        <div className='relative pb-2 border-b border-gray-300 mb-8 after:w-[13%] after:h-[1px] after:absolute after:bottom-0 after:bg-yellow-400'>
            <h3 className='text-h3 font-medium text-black'>Trending Product</h3>
        </div>
        <div className='h-64'>
          <Slider3 {...settings}>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={iphone14} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={tablet} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={camera} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={camera2} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={consal} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'>
              <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[60%]'>
                      <img src={printer} alt="" />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4'>
                      <div>
                          <div className='text-smaller'>Smartphone</div>
                          <div className='text-blue-400 text-small font-bold'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='mt-auto flex justify-between items-center'>
                          <div className='text-normal'>25.000.000<span>₫</span></div>
                          <div className='w-8 h-8 text-h2 bg-gray-300 leading-[1.3] rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-6 h-6 align-middle pl-[3px]' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                      <i className='bx bx-heart text-h3'></i>
                      <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
          </Slider3>
        </div>
    </div>
  )
}

export default TrendingProduct