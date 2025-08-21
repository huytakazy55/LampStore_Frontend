import React from 'react'
import { useCategories } from '../../../../hooks/useCategories'
import Product1 from '../../../../assets/images/cameras-2.jpg'

const CategorySale = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  
  // Sử dụng React Query hook thay vì useState/useEffect
  const { 
    data: allCategories = [], 
    isLoading: loading, 
    error,
    isError 
  } = useCategories()

  // Filter và limit categories (được cache tự động)
  const categories = React.useMemo(() => {
    const displayedCategories = allCategories.filter(category => category.isDisplayed !== false)
    return displayedCategories.slice(0, 4)
  }, [allCategories])

  console.log(categories);

  const getImageSrc = (category) => {
    if (category.imageUrl) {
      // Kiểm tra nếu là URL từ Cloudinary (bắt đầu với https://)
      if (category.imageUrl.startsWith('http')) {
        return category.imageUrl // URL đầy đủ từ Cloudinary
      } else {
        // Legacy local images (cũ)
        return `${API_ENDPOINT}${category.imageUrl}`
      }
    } else {
      // Fallback về ảnh mặc định
      return Product1
    }
  }

  const formatCategoryName = (name) => {
    // Chia tên thành các từ và hiển thị trên nhiều dòng
    const words = name.split(' ')
    if (words.length <= 2) {
      return [name.toUpperCase()]
    } else {
      return [
        words.slice(0, Math.ceil(words.length / 2)).join(' ').toUpperCase(),
        words.slice(Math.ceil(words.length / 2)).join(' ').toUpperCase()
      ]
    }
  }

  const stripHtmlTags = (html) => {
    // Tạo một temporary div để strip HTML tags
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    return tempDiv.textContent || tempDiv.innerText || ''
  }

  const getDisplayDescription = (category) => {
    if (!category.description) {
      return `Sản phẩm ${category.name.toLowerCase()}`
    }
    
    const plainText = stripHtmlTags(category.description)
    
    return plainText.length > 25 ? 
      `${plainText.substring(0, 25)}...` : 
      plainText
  }

  if (loading) {
    return (
      <div className='w-full h-36 flex justify-center items-center mb-6 xl:mx-auto xl:max-w-[1440px]'>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải danh mục... (React Query Cache)</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className='w-full h-36 flex justify-center items-center mb-6 xl:mx-auto xl:max-w-[1440px]'>
        <div className="text-center">
          <div className="text-red-500 text-lg mb-2">⚠️</div>
          <p className="text-red-600">Lỗi tải danh mục: {error?.message || 'Không xác định'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full mb-8'>
      <div className='xl:mx-auto xl:max-w-[1440px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {categories.map((category, index) => {
            const nameLines = formatCategoryName(category.name)
            return (
              <div 
                key={category.id || index} 
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-200"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    src={getImageSrc(category)}
                    alt={category.name}
                    onError={(e) => {
                      e.target.src = Product1
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="text-white">
                      <p className="text-xs font-medium mb-1 opacity-90">KHÁM PHÁ BỘ SƯU TẬP</p>
                      {nameLines.map((line, lineIndex) => (
                        <p key={lineIndex} className="text-sm font-bold leading-tight">{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <div className="flex flex-col h-20">
                    <div className="flex-1 mb-3">
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed h-10 overflow-hidden">
                        {getDisplayDescription(category)}
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <a 
                        className='inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold text-sm transition-colors duration-200 whitespace-nowrap' 
                        href={`#category-${category.id}`}
                      >
                        Xem ngay 
                        <i className='bx bx-chevron-right ml-1 text-lg bg-yellow-400 hover:bg-yellow-500 rounded-full text-white transition-colors duration-200 w-6 h-6 flex items-center justify-center'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          
          {/* Nếu có ít hơn 4 danh mục, hiển thị placeholder */}
          {categories.length < 4 && Array.from({ length: 4 - categories.length }).map((_, index) => (
            <div 
              key={`placeholder-${index}`} 
              className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 flex flex-col justify-center items-center p-8 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-all duration-300"
              style={{ minHeight: '240px' }}
            >
              <i className='bx bx-image text-4xl mb-3'></i>
              <p className="text-sm font-medium">Chưa có danh mục</p>
              <p className="text-xs text-center mt-1">Thêm danh mục mới từ trang quản trị</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategorySale