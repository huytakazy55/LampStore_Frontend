import React from 'react'
import './Footer.css'

const Footer = () => {
    return (
        <div className='Footer'>
            <div className='Footer-border container'>
                <div className='Footer-location'>
                    <div className='Footer-title'>
                        Tranh đèn ngủ 3D tráng gương 
                    </div>
                    <div className='Footer-location-address'>
                        <div className='address-content'>
                            <i class='bx bxs-map-pin' ></i>
                            <div className='address-text'>
                                A2 Vĩnh Hồ, Thịnh Quang, Đống Đa, Hà Nội
                            </div>
                        </div>
                        <div className='address-content'>
                            <i class='bx bxs-phone' ></i>
                            <div className='address-text'>
                                (+84)969 608 810
                            </div>
                        </div>
                        <div className='address-content'>
                            <i class='bx bxs-envelope' ></i>
                            <div className='address-text'>
                                Khongthaydoi124@gmail.com
                            </div>
                        </div>
                        <div className='Social-icon'>
                            <i class='bx bxl-facebook-square' ></i>
                            <i class='bx bxl-instagram' ></i>
                            <i class='bx bxl-visa' ></i>
                            <i class='bx bxl-youtube' ></i>
                        </div>
                    </div>
                </div>
                <div className='Footer-support'>
                    <div className='Footer-title'>
                        Hỗ trợ khách hàng
                    </div>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            Giới thiệu
                        </div>
                    </a>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            Hướng dẫn sử dụng đèn ngủ để bàn
                        </div>
                    </a>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            Hướng dẫn chọn mua đèn ngủ để bàn
                        </div>
                    </a>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            Bảo hành sản phẩm
                        </div>
                    </a>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            Vận chuyển, giao nhận và thanh toán
                        </div>
                    </a>
                    <a href='#' className='Footer-support-content'>
                        <i class='bx bxs-chevron-right' ></i>
                        <div className='support-text'>
                            So sánh đèn tường đồng và đèn tường nhôm đúc
                        </div>
                    </a>
                </div>
                <div className='Footer-map'>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.6778758888713!2d105.81908607604745!3d21.005545788574118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad5fb9812307%3A0x63c20c5aa29db56b!2zS2h1IHThuq1wIHRo4buDIEEyIHBo4buRIFbEqW5oIEjhu5MsIFRo4buLbmggUXVhbmcsIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZpZXRuYW0!5e0!3m2!1svi!2s!4v1726261210365!5m2!1svi!2s"
                        style={{ border: 0 }} 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
            <div className='Footer-bottom'>
                <div className='Footer-bottom-text'>
                    © 2024 | Bản quyền thuộc về <span>Lamp3D.vn</span>
                </div>  
            </div>
        </div>
    )
}

export default Footer