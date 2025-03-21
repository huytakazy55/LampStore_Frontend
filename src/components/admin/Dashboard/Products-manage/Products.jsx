import React, {useContext, useState, useEffect, useMemo} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import {ThemeContext} from '../../../../ThemeContext';
import { toast } from 'react-toastify';
import ProductManage from '../../../../Services/ProductManage';
import CategoryManage from '../../../../Services/CategoryManage';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import UploadModal from './UploadModal';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  bgcolor: 'background.paper',
  boxShadow: 10,
  border: 'none',
  outline: 'none',
};

const Products = () => {
  const {themeColors} = useContext(ThemeContext);
  const {t} = useTranslation();
  //modal create
  const [openCreate, setOpenCreate] = React.useState(false);
  const handleCreateOpen = () => setOpenCreate(true);
  const handleCreateClose = () => setOpenCreate(false);
  //modal update
  const [updateId, setUpdateId] = useState(0);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateData, setUpdateData] = useState({
    id: '',
    name: "",
    description: "",
    reviewCount: 0,
    tags: "",
    viewCount: 0,
    favorites: 0,
    sellCount: 0,
    categoryId: null,
    status: 1
  });
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  //Modal Upload
  const handleUploadOpen = () => setOpenUpload(true);
  const handleUploadClose = () => setOpenUpload(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  //Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  //Data
  const [productData, setProductData] = useState([]);
  const [productCreate, setProductCreate] = useState({
    name: "",
    description: "",
    reviewCount: 0,
    tags: "",
    viewCount: 0,
    favorites: 0,
    sellCount: 0,
    categoryId: "",
    status: 1,
  });
  //Category
  const [categories, setCategories] = useState([]);
  //Search
  const [searchTerm, setSearchTerm] = useState('');

  useEffect( () => {
    ProductManage.GetProduct()
    .then((res) => {
      setProductData(res.data.$values);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  const GetCategoryById = (id) => {
    const category = categories.find(category => category.id === id);
    return category ? category.name : ''
  }

  useEffect(() => {
    CategoryManage.GetCategory()
      .then((res) => {
        setCategories(res.data.$values);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra khi tải danh mục.");
      });
  }, []);

  //Search Service
  const highlightedText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
      ) : part
    );
  };
  const filteredProducts = useMemo(() => {
    return productData.filter(product => {
      const categoryName = GetCategoryById(product.categoryId).toLowerCase();
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        categoryName.includes(searchTerm.toLowerCase())
      );
    });
  }, [productData, searchTerm]);

  const truncateWords = (text, maxWords) => {
    if (!text) {
      return '';
    }
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' . . .';
    }
    return text;
  };

  // Định dạng số theo ngôn nguwxx hiện tại
  const { i18n } = useTranslation();
  const language = i18n.language;
  const formattedNumber = (number, language) => {
    return new Intl.NumberFormat(language).format(number);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //Pagination
  const currentItems = useMemo(() => {
    return filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [filteredProducts, page, itemsPerPage]);

  const DeleteProduct = (id, name) => {
    ProductManage.DeleteProduct(id, name)
      .then((res) => {
        setProductData(prevData => prevData.filter(product => product.id !== id));
        toast.success(`Đã xóa bản ghi có id = ${id}: ${name}`);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleUpdateClick = (id) => {
    handleUpdateOpen();
    setUpdateId(id);
  }

  const handleUploadClick = (id) => {
    handleUploadOpen();
    setUpdateId(id);
  }

  return (
    <div>
        <div className='text-h2 font-semibold mb-2'>
          {t('Product')}
        </div>
        <div className='absolute right-0 top-4 flex justify-end items-center gap-4 h-9'>
          <div style={{background: `${themeColors.EndColorLinear}`}} className='flex border-[1px] border-gray-300 justify-between items-center rounded h-full'>
            <i className='bx bx-search-alt-2 text-h2 px-6 text-white' ></i>
            <input className='border-none outline-none py-1 px-3 text-small rounded-tr-sm rounded-br-sm h-full w-60'
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{color: `${themeColors.StartColorLinear}`}} type="text" 
              placeholder="tên, danh mục ..." 
            />
          </div>
          <div onClick={handleCreateOpen} className='border-[1px] border-gray-300 py-1 px-4 font-medium rounded text-white flex justify-center items-center gap-1 cursor-pointer h-full' style={{background: `${themeColors.EndColorLinear}`}}>
              <i className='bx bx-duplicate text-h3 -mt-[1px]'></i>
              {t('Create')}
          </div>
        </div>
        <div className='mb-4'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
            <Typography color="textPrimary">{t('Product')}</Typography>
          </Breadcrumbs>
        </div>
        <div className='Product'>
          <table>
            <thead>
              <tr style={{background: `${themeColors.EndColorLinear}`, color: `${themeColors.StartColorLinear}`}}>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
                <th>Danh mục</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.length > 0 ? (
                  currentItems.map((product, index) => (
                    <tr key={product.id}>
                      <td className='text-center w-[2%]'>{index + 1}</td>
                      <td className='w-[6%]'>
                        {product.images && product.images.$values.length > 0 ? (
                          <img src={`${API_ENDPOINT}${product.images.$values[0].imagePath}`} alt="Product" className='w-full h-16 flex' />
                        ) : (
                          'No Image'
                        )}
                      </td>
                      <td className='w-[15%]'>{highlightedText(product.name, searchTerm)}</td>
                      <td className='w-1/5'>{truncateWords(product.description, 10)}</td>
                      <td className='w-[7%] text-center'>{formattedNumber(product.minPrice, language)} - {formattedNumber(product.maxPrice, language)}</td>
                      <td className='w-[5%] text-center'>{product.stock}</td>
                      <td className='w-[10%] text-center'>{highlightedText(GetCategoryById(product.categoryId), searchTerm)}</td>
                      <td className='w-[7%] text-center'>
                        {new Date(product.dateAdded).toLocaleDateString('vi-VN', {
                          day: '2-digit', // NN
                          month: '2-digit', // TT
                          year: 'numeric' // NNNN
                        }).replace(/\//g, '-')}
                      </td>
                      <td className={`w-[7%] ${product.status == 1 ? 'text-green-600' : 'text-red-600'} text-center`}>{product.status ? 'Hoạt động' : 'Ẩn'}</td>
                      <td className='w-[8%]'>
                        <div className='flex justify-center items-center gap-3'>
                          <i onClick={() => handleUploadClick(product.id)} className='bx bx-image-add'></i>
                          <i onClick={() => handleUpdateClick(product.id)} className='bx bx-edit'></i>
                          <i onClick={() => DeleteProduct(product.id,product.name)} className='bx bx-trash' ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className='text-center text-red-600'>Không có dữ liệu</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          {
            productData.length > itemsPerPage && (
              <Pagination
                size="small"
                variant="outlined" shape="rounded"
                count={Math.ceil(productData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}
              />
            )
          }
        </div>
        {/* Modal Create */}
        <CreateModal 
          openCreate={openCreate}
          handleCreateClose={handleCreateClose}
          productCreate={productCreate} 
          setProductData={setProductData} 
          setProductCreate={setProductCreate} 
          style={style} 
          categories={categories}
        />
        {/* Modal Update */}
        <UpdateModal
          openUpdate={openUpdate}
          handleUpdateClose={handleUpdateClose}
          setProductData={setProductData}
          style={style}
          updateData={updateData}
          updateId={updateId}
          categories={categories}
        />
        {/* Modal Upload avatar */}
        <UploadModal
          openUpload={openUpload}
          handleUploadClose={handleUploadClose}
          setProductData={setProductData}
          updateId={updateId}
          style={style}
        />
    </div>
  )
}

export default Products