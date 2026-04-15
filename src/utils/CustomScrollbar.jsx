import React, { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { ScrollContainerProvider } from '../contexts/ScrollContainerContext';

Scrollbar.use(OverscrollPlugin);

const CustomScrollbar = ({ children }) => {
  const scrollbarRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);

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

    // Lưu scroll container element để chia sẻ qua context
    // smooth-scrollbar tạo .scroll-content bên trong
    const contentEl = scrollbarRef.current?.querySelector('.scroll-content') || scrollbarRef.current;
    setScrollContainer(contentEl);

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
      <ScrollContainerProvider value={scrollContainer}>
        {children}
      </ScrollContainerProvider>
    </div>
  );
};

export default CustomScrollbar;
