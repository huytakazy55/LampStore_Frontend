import React, { useState, useEffect } from 'react'
import CategoryManage from '../../../../Services/CategoryManage'
import ProductManage from '../../../../Services/ProductManage'
import Product1 from '../../../../assets/images/cameras-2.jpg'

const NavbarPrimary = () => {
  const [categories, setCategories] = useState([])
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [categoryProducts, setCategoryProducts] = useState({})
  const [loading, setLoading] = useState(true)
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await CategoryManage.GetCategory()
      const categoriesData = response.data.$values || response.data || []
      // NavbarPrimary hiển thị tất cả categories
      setCategories(categoriesData)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProductsByCategory = async (categoryId) => {
    // Nếu đã có dữ liệu sản phẩm cho category này, không fetch lại
    if (categoryProducts[categoryId]) {
      return
    }

    try {
      const response = await ProductManage.GetProduct()
      const allProducts = response.data.$values || response.data || []
      
      // Lọc sản phẩm theo categoryId và fetch images cho mỗi product
      const filteredProducts = allProducts.filter(product => 
        product.categoryId === categoryId
      ).slice(0, 6) // Lấy tối đa 6 sản phẩm

      // Fetch images cho từng product
      const productsWithImages = await Promise.all(
        filteredProducts.map(async (product) => {
          try {
            const imageResponse = await ProductManage.GetProductImageById(product.id)
            const images = imageResponse.data.$values || imageResponse.data || []
            return {
              ...product,
              Images: images
            }
          } catch (error) {
            console.warn(`Failed to fetch images for product ${product.id}:`, error)
            return {
              ...product,
              Images: []
            }
          }
        })
      )

      setCategoryProducts(prev => ({
        ...prev,
        [categoryId]: productsWithImages
      }))
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleCategoryHover = (category) => {
    setHoveredCategory(category)
    if (category) {
      fetchProductsByCategory(category.id)
    }
  }

  const getImageSrc = (category) => {
    if (category.imageUrl) {
      if (category.imageUrl.startsWith('http')) {
        return category.imageUrl // URL đầy đủ từ Cloudinary
      } else {
        return `${API_ENDPOINT}${category.imageUrl}`
      }
    }
    return Product1
  }

  const getProductImageSrc = (product) => {
    // Check for Images collection (capital I) with ImagePath
    if (product.Images && product.Images.length > 0) {
      const imagePath = product.Images[0].imagePath
      // Kiểm tra nếu là URL từ Cloudinary
      if (imagePath.startsWith('http')) {
        return imagePath // URL đầy đủ từ Cloudinary
      } else {
        return `${API_ENDPOINT}${imagePath}`
      }
    }
    // Check for images collection (lowercase i) - fallback
    if (product.images && product.images.length > 0) {
      const imagePath = product.images[0].imagePath
      if (imagePath.startsWith('http')) {
        return imagePath
      } else {
        return `${API_ENDPOINT}${imagePath}`
      }
    }
    return Product1
  }

  const stripHtmlTags = (html) => {
    if (!html) return ''
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  if (loading) {
    return (
      <div className='bg-yellow-400 w-full h-12'>
        <nav className='relative xl:mx-auto xl:max-w-[1440px] flex justify-center items-center h-full'>
          <div className="text-black font-medium">Đang tải danh mục...</div>
        </nav>
      </div>
    )
  }

  return (
    <div className='bg-yellow-400 w-full h-12'>
      <nav className='relative xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-full'>
        <ul className='flex justify-start h-full relative'>
          

          {/* Dynamic Categories */}
          {categories.map((category, index) => (
            <li 
              key={category.id} 
              className='flex items-center px-4 h-full border-r border-gray-300 hover:bg-yellow-500 group'
              onMouseEnter={() => handleCategoryHover(category)}
              onMouseLeave={() => handleCategoryHover(null)}
            >
              <a className='text-black font-medium' href={`#category-${category.id}`}>
                {category.name}
              </a>
              <i className='bx bx-chevron-down text-h3 ml-1'></i>
            </li>
          ))}

          {/* Single Dropdown - positioned absolute from start of navbar */}
          {hoveredCategory && (
            <div 
              className='absolute top-[49px] left-0 shadow-2xl border-t-2 z-[1000] transition-all duration-500 ease-in-out backdrop-blur-lg bg-white/85 rounded-b-sm border border-gray-200/30'
              style={{
                width: '1450px',
                height: '350px',
                opacity: hoveredCategory ? 1 : 0,
                transform: hoveredCategory ? 'translateY(0)' : 'translateY(-10px)',
                pointerEvents: hoveredCategory ? 'auto' : 'none',
                backdropFilter: 'blur(12px)',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
              }}
              onMouseEnter={() => handleCategoryHover(hoveredCategory)}
              onMouseLeave={() => handleCategoryHover(null)}
            >
              <div className="flex h-full">
                {/* Left side - Category Image Only */}
                <div className="w-1/3 p-4">
                  <img 
                    src={getImageSrc(hoveredCategory)}
                    alt={hoveredCategory.name}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.target.src = Product1
                    }}
                  />
                </div>

                {/* Right side - Products Simple List */}
                <div className="w-2/3 p-4">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">{hoveredCategory.name}</h4>
                  {categoryProducts[hoveredCategory.id] && categoryProducts[hoveredCategory.id].length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {categoryProducts[hoveredCategory.id].map((product, productIndex) => (
                        <div key={product.id || productIndex} className="flex items-center space-x-3 group cursor-pointer">
                          <div className="flex-shrink-0">
                            <img 
                              src={getProductImageSrc(product)}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300"
                              onError={(e) => {
                                e.target.src = Product1
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-medium text-gray-800 truncate">
                              {product.name}
                            </h5>
                            <p className="text-xs text-yellow-600 font-semibold">
                              {product.price ? `${product.price.toLocaleString()}đ` : 'Liên hệ'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-32 text-gray-500">
                      <div className="text-center">
                        <i className='bx bx-package text-3xl mb-2'></i>
                        <p className="text-sm">Chưa có sản phẩm trong danh mục này</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </ul>
      </nav>
    </div>
    )
  }

export default NavbarPrimary