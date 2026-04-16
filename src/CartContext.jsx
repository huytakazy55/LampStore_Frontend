import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import CartService from './Services/CartService';

const CartContext = createContext();
const CART_KEY = 'lamp_store_cart';

const loadCart = () =>
{
    try
    {
        const data = localStorage.getItem(CART_KEY);
        return data ? JSON.parse(data) : [];
    } catch
    {
        return [];
    }
};

const saveCart = (items) =>
{
    localStorage.setItem(CART_KEY, JSON.stringify(items));
};

// Tạo unique key cho cart item dựa trên productId + selected options
const getCartItemKey = (productId, selectedOptions) =>
{
    const optionStr = Object.entries(selectedOptions || {})
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}:${v.value}`)
        .join('|');
    return `${productId}__${optionStr}`;
};

// Chuyển backend cart item → frontend format
const backendToFrontendItem = (backendItem) =>
{
    const selectedOptions = backendItem.selectedOptions
        ? JSON.parse(backendItem.selectedOptions)
        : {};

    const totalAdditional = Object.values(selectedOptions)
        .reduce((sum, opt) => sum + (opt.additionalPrice || 0), 0);

    const basePrice = backendItem.basePrice || 0;

    return {
        key: getCartItemKey(backendItem.productId, selectedOptions),
        productId: backendItem.productId,
        name: backendItem.productName || '',
        image: backendItem.productImage || '',
        basePrice: basePrice,
        finalPrice: basePrice + totalAdditional,
        quantity: backendItem.quantity,
        selectedOptions: selectedOptions
    };
};

export function CartProvider({ children })
{
    const [cartItems, setCartItems] = useState(loadCart);

    // Sync to localStorage whenever cartItems changes
    useEffect(() =>
    {
        saveCart(cartItems);
    }, [cartItems]);

    const addToCart = useCallback((item) =>
    {
        // item: { productId, name, image, price, quantity, selectedOptions }
        // selectedOptions: { "Màu sắc": { value: "Đỏ", additionalPrice: 0 }, ... }
        setCartItems(prev =>
        {
            const key = getCartItemKey(item.productId, item.selectedOptions);
            const existingIndex = prev.findIndex(ci => ci.key === key);

            if (existingIndex >= 0)
            {
                // Cộng thêm quantity
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + item.quantity
                };
                return updated;
            }

            // Tính giá cuối (giá gốc + tổng additionalPrice)
            const totalAdditional = Object.values(item.selectedOptions || {})
                .reduce((sum, opt) => sum + (opt.additionalPrice || 0), 0);

            return [...prev, {
                key,
                productId: item.productId,
                name: item.name,
                image: item.image,
                basePrice: item.price,
                finalPrice: item.price + totalAdditional,
                quantity: item.quantity,
                selectedOptions: item.selectedOptions || {}
            }];
        });
    }, []);

    const removeFromCart = useCallback((key) =>
    {
        setCartItems(prev => prev.filter(item => item.key !== key));
    }, []);

    const updateQuantity = useCallback((key, quantity) =>
    {
        if (quantity < 1) return;
        setCartItems(prev => prev.map(item =>
            item.key === key ? { ...item, quantity } : item
        ));
    }, []);

    const clearCart = useCallback(() =>
    {
        setCartItems([]);
    }, []);

    /**
     * Gọi khi đăng nhập thành công:
     * 1. Lấy items hiện tại trong localStorage
     * 2. Gửi lên backend để merge
     * 3. Nhận lại danh sách đầy đủ từ backend
     * 4. Cập nhật state + localStorage
     */
    const syncCartOnLogin = useCallback(async () =>
    {
        try
        {
            const localItems = loadCart();

            // Gửi localStorage items lên backend (merge)
            const backendData = await CartService.syncCart(localItems);

            // Chuyển backend data → frontend format
            const items = (backendData?.$values || backendData || [])
                .map(backendToFrontendItem);

            setCartItems(items);
        } catch (error)
        {
            console.error('Cart sync failed:', error);
            // Nếu sync thất bại, giữ nguyên giỏ hàng localStorage
        }
    }, []);

    /**
     * Gọi khi đăng xuất: xóa state + localStorage
     */
    const clearCartOnLogout = useCallback(() =>
    {
        setCartItems([]);
        localStorage.removeItem(CART_KEY);
    }, []);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartCount,
            cartTotal,
            syncCartOnLogin,
            clearCartOnLogout
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () =>
{
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

export default CartContext;
