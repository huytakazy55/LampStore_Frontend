import React, { useState, useEffect } from 'react';
import Slider3 from "react-slick";
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

const CustomPrevArrow = ({ onClick }) => (
  <button
    className='absolute -top-[70px] right-8 bg-gray-300 hover:bg-gray-400 transition-colors'
    onClick={onClick}
  >
    <i className="bx bx-chevron-left text-3xl text-white"></i>
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    className='absolute -top-[70px] right-0 bg-gray-300 hover:bg-gray-400 transition-colors'
    onClick={onClick}
  >
    <i className="bx bx-chevron-right text-3xl text-white"></i>
  </button>
);

const TrendingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartModalProduct, setCartModalProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await ProductManage.GetProduct();
        const allProducts = response.data?.$values || response.data || [];

        // Sort by viewCount desc
        const sorted = [...allProducts].sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));

        // Extract variants + images from product data (already in API response)
        const productsWithDetails = sorted.slice(0, 12).map((product) => {
          const vData = product.variants?.$values || product.variants;
          const variants = Array.isArray(vData) ? vData : (vData ? [vData] : []);
          const imgData = product.images?.$values || product.images;
          const images = Array.isArray(imgData) ? imgData : [];
          return { ...product, variants, images };
        });

        setProducts(productsWithDetails);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const slidesToShow = products.length >= 4 ? 4 : products.length || 1;

  const settings = {
    dots: false,
    infinite: products.length > 4,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    autoplay: false,
    autoplaySpeed: 3000,
    rows: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  if (loading || products.length === 0) {
    return (
      <div className='w-full h-80 xl:mx-auto xl:max-w-[1440px] flex justify-center items-center'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Đang tải sản phẩm thịnh hành...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-80 xl:mx-auto xl:max-w-[1440px]'>
      <div className='relative pb-2 border-b border-gray-300 mb-8 after:w-[13%] after:h-[1px] after:absolute after:bottom-0 after:bg-yellow-400'>
        <h3 className='text-h3 font-medium text-black'>Sản phẩm thịnh hành</h3>
      </div>
      <div className='h-64'>
        <Slider3 key={`slider-${products.length}`} {...settings}>
          {products.map((product) => {
            const variant = product.variants?.[0];
            const price = variant?.discountPrice || variant?.price || 0;

            return (
              <div
                key={product.id}
                className='!w-[99%] h-[12.2rem] p-4 cursor-pointer relative m-[2px] hover:after:content-none hover:ring-1 hover:ring-gray-300 group'
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className='!flex justify-between items-center h-[8.5rem]'>
                  <div className='w-[40%] flex justify-center items-center'>
                    <img
                      className='max-h-full max-w-full object-contain'
                      src={getImageSrc(product)}
                      alt={product.name}
                      onError={(e) => { e.target.src = defaultImg; }}
                    />
                  </div>
                  <div className='flex flex-col h-[8.5rem] relative pr-2 pb-2 pl-4 w-[60%]'>
                    <div>
                      <div className='text-smaller text-gray-500 truncate'>
                        {product.category?.name || 'Đèn ngủ'}
                      </div>
                      <div className='text-blue-400 text-small font-bold line-clamp-2'>
                        {product.name}
                      </div>
                    </div>
                    <div className='mt-auto flex justify-between items-center'>
                      <div className='text-normal font-bold text-yellow-600'>
                        {formatPrice(price)}<span>₫</span>
                      </div>
                      <div 
                        className='w-9 h-9 rounded-[50%] bg-gray-300 -mt-[1px] cursor-pointer group-hover:bg-yellow-400 transition-colors flex justify-center items-center'
                        onClick={(e) => {
                          e.stopPropagation();
                          setCartModalProduct(product);
                        }}
                      >
                        <i className='bx bxs-cart-add text-h2 text-white'></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex ml-[41%] border-t border-gray-300 pt-[0.7rem] justify-around items-center text-small text-gray-400 invisible opacity-0 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100'>
                  <div className='flex leading-[1.4] align-middle gap-[5px] text-gray-300 hover:text-gray-500'>
                    <i className='bx bx-heart text-h3'></i>
                    <p className='mt-[1px]'>Thêm vào ưa thích</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider3>
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

export default TrendingProduct;