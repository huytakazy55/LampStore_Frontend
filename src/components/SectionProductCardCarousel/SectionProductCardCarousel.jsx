import React from 'react'
import './SectionProductCardCarousel.css'
import Slider2 from "react-slick";
import iphone14 from '../../assets/images/Iphone14.jpg'
import tablet from '../../assets/images/apptablet.jpg'
import camera from '../../assets/images/camera2.jpg'
import camera2 from '../../assets/images/cameras-2.jpg'
import compute from '../../assets/images/computer.jpg'
import consal from '../../assets/images/consalGame.jpg'
import printer from '../../assets/images/printer.jpg'

const SectionProductCardCarousel = () => {
    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        rows: 2
      };
  return (
    <div className='SectionProductCardCarousel container'>
        <div className='SectionProductCardCarousel-title'>
            <h1>Laptops & Computers</h1>
        </div>
        <div className='SectionProductCardCarousel-content'>
            <Slider2 {...settings}>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={iphone14} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={camera} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={compute} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={consal} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={camera2} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={printer} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={tablet} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={iphone14} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={compute} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
                <div className='SectionProductCardCarousel-card'>
                    <div className='card'>
                        <div className='card-img'>
                            <img src={consal} alt="" />
                        </div>
                        <div className='card-content'>
                            <div className='cart-content-category'>Smartphone</div>
                            <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='hover-area'>
                        <div className='add-to-wishlist'>
                            <i class='bx bx-heart' ></i>
                            <p>Wishlist</p>
                        </div>
                        <div className='add-to-compare'>
                            <i class='bx bx-expand-alt' ></i>
                            <p>Compare</p>
                        </div>
                    </div>
                </div>
            </Slider2>
        </div>
    </div>
  )
}

export default SectionProductCardCarousel