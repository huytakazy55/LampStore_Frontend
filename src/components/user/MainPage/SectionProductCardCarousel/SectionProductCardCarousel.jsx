import React, { useState, useEffect } from 'react'
import Slider2 from "react-slick";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../../WishlistContext';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const CustomPrevArrow = ({ onClick }) => (
  <button
    className='absolute -top-[50px] md:-top-[70px] right-8 bg-gray-300 hover:bg-gray-400'
    onClick={onClick}
  >
    <i className="bx bx-chevron-left text-2xl md:text-3xl text-white"></i>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className='absolute -top-[50px] md:-top-[70px] right-0 bg-gray-300 hover:bg-gray-400'
    onClick={onClick}
  >
    <i className="bx bx-chevron-right text-2xl md:text-3xl text-white"></i>
  </button>
);

const ProductCardItem = ({ product, onClick, isInWishlist, onToggleWishlist }) => {
  const images = product.images?.$values || product.images || [];
  const firstImage = images.length > 0 ? images[0] : null;
  const imageSrc = firstImage
    ? `${API_ENDPOINT}${firstImage.imagePath?.startsWith('/') ? '' : '/'}${firstImage.imagePath}`
    : null;

  const variant = product.variant;
  const price = variant?.price || product.maxPrice || 0;
  const discountPrice = variant?.discountPrice || product.minPrice || 0;
  const displayPrice = discountPrice > 0 && discountPrice < price ? discountPrice : price;
  const hasDiscount = discountPrice > 0 && discountPrice < price;

  const formatPrice = (p) => {
    if (!p) return '0';
    return new Intl.NumberFormat('vi-VN').format(p);
  };

  return (
    <div
      className='!w-[98%] h-[11rem] md:h-[13rem] p-2 cursor-pointer relative m-1 border border-gray-200 hover:border-yellow-400 group bg-white rounded-sm transition-all duration-200'
      onClick={onClick}
    >
      <div className='flex gap-3 h-full'>
        {/* Ảnh sản phẩm */}
        <div className='h-full aspect-square flex-shrink-0 bg-gray-50 flex items-center justify-center'>
          {imageSrc ? (
            <img src={imageSrc} alt={product.name} className='w-full h-full object-contain' />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <i className='bx bx-image text-3xl text-gray-300'></i>
            </div>
          )}
        </div>

        {/* Thông tin sản phẩm */}
        <div className='flex flex-col flex-1 py-1 min-w-0'>
          {/* Lượt bán */}
          <div className='text-[10px] md:text-xs text-gray-400 flex items-center gap-1 mb-1'>
            <i className='bx bx-purchase-tag text-yellow-500 text-xs'></i>
            Đã bán {product.sellCount || 0}
          </div>

          {/* Tên sản phẩm */}
          <div className='text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors'>
            {product.name}
          </div>

          {/* Giá */}
          <div className='mt-auto flex items-end justify-between'>
            <div>
              <div className='text-sm md:text-base font-bold text-red-500'>
                {formatPrice(displayPrice)}<span className='text-[10px] md:text-xs font-normal'>₫</span>
              </div>
              {hasDiscount && (
                <div className='text-[10px] md:text-xs text-gray-400 line-through'>
                  {formatPrice(price)}₫
                </div>
              )}
            </div>
            <div className='w-7 h-7 md:w-8 md:h-8 text-sm md:text-base bg-gray-200 rounded-full text-gray-500 group-hover:bg-yellow-400 group-hover:text-white flex items-center justify-center transition-colors duration-200'>
              <i className='bx bxs-cart-add'></i>
            </div>
          </div>
          {/* Wishlist button */}
          <div
            className={`flex items-center gap-1 text-[10px] md:text-xs cursor-pointer transition-colors ${isInWishlist ? 'text-rose-500' : 'text-gray-400 hover:text-rose-400'}`}
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          >
            <i className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'} text-sm`}></i>
            <span>{isInWishlist ? 'Đã yêu thích' : 'Yêu thích'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionProductCardCarousel = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchBestSelling = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/Products`);
        const allProducts = response.data?.$values || response.data || [];

        // Sort by SellCount descending and take top 12
        const sorted = [...allProducts]
          .filter(p => p.status)
          .sort((a, b) => (b.sellCount || 0) - (a.sellCount || 0))
          .slice(0, 12);

        setProducts(sorted);
      } catch (error) {
        console.error('Error fetching best selling products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSelling();
  }, []);

  var settings = {
    dots: true,
    infinite: products.length > 3,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    autoplaySpeed: 3000,
    rows: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          rows: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
        }
      }
    ]
  };

  // Hide section if no products
  if (!loading && products.length === 0) return null;

  return (
    <div className='w-full overflow-visible xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0 mb-8'>
      <div className='border-b border-gray-300 pb-1 relative mb-6 md:mb-8 after:w-[30%] md:after:w-[16%] after:h-[1px] after:bg-yellow-400 after:absolute after:bottom-0 after:left-0'>
        <h3 className='font-medium text-sm md:text-h3 text-black flex items-center gap-2'>
          <i className='bx bx-trending-up text-yellow-500'></i>
          Sản phẩm bán chạy
        </h3>
      </div>
      <div>
        {loading ? (
          <div className='flex items-center justify-center h-[300px]'>
            <i className='bx bx-loader-alt bx-spin text-3xl text-yellow-400'></i>
          </div>
        ) : (
          <Slider2 {...settings}>
            {products.map((product) => (
              <ProductCardItem
                key={product.id}
                product={product}
                onClick={() => navigate(`/product/${product.id}`)}
                isInWishlist={isInWishlist(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </Slider2>
        )}
      </div>
    </div>
  )
}

export default SectionProductCardCarousel