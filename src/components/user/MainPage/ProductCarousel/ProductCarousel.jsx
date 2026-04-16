import React, { useState, useEffect } from 'react';
import ProductManage from '../../../../Services/ProductManage';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../../assets/images/cameras-2.jpg';
import AddToCartModal from '../AddToCartModal';
import { useWishlist } from '../../../../WishlistContext';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const formatPrice = (price) => {
  if (!price) return '0';
  return price.toLocaleString('vi-VN');
};

const getImageSrc = (product) => {
  if (product.images && product.images.length > 0) {
    const path = product.images[0].imagePath || product.images[0].ImagePath;
    if (path) return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
  }
  if (product.Images && product.Images.length > 0) {
    const path = product.Images[0].imagePath || product.Images[0].ImagePath;
    if (path) return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
  }
  return defaultImg;
};

const ProductCard = ({ product, isLast, navigate, onAddToCartClick, isInWishlist, onToggleWishlist }) => {
  const variant = product.variant;
  const price = variant?.discountPrice || variant?.price || 0;
  const originalPrice = variant?.price || 0;
  const hasDiscount = variant?.discountPrice && variant.discountPrice < variant.price;

  return (
    <div
      className={`relative p-3 sm:p-4 md:p-6 transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group ${!isLast ? "lg:after:w-[1px] lg:after:h-3/4 lg:after:bg-gray-300 lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 hover:after:w-0" : ""
        }`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <p className='mb-2 md:mb-[15px] text-[10px] md:text-smaller text-gray-500 truncate'>
        {product.category?.name || 'Đèn ngủ'}
      </p>
      <strong className='text-blue-500 text-xs md:text-normal line-clamp-2 leading-tight block h-8 md:h-10'>
        {product.name}
      </strong>
      <div className='h-32 sm:h-40 md:h-48 flex justify-center items-center my-2 bg-gray-50 rounded-lg p-2 md:p-3'>
        <img
          className='max-h-full max-w-full object-contain drop-shadow-sm'
          src={getImageSrc(product)}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.src = defaultImg; }}
        />
      </div>
      <div className='flex justify-between items-center'>
        <div className='text-sm md:text-h3'>
          <p className='text-yellow-600 font-bold'>{formatPrice(price)} <span>đ</span></p>
          {hasDiscount && (
            <p className='text-xs md:text-small line-through text-gray-400'>{formatPrice(originalPrice)} <span>đ</span></p>
          )}
        </div>
        <div
          className='w-8 h-8 md:w-9 md:h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400 transition-colors flex justify-center items-center'
          onClick={(e) => {
            e.stopPropagation();
            onAddToCartClick(product);
          }}
        >
          <i className='bx bxs-cart-add text-lg md:text-h2 text-white'></i>
        </div>
      </div>
      <div className='flex justify-around mt-3 md:mt-4 border-t border-gray-300 py-2 md:py-[12px] text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
        <div
          className={`flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out ${isInWishlist ? 'text-rose-500' : 'hover:text-gray-600'}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
        >
          <i className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'} align-middle text-xs md:text-normal mr-1`}></i>
          <p className='wishlist text-xs md:text-sm'>{isInWishlist ? 'Đã yêu thích' : 'Thêm vào ưa thích'}</p>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductManage.GetProduct();
        const allProducts = response.data?.$values || response.data || [];

        const productsWithDetails = allProducts.map((product) => {
          const variant = product.variant;
          const imgData = product.images?.$values || product.images;
          const images = Array.isArray(imgData) ? imgData : [];
          return { ...product, variant, images };
        });

        setProducts(productsWithDetails);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products theo tab
  const getFilteredProducts = () => {
    let filtered = [...products];
    switch (activeTab) {
      case 'featured':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'onsale':
        filtered = filtered.filter(p => {
          const v = p.variant;
          return v && v.discountPrice && v.discountPrice < v.price;
        });
        filtered.sort((a, b) => {
          const discountA = a.variant ? (a.variant.price - a.variant.discountPrice) / a.variant.price : 0;
          const discountB = b.variant ? (b.variant.price - b.variant.discountPrice) / b.variant.price : 0;
          return discountB - discountA;
        });
        break;
      case 'toprated':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        break;
    }
    return filtered.slice(0, 10);
  };

  const displayProducts = getFilteredProducts();

  const tabs = [
    { key: 'featured', label: 'Nổi bật' },
    { key: 'onsale', label: 'Giảm giá' },
    { key: 'toprated', label: 'Đánh giá cao' },
  ];

  // Timeout để tránh spinner vô hạn
  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  // Ẩn section nếu không có sản phẩm
  if (!loading && products.length === 0) {
    return null;
  }

  if (loading) {
    return (
      <div className='w-full py-8 md:py-16 mb-4 xl:mx-auto xl:max-w-[1440px] flex justify-center items-center px-4 xl:px-0'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full mb-4 xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0'>
      <ul className='nav flex justify-center items-center gap-4 md:gap-8 text-sm md:text-h3 border-b border-gray-300 mb-4 cursor-pointer'>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={`flex justify-center items-center relative pb-2 ${activeTab === tab.key ? 'font-bold border-b-2 border-yellow-400' : ''
              }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <div className={`w-[5px] h-1 bg-yellow-400 rounded-xl absolute -bottom-[6px] ${activeTab === tab.key ? 'block' : 'hidden'
              }`}></div>
          </li>
        ))}
      </ul>
      <div className='tab-content'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0'>
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isLast={index === displayProducts.length - 1}
                navigate={navigate}
                onAddToCartClick={setCartModalProduct}
                isInWishlist={isInWishlist(product.id)}
                onToggleWishlist={toggleWishlist}
              />
            ))
          ) : null}
        </div>
      </div>

      {/* Modal */}
      <AddToCartModal
        isOpen={!!cartModalProduct}
        onClose={() => setCartModalProduct(null)}
        product={cartModalProduct}
      />
    </div>
  );
};

export default ProductCarousel;