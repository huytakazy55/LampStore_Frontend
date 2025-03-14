import React, { useEffect, useRef } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';

Scrollbar.use(OverscrollPlugin); // Cần phải dùng plugin overscroll

const CustomScrollbar = ({ children }) => {
  const scrollbarRef = useRef(null);

  useEffect(() => {
    const scrollbarInstance = Scrollbar.init(scrollbarRef.current, {
      damping: 0.05,
      delegateTo: document.body,
      plugins: {
        overscroll: {
          effect: 'bounce',
          damping: 0.1,
          maxOverscroll: 150,
        },
      },
    });

    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
      cartModal.addEventListener('wheel', (e) => e.stopPropagation());
    }

      return () => {
        if (cartModal) {
          cartModal.removeEventListener('wheel', (e) => e.stopPropagation());
        }
        scrollbarInstance.destroy();
      };
    }, []);

  return (
    <div ref={scrollbarRef} style={{ height: '100vh', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

export default CustomScrollbar;
