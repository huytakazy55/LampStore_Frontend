import React, { useState, useEffect } from 'react';
import ProductManage from '../../../../Services/ProductManage';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../../assets/images/cameras-2.jpg';
import AddToCartModal from '../AddToCartModal';
import { useWishlist } from '../../../../WishlistContext';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const formatPrice = (price) =>
{
  if (!price) return '0';
  return price.toLocaleString('vi-VN');
};

const getImageSrc = (product) =>
{
  if (product.images && product.images.length > 0)
  {
    const path = product.images[0].imagePath || product.images[0].ImagePath;
    if (path) return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
  }
  if (product.Images && product.Images.length > 0)
  {
    const path = product.Images[0].imagePath || product.Images[0].ImagePath;
    if (path) return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
  }
  return defaultImg;
};

const ProductCard = ({ product, isLast, navigate, onAddToCartClick, isInWishlist, onToggleWishlist }) =>
{
  const variant = product.variant;
  const price = variant?.discountPrice || variant?.price || 0;
  const originalPrice = variant?.price || 0;
  const hasDiscount = variant?.discountPrice && variant.discountPrice < variant.price;
  const discountPercent = hasDiscount ? Math.round((1 - variant.discountPrice / variant.price) * 100) : 0;

  return (
    <div
      className="relative group cursor-pointer bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 border border-gray-100 m-1"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-rose-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg">
          -{discountPercent}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm ${isInWishlist
          ? 'bg-rose-500 text-white scale-110'
          : 'bg-white/80 text-gray-400 hover:bg-rose-50 hover:text-rose-500 hover:scale-110'
          }`}
        onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
      >
        <i className={`bx ${isInWishlist ? 'bxs-heart' : 'bx-heart'} text-base`}></i>
      </button>

      {/* Image Container */}
      <div className="relative h-44 sm:h-52 md:h-56 bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 overflow-hidden">
        <img
          className="max-h-full max-w-full object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
          src={getImageSrc(product)}
          alt={product.name}
          loading="lazy"
          onError={(e) => { e.target.src = defaultImg; }}
        />
      </div>

      {/* Content */}
      <div className="p-3.5 md:p-4">
        {/* Category */}
        <p className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider mb-1.5">
          {product.category?.name || 'Đèn ngủ'}
        </p>

        {/* Title */}
        <h3 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[2.4em] group-hover:text-amber-700 transition-colors duration-200">
          {product.name}
        </h3>

        {/* Price + Cart Row */}
        <div className="flex items-end justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <div className="text-base md:text-lg font-bold text-amber-600">
              {formatPrice(price)}<span className="text-xs font-normal ml-0.5">₫</span>
            </div>
            {hasDiscount && (
              <div className="text-[10px] md:text-xs text-gray-400 line-through -mt-0.5">
                {formatPrice(originalPrice)}₫
              </div>
            )}
          </div>
          <button
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-amber-200 group-hover:scale-105 active:scale-95"
            onClick={(e) =>
            {
              e.stopPropagation();
              onAddToCartClick(product);
            }}
          >
            <i className='bx bxs-cart-add text-lg md:text-xl'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = () =>
{
  const [activeTab, setActiveTab] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() =>
  {
    const fetchProducts = async () =>
    {
      try
      {
        setLoading(true);
        const response = await ProductManage.GetProduct();
        const allProducts = response.data?.$values || response.data || [];

        const productsWithDetails = allProducts.map((product) =>
        {
          const variant = product.variant;
          const imgData = product.images?.$values || product.images;
          const images = Array.isArray(imgData) ? imgData : [];
          return { ...product, variant, images };
        });

        setProducts(productsWithDetails);
      } catch (error)
      {
        console.error('Error fetching products:', error);
      } finally
      {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products theo tab
  const getFilteredProducts = () =>
  {
    let filtered = [...products];
    switch (activeTab)
    {
      case 'featured':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'onsale':
        filtered = filtered.filter(p =>
        {
          const v = p.variant;
          return v && v.discountPrice && v.discountPrice < v.price;
        });
        filtered.sort((a, b) =>
        {
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
    { key: 'featured', label: 'Nổi bật', icon: 'bx bxs-star' },
    { key: 'onsale', label: 'Giảm giá', icon: 'bx bxs-purchase-tag' },
    { key: 'toprated', label: 'Đánh giá cao', icon: 'bx bxs-like' },
  ];

  // Timeout để tránh spinner vô hạn
  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      if (loading) setLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [loading]);

  // Ẩn section nếu không có sản phẩm
  if (!loading && products.length === 0)
  {
    return null;
  }

  if (loading)
  {
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
      <div className='flex justify-center items-center gap-2 md:gap-3 mb-6 md:mb-8'>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${activeTab === tab.key
                ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-lg shadow-amber-200 scale-105'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <i className={`${tab.icon} text-sm md:text-base`}></i>
            {tab.label}
          </button>
        ))}
      </div>
      <div className='tab-content'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4'>
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