import React, { useState, useEffect, useCallback } from 'react';
import { useScrollContainer } from '../../contexts/ScrollContainerContext';

/**
 * BackToTop - Nút floating "Về đầu trang"
 * Hiện khi scroll xuống > 400px, ẩn khi ở đầu trang
 * Tương thích với smooth-scrollbar
 */
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainer = useScrollContainer();

  useEffect(() => {
    const handleScroll = () => {
      // Kiểm tra scroll position (hỗ trợ cả smooth-scrollbar và native)
      const scrollY = scrollContainer 
        ? scrollContainer.scrollTop 
        : window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollY > 400);
    };

    // Listen scroll từ container hoặc window
    const target = scrollContainer || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => target.removeEventListener('scroll', handleScroll);
  }, [scrollContainer]);

  const scrollToTop = useCallback(() => {
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollContainer]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Về đầu trang"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-yellow-400 hover:bg-yellow-500 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <i className='bx bx-chevron-up text-2xl'></i>
    </button>
  );
};

export default BackToTop;
