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

const SmallProductCard = ({ product, navigate, onAddToCartClick }) => {
  const variant = product.variants?.[0];
  const price = variant?.discountPrice || variant?.price || 0;

  return (
    <div
      className='w-[24.3%] h-[22.25rem] p-4 bg-white hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className='text-smaller text-gray-500 truncate'>
        {product.category?.name || 'Đèn ngủ'}
      </div>
      <div className='text-small text-blue-400 font-bold line-clamp-2 h-9'>
        {product.name}
      </div>
      <div className='h-52 flex justify-center items-center bg-gray-50 rounded-lg p-2'>
        <img
          className='max-h-full max-w-full object-contain drop-shadow-sm'
          src={getImageSrc(product)}
          alt={product.name}
          onError={(e) => { e.target.src = defaultImg; }}
        />
      </div>
      <div className='mt-auto flex justify-around items-center'>
        <div className='text-h3 font-bold text-yellow-600'>{formatPrice(price)}<span>₫</span></div>
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
    </div>
  );
};

const BigProductCard = ({ product, navigate, onAddToCartClick }) => {
  const variant = product.variants?.[0];
  const price = variant?.discountPrice || variant?.price || 0;

  return (
    <div
      className='w-[33%] h-full bg-white p-6 flex flex-col hover:cursor-pointer hover:ring-1 hover:ring-gray-300 group'
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className='text-smaller text-gray-500'>
        {product.category?.name || 'Đèn ngủ'}
      </div>
      <div className='text-normal text-blue-400 font-bold line-clamp-2'>
        {product.name}
      </div>
      <div className='w-full h-[65%] flex justify-center items-center bg-gray-50 rounded-lg p-3'>
        <img
          className='w-[90%] h-[90%] object-contain drop-shadow-sm'
          src={getImageSrc(product)}
          alt={product.name}
          onError={(e) => { e.target.src = defaultImg; }}
        />
      </div>
      <div className='flex gap-[10px] mb-3'>
        {product.images && product.images.slice(0, 3).map((img, i) => {
          const path = img.imagePath || img.ImagePath;
          const src = path ? (path.startsWith('http') ? path : `${API_ENDPOINT}${path}`) : defaultImg;
          return (
            <img
              key={i}
              className='w-20 h-20 border-[1px] border-gray-300 object-contain'
              src={src}
              alt=""
              onError={(e) => { e.target.src = defaultImg; }}
            />
          );
        })}
      </div>
      <div className='mt-auto flex justify-between items-center'>
        <div className='text-h3 font-bold text-yellow-600'>{formatPrice(price)}<span>₫</span></div>
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
    </div>
  );
};

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await ProductManage.GetProduct();
        const allProducts = response.data?.$values || response.data || [];

        // Sort by sellCount desc
        const sorted = [...allProducts].sort((a, b) => (b.sellCount || 0) - (a.sellCount || 0));

        // Extract variants + images from product data (already in API response)
        const productsWithDetails = sorted.slice(0, 15).map((product) => {
          const vData = product.variants?.$values || product.variants;
          const variants = Array.isArray(vData) ? vData : (vData ? [vData] : []);
          const imgData = product.images?.$values || product.images;
          const images = Array.isArray(imgData) ? imgData : [];
          return { ...product, variants, images };
        });

        setProducts(productsWithDetails);

        // Extract unique categories
        const cats = [...new Map(
          productsWithDetails
            .filter(p => p.category)
            .map(p => [p.category?.id || p.categoryId, p.category?.name || 'Khác'])
        ).entries()].map(([id, name]) => ({ id, name })).slice(0, 3);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching bestsellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter(p => (p.category?.id || p.categoryId) === activeCategory)
    : products;

  const gridProducts = filteredProducts.slice(0, 8);
  const featuredProduct = filteredProducts[8] || filteredProducts[0];

  if (loading) {
    return (
      <div className='w-full h-[55rem] bg-gray-100 flex justify-center items-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Đang tải sản phẩm bán chạy...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-[55rem] bg-transparent'>
      <div className='xl:mx-auto xl:max-w-[1440px]'>
        <div className='border-b border-gray-300 pb-1 relative mb-8 pt-6 flex justify-between after:w-1/12 after:h-[1px] after:absolute after:bottom-0 after:bg-yellow-400'>
          <h3 className='text-h3 font-medium text-black'>Bán chạy nhất</h3>
          <div className='text-normal flex justify-center gap-8 items-center font-medium'>
            <button
              className={`transition-colors ${!activeCategory ? 'text-yellow-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
              onClick={() => setActiveCategory(null)}
            >
              Tất cả
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`transition-colors ${activeCategory === cat.id ? 'text-yellow-600 font-bold' : 'text-gray-400 hover:text-gray-600'}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className='w-full h-[45rem] flex justify-between gap-[0.5%]'>
          <div className='w-[70%] h-full'>
            {/* Row 1: 4 products */}
            <div className='flex justify-between mb-2'>
              {gridProducts.slice(0, 4).map((product) => (
                <SmallProductCard key={product.id} product={product} navigate={navigate} onAddToCartClick={setCartModalProduct} />
              ))}
              {gridProducts.length < 4 && Array.from({ length: 4 - Math.min(gridProducts.length, 4) }).map((_, i) => (
                <div key={`empty-1-${i}`} className='w-[24.3%] h-[22.25rem] bg-white flex items-center justify-center text-gray-300'>
                  <i className='bx bx-package text-4xl'></i>
                </div>
              ))}
            </div>
            {/* Row 2: 4 products */}
            <div className='flex justify-between'>
              {gridProducts.slice(4, 8).map((product) => (
                <SmallProductCard key={product.id} product={product} navigate={navigate} onAddToCartClick={setCartModalProduct} />
              ))}
              {gridProducts.length < 8 && Array.from({ length: 4 - Math.min(Math.max(gridProducts.length - 4, 0), 4) }).map((_, i) => (
                <div key={`empty-2-${i}`} className='w-[24.3%] h-[22.25rem] bg-white flex items-center justify-center text-gray-300'>
                  <i className='bx bx-package text-4xl'></i>
                </div>
              ))}
            </div>
          </div>
          {/* Featured big card */}
          {featuredProduct && (
            <BigProductCard product={featuredProduct} navigate={navigate} onAddToCartClick={setCartModalProduct} />
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

export default BestSeller;