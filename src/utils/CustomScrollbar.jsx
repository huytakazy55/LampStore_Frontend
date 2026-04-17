import React, { useEffect, useRef, useState } from 'react';
import Scrollbar from 'smooth-scrollbar';
import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
import { ScrollContainerProvider } from '../contexts/ScrollContainerContext';

Scrollbar.use(OverscrollPlugin);

const CustomScrollbar = ({ children }) => {
  const scrollbarRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);
  const [scrollbarInstance, setScrollbarInstance] = useState(null);

  useEffect(() => {
    const instance = Scrollbar.init(scrollbarRef.current, {
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

    // Store both the element and the Scrollbar instance
    const contentEl = scrollbarRef.current?.querySelector('.scroll-content') || scrollbarRef.current;
    setScrollContainer(contentEl);
    setScrollbarInstance(instance);

    // Dispatch custom scroll events so child components can listen
    instance.addListener((status) => {
      const event = new CustomEvent('smoothscroll', {
        detail: {
          offset: status.offset,
          limit: status.limit,
        },
      });
      window.dispatchEvent(event);
    });

    const cartModal = document.querySelector('.cart-modal');
    if (cartModal) {
      cartModal.addEventListener('wheel', (e) => e.stopPropagation());
    }

    return () => {
      if (cartModal) {
        cartModal.removeEventListener('wheel', (e) => e.stopPropagation());
      }
      instance.destroy();
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
