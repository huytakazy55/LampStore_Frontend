import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import defaultImg from '../../../assets/images/cameras-2.jpg';
import ProductManage from '../../../Services/ProductManage';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const formatPrice = (price) => {
    if (!price) return '0';
    return price.toLocaleString('vi-VN');
};

const getImgSrc = (path) => {
    if (!path) return defaultImg;
    return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
};

const AddToCartModal = ({ isOpen, onClose, product }) => {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [variantLabels, setVariantLabels] = useState({});
    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [quantity, setQuantity] = useState(1);

    // Fetch full product data when product changes
    useEffect(() => {
        if (product?.id) {
            ProductManage.GetProductById(product.id)
                .then(res => {
                    const data = res.data;
                    if (data) {
                        // Extract variants
                        const vData = data.variants?.$values || data.variants;
                        const v = Array.isArray(vData) ? vData : (vData ? [vData] : []);
                        setVariants(v);
                        if (v.length > 0) setSelectedVariant(v[0]);
                        else setSelectedVariant(null);
                        
                        // Extract images
                        const imgData = data.images?.$values || data.images;
                        setImages(Array.isArray(imgData) ? imgData : []);
                        
                        // Extract variant labels
                        const labels = data.variantLabels || {};
                        // Filter out $id key from System.Text.Json
                        const cleanLabels = {};
                        Object.keys(labels).forEach(k => {
                            if (k !== '$id') cleanLabels[k] = labels[k];
                        });
                        setVariantLabels(cleanLabels);
                    }
                })
                .catch(() => {
                    // Fallback to product data passed in
                    const vData = product.variants?.$values || product.variants;
                    const v = Array.isArray(vData) ? vData : [];
                    setVariants(v);
                    if (v.length > 0) setSelectedVariant(v[0]);
                    const imgData = product.images?.$values || product.images;
                    setImages(Array.isArray(imgData) ? imgData : []);
                });
        }
        setQuantity(1);
    }, [product]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const currentVariant = selectedVariant || variants[0];
    const price = currentVariant?.discountPrice || currentVariant?.price || product.minPrice || 0;
    const originalPrice = currentVariant?.price || product.maxPrice || 0;
    const hasDiscount = currentVariant?.discountPrice && currentVariant.discountPrice < currentVariant.price;
    const discountPercent = hasDiscount ? Math.round((1 - currentVariant.discountPrice / currentVariant.price) * 100) : 0;
    const stock = currentVariant?.stock || 0;

    const mainImage = images.length > 0
        ? getImgSrc(images[0]?.imagePath || images[0]?.ImagePath)
        : defaultImg;

    const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1, 999));

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
            {/* Modal Box */}
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-rose-600 transition-colors z-10"
                >
                    <i className="bx bx-x text-3xl"></i>
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Left: Image */}
                    <div className="w-full md:w-2/5 bg-gray-50 p-6 flex justify-center items-center border-r border-gray-100">
                        <img 
                            src={mainImage} 
                            alt={product.name} 
                            className="max-h-80 w-auto object-contain drop-shadow-md rounded"
                            onError={(e) => { e.target.src = defaultImg; }}
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="w-full md:w-3/5 p-6 flex flex-col">
                        <h2 className="text-xl font-medium text-gray-800 mb-2 leading-snug pr-6">
                            {product.name}
                        </h2>

                        {/* Price Area */}
                        <div className="flex items-end gap-3 mt-2 mb-6 bg-rose-50/50 p-4 rounded-md border border-rose-100/50">
                            <span className="text-2xl font-bold text-rose-600">₫{formatPrice(price)}</span>
                            {hasDiscount && (
                                <>
                                    <span className="text-sm line-through text-gray-400 mb-1">
                                        ₫{formatPrice(originalPrice)}
                                    </span>
                                    <span className="bg-rose-500 text-white text-xs px-1.5 py-0.5 rounded font-medium mb-1">
                                        -{discountPercent}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Variants Selection */}
                        {variants.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-gray-700 mb-3">Phân loại sản phẩm:</h3>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto custom-scrollbar pr-2">
                                    {variants.map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`py-1.5 px-4 cursor-pointer text-sm border rounded transition-all ${
                                                selectedVariant?.id === v.id
                                                    ? 'border-rose-600 text-rose-600 bg-rose-50 font-medium ring-1 ring-rose-600/20'
                                                    : 'border-gray-300 hover:border-rose-300 hover:bg-gray-50 text-gray-600'
                                            }`}
                                        >
                                            {variantLabels[v.id] || v.sku || v.materials || `Loại ${v.id?.substring(0, 4)}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-8 flex items-center gap-6">
                            <h3 className="text-sm font-medium text-gray-700">Số lượng:</h3>
                            <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white">
                                <button onClick={handleDecrease} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-rose-600 transition font-medium text-lg">-</button>
                                <input type="number" value={quantity} readOnly className="w-12 h-9 text-center text-sm outline-none border-x border-gray-300" />
                                <button onClick={handleIncrease} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-rose-600 transition font-medium text-lg">+</button>
                            </div>
                            <span className="text-sm text-gray-400">{stock} sản phẩm có sẵn</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-auto flex gap-4">
                            <button className="flex-1 bg-rose-50 border border-rose-600 text-rose-600 py-3 rounded-md font-medium hover:bg-rose-100 transition-colors flex justify-center items-center gap-2">
                                <i className="bx bx-cart-add text-xl"></i>
                                Thêm vào giỏ
                            </button>
                            <button className="flex-1 bg-rose-600 text-white py-3 rounded-md font-medium hover:bg-rose-700 transition-colors shadow-sm">
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default AddToCartModal;
