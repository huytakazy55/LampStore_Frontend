import React, {useState} from 'react';
import speaker from '../../../../assets/images/WirelessSound.jpg';
import tablet from '../../../../assets/images/apptablet.jpg';
import headphone from '../../../../assets/images/headphone.jpg';
import ultrabooks from '../../../../assets/images/Ultrabooks.jpg';
import iphone from '../../../../assets/images/Iphone14.jpg';


const ProductCarousel = () => {
    const [activeTab, setActiveTab] = useState('featured');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
  return (
    <div className='w-full h-[32rem] mb-4 xl:mx-auto xl:max-w-[1440px]'>
        <ul className='nav flex justify-center items-center gap-8 text-h3 border-b border-gray-300 mb-4 cursor-pointer'>
            <li className={`flex justify-center items-center relative ${activeTab === 'featured' ? 'font-bold border-b-2 border-yellow-400' : ''}`}
            onClick={() => handleTabClick('featured')}>
                Featured
                <div className={`w-[5px] h-1 bg-yellow-400 rounded-xl absolute -bottom-[6px] ${activeTab === 'featured' ? 'block' : 'hidden'}`}></div>
            </li>
            <li className={`flex justify-center items-center relative ${activeTab === 'onsale' ? 'font-bold border-b-2 border-yellow-400' : ''}`}
            onClick={() => handleTabClick('onsale')}>
                On Sale
                <div className={`w-[5px] h-1 bg-yellow-400 rounded-xl absolute -bottom-[6px] ${activeTab === 'onsale' ? 'block' : 'hidden'}`}></div>
            </li>
            <li className={`flex justify-center items-center relative ${activeTab === 'toprated' ? 'font-bold border-b-2 border-yellow-400' : ''}`}
            onClick={() => handleTabClick('toprated')}>
                Top Rated
                <div className={`w-[5px] h-1 bg-yellow-400 rounded-xl absolute -bottom-[6px] ${activeTab === 'toprated' ? 'block' : 'hidden'}`}></div>
            </li>
        </ul>
        <div className='tab-content'>
            <div className={`justify-between items-center ${activeTab === 'featured' ? 'flex' : 'hidden'}`}>
                <div className='relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group after:w-[1px] after:h-3/4 after:bg-gray-300 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 hover:after:w-0'>
                    <p className='mb-[15px]'>Audio Speakers</p>
                    <strong className='text-blue-500 text-normal'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={speaker} alt="" />
                    </div>
                    <div className='h-10 flex justify-between items-center'>
                        <div className='text-h3'>
                            <p className='tab-price-sale'>1.000.000 <span>đ</span></p>
                            <p className='text-small line-through'>1.500.000 <span>đ</span></p>
                        </div>
                        <div className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400'>
                            <i className='bx bxs-cart-add w-9 h-9 text-h2 leading-[1.6] align-middle text-center -ml-[1px] text-white' ></i>
                        </div>
                    </div>
                    <div className='hidden justify-around mt-4 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex after:absolute after:-right-[1px] after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[1px] after:bg-gray-300'>
                        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
                            <i className='bx bx-heart align-middle text-normal mr-1'></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group after:w-[1px] after:h-3/4 after:bg-gray-300 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 hover:after:w-0'>
                    <p className='mb-[15px]'>Audio Speakers</p>
                    <strong className='text-blue-500 text-normal'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={tablet} alt="" />
                    </div>
                    <div className='h-10 flex justify-between items-center'>
                        <p className='text-h3'>1.000.000 <span>đ</span></p>
                        <div className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400'>
                            <i className='bx bxs-cart-add w-9 h-9 text-h2 leading-[1.6] align-middle text-center -ml-[1px] text-white' ></i>
                        </div>
                    </div>
                    <div className='hidden justify-around mt-4 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex after:absolute after:-right-[1px] after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[1px] after:bg-gray-300'>
                        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
                            <i className='bx bx-heart align-middle text-normal mr-1'></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group after:w-[1px] after:h-3/4 after:bg-gray-300 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 hover:after:w-0'>
                    <p className='mb-[15px]'>Audio Speakers</p>
                    <strong className='text-blue-500 text-normal'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={headphone} alt="" />
                    </div>
                    <div className='h-10 flex justify-between items-center'>
                        <p className='text-h3'>1.000.000 <span>đ</span></p>
                        <div className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400'>
                            <i className='bx bxs-cart-add w-9 h-9 text-h2 leading-[1.6] align-middle text-center -ml-[1px] text-white' ></i>
                        </div>
                    </div>
                    <div className='hidden justify-around mt-4 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex after:absolute after:-right-[1px] after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[1px] after:bg-gray-300'>
                        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
                            <i className='bx bx-heart align-middle text-normal mr-1'></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group after:w-[1px] after:h-3/4 after:bg-gray-300 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 hover:after:w-0'>
                    <p className='mb-[15px]'>Audio Speakers</p>
                    <strong className='text-blue-500 text-normal'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={ultrabooks} alt="" />
                    </div>
                    <div className='h-10 flex justify-between items-center'>
                        <p className='text-h3'>1.000.000 <span>đ</span></p>
                        <div className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400'>
                            <i className='bx bxs-cart-add w-9 h-9 text-h2 leading-[1.6] align-middle text-center -ml-[1px] text-white' ></i>
                        </div>
                    </div>
                    <div className='hidden justify-around mt-4 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex after:absolute after:-right-[1px] after:top-1/2 after:-translate-y-1/2 after:h-1/2 after:w-[1px] after:bg-gray-300'>
                        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
                            <i className='bx bx-heart align-middle text-normal mr-1'></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group'>
                    <p className='mb-[15px]'>Audio Speakers</p>
                    <strong className='text-blue-500 text-normal'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={iphone} alt="" />
                    </div>
                    <div className='h-10 flex justify-between items-center'>
                        <p className='text-h3'>1.000.000 <span>đ</span></p>
                        <div className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400'>
                            <i className='bx bxs-cart-add w-9 h-9 text-h2 leading-[1.6] align-middle text-center -ml-[1px] text-white' ></i>
                        </div>
                    </div>
                    <div className='hidden justify-around mt-3 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex'>
                        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
                            <i className='bx bx-heart align-middle text-normal mr-1'></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`justify-between items-center ${activeTab === 'onsale' ? 'flex' : 'hidden'}`}>
                <p>hihi</p>
            </div>
            <div className={`justify-between items-center ${activeTab === 'toprated' ? 'flex' : 'hidden'}`}>
                <p>Hee hee</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCarousel