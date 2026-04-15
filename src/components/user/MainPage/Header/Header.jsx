import React, { useState, useEffect, useRef, useCallback } from 'react'
import FormLogin from './FormLogin'
import FormCart from './FormCart';
import FormActionLogin from './FormActionLogin';
import { useSelector } from 'react-redux';
import 'react-tooltip/dist/react-tooltip.css';
import Logo from "../../../../assets/images/LogoLamp3D.jpg"
import avatarimg from '../../../../assets/images/Avatar.jpg'
import AuthService from '../../../../Services/AuthService';
import FormProfile from './FormProfile';
import SearchService from '../../../../Services/SearchService';
import CategoryManage from '../../../../Services/CategoryManage';
import { useNavigate } from 'react-router-dom';

const Header = () =>
{
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleActionLogin, setToggleActionLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false);
  const [avatar, setAvatar] = useState({ ProfileAvatar: '' })
  const [arrowIcon, setArrowIcon] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState({ categories: [], products: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const debounceRef = useRef(null);
  const suggestionsRef = useRef(null);
  const popupRef = useRef(null);
  const popupActionRef = useRef(null);
  const popupProfileRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonActionRef = useRef(null);
  const buttonProfileRef = useRef(null);
  const searchRef = useRef(null);
  const avatarURL = useSelector((state) => state.avatar.avatar);

  useEffect(() =>
  {
    if (token)
    {
      AuthService.profile()
        .then((res) =>
        {
          setAvatar({
            ProfileAvatar: res?.profileAvatar
          });
        })
        .catch((error) =>
        {
          console.error("Error fetching profile:", error);
        });
    } else
    {
      setAvatar({ ProfileAvatar: '' });
    }
  }, [token]);

  // Fetch categories
  useEffect(() =>
  {
    const fetchCategories = async () =>
    {
      try
      {
        const response = await CategoryManage.GetCategory();
        const categoriesData = response.data.$values || response.data || [];
        setCategories(categoriesData);
      } catch (error)
      {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleLoginForm = () =>
  {
    setToggleLogin(!toggleLogin);
  }

  const toggleArrow = () =>
  {
    setArrowIcon(!arrowIcon);
  };

  const closeArrow = () =>
  {
    setArrowIcon(false);
  };

  const toggleActionLoginForm = () =>
  {
    setToggleActionLogin(!toggleActionLogin);
  }

  const toggleFormcart = () =>
  {
    setToggleCart(!toggleCart);
  }

  const toggleFormProfile = () =>
  {
    setToggleProfile(!toggleProfile);
  }

  const handleClickOutside = (event, ref, buttonRef, toggleFunction) =>
  {
    if (ref.current && !ref.current.contains(event.target) &&
      buttonRef.current && !buttonRef.current.contains(event.target))
    {
      toggleFunction(false);
    }
  };

  // Xử lý tìm kiếm nhanh
  const handleQuickSearch = async () =>
  {
    if (!searchKeyword.trim()) return;

    setIsSearching(true);
    try
    {
      const result = await SearchService.quickSearch(searchKeyword);

      // Chuyển đến trang kết quả tìm kiếm
      navigate('/search', {
        state: {
          searchResults: result,
          keyword: searchKeyword,
          categoryId: selectedCategory
        }
      });
    } catch (error)
    {
      console.error('Search error:', error);
    } finally
    {
      setIsSearching(false);
    }
  };

  // Debounced search suggestions
  const fetchSuggestions = useCallback(async (keyword) => {
    if (!keyword.trim()) {
      setSuggestions({ categories: [], products: [] });
      setShowSuggestions(false);
      return;
    }

    const lowerKeyword = keyword.toLowerCase();

    // Filter categories client-side
    const matchedCategories = categories.filter(c =>
      c.name.toLowerCase().includes(lowerKeyword)
    ).slice(0, 3);

    // Fetch product suggestions from API
    try {
      const result = await SearchService.quickSearch(keyword, 1, 5);
      const products = result?.$values || result?.products?.$values || result?.products || [];
      setSuggestions({
        categories: matchedCategories,
        products: Array.isArray(products) ? products.slice(0, 6) : []
      });
      setShowSuggestions(true);
    } catch (error) {
      setSuggestions({ categories: matchedCategories, products: [] });
      setShowSuggestions(matchedCategories.length > 0);
    }
  }, [categories]);

  // Handle input change with debounce
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchKeyword(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  // Handle suggestion click - category
  const handleCategorySuggestionClick = (category) => {
    setShowSuggestions(false);
    setSearchKeyword('');
    navigate('/search', {
      state: {
        keyword: searchKeyword,
        categoryId: category.id
      }
    });
  };

  // Handle suggestion click - product
  const handleProductSuggestionClick = (product) => {
    setShowSuggestions(false);
    setSearchKeyword(product.name || '');
    navigate(`/product/${product.id}`);
  };

  // Xử lý Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
      handleQuickSearch();
    }
  };


  useEffect(() =>
  {
    const handleOutsideClick = (event) =>
    {
      handleClickOutside(event, popupRef, buttonRef, setToggleCart);
      handleClickOutside(event, popupActionRef, buttonActionRef, setToggleActionLogin);
      handleClickOutside(event, popupProfileRef, buttonProfileRef, setToggleProfile);

      // Close suggestions when click outside
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
        searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () =>
    {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [navigate]);

  return (
    <>
      <div className='w-full xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-16 md:h-28 px-4 xl:px-0'>
        {/* Logo */}
        <div className='h-12 md:h-24 flex-shrink-0'>
          <a href="/"><img className='h-full max-w-full' src={Logo} alt="Logo" /></a>
        </div>

        {/* Mobile menu toggle */}
        <div className='md:hidden cursor-pointer' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <i className={`bx ${mobileMenuOpen ? 'bx-x' : 'bx-menu'} text-2xl`}></i>
        </div>

        {/* Desktop menu icon (hidden on mobile) */}
        <div className='hidden md:block lg:hidden'>
          <i className='bx bx-menu leading-none align-middle text-h2'></i>
        </div>

        {/* Search bar - hidden on mobile, shown on md+ */}
        <div className='hidden md:flex border-2 border-yellow-400 rounded-[30px] w-2/5 lg:w-1/2 h-11 relative' ref={searchRef}>
          {/* Input tìm kiếm */}
          <input
            className='caret-y border-yellow-400 outline-0 border-0 w-3/5 py-[2px] px-[20px] h-full rounded-l-[28px]'
            type="text"
            placeholder='Tìm kiếm sản phẩm...'
            value={searchKeyword}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (searchKeyword.trim()) fetchSuggestions(searchKeyword); }}
            autoComplete='off'
          />

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (suggestions.categories.length > 0 || suggestions.products.length > 0) && (
            <div
              ref={suggestionsRef}
              className='absolute top-[calc(100%+4px)] left-0 w-full bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden animate-fadeIn'
            >
              {/* Category suggestions */}
              {suggestions.categories.length > 0 && (
                <div className='border-b border-gray-100'>
                  {suggestions.categories.map((cat) => (
                    <div
                      key={`cat-${cat.id}`}
                      className='flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-yellow-50 transition-colors duration-150 group'
                      onClick={() => handleCategorySuggestionClick(cat)}
                    >
                      <div className='w-7 h-7 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0 group-hover:bg-yellow-200 transition-colors'>
                        <i className='bx bx-category text-yellow-600 text-sm'></i>
                      </div>
                      <span className='text-sm text-gray-700 group-hover:text-gray-900'>
                        Tìm trong danh mục <strong className='text-yellow-600'>"{cat.name}"</strong>
                      </span>
                      <i className='bx bx-chevron-right text-gray-400 ml-auto text-lg'></i>
                    </div>
                  ))}
                </div>
              )}

              {/* Product suggestions */}
              {suggestions.products.length > 0 && (
                <div className='py-1'>
                  <div className='px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Sản phẩm gợi ý</div>
                  {suggestions.products.map((product, index) => (
                    <div
                      key={`prod-${product.id || index}`}
                      className='flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150 group'
                      onClick={() => handleProductSuggestionClick(product)}
                    >
                      <i className='bx bx-search text-gray-400 text-base group-hover:text-yellow-500 transition-colors'></i>
                      <span className='text-sm text-gray-600 group-hover:text-gray-900 truncate'>{product.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Dropdown danh mục */}
          <div className='hidden lg:block w-2/5 h-full relative border-l border-gray-300'>
            <div
              className='flex items-center justify-between h-full px-4 cursor-pointer select-none hover:bg-gray-50 transition-colors duration-200'
              onClick={() => setArrowIcon(!arrowIcon)}
              onBlur={() => setTimeout(() => setArrowIcon(false), 150)}
              tabIndex={0}
            >
              <span className='text-sm font-medium text-gray-600 truncate pr-2'>
                {selectedCategory
                  ? categories.find(c => String(c.id) === String(selectedCategory))?.name || 'Tất cả danh mục'
                  : 'Tất cả danh mục'}
              </span>
              <i className={`bx bx-chevron-down text-gray-500 text-base transition-transform duration-300 ${arrowIcon ? 'rotate-180' : ''}`}></i>
            </div>

            {/* Custom Dropdown Menu */}
            <div
              className={`absolute top-[calc(100%+6px)] right-0 w-full min-w-[200px] bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 origin-top ${arrowIcon
                ? 'opacity-100 scale-y-100 translate-y-0'
                : 'opacity-0 scale-y-0 -translate-y-2 pointer-events-none'
                }`}
            >
              <div className='py-1.5 max-h-[280px] overflow-y-auto custom-scrollbar'>
                <div
                  className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-all duration-200 text-sm ${selectedCategory === ''
                    ? 'bg-yellow-50 text-yellow-700 font-semibold border-l-[3px] border-yellow-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-5 border-l-[3px] border-transparent'
                    }`}
                  onClick={() => { setSelectedCategory(''); setArrowIcon(false); }}
                >
                  <i className={`bx bx-category text-base ${selectedCategory === '' ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                  Tất cả danh mục
                </div>
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-all duration-200 text-sm ${String(selectedCategory) === String(category.id)
                      ? 'bg-yellow-50 text-yellow-700 font-semibold border-l-[3px] border-yellow-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-5 border-l-[3px] border-transparent'
                      }`}
                    onClick={() => { setSelectedCategory(String(category.id)); setArrowIcon(false); }}
                  >
                    <i className={`bx bx-lamp text-base ${String(selectedCategory) === String(category.id) ? 'text-yellow-500' : 'text-gray-400'}`}></i>
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nút tìm kiếm */}
          <button
            className='w-[10%] min-w-[44px] h-full bg-yellow-400 text-slate-100 group flex items-center justify-center rounded-r-[28px]'
            onClick={handleQuickSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <i className='bx bx-loader-alt bx-spin text-slate-100 text-h3'></i>
            ) : (
              <i className='bx bx-search text-slate-100 text-h3 transition-transform duration-100 group-hover:scale-110'></i>
            )}
          </button>


        </div>

        {/* Action icons - desktop */}
        <div className='hidden md:block w-auto lg:w-1/5 text-black'>
          <ul className='flex justify-end lg:justify-between items-center gap-3 lg:gap-0'>
            <li className='group'><i className='bx bx-heart text-h2 leading-none align-middle text-red-600 cursor-pointer transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i></li>
            <li className='flex justify-center items-center gap-1 cursor-pointer group' onClick={toggleFormcart} ref={buttonRef} >
              <div className='relative'>
                <i className='bx bx-shopping-bag text-h2 leading-none align-middle transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i>
                <FormCart popupRef={popupRef} toggleCart={toggleCart} setToggleCart={setToggleCart} />
                <div className='absolute right-[-7px] bottom-[-10px] w-5 h-5 bg-yellow-400 rounded-[50%] text-center text-xs leading-5 text-gray-700 font-medium'>10</div>
              </div>
              <div className='hidden lg:block text-small ml-1 p-[2px] relative font-medium'>
                <div className='absolute w-1 h-1 -top-[2px] -left-[7px] text-small'>₫</div>
                10.000.000
              </div>
            </li>
            <FormLogin toggleLogin={toggleLogin} setToggleLogin={setToggleLogin} />
            <div onClick={toggleFormProfile} >
              <FormProfile popupProfileRef={popupProfileRef} toggleProfile={toggleProfile} />
            </div>
            {
              isAuthenticated ?
                <>
                  <li onClick={toggleActionLoginForm} ref={buttonActionRef} className='relative w-8 h-8 leading-8 border-2 border-yellow-400 rounded-[20%] p-[1px] cursor-pointer'>
                    <img className='rounded-[20%] h-full w-full ' src={avatarURL ? avatarURL : (avatar.ProfileAvatar ? (avatar.ProfileAvatar.startsWith('http') ? avatar.ProfileAvatar : `${API_ENDPOINT}${avatar.ProfileAvatar}`) : avatarimg)} alt="" />
                    <FormActionLogin toggleProfile={toggleProfile} setToggleProfile={setToggleProfile} buttonProfileRef={buttonProfileRef} popupActionRef={popupActionRef} toggleActionLogin={toggleActionLogin} setToggleActionLogin={setToggleActionLogin} />
                  </li>
                </> :
                <>
                  <li className='group' onClick={toggleLoginForm}>
                    <i className='bx bx-user text-h2 leading-none align-middle cursor-pointer transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i>
                  </li>
                </>
            }
          </ul>
        </div>
      </div>

      {/* Mobile search bar - shown below header on mobile */}
      <div className='md:hidden px-4 pb-3' ref={searchRef}>
        <div className='flex border-2 border-yellow-400 rounded-[30px] h-10 relative'>
          <input
            className='caret-y border-yellow-400 outline-0 border-0 w-full py-[2px] px-[16px] h-full rounded-l-[28px] text-sm'
            type="text"
            placeholder='Tìm kiếm sản phẩm...'
            value={searchKeyword}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (searchKeyword.trim()) fetchSuggestions(searchKeyword); }}
            autoComplete='off'
          />
          <button
            className='w-12 h-full bg-yellow-400 text-slate-100 group flex items-center justify-center rounded-r-[28px]'
            onClick={handleQuickSearch}
            disabled={isSearching}
          >
            {isSearching ? (
              <i className='bx bx-loader-alt bx-spin text-slate-100 text-lg'></i>
            ) : (
              <i className='bx bx-search text-slate-100 text-lg transition-transform duration-100 group-hover:scale-110'></i>
            )}
          </button>
        </div>
        {/* Mobile Search Suggestions */}
        {showSuggestions && (suggestions.categories.length > 0 || suggestions.products.length > 0) && (
          <div
            ref={suggestionsRef}
            className='w-full bg-white rounded-xl shadow-xl border border-gray-100 z-[60] overflow-hidden animate-fadeIn mt-1'
          >
            {suggestions.categories.length > 0 && (
              <div className='border-b border-gray-100'>
                {suggestions.categories.map((cat) => (
                  <div key={`mcat-${cat.id}`} className='flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-yellow-50 transition-colors' onClick={() => handleCategorySuggestionClick(cat)}>
                    <div className='w-6 h-6 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0'><i className='bx bx-category text-yellow-600 text-xs'></i></div>
                    <span className='text-sm text-gray-700 truncate'>Danh mục <strong className='text-yellow-600'>"{cat.name}"</strong></span>
                  </div>
                ))}
              </div>
            )}
            {suggestions.products.length > 0 && (
              <div className='py-1'>
                {suggestions.products.map((product, index) => (
                  <div key={`mprod-${product.id || index}`} className='flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-colors' onClick={() => handleProductSuggestionClick(product)}>
                    <i className='bx bx-search text-gray-400 text-sm'></i>
                    <span className='text-sm text-gray-600 truncate'>{product.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden fixed inset-0 z-[100]'>
          {/* Overlay */}
          <div className='absolute inset-0 bg-black/50' onClick={() => setMobileMenuOpen(false)}></div>
          {/* Drawer */}
          <div className='absolute right-0 top-0 h-full w-72 bg-white shadow-2xl animate-fadeIn overflow-y-auto'>
            <div className='p-4 border-b border-gray-200 flex justify-between items-center'>
              <span className='font-semibold text-lg'>Menu</span>
              <i className='bx bx-x text-2xl cursor-pointer' onClick={() => setMobileMenuOpen(false)}></i>
            </div>
            <div className='p-4'>
              {/* User actions */}
              <div className='space-y-3 mb-6'>
                {isAuthenticated ? (
                  <>
                    <div className='flex items-center gap-3 p-2 rounded-lg bg-gray-50'>
                      <img className='w-10 h-10 rounded-full border-2 border-yellow-400' src={avatarURL ? avatarURL : (avatar.ProfileAvatar ? (avatar.ProfileAvatar.startsWith('http') ? avatar.ProfileAvatar : `${API_ENDPOINT}${avatar.ProfileAvatar}`) : avatarimg)} alt="" />
                      <span className='font-medium text-sm'>Tài khoản</span>
                    </div>
                    <div onClick={() => { toggleFormProfile(); setMobileMenuOpen(false); }} className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer'>
                      <i className='bx bx-user text-xl text-gray-600'></i>
                      <span className='text-sm'>Hồ sơ</span>
                    </div>
                  </>
                ) : (
                  <div onClick={() => { toggleLoginForm(); setMobileMenuOpen(false); }} className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer'>
                    <i className='bx bx-user text-xl text-gray-600'></i>
                    <span className='text-sm'>Đăng nhập</span>
                  </div>
                )}
                <div onClick={() => { toggleFormcart(); setMobileMenuOpen(false); }} className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer'>
                  <i className='bx bx-shopping-bag text-xl text-gray-600'></i>
                  <span className='text-sm'>Giỏ hàng</span>
                </div>
                <div className='flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer'>
                  <i className='bx bx-heart text-xl text-red-500'></i>
                  <span className='text-sm'>Yêu thích</span>
                </div>
              </div>
              {/* Categories */}
              <div className='border-t border-gray-200 pt-4'>
                <h3 className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3'>Danh mục</h3>
                <div className='space-y-1'>
                  {categories.map((category) => (
                    <a key={category.id} href={`#category-${category.id}`} className='flex items-center gap-3 p-3 hover:bg-yellow-50 rounded-lg text-sm text-gray-700' onClick={() => setMobileMenuOpen(false)}>
                      <i className='bx bx-lamp text-yellow-500'></i>
                      {category.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header