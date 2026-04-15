import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from '../MainPage/Header/Header'
import TopBar from '../MainPage/TopBar/TopBar'
import Footer from '../MainPage/Footer/Footer'
import ProductManage from '../../../Services/ProductManage'
import defaultImg from '../../../assets/images/cameras-2.jpg'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const SITE_URL = window.location.origin;

const formatPrice = (price) => {
    if (!price) return '0';
    return price.toLocaleString('vi-VN');
};

const getImgSrc = (path) => {
    if (!path) return defaultImg;
    return path.startsWith('http') ? path : `${API_ENDPOINT}${path}`;
};

// Loại bỏ HTML tags cho meta description
const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
};

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [variants, setVariants] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [variantLabels, setVariantLabels] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        // Scroll lên đầu trang khi vào chi tiết
        window.scrollTo(0, 0);

        const fetchProduct = async () => {
            try {
                setLoading(true);
                const res = await ProductManage.GetProductById(id);
                const data = res.data;
                
                if (data) {
                    setProduct(data);
                    
                    // Extract variants from product data
                    const vData = data.variants?.$values || data.variants;
                    const v = Array.isArray(vData) ? vData : (vData ? [vData] : []);
                    setVariants(v);
                    if (v.length > 0) setSelectedVariant(v[0]);
                    
                    // Extract images from product data
                    const imgData = data.images?.$values || data.images;
                    setImages(Array.isArray(imgData) ? imgData : []);
                    
                    // Extract variant labels (filter out $id from JSON serializer)
                    const rawLabels = data.variantLabels || {};
                    const cleanLabels = {};
                    Object.keys(rawLabels).forEach(k => {
                        if (k !== '$id') cleanLabels[k] = rawLabels[k];
                    });
                    setVariantLabels(cleanLabels);
                }
            } catch (e) {
                console.error('Error fetching product:', e);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchProduct();
    }, [id]);

    const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));
    const handleIncrease = () => setQuantity((prev) => Math.min(prev + 1, 999));

    // --- SEO Helpers ---
    const getPageTitle = () => {
        if (!product) return 'Đang tải... | Lamp Store';
        return `${product.name} | Mua ngay tại Lamp Store`;
    };

    const getMetaDescription = () => {
        if (!product) return 'Lamp Store - Cửa hàng đèn trang trí cao cấp';
        const desc = stripHtml(product.description);
        const price = currentVariant?.discountPrice || currentVariant?.price || product.minPrice || 0;
        const priceText = `Giá chỉ ₫${formatPrice(price)}.`;
        const truncated = desc.length > 120 ? desc.substring(0, 120) + '...' : desc;
        return `${product.name} - ${priceText} ${truncated || 'Mua ngay tại Lamp Store với ưu đãi hấp dẫn.'}`;
    };

    const getJsonLd = () => {
        if (!product) return null;
        const price = currentVariant?.discountPrice || currentVariant?.price || product.minPrice || 0;
        const mainImageUrl = images.length > 0 ? getImgSrc(images[0]?.imagePath) : `${SITE_URL}/logo192.png`;

        return {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": stripHtml(product.description) || product.name,
            "image": images.map(img => getImgSrc(img.imagePath)),
            "brand": {
                "@type": "Brand",
                "name": "Lamp Store"
            },
            "offers": {
                "@type": "Offer",
                "url": `${SITE_URL}/product/${id}`,
                "priceCurrency": "VND",
                "price": price,
                "availability": stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                "seller": {
                    "@type": "Organization",
                    "name": "Lamp Store"
                }
            },
            ...(product.reviewCount > 0 && {
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": product.reviewCount
                }
            })
        };
    };

    // Computed values (safe even if product is null for SEO helpers)
    const currentVariant = selectedVariant || variants[0];
    const price = currentVariant?.discountPrice || currentVariant?.price || product?.minPrice || 0;
    const originalPrice = currentVariant?.price || product?.maxPrice || 0;
    const hasDiscount = currentVariant?.discountPrice && currentVariant.discountPrice < currentVariant.price;
    const discountPercent = hasDiscount ? Math.round((1 - currentVariant.discountPrice / currentVariant.price) * 100) : 0;
    const stock = currentVariant?.stock || 0;
    const mainImage = images.length > 0 ? getImgSrc(images[selectedImage]?.imagePath) : defaultImg;

    // --- RENDER ---
    if (loading) {
        return (
            <>
                <Helmet>
                    <title>Đang tải... | Lamp Store</title>
                </Helmet>
                <TopBar />
                <Header />
                <div className='w-full h-[60vh] flex justify-center items-center'>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
                        <p className="mt-4 text-gray-500">Đang tải sản phẩm...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!product) {
        return (
            <>
                <Helmet>
                    <title>Không tìm thấy sản phẩm | Lamp Store</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <TopBar />
                <Header />
                <div className='w-full h-[60vh] flex justify-center items-center px-4'>
                    <div className="text-center text-gray-500">
                        <i className='bx bx-error-circle text-5xl mb-2'></i>
                        <p className="text-lg">Không tìm thấy sản phẩm</p>
                        <a href="/" className="text-rose-600 hover:underline mt-2 inline-block">← Về trang chủ</a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const jsonLd = getJsonLd();

    return (
        <>
            {/* ===== SEO META TAGS ===== */}
            <Helmet>
                <title>{getPageTitle()}</title>
                <meta name="description" content={getMetaDescription()} />
                <meta name="keywords" content={`${product.name}, ${product.tags || ''}, đèn trang trí, lamp store, mua đèn online`} />
                <link rel="canonical" href={`${SITE_URL}/product/${id}`} />

                {/* Open Graph (Facebook, Zalo) */}
                <meta property="og:type" content="product" />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={getMetaDescription()} />
                <meta property="og:url" content={`${SITE_URL}/product/${id}`} />
                <meta property="og:image" content={mainImage} />
                <meta property="og:site_name" content="Lamp Store" />
                <meta property="og:locale" content="vi_VN" />
                <meta property="product:price:amount" content={price} />
                <meta property="product:price:currency" content="VND" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.name} />
                <meta name="twitter:description" content={getMetaDescription()} />
                <meta name="twitter:image" content={mainImage} />

                {/* JSON-LD Structured Data */}
                {jsonLd && (
                    <script type="application/ld+json">
                        {JSON.stringify(jsonLd)}
                    </script>
                )}
            </Helmet>

            <TopBar />
            <Header />
            <main className='w-full mb-2 xl:mx-auto xl:max-w-[1440px] px-4 xl:px-0' itemScope itemType="https://schema.org/Product">
                {/* Breadcrumb - Schema.org */}
                <nav aria-label="Breadcrumb" className='flex items-center py-3 text-xs md:text-sm' itemScope itemType="https://schema.org/BreadcrumbList">
                    <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <a itemProp="item" href="/" className='font-medium text-gray-600 hover:text-rose-600 transition'>
                            <span itemProp="name">Trang chủ</span>
                        </a>
                        <meta itemProp="position" content="1" />
                    </span>
                    <i className='bx bx-chevron-right text-base md:text-lg px-1 text-gray-400'></i>
                    <span itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        <span itemProp="name" className='text-gray-500 line-clamp-1'>{product.name}</span>
                        <meta itemProp="position" content="2" />
                    </span>
                </nav>

                {/* Product Info Section */}
                <section className='w-full py-4 md:py-6 bg-white flex flex-col md:flex-row justify-between gap-4 md:gap-[3%] mb-4 rounded-lg shadow-sm'>
                    {/* Images */}
                    <div className='w-full md:w-[37%] px-4'>
                        <div className='w-full h-[280px] sm:h-[350px] md:h-[400px] border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50'>
                            <img
                                className='max-w-full max-h-full object-contain'
                                src={mainImage}
                                alt={product.name}
                                itemProp="image"
                                onError={(e) => { e.target.src = defaultImg; }}
                            />
                        </div>
                        <div className='flex gap-2 mt-3 overflow-x-auto pb-2'>
                            {images.map((img, i) => (
                                <img
                                    key={img.id || i}
                                    className={`w-14 h-14 md:w-16 md:h-16 border-2 rounded cursor-pointer object-cover transition flex-shrink-0 ${
                                        selectedImage === i ? 'border-rose-600' : 'border-gray-200 hover:border-rose-300'
                                    }`}
                                    src={getImgSrc(img.imagePath)}
                                    alt={`${product.name} - Ảnh ${i + 1}`}
                                    onClick={() => setSelectedImage(i)}
                                    onError={(e) => { e.target.src = defaultImg; }}
                                />
                            ))}
                        </div>
                        <div className='flex justify-end items-center text-xs md:text-sm h-8 mt-2 cursor-pointer text-gray-500 hover:text-rose-600 transition'>
                            <i className='bx bx-heart text-base md:text-lg mr-1'></i> Yêu thích ({product.favorites || 0})
                        </div>
                    </div>

                    {/* Details */}
                    <div className='w-full md:w-[60%] px-4 md:px-0 md:pr-6'>
                        <h1 className='text-base md:text-xl font-medium leading-relaxed mb-2' itemProp="name">{product.name}</h1>
                        <div className='flex flex-wrap justify-start items-center text-xs md:text-sm gap-2 md:gap-3 py-1 text-gray-500'>
                            <div className='flex items-center gap-1'>
                                <span className='text-rose-600 font-medium'>4.8</span>
                                {[...Array(5)].map((_, i) => (
                                    <i key={i} className='bx bxs-star text-orange-400 text-xs'></i>
                                ))}
                            </div>
                            <span className='text-gray-300'>|</span>
                            <div>{product.reviewCount || 0} Đánh giá</div>
                            <span className='text-gray-300'>|</span>
                            <div>{product.sellCount || 0} Đã bán</div>
                        </div>

                        {/* Price - with Schema.org Offer */}
                        <div className='flex flex-wrap items-center bg-gradient-to-r from-rose-50 to-slate-50 gap-2 md:gap-3 py-3 md:py-4 px-4 md:px-6 my-3 md:my-4 rounded-lg' itemProp="offers" itemScope itemType="https://schema.org/Offer">
                            <meta itemProp="priceCurrency" content="VND" />
                            <meta itemProp="price" content={price} />
                            <link itemProp="availability" href={stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                            <div className='text-xl md:text-2xl font-bold text-rose-600'>₫{formatPrice(price)}</div>
                            {hasDiscount && (
                                <>
                                    <div className='text-xs md:text-sm text-gray-400 line-through'>₫{formatPrice(originalPrice)}</div>
                                    <div className='bg-rose-600 text-white text-xs px-2 py-0.5 rounded font-medium'>-{discountPercent}%</div>
                                </>
                            )}
                        </div>

                        {/* Variants */}
                        {variants.length > 1 && (
                            <div className='flex flex-col sm:flex-row items-start w-full gap-2 md:gap-8 mb-4 md:mb-6'>
                                <div className='w-full sm:w-[10%] font-medium text-sm pt-1'>Phân loại</div>
                                <div className='w-full sm:w-[90%] flex flex-wrap gap-2'>
                                    {variants.map((v) => (
                                        <div
                                            key={v.id}
                                            onClick={() => setSelectedVariant(v)}
                                            className={`py-1.5 px-3 md:px-4 cursor-pointer text-xs md:text-sm border rounded transition ${
                                                selectedVariant?.id === v.id
                                                    ? 'border-rose-600 text-rose-600 bg-rose-50'
                                                    : 'border-gray-300 hover:border-rose-300'
                                            }`}
                                        >
                                            {variantLabels[v.id] || v.sku || v.materials || `₫${formatPrice(v.discountPrice || v.price)}`}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className='flex flex-col sm:flex-row items-start sm:items-center w-full gap-2 md:gap-8 mb-4 md:mb-6'>
                            <div className='w-full sm:w-[10%] font-medium text-sm'>Số lượng</div>
                            <div className='flex items-center gap-3'>
                                <div className='flex items-center border border-gray-300 rounded overflow-hidden'>
                                    <button onClick={handleDecrease} aria-label="Giảm số lượng" className='w-9 h-9 flex items-center justify-center bg-white text-gray-600 hover:bg-rose-600 hover:text-white active:scale-95 transition text-lg font-medium'>-</button>
                                    <input type="number" value={quantity} min="1" max="999" readOnly aria-label="Số lượng sản phẩm" className="w-12 md:w-14 h-9 text-center text-sm outline-none border-x border-gray-300" />
                                    <button onClick={handleIncrease} aria-label="Tăng số lượng" className='w-9 h-9 flex items-center justify-center bg-white text-gray-600 hover:bg-rose-600 hover:text-white active:scale-95 transition text-lg font-medium'>+</button>
                                </div>
                                <div className='text-xs md:text-sm text-gray-400'>{stock} sản phẩm có sẵn</div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className='flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6'>
                            <button id="add-to-cart-btn" className='flex items-center justify-center gap-2 border border-rose-600 bg-rose-50 text-rose-600 py-2.5 px-4 md:px-6 rounded hover:bg-rose-100 transition text-sm md:text-base w-full sm:w-auto'>
                                <i className='bx bxs-cart-add text-lg md:text-xl'></i> Thêm vào giỏ hàng
                            </button>
                            <button id="buy-now-btn" className='bg-rose-600 text-white py-2.5 px-6 md:px-8 rounded hover:bg-rose-700 transition font-medium text-sm md:text-base w-full sm:w-auto'>
                                Mua ngay
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className='flex flex-col sm:flex-row gap-3 md:gap-6 pt-4 border-t border-gray-100 text-xs md:text-sm text-gray-600'>
                            <div className='flex items-center gap-1.5'>
                                <i className='bx bxs-analyse text-base md:text-lg text-rose-600'></i>
                                Đổi ý miễn phí 15 ngày
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <i className='bx bxs-check-shield text-base md:text-lg text-rose-600'></i>
                                Hàng chính hãng 100%
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <i className='bx bxs-truck text-base md:text-lg text-rose-600'></i>
                                Miễn phí vận chuyển
                            </div>
                        </div>
                    </div>
                </section>

                {/* Product Details & Description */}
                <section className='w-full py-4 md:py-6 bg-white mb-4 rounded-lg shadow-sm px-4 md:px-6'>
                    <div className='mb-6 md:mb-8'>
                        <h2 className='text-base md:text-lg font-medium bg-slate-100 py-2 px-3 md:px-4 uppercase rounded'>Chi tiết sản phẩm</h2>
                        <div className='grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-y-2 gap-x-3 md:gap-x-4 mt-4 text-xs md:text-sm'>
                            <span className='font-medium text-gray-600'>Tên sản phẩm</span>
                            <span>{product.name}</span>
                            {currentVariant?.materials && (
                                <>
                                    <span className='font-medium text-gray-600'>Chất liệu</span>
                                    <span>{currentVariant.materials}</span>
                                </>
                            )}
                            {currentVariant?.weight && (
                                <>
                                    <span className='font-medium text-gray-600'>Trọng lượng</span>
                                    <span>{currentVariant.weight} gram</span>
                                </>
                            )}
                            {product.tags && (
                                <>
                                    <span className='font-medium text-gray-600'>Tags</span>
                                    <span>{product.tags}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='mb-6 md:mb-8'>
                        <h2 className='text-base md:text-lg font-medium bg-slate-100 py-2 px-3 md:px-4 uppercase rounded'>Mô tả sản phẩm</h2>
                        <div
                            className='py-4 text-xs md:text-sm leading-relaxed text-gray-700 overflow-x-auto'
                            itemProp="description"
                            dangerouslySetInnerHTML={{ __html: product.description || 'Chưa có mô tả' }}
                        />
                    </div>
                    <div>
                        <h2 className='text-base md:text-lg font-medium bg-slate-100 py-2 px-3 md:px-4 uppercase rounded'>Đánh giá sản phẩm</h2>
                        <div className='py-6 text-center text-gray-400 text-xs md:text-sm'>
                            Chưa có đánh giá nào
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default ProductDetail