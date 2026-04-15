import React, { createContext, useContext } from 'react';

/**
 * Context để chia sẻ scroll container reference giữa các component.
 * Cần thiết vì smooth-scrollbar tạo custom scroll container,
 * IntersectionObserver cần biết root container để hoạt động đúng.
 */
const ScrollContainerContext = createContext(null);

export const ScrollContainerProvider = ({ value, children }) => (
  <ScrollContainerContext.Provider value={value}>
    {children}
  </ScrollContainerContext.Provider>
);

export const useScrollContainer = () => useContext(ScrollContainerContext);

export default ScrollContainerContext;
