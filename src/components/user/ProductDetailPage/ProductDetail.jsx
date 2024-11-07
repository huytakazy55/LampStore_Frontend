import React from 'react'
import './ProductDetail.css'
import Header from '../MainPage/Header/Header'
import TopBar from '../MainPage/TopBar/TopBar'
import Footer from '../MainPage/Footer/Footer'
import mainimg from '../../../assets/images/Ultrabooks.jpg'

const ProductDetail = () => {
  return (
    <>
      <TopBar />
      <Header />
        <div className='ProductDetail container'>
            <div className='ProductDetail-breadcrumb'>
               <a href="/">Shop</a> <i class='bx bx-chevron-right'></i> Product Detail
            </div>
            <div className='ProductDetail-content'>
                <div className='ProductDetail-content-left'>
                    <div className='PD-left-borderimg'>
                        <img src={mainimg} alt="" />
                    </div>
                    <div className='PD-left-img-thumbnain'>
                        <img src={mainimg} alt="" />
                        <img src={mainimg} alt="" />
                        <img src={mainimg} alt="" />
                        <img src={mainimg} alt="" />
                        <img src={mainimg} alt="" />
                    </div>
                    <div className='PD-left-img-favoritecount'>
                       <i class='bx bx-heart'></i> Đã thích (219)
                    </div>
                </div>
                <div className='ProductDetail-content-right'>
                    <div className='PD-right-title'>OFFWHITE Ốp Điện Thoại Da Mềm Off White Cho IPhone 6S 7 Plus 8 Plus X XS XR XS Max 11 13 12 14 PRO Max 14 Plus 12 13 Mini</div>
                    <div className='PD-right-range'>
                        <div className='range-start'>
                            4.8 
                            <span>
                                   <i class='bx bxs-star'></i>
                                   <i class='bx bxs-star'></i>
                                   <i class='bx bxs-star'></i>
                                   <i class='bx bxs-star'></i>
                                   <i class='bx bxs-star'></i>
                            </span>                            
                        </div>
                        <div>|</div>
                        <div className='range-count'>170 Đánh giá</div>
                        <div>|</div>
                        <div className='range-sellcount'>162 Đã bán</div>
                    </div>
                    <div className='PD-right-price'>
                        <div className='PD-price-originalprice'>₫200.000</div>
                        <div className='PD-price-saleprice'><del>₫180.000</del></div>
                        <div className='price-discount'>-10%</div>
                    </div>
                    <div className='PD-right-producttype'>
                        <div className='PD-producttype-title'>Phân loại</div>
                        <div className='PD-border-value'>
                            <div className='PD-producttype-value'>Điện thoại</div>
                            <div className='PD-producttype-value'>Điện thoại</div>
                        </div>
                    </div>
                    <div className='PD-right-productvalue'>
                        <div className='PD-productvalue-title'>Sản phẩm</div>
                        <div className='PD-border-value'>
                            <div className='PD-productvalue-value'>Iphone 11 màu cám lợn</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11 màu cám lợn</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11 màu cám lợn</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11 màu cám lợn</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11 màu cám lợn</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                            <div className='PD-productvalue-value'>Iphone 11</div>
                        </div>
                    </div>
                    <div className='PD-right-quantity'>
                        <div className='PD-quantity-title'>Số lượng</div>
                        <div className='PD-quantity-controls'>
                            <button className='btn-quantity decrease'>-</button>
                            <input type="number" id="quantity" min="1" max="999" class="input-quantity" />
                            <button className='btn-quantity increase'>+</button>
                        </div>
                        <div className='PD-quantity-remain'>100 sản phẩm có sẵn</div>
                    </div>
                    <div className='PD-right-addtocartandsell'>
                        <button className='btn-addtocart'><i class='bx bxs-cart-add'></i> Thêm vào giỏ hàng</button>
                        <button className='btn-buynow'>Mua ngay</button>
                    </div>
                    <div className='PD-right-service'>
                        <div className='PD-service-change'>
                            <i class='bx bxs-analyse'></i>
                            Đổi ý miễn phí 15 ngày
                        </div>
                        <div className='PD-service-origin'>
                            <i class='bx bxs-check-shield' ></i>
                            Hàng chính hãng 100%
                        </div>
                        <div className='PD-service-ship'>
                            <i class='bx bxs-timer' ></i>
                            Miễn phí vận chuyển
                        </div>
                    </div>
                </div>
            </div>
            <div className='ProductDetail-description'>
                <div className='PD-description-detail'>
                    <div className='PD-description-detailtitle'>Chi tiết sản phẩm</div>
                    <div className='PD-description-detailcontent'>
                        <div className='PDD-detailcontent-left'>
                            <div className='PDD-detailcontent-left-title'>Tên sản phẩm</div>
                            <div className='PDD-detailcontent-left-title'>Chất liệu</div>
                            <div className='PDD-detailcontent-left-title'>Trọng lượng</div>
                            <div className='PDD-detailcontent-left-title'>Tags</div>
                        </div>
                        <div className='PDD-detailcontent-right'>
                            <div className='PDD-detailcontent-right-content'>OFFWHITE Ốp Điện Thoại Da Mềm Off White Cho IPhone 6S 7 Plus 8 Plus X XS XR XS Max 11 13 12 14 PRO Max 14 Plus 12 13 Mini</div>
                            <div className='PDD-detailcontent-right-content'>Gỗ, Nhựa</div>
                            <div className='PDD-detailcontent-right-content'>500 gram</div>
                            <div className='PDD-detailcontent-right-content'>Khung gỗ, Tráng gương</div>
                        </div>
                    </div>
                </div>
                <div className='PD-description-detaildescription'>
                    <div className='PD-description-detailtitle'>Mô tả sản phẩm</div>
                    <div className='PD-description-detaildescriptioncontent'>
                        
                    </div>
                </div>
            </div>
        </div>
      <Footer />
    </>
  )
}

export default ProductDetail