import React from 'react'
import Slider from "react-slick";
import './BannerProductCarousel.css'
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
        autoplay: true,
        autoplaySpeed: 3000,
        rows: 2
      };
  return (
    <div className='BannerProductCarousel'>
        <nav className='xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-full'>
            <div className='img-block'>
                <img src={imgBlock} alt="" />
            </div>
            <div className='product-block'>
                <div className='product-block-title'>Television Entertainment</div>
                <div className='product-cart-wrap'>
                    <Slider {...settings}>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={speaker} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={consal} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={camera} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={camera360} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={printer} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='product-cart'>
                            <div className='cart-wrap'>
                                <div className='product-cart-img'>
                                    <img src={laptop} alt="" />
                                </div>
                                <div className='product-cart-content'>
                                    <p className='cart-category'>Game Consoles</p>
                                    <p className='cart-title'>Game Console Controller + USB 3.0 Cable</p>
                                    <div className='cart-price-addtocart'>
                                        <div className='cart-price'>
                                            <p className='cart-saleprice'>1.000.000<span>đ</span></p>
                                            <p className='cart-notsaleprice'>1.000.000<span>đ</span></p>
                                        </div>
                                        <div className='cart-addtocart-wrap'>
                                            <i class='bx bx-cart-add' ></i>
                                        </div>
                                    </div>
                                    <div className='cart-action-addtowishlist'>
                                        <div className='add-wishlist'>
                                            <i class='bx bx-heart' ></i>
                                            <p className='wishlist'>Thêm vào ưa thích</p>
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