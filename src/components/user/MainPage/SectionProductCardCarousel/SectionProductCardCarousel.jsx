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
        nextArrow: <CustomNextArrow />
      };
  return (
    <div className='w-full h-[35rem] overflow-visible xl:mx-auto xl:max-w-[1440px]'>
        <div className='border-b border-gray-300 pb-1 relative mb-8 after:w-[16%] after:h-[1px] after:bg-yellow-400 after:absolute after:bottom-0 after:left-0'>
            <h3 className='font-medium text-h3 text-black'>Laptops & Computers</h3>
        </div>
        <div className='h-[30rem]'>
            <Slider2 {...settings}>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={iphone14} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={camera} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={compute} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={consal} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={camera2} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={printer} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={tablet} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={iphone14} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={compute} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='!w-[99%] h-[14.2rem] p-4 cursor-pointer relative m-1 hover:after:content-none hover:ring-1 hover:ring-gray-400 group'>
                    <div className='!flex justify-between items-center h-[10.5rem]'>
                        <div className='w-[45%]'>
                            <img src={consal} alt="" />
                        </div>
                        <div className='flex flex-col h-40 relative pr-2 pb-4 pl-4'>
                            <div>
                                <div className='text-smaller'>Smartphone</div>
                                <div className='text-blue-400 text-normal font-bold'>Camera C430W 4k with Waterproof cover</div>
                            </div>
                            <div className='mt-auto flex justify-between items-center '>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='w-10 h-10 text-h2 bg-gray-300 p-1 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.2] align-middle pl-[1px] ml-[1px]'></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex ml-[39%] border-t border-gray-300 pt-[0.6rem] justify-around items-center text-normal text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                        <div className='flex leading-[1.4] align-middle gap-[5px] hover:text-gray-500'>
                            <i className='bx bx-heart text-h3'></i>
                            <p>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
            </Slider2>
        </div>
    </div>
  )
}

export default SectionProductCardCarousel