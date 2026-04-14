import React from 'react';
import defaultImg from '../../../../assets/images/cameras-2.jpg';

const FormCart = ({ toggleCart, popupRef }) => {
    return (
        <div 
            ref={popupRef} 
            onClick={(e) => e.stopPropagation()} 
            className={`cart-modal w-[28rem] max-h-[32rem] absolute shadow-2xl -right-[4rem] top-14 z-[1000] border-t-4 bg-white border-rose-600 rounded-b-lg flex flex-col transition-all duration-300 ease-out origin-top-right ${
                toggleCart ? 'visible opacity-100 scale-100 translate-y-0' : 'invisible opacity-0 scale-95 translate-y-2'
            }`} 
            id='FormCart'
        >
            <div className='p-4 border-b border-gray-100 flex justify-between items-center'>
                <h3 className='text-lg font-semibold text-gray-800'>Giỏ hàng của bạn (3)</h3>
                <span className='text-sm text-rose-600 cursor-pointer hover:underline'>Xem tất cả</span>
            </div>
            
            <div className='w-full overflow-y-auto custom-scrollbar flex-1 max-h-[22rem] p-4 flex flex-col gap-4'>
                {/* Item 1 */}
                <div className='flex justify-between items-start w-full group'>
                    <div className='w-20 h-20 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        <img className='max-h-full max-w-full object-contain' src={defaultImg} alt="Sản phẩm" />
                    </div>
                    <div className='flex-1 ml-4'>
                        <a href='/product/1' className='leading-snug text-sm font-medium text-gray-800 hover:text-rose-600 line-clamp-2 mb-1 transition-colors'>
                            Đèn ngủ hình mèo Kawaii siêu dễ thương để bàn
                        </a>
                        <div className='text-xs text-gray-500 mb-2'>Phân loại: Vàng, Lớn</div>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-3'>
                                <span className="font-semibold text-rose-600">149.000 ₫</span>
                                <span className='text-xs text-gray-500'>x 1</span>
                            </div>
                        </div>
                    </div>
                    <button className='ml-2 text-gray-300 hover:text-red-500 transition-colors p-1'>
                        <i className='bx bx-trash text-lg'></i>
                    </button>
                </div>

                {/* Item 2 */}
                <div className='flex justify-between items-start w-full group'>
                    <div className='w-20 h-20 bg-gray-50 rounded-md border border-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0'>
                        <img className='max-h-full max-w-full object-contain' src={defaultImg} alt="Sản phẩm" />
                    </div>
                    <div className='flex-1 ml-4'>
                        <a href='/product/2' className='leading-snug text-sm font-medium text-gray-800 hover:text-rose-600 line-clamp-2 mb-1 transition-colors'>
                            Đèn chùm pha lê cao cấp phong cách Bắc Âu
                        </a>
                        <div className='text-xs text-gray-500 mb-2'>Phân loại: Ánh sáng trắng</div>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center gap-3'>
                                <span className="font-semibold text-rose-600">2.500.000 ₫</span>
                                <span className='text-xs text-gray-500'>x 2</span>
                            </div>
                        </div>
                    </div>
                    <button className='ml-2 text-gray-300 hover:text-red-500 transition-colors p-1'>
                        <i className='bx bx-trash text-lg'></i>
                    </button>
                </div>
            </div>

            <div className='p-4 border-t border-gray-100 bg-gray-50 rounded-b-lg'>
                <div className='flex justify-between items-center mb-4'>
                    <span className='text-gray-500 font-medium'>Tổng tạm tính:</span>
                    <span className='text-xl font-bold text-rose-600'>5.149.000 ₫</span>
                </div>
                <div className='flex justify-between gap-3'>
                    <button className='flex-1 py-2.5 px-4 rounded-md text-sm font-medium border border-rose-600 text-rose-600 bg-white hover:bg-rose-50 transition-colors'>
                        Xem giỏ hàng
                    </button>
                    <button className='flex-1 py-2.5 px-4 rounded-md text-sm font-medium bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm'>
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormCart;