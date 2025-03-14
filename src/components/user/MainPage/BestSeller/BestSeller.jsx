import React from 'react'
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import tablet from '../../../../assets/images/apptablet.jpg'
import camera from '../../../../assets/images/camera2.jpg'
import camera2 from '../../../../assets/images/cameras-2.jpg'
import consal from '../../../../assets/images/consalGame.jpg'

const BestSeller = () => {
  return (
    <div className='w-full h-[55rem] bg-gray-100'>
        <div className='xl:mx-auto xl:max-w-[1440px]'>
            <div className='border-b border-gray-300 pb-1 relative mb-8 pt-6 flex justify-between after:w-1/12 after:h-[1px] after:absolute after:bottom-0 after:bg-yellow-400'>
                <h3 className='text-h3 font-medium text-black'>BestSellers</h3>
                <div className='text-normal flex justify-center gap-8 items-center font-medium'>
                    <a className='text-gray-400 hover:text-gray-600' href="#">Smart Phones & Tablets</a>
                    <a className='text-gray-400 hover:text-gray-600' href="#">Laptops & Computers</a>
                    <a className='text-gray-400 hover:text-gray-600' href="#">Video Cameras</a>
                </div>
            </div>
            <div className='w-full h-[45rem] flex justify-between gap-[0.5%]'>
                <div className='w-[70%] h-full'>
                    <div className='flex justify-between mb-2'>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={iphone14} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={tablet} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={camera} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={consal} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={camera2} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={camera} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={camera2} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                        <div className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                            <div className='text-smaller'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='text-small text-blue-400 font-bold'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='h-52 flex justify-center items-center'>
                                <img src={tablet} alt="" />
                            </div>
                            <div className='mt-auto flex justify-around items-center'>
                                <div className='text-h3'>25.000.000<span>₫</span></div>
                                <div className='text-h2 bg-gray-300 w-8 h-8 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add w-8 h-8 leading-[1.4] align-middle pl-[3px]' ></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[33%] h-full bg-white p-6 flex flex-col hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'>
                    <div className='text-smaller'>
                        Game Consoles, Video Games & Consoles
                    </div>
                    <div className='text-normal text-blue-400 font-bold'>
                        Game Console Controller + USB 3.0 Cable
                    </div>
                    <div className='w-full h-[65%] flex justify-center items-center'>
                        <img className='w-[90%] h-[90%]' src={consal} alt="" />
                    </div>
                    <div className='flex gap-[10px]'>
                        <img className='w-20 h-20 border-[1px] border-gray-300' src={iphone14} alt="" />
                        <img className='w-20 h-20 border-[1px] border-gray-300' src={iphone14} alt="" />
                        <img className='w-20 h-20 border-[1px] border-gray-300' src={iphone14} alt="" />
                    </div>
                    <div className='mt-auto flex justify-between items-center'>
                        <div className='text-h3'>25.000.000<span>₫</span></div>
                        <div className='text-h2 w-9 h-9 bg-gray-300 leading-0 align-middle rounded-[50%] text-white group-hover:bg-yellow-400'><i className='bx bxs-cart-add leading-[1.4] align-middle pl-1' ></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BestSeller