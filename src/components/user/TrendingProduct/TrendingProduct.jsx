import React from 'react'
import Slider3 from "react-slick";
import './TrendingProduct.css'
import iphone14 from '../../../assets/images/Iphone14.jpg'
import tablet from '../../../assets/images/apptablet.jpg'
import camera from '../../../assets/images/camera2.jpg'
import camera2 from '../../../assets/images/cameras-2.jpg'
import consal from '../../../assets/images/consalGame.jpg'
import printer from '../../../assets/images/printer.jpg'

const TrendingProduct = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    rows: 1
  };
  return (
    <div className='TrendingProduct container'>
        <div className='TrendingProduct-title'>
            <h1>Trending Product</h1>
        </div>
        <div className='TrendingProduct-content'>
          <Slider3 {...settings}>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={iphone14} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={tablet} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={camera} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={camera2} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={consal} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
            <div className='TrendingProduct-card'>
              <div className='card'>
                  <div className='card-img'>
                      <img src={printer} alt="" />
                  </div>
                  <div className='card-content'>
                      <div className='cart-content-content'>
                          <div className='cart-content-category'>Smartphone</div>
                          <div className='cart-content-title'>Camera C430W 4k with Waterproof cover</div>
                      </div>
                      <div className='price-add-to-cart'>
                          <div className='price'>25.000.000<span>₫</span></div>
                          <div className='add-to-cart'><i class='bx bx-cart-download' ></i></div>
                      </div>
                  </div>
              </div>
              <div className='hover-area'>
                  <div className='add-to-wishlist'>
                      <i class='bx bx-heart' ></i>
                      <p>Thêm vào ưa thích</p>
                  </div>
              </div>
            </div>
          </Slider3>
        </div>
    </div>
  )
}

export default TrendingProduct