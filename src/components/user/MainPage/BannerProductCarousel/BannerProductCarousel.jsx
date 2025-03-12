import React from 'react'
import Slider from "react-slick";
import imgBlock from '../../../../assets/images/TVbanner.jpg'
import consal from '../../../../assets/images/consalGame.jpg'
import speaker from '../../../../assets/images/WirelessSound.jpg'
import printer from '../../../../assets/images/printer.jpg'
import camera360 from '../../../../assets/images/360-camers.jpg'
import camera from '../../../../assets/images/camera2.jpg'
import laptop from '../../../../assets/images/laptop-2.jpg'


const BannerProductCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        rows: 2
      };
  return (
    <div className='w-full h-[36rem] bg-banner-product bg-cover bg-center mb-10'>
        <nav className='xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-full py-8'>
            <div className='h-full w-1/2'>
                <img className='w-full h-full' src={imgBlock} alt="" />
            </div>
            <div className='h-full w-1/2 text-h3'>
                <div className='relative font-medium text-black border-b border-gray-300 pb-1 mb-6 after:absolute after:w-[39%] after:h-[1px] after:bg-[var(--hightlight-color)] after:bottom-0 after:left-0'>Television Entertainment</div>
                <div className='relative'>
                    <Slider {...settings}>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={speaker} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={consal} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={camera} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={camera360} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={printer} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-[10px] bg-white !w-[98%] h-[11.5rem] mb-[7px] transition-all duration-300 ease-in-out hover:ring-1 ring-gray-300 z-10 group'>
                            <div className='flex justify-between gap-[10px]'>
                                <div className='w-2/5 flex items-center'>
                                    <img className='w-full' src={laptop} alt="" />
                                </div>
                                <div className='w-8/12'>
                                    <p className='text-smaller mb-2'>Game Consoles</p>
                                    <p className='text-small text-blue-500 font-medium mb-2'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='flex justify-between items-center mb-[10px]'>
                                        <div>
                                            <p className='text-h3'>1.000.000<span>đ</span></p>
                                            <p className='text-small line-through'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='group-hover:bg-[var(--hightlight-color)] w-8 h-8 bg-gray-300 rounded-[50%] leading-[1.5] text-white cursor-pointer mr-4 mt-3'>
                                            <i className='bx bxs-cart-add align-middle text-h3 ml-[0.3rem]' ></i>
                                        </div>
                                    </div>
                                    <div className='group-hover:visible group-hover:opacity-100 justify-around border-t border-gray-300 pt-2 invisible opacity-0'>
                                        <div className='text-gray-400 hover:text-gray-700 flex justify-center gap-1 leading-0 align-middle cursor-pointer'>
                                            <i className='bx bx-heart text-[17px] leading-[1.2] transition-all duration-300 ease-in-out'></i>
                                            <p className='wishlist text-small transition-all duration-300 ease-in-out'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default BannerProductCarousel