import React, { useState, useEffect } from 'react';
import ProductManage from '../../../../Services/ProductManage';
import { useNavigate } from 'react-router-dom';
import defaultImg from '../../../../assets/images/cameras-2.jpg';
import AddToCartModal from '../AddToCartModal';

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

const ProductCard = ({ product, isLast, navigate, onAddToCartClick }) => {
  const variant = product.variants?.[0];
  const price = variant?.discountPrice || variant?.price || 0;
  const originalPrice = variant?.price || 0;
  const hasDiscount = variant?.discountPrice && variant.discountPrice < variant.price;

  return (
    <div
      className={`relative w-1/5 p-6 h-[27.5rem] transition-all duration-200 ease-in-out hover:ring-1 hover:ring-gray-300 hover:cursor-pointer group ${
        !isLast ? "after:w-[1px] after:h-3/4 after:bg-gray-300 after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 hover:after:w-0" : ""
      }`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <p className='mb-[15px] text-smaller text-gray-500 truncate'>
        {product.category?.name || 'Đèn ngủ'}
      </p>
      <strong className='text-blue-500 text-normal line-clamp-2 leading-tight block h-10'>
        {product.name}
      </strong>
      <div className='h-48 flex justify-center items-center my-2 bg-gray-50 rounded-lg p-3'>
        <img
          className='max-h-full max-w-full object-contain drop-shadow-sm'
          src={getImageSrc(product)}
          alt={product.name}
          onError={(e) => { e.target.src = defaultImg; }}
        />
      </div>
      <div className='h-10 flex justify-between items-center'>
        <div className='text-h3'>
          <p className='text-yellow-600 font-bold'>{formatPrice(price)} <span>đ</span></p>
          {hasDiscount && (
            <p className='text-small line-through text-gray-400'>{formatPrice(originalPrice)} <span>đ</span></p>
          )}
        </div>
        <div 
          className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400 transition-colors flex justify-center items-center'
          onClick={(e) => {
            e.stopPropagation();
            onAddToCartClick(product);
          }}
        >
          <i className='bx bxs-cart-add text-h2 text-white'></i>
        </div>
      </div>
      <div className='hidden justify-around mt-4 border-t border-gray-300 py-[12px] text-gray-400 group-hover:flex'>
        <div className='flex leading-[1.2] cursor-pointer transition-all duration-100 ease-in-out hover:text-gray-600'>
          <i className='bx bx-heart align-middle text-normal mr-1'></i>
          <p className='wishlist'>Thêm vào ưa thích</p>
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductManage.GetProduct();
        const allProducts = response.data?.$values || response.data || [];

        // Extract variants + images from each product (already in API response)
        const productsWithDetails = allProducts.map((product) => {
          const vData = product.variants?.$values || product.variants;
          const variants = Array.isArray(vData) ? vData : (vData ? [vData] : []);
          const imgData = product.images?.$values || product.images;
          const images = Array.isArray(imgData) ? imgData : [];
          return { ...product, variants, images };
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
        // Mới nhất
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'onsale':
        // Có giảm giá
        filtered = filtered.filter(p => {
          const v = p.variants?.[0];
          return v && v.discountPrice && v.discountPrice < v.price;
        });
        filtered.sort((a, b) => {
          const discountA = a.variants?.[0] ? (a.variants[0].price - a.variants[0].discountPrice) / a.variants[0].price : 0;
          const discountB = b.variants?.[0] ? (b.variants[0].price - b.variants[0].discountPrice) / b.variants[0].price : 0;
          return discountB - discountA;
        });
        break;
      case 'toprated':
        // Đánh giá nhiều nhất
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      default:
        break;
    }
    return filtered.slice(0, 5);
  };

  const displayProducts = getFilteredProducts();

  const tabs = [
    { key: 'featured', label: 'Nổi bật' },
    { key: 'onsale', label: 'Giảm giá' },
    { key: 'toprated', label: 'Đánh giá cao' },
  ];

  if (loading) {
    return (
      <div className='w-full h-[32rem] mb-4 xl:mx-auto xl:max-w-[1440px] flex justify-center items-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Đang tải sản phẩm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-[32rem] mb-4 xl:mx-auto xl:max-w-[1440px]'>
      <ul className='nav flex justify-center items-center gap-8 text-h3 border-b border-gray-300 mb-4 cursor-pointer'>
        {tabs.map((tab) => (
          <li
            key={tab.key}
            className={`flex justify-center items-center relative pb-2 ${
              activeTab === tab.key ? 'font-bold border-b-2 border-yellow-400' : ''
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <div className={`w-[5px] h-1 bg-yellow-400 rounded-xl absolute -bottom-[6px] ${
              activeTab === tab.key ? 'block' : 'hidden'
            }`}></div>
          </li>
        ))}
      </ul>
      <div className='tab-content'>
        <div className='flex justify-between items-center'>
          {displayProducts.length > 0 ? (
            displayProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                isLast={index === displayProducts.length - 1}
                navigate={navigate}
                onAddToCartClick={setCartModalProduct}
              />
            ))
          ) : (
            <div className='w-full flex justify-center items-center h-64 text-gray-400'>
              <div className='text-center'>
                <i className='bx bx-package text-5xl mb-2'></i>
                <p>Không có sản phẩm nào</p>
              </div>
            </div>
          )}
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