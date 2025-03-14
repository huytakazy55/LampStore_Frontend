import React, { useState } from 'react'
import Header from '../MainPage/Header/Header'
import TopBar from '../MainPage/TopBar/TopBar'
import Footer from '../MainPage/Footer/Footer'
import mainimg from '../../../assets/images/Ultrabooks.jpg'

const ProductDetail = () => {
    const [activeProduct, setActiveProduct] = useState(false);

    const toggleProduct = () => {
        setActiveProduct(!activeProduct);
    }

    const [quantity, setQuantity] = useState(1);

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(prev - 1, 1)); // Giới hạn min = 1
    };

    const handleIncrease = () => {
        setQuantity((prev) => Math.min(prev + 1, 999)); // Giới hạn max = 999
    };

  return (
    <>
      <TopBar />
      <Header />
        <div className='w-full mb-2 xl:mx-auto xl:max-w-[1440px]'>
            <div className='flex justify-start items-center'>
               <a className='font-medium text-black' href="/">Shop</a> <i className='bx bx-chevron-right text-h3 -mt-[1px] px-[5px]'></i> Product Detail
            </div>
            <div className='w-full h-[39rem] py-6 bg-white flex justify-between gap-[3%] mb-4'>
                <div className='w-[37%] h-full'>
                    <div className='w-full h-3/4 border-[1px] border-black'>
                        <img className='w-full h-full' src={mainimg} alt="" />
                    </div>
                    <div className='flex justify-between items-center w-full h-1/5'>
                        <img className='w-[17%] border-[1px] border-transparent hover:border-rose-700' src={mainimg} alt="" />
                        <img className='w-[17%] border-[1px] border-transparent hover:border-rose-700' src={mainimg} alt="" />
                        <img className='w-[17%] border-[1px] border-transparent hover:border-rose-700' src={mainimg} alt="" />
                        <img className='w-[17%] border-[1px] border-transparent hover:border-rose-700' src={mainimg} alt="" />
                        <img className='w-[17%] border-[1px] border-transparent hover:border-rose-700' src={mainimg} alt="" />
                    </div>
                    <div className='flex justify-end items-center text-normal h-[5%] cursor-pointer'>
                       <i className='bx bx-heart text-h3 -mt-[1px] mr-1 text-rose-700'></i> Đã thích (219)
                    </div>
                </div>
                <div className='w-[60%] h-full'>
                    <div className='text-h3 leading-[1.3] mb-2'>OFFWHITE Ốp Điện Thoại Da Mềm Off White Cho IPhone 6S 7 Plus 8 Plus X XS XR XS Max 11 13 12 14 PRO Max 14 Plus 12 13 Mini</div>
                    <div className='flex justify-start items-center text-normal gap-3 py-1'>
                        <div className='range-start'>
                            4.8 
                            <span className='ml-1'>
                                <i className='bx bxs-star text-orange-600 text-small'></i>
                                <i className='bx bxs-star text-orange-600 text-small'></i>
                                <i className='bx bxs-star text-orange-600 text-small'></i>
                                <i className='bx bxs-star text-orange-600 text-small'></i>
                                <i className='bx bxs-star text-orange-600 text-small'></i>
                            </span>                            
                        </div>
                        <div>|</div>
                        <div className='range-count'>170 Đánh giá</div>
                        <div>|</div>
                        <div className='range-sellcount'>162 Đã bán</div>
                    </div>
                    <div className='flex justify-start items-center bg-slate-100 text-h2 gap-2 py-4 px-6 my-4'>
                        <div className='text-rose-700 font-medium'>₫200.000</div>
                        <div className='text-small text-black -mt-2'><del>₫180.000</del></div>
                        <div className='bg-orange-500 text-small text-rose-700 px-1'>-10%</div>
                    </div>
                    <div className='flex justify-start items-center w-full gap-8 mb-8'>
                        <div className='w-[10%] font-medium'>Phân loại</div>
                        <div className='max-h-32 overflow-y-scroll w-[90%] flex flex-wrap gap-2'>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Điện thoại</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Điện thoại</div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center w-full gap-8 mb-8'>
                        <div className='w-[10%] font-medium'>Sản phẩm</div>
                        <div className='max-h-32 overflow-y-scroll w-[90%] flex flex-wrap gap-2'>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11 màu cám lợn</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11 màu cám lợn</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11 màu cám lợn</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11 màu cám lợn</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11 màu cám lợn</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                            <div onClick={toggleProduct} className={`py-1 px-4 cursor-pointer relative after:content-["✔"] after:text-white after:absolute after:bottom-0 after:right-0 after:bg-rose-700 after:w-8 after:h-8 after:items-end after:justify-end after:text-[9px] after:pr-1 after:clip-custom border-[1px] ${activeProduct ? 'after:flex border-rose-700' : 'after:hidden border-gray-300'}`}>Iphone 11</div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center w-full gap-8 mb-8'>
                        <div className='w-[10%] font-medium'>Số lượng</div>
                        <div className='flex items-center overflow-hidden border-[1px] border-gray-300'>
                            <button onClick={handleDecrease} className='w-8 h-8 flex items-center justify-center cursor-pointer font-h3 bg-white text-gray-600 font-medium border-r hover:bg-rose-700 hover:text-white active:scale-95 transition'>-</button>
                            <input type="number" id="quantity"value={quantity} min="1" max="999" className="w-12 h-full text-rose-600 text-center text-sm outline-none border-none no-spinner" />
                            <button onClick={handleIncrease} className='w-8 h-8 flex items-center justify-center cursor-pointer font-h3 bg-white text-gray-600 font-medium border-l hover:bg-rose-700 hover:text-white active:scale-95 transition'>+</button>
                        </div>
                        <div className='PD-quantity-remain'>100 sản phẩm có sẵn</div>
                    </div>
                    <div className='flex justify-start items-center relative gap-4 h-12 after:w-full after:h-[1px] after:bg-slate-50 after:absolute after:-bottom-6'>
                        <button className='btn-addtocart border-[1px] border-rose-600 bg-rose-100 text-rose-600 flex justify-around items-center h-full py-2 px-6 rounded-sm'><i className='bx bxs-cart-add text-h1 mr-2'></i> Thêm vào giỏ hàng</button>
                        <button className='bg-rose-600 text-white h-full py-2 px-6 rounded-sm'>Mua ngay</button>
                    </div>
                    <div className='flex justify-between items-center mt-12'>
                        <div className='flex justify-around items-center gap-1'>
                            <i className='bx bxs-analyse text-h3 text-rose-700 -mt-1'></i>
                            Đổi ý miễn phí 15 ngày
                        </div>
                        <div className='flex justify-around items-center gap-1'>
                            <i className='bx bxs-check-shield text-h3 text-rose-700 -mt-1'></i>
                            Hàng chính hãng 100%
                        </div>
                        <div className='flex justify-around items-center gap-1'>
                            <i className='bx bxs-timer text-h3 text-rose-700 -mt-1'></i>
                            Miễn phí vận chuyển
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full max-h-[39rem] py-6 bg-white mb-4'>
                <div className='mb-10'>
                    <div className='text-h3 font-medium bg-slate-200 py-1 px-3 uppercase'>Chi tiết sản phẩm</div>
                    <div className='flex justify-start items-center gap-3 mt-6'>
                        <div className='w-[10%] font-medium'>
                            <div className='pb-2'>Tên sản phẩm</div>
                            <div className='pb-2'>Chất liệu</div>
                            <div className='pb-2'>Trọng lượng</div>
                            <div className='pb-2'>Tags</div>
                        </div>
                        <div>
                            <div className='pb-2'>OFFWHITE Ốp Điện Thoại Da Mềm Off White Cho IPhone 6S 7 Plus 8 Plus X XS XR XS Max 11 13 12 14 PRO Max 14 Plus 12 13 Mini</div>
                            <div className='pb-2'>Gỗ, Nhựa</div>
                            <div className='pb-2'>500 gram</div>
                            <div className='pb-2'>Khung gỗ, Tráng gương</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-h3 font-medium bg-slate-200 py-1 px-3 uppercase'>Mô tả sản phẩm</div>
                    <div className='py-6'>
                        QUY CÁCH ĐÓNG GÓI
                        - Gấu Bông được đựng trong hộp hoặc túi đóng gói cẩn thận.
                        - Nếu sản phẩm cỡ to, sẽ được hút chân không nhỏ gọn để đảm bảo vận chuyển dễ dàng. 
                        - Sau khi nhận hàng bạn vỗ đều SP để bông gòn được căng phồng như ban đầu. 
                        - Gấu Bông có thể chênh lệch về màu sắc và size do ánh sáng và cách đo khác nhau. 
                        GẤU BÔNG MIYU CAM KẾT VỚI KHÁCH HÀNG
                        - Miễn phí vận chuyển theo chính sách của Shopee
                        - Miễn phí trả hàng trong 15 ngày theo chính sách của Shopee
                        - Sản phẩm 100% giống mô tả - có video quay sản phẩm
                        - Đảm bảo chất lượng, dịch vụ tốt nhất, hàng được giao từ 1-5 ngày kể từ ngày đặt hàng 
                        - Giao hàng toàn quốc, nhận hàng kiểm tra thanh toán
                        Bán Sỉ, lẻ và CTV toàn quốc, chiết khấu cực cao. Hàng luôn có sẵn đầy kho, đặt là ship ngay!
                        ===========================
                        #capybara #gaubongchuot #lonnhoibong #gaubongmiyu #gaubonghanoi  #gaubong #quatang #phukien #gift #xuonggaubong #gaubonglon #nguamotsung #nguapony #bupbe #quatangbangai #dochoibong #gaubongteddy #choshiba #gauteddy #gauaolen #teddy
                    </div>
                </div>
                <div>
                    <div className='text-h3 font-medium bg-slate-200 py-1 px-3 uppercase'>Đánh giá sản phẩm</div>
                    <div className='PD-description-feedbackcontent'>
                        
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </>
  )
}

export default ProductDetail