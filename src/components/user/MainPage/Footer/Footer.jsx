import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-700'>
            <div className='w-full h-[25rem] flex justify-between gap-[1%] py-8 xl:mx-auto xl:max-w-[1440px]'>
                <div className='w-[32%]'>
                    <div className='text-h2 font-semibold text-yellow-400 mb-8 uppercase'>
                        Tranh đèn ngủ 3D tráng gương 
                    </div>
                    <div className='text-normal text-white'>
                        <div className='flex justify-start items-center mb-4'>
                            <i className='bx bxs-map-pin text-h3 border-[1px] border-yellow-400 p-[5px] rounded-md mr-4' ></i>
                            <div className='address-text'>
                                A2 Vĩnh Hồ, Thịnh Quang, Đống Đa, Hà Nội
                            </div>
                        </div>
                        <div className='flex justify-start items-center mb-4'>
                            <i className='bx bxs-phone text-h3 border-[1px] border-yellow-400 p-[5px] rounded-md mr-4' ></i>
                            <div className='address-text'>
                                (+84)969 608 810
                            </div>
                        </div>
                        <div className='flex justify-start items-center mb-4'>
                            <i className='bx bxs-envelope text-h3 border-[1px] border-yellow-400 p-[5px] rounded-md mr-4' ></i>
                            <div className='address-text'>
                                Khongthaydoi124@gmail.com
                            </div>
                        </div>
                        <div className='flex justify-start items-center gap-4 mt-8 -ml-1'>
                            <i className='bx bxl-facebook-square text-h1 cursor-pointer hover:text-yellow-400' ></i>
                            <i className='bx bxl-instagram text-h1 cursor-pointer hover:text-yellow-400' ></i>
                            <i className='bx bxl-visa text-h1 cursor-pointer hover:text-yellow-400' ></i>
                            <i className='bx bxl-youtube text-h1 cursor-pointer hover:text-yellow-400' ></i>
                        </div>
                    </div>
                </div>
                <div className='w-1/4'>
                    <div className='text-h2 font-semibold text-yellow-400 mb-8 uppercase'>
                        Hỗ trợ khách hàng
                    </div>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            Giới thiệu
                        </div>
                    </a>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            Hướng dẫn sử dụng đèn ngủ để bàn
                        </div>
                    </a>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            Hướng dẫn chọn mua đèn ngủ để bàn
                        </div>
                    </a>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            Bảo hành sản phẩm
                        </div>
                    </a>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            Vận chuyển, giao nhận và thanh toán
                        </div>
                    </a>
                    <a href='#' className='text-normal text-white flex justify-start items-center mb-4 hover:text-yellow-400'>
                        <i className='bx bxs-chevron-right mr-2' ></i>
                        <div className='support-text'>
                            So sánh đèn tường đồng và đèn tường nhôm đúc
                        </div>
                    </a>
                </div>
                <div className='w-[40%] flex justify-center items-center'>
                    <iframe className='w-full h-[95%]' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6778758888713!2d105.81908607604745!3d21.005545788574118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5fb9812307%3A0x63c20c5aa29db56b!2zS2h1IHThuq1wIHRo4buDIEEyIHBo4buRIFbEqW5oIEjhu5MsIFRo4buLbmggUXVhbmcsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1726261210365!5m2!1svi!2s"
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <div className='w-full h-12 bg-black flex justify-center items-center'>
                <div className='text-normal text-gray-500'>
                    © 2024 | Bản quyền thuộc về <span className='text-yellow-400'>Lamp3D.vn</span>
                </div>  
            </div>
        </div>
    )
}

export default Footer