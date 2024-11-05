import React from 'react'
import './BestSeller.css'
import iphone14 from '../../../../assets/images/Iphone14.jpg'
import tablet from '../../../../assets/images/apptablet.jpg'
import camera from '../../../../assets/images/camera2.jpg'
import camera2 from '../../../../assets/images/cameras-2.jpg'
import consal from '../../../../assets/images/consalGame.jpg'

const BestSeller = () => {
  return (
    <div className='BestSeller'>
        <div className='container'>
            <div className='BestSeller-title'>
                <h1>BestSellers</h1>
                <div className='BestSeller-category'>
                    <a href="#">Smart Phones & Tablets</a>
                    <a href="#">Laptops & Computers</a>
                    <a href="#">Video Cameras</a>
                </div>
            </div>
            <div className='BestSeller-content'>
                <div className='BestSeller-content-small'>
                    <div className='border-content'>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={iphone14} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={tablet} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={camera} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={consal} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                    <div className='border-content'>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={camera2} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={camera} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={camera2} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                        <div className='content-small-card'>
                            <div className='content-main-category'>
                                Game Consoles, Video Games & Consoles
                            </div>
                            <div className='content-main-name'>
                                Game Console Controller + USB 3.0 Cable
                            </div>
                            <div className='border-img'>
                                <img src={tablet} alt="" />
                            </div>
                            <div className='price-add-to-cart'>
                                <div className='price'>25.000.000<span>₫</span></div>
                                <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='BestSeller-content-main'>
                    <div className='content-main-category'>
                        Game Consoles, Video Games & Consoles
                    </div>
                    <div className='content-main-name'>
                        Game Console Controller + USB 3.0 Cable
                    </div>
                    <div className='border-img'>
                        <img src={consal} alt="" />
                    </div>
                    <div className='content-main-thumbnail'>
                        <img src={iphone14} alt="" />
                        <img src={iphone14} alt="" />
                        <img src={iphone14} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <div className='price'>25.000.000<span>₫</span></div>
                        <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BestSeller