import React, {useState} from 'react';
import './ProductCarousel.css';
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
    <div className='w-full h-[35rem] mb-4 xl:mx-auto xl:max-w-[1440px]'>
        <ul className='nav nav-inline'>
            <li className={`nav-item ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => handleTabClick('featured')}>
                Featured
                <div className='choose-item'></div>
            </li>
            <li className={`nav-item ${activeTab === 'onsale' ? 'active' : ''}`}
            onClick={() => handleTabClick('onsale')}>
                On Sale
                <div className='choose-item'></div>
            </li>
            <li className={`nav-item ${activeTab === 'toprated' ? 'active' : ''}`}
            onClick={() => handleTabClick('toprated')}>
                Top Rated
                <div className='choose-item'></div>
            </li>
        </ul>
        <div className='tab-content'>
            <div className={`tab-pane ${activeTab === 'featured' ? 'active' : ''}`}>
                <div className='tab-pane-item'>
                    <p className='tab-category'>Audio Speakers</p>
                    <strong className='tab-nameproduct'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={speaker} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <div className='tab-price'>
                            <p className='tab-price-sale'>1.000.000 <span>đ</span></p>
                            <p className='tab-price-notsale'>1.500.000 <span>đ</span></p>
                        </div>
                        <div className='tab-addtocart-wrap'>
                            <i class='bx bx-cart-add' ></i>
                        </div>
                    </div>
                    <div className='tab-action'>
                        <div className='action-addwishlist'>
                            <i class='bx bx-heart' ></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
                <div className='tab-pane-item'>
                    <p className='tab-category'>Audio Speakers</p>
                    <strong className='tab-nameproduct'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={tablet} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <p className='tab-price'>1.000.000 <span>đ</span></p>
                        <div className='tab-addtocart-wrap'>
                            <i class='bx bx-cart-add' ></i>
                        </div>
                    </div>
                    <div className='tab-action'>
                        <div className='action-addwishlist'>
                            <i class='bx bx-heart' ></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='tab-pane-item'>
                    <p className='tab-category'>Audio Speakers</p>
                    <strong className='tab-nameproduct'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={headphone} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <p className='tab-price'>1.000.000 <span>đ</span></p>
                        <div className='tab-addtocart-wrap'>
                            <i class='bx bx-cart-add' ></i>
                        </div>
                    </div>
                    <div className='tab-action'>
                        <div className='action-addwishlist'>
                            <i class='bx bx-heart' ></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='tab-pane-item'>
                    <p className='tab-category'>Audio Speakers</p>
                    <strong className='tab-nameproduct'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={ultrabooks} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <p className='tab-price'>1.000.000 <span>đ</span></p>
                        <div className='tab-addtocart-wrap'>
                            <i class='bx bx-cart-add' ></i>
                        </div>
                    </div>
                    <div className='tab-action'>
                        <div className='action-addwishlist'>
                            <i class='bx bx-heart' ></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>

                <div className='tab-pane-item'>
                    <p className='tab-category'>Audio Speakers</p>
                    <strong className='tab-nameproduct'>Wireless audio system multiroom 360</strong>
                    <div className='tab-img'>
                        <img src={iphone} alt="" />
                    </div>
                    <div className='price-add-to-cart'>
                        <p className='tab-price'>1.000.000 <span>đ</span></p>
                        <div className='tab-addtocart-wrap'>
                            <i class='bx bx-cart-add' ></i>
                        </div>
                    </div>
                    <div className='tab-action'>
                        <div className='action-addwishlist'>
                            <i class='bx bx-heart' ></i>
                            <p className='wishlist'>Thêm vào ưa thích</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`tab-pane ${activeTab === 'onsale' ? 'active' : ''}`}>
                <p>hihi</p>
            </div>
            <div className={`tab-pane ${activeTab === 'toprated' ? 'active' : ''}`}>
                <p>Hee hee</p>
            </div>
        </div>
    </div>
  )
}

export default ProductCarousel