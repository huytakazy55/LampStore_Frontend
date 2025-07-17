import React, { useState, useEffect } from 'react'
import BannerService from '../../../../Services/BannerService';

const BannerImage = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        setError(null);
        const activeBanners = await BannerService.getActiveBanners();
        setBanners(activeBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-40 mt-16 xl:mx-auto xl:max-w-[1440px] flex justify-center items-center'>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-40 mt-16 xl:mx-auto xl:max-w-[1440px] flex justify-center items-center'>
        <div className="text-gray-500">Không thể tải banner</div>
      </div>
    );
  }

  // Đảm bảo banners là array
  const bannersArray = Array.isArray(banners) ? banners : [];

  if (bannersArray.length === 0) {
    return (
      <div className='w-full h-40 mt-16 xl:mx-auto xl:max-w-[1440px]'>
        {/* Không hiển thị gì nếu không có banner */}
      </div>
    );
  }

  return (
    <div className='w-full h-40 mt-16 xl:mx-auto xl:max-w-[1440px]'>
        <div className='flex justify-between items-center w-full h-40 gap-4'>
            {bannersArray.slice(0, 2).map((banner, index) => (
                <div key={banner.id} className='w-[49%] h-full relative overflow-hidden rounded-lg'>
                    <img 
                        className='w-full h-full object-cover' 
                        src={`${API_ENDPOINT}${banner.imageUrl}`} 
                        alt={banner.title || 'Banner'} 
                    />
                    {banner.linkUrl && (
                        <a 
                            href={banner.linkUrl} 
                            className='absolute inset-0 block'
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                        </a>
                    )}
                </div>
            ))}
        </div>
    </div>
  )
}

export default BannerImage