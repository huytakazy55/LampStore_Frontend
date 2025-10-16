import React, {useState, useEffect, useRef} from 'react'
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

const Header = () => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  const navigate = useNavigate();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [toggleLogin, setToggleLogin] = useState(false);
  const [toggleActionLogin, setToggleActionLogin] = useState(false);
  const [toggleCart, setToggleCart] = useState(false)
  const [toggleProfile, setToggleProfile] = useState(false);
  const [avatar, setAvatar] = useState({ProfileAvatar: ''})
  const [arrowIcon, setArrowIcon] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const popupRef = useRef(null);
  const popupActionRef = useRef(null);
  const popupProfileRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonActionRef = useRef(null);
  const buttonProfileRef = useRef(null);
  const searchRef = useRef(null);
  const avatarURL = useSelector((state) => state.avatar.avatar);

  useEffect(() => {
    if(token) {
      AuthService.profile()
        .then((res) => {
          setAvatar({
            ProfileAvatar: res?.profileAvatar
          });
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    } else {
      setAvatar({ProfileAvatar: ''});
    }
  }, [token]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryManage.GetCategory();
        const categoriesData = response.data.$values || response.data || [];
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);
  
  const toggleLoginForm = () => {
    setToggleLogin(!toggleLogin);
  }

  const toggleArrow = () => {
    setArrowIcon(!arrowIcon);
  };

  const closeArrow = () => {
    setArrowIcon(false);
  };

  const toggleActionLoginForm = () => {
    setToggleActionLogin(!toggleActionLogin);
  }

  const toggleFormcart = () => {
    setToggleCart(!toggleCart);
  }

  const toggleFormProfile = () => {
    setToggleProfile(!toggleProfile);
  }

  const handleClickOutside = (event, ref, buttonRef, toggleFunction) => {
    if (ref.current && !ref.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
      toggleFunction(false);
    }
  };

  // Xử lý tìm kiếm nhanh
  const handleQuickSearch = async () => {
    if (!searchKeyword.trim()) {
      console.log('❌ Từ khóa tìm kiếm trống');
      return;
    }
    
    console.log('🔍 Bắt đầu tìm kiếm nhanh:', searchKeyword);
    setIsSearching(true);
    try {
      const result = await SearchService.quickSearch(searchKeyword);
      console.log('✅ Kết quả tìm kiếm:', result);
      setSearchResults(result.products || []);
      
      // Chuyển đến trang kết quả tìm kiếm
      navigate('/search', { 
        state: { 
          searchResults: result,
          keyword: searchKeyword,
          categoryId: selectedCategory
        }
      });
    } catch (error) {
      console.error('❌ Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Xử lý tìm kiếm nâng cao
  const handleAdvancedSearch = async () => {
    if (!searchKeyword.trim()) return;
    
    setIsSearching(true);
    try {
      const searchCriteria = {
        keyword: searchKeyword,
        categoryId: selectedCategory || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        page: 1,
        pageSize: 20,
        sortBy: 'name',
        sortOrder: 'asc'
      };
      
      const result = await SearchService.advancedSearch(searchCriteria);
      setSearchResults(result.products || []);
      
      // Chuyển đến trang kết quả tìm kiếm nâng cao
      navigate('/advanced-search', { 
        state: { 
          searchResults: result,
          searchCriteria: searchCriteria
        }
      });
    } catch (error) {
      console.error('Advanced search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Xử lý Enter key
  const handleKeyDown = (e) => {
    console.log('⌨️ Key pressed:', e.key);
    if (e.key === 'Enter') {
      console.log('🔍 Enter pressed, showAdvancedSearch:', showAdvancedSearch);
      if (showAdvancedSearch) {
        handleAdvancedSearch();
      } else {
        handleQuickSearch();
      }
    }
  };


  useEffect(() => {
    const handleOutsideClick = (event) => {
      handleClickOutside(event, popupRef, buttonRef, setToggleCart);
      handleClickOutside(event, popupActionRef, buttonActionRef, setToggleActionLogin);
      handleClickOutside(event, popupProfileRef, buttonProfileRef, setToggleProfile);
      
      // Đóng advanced search khi click outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowAdvancedSearch(false);
      }
    };

    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  }, []);

  return (
    <div className='w-full xl:mx-auto xl:max-w-[1440px] flex justify-between items-center h-28'>
      <div className='h-24'>
        <a href="/"><img className='h-full max-w-full' src={Logo} alt="Logo" /></a>        
      </div>
      <div>
        <i className='bx bx-menu leading-none align-middle text-h2'></i>
      </div>
      <div className='flex border-2 border-yellow-400 rounded-[30px] w-1/2 h-11 overflow-hidden relative' ref={searchRef}>
        {/* Input tìm kiếm */}
        <input 
          className='caret-y border-yellow-400 outline-0 border-0 w-3/5 py-[2px] px-[20px] h-full' 
          type="text" 
          placeholder='Tìm kiếm sản phẩm...' 
          value={searchKeyword}
          onChange={(e) => {
            console.log('📝 Input changed:', e.target.value);
            setSearchKeyword(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowAdvancedSearch(true)}
        />
        
        {/* Dropdown danh mục */}
        <div className='w-1/3 h-full relative'> 
          <i className={`bx ${arrowIcon ? 'bxs-up-arrow' : 'bxs-down-arrow'} text-[0.7rem] text-gray-600 absolute leading-[3.5] h-full right-2`}></i>
          <select 
            onClick={toggleArrow} 
            onBlur={closeArrow} 
            className='appearance-none pr-24 pl-4 bg-white border-gray-300 rounded text-gray-600 cursor-pointer outline-0 border-0 text-small py-2 px-5 font-medium w-full h-full' 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tất cả danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Nút tìm kiếm */}
        <button 
          className='w-[10%] h-full bg-y bg-yellow-400 text-slate-100 group flex items-center justify-center'
          onClick={showAdvancedSearch ? handleAdvancedSearch : handleQuickSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <i className='bx bx-loader-alt bx-spin text-slate-100 text-h3'></i>
          ) : (
            <i className='bx bx-search text-slate-100 text-h3 transition-transform duration-100 group-hover:scale-110'></i>
          )}
        </button>

        {/* Nút chuyển đổi chế độ tìm kiếm */}
        <button 
          className='absolute -right-12 top-0 h-full px-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors'
          onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
          title={showAdvancedSearch ? 'Chế độ tìm kiếm nhanh' : 'Chế độ tìm kiếm nâng cao'}
        >
          <i className={`bx ${showAdvancedSearch ? 'bx-filter-alt' : 'bx-slider-alt'} text-sm`}></i>
        </button>

        {/* Advanced Search Panel */}
        {showAdvancedSearch && (
          <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50'>
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Giá từ</label>
                <input 
                  type="number" 
                  placeholder="0" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Giá đến</label>
                <input 
                  type="number" 
                  placeholder="1000000" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400'
                />
              </div>
            </div>
            
            <div className='flex justify-between items-center'>
              <div className='text-sm text-gray-600'>
                {showAdvancedSearch ? 'Chế độ tìm kiếm nâng cao' : 'Chế độ tìm kiếm nhanh'}
              </div>
              <button 
                className='px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors'
                onClick={handleAdvancedSearch}
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='w-1/5 text-black'> 
        <ul className='flex justify-between items-center'>
          <li className='group'><i className='bx bx-heart text-h2 leading-none align-middle text-red-600 cursor-pointer transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i></li>
          <li className='flex justify-center items-center gap-1 cursor-pointer group' onClick={toggleFormcart} ref={buttonRef} >
            <div className='relative'>
                <i className='bx bx-shopping-bag text-h2 leading-none align-middle transition-transform duration-100 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]'></i>
                <FormCart popupRef={popupRef} toggleCart={toggleCart} setToggleCart={setToggleCart} />
                <div className='absolute right-[-7px] bottom-[-10px] w-5 h-5 bg-yellow-400 rounded-[50%] text-center text-xs leading-5 text-gray-700 font-medium'>10</div>
            </div>
            <div className='text-small ml-1 p-[2px] relative font-medium'>
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
                <img className='rounded-[20%] h-full w-full ' src={ avatarURL ? avatarURL : (avatar.ProfileAvatar ? (avatar.ProfileAvatar.startsWith('http') ? avatar.ProfileAvatar : `${API_ENDPOINT}${avatar.ProfileAvatar}`) : avatarimg)} alt="" />
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
  )
}

export default Header