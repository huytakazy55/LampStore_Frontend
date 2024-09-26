import React, {useContext, useState, useEffect, useMemo} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Modal from '@mui/material/Modal';
import './Products.css'
import {ThemeContext} from '../../../../ThemeContext';
import { toast } from 'react-toastify';
import ProductManage from '../../../../Services/ProductManage';
import CategoryManage from '../../../../Services/CategoryManage';
import CreateModal from './CreateModal';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
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
    name: '',
    description: ''
  });
  const handleUpdateOpen = () => setOpenUpdate(true);
  const handleUpdateClose = () => setOpenUpdate(false);
  //Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  //Data
  const [productData, setProductData] = useState([]);
  const [productCreate, setProductCreate] = useState({
    name: '',
    description: ''
  });
  //Category
  const [categories, setCategories] = useState([]);

  useEffect( () => {
    ProductManage.GetProduct()
    .then((res) => {
      setProductData(res.data.$values);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  useEffect(() => {
    CategoryManage.GetCategory()
      .then((res) => {
        setCategories(res.data.$values);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra khi tải danh mục.");
      });
  }, []);

  // Giới hạn số từ có trong 1 hàng của bảng dữ liệu
  // const truncateWords = (text, maxWords) => {
  //   const words = text.split(' ');
  //   if (words.length > maxWords) {
  //     return words.slice(0, maxWords).join(' ') + ' . . .';
  //   }
  //   return text;
  // };
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //Pagination
  const currentItems = useMemo(() => {
    return productData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [productData, page, itemsPerPage]);

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

  const GetCategoryById = (id) => {
    const category = categories.find(category => category.id === id);
    console.log(category);
    return category ? category.name : ''
  }

  return (
    <div>
        <div className='RightBody-title'>
          {t('Product')}
        </div>
        <div onClick={handleCreateOpen} className='Create-Product' style={{background: `${themeColors.EndColorLinear}`}}>
            <i class='bx bx-duplicate'></i>
            {t('Create')}
          </div>
        <div className='RightBody-breadcrumbs'>
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
                <th>Tên sản phẩm</th>
                <th>Mô tả</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
                <th>Danh mục</th>
                <th>Ngày tạo</th>
                <th>Hoạt động</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.length > 0 ? (
                  currentItems.map((product, index) => (
                    <tr key={product.id}>
                      <td style={{textAlign: 'center', width: '2%'}}>{index + 1}</td>
                      <td style={{width: '20%'}}>{product.name}</td>
                      <td style={{width: '20%'}}>{product.description}</td>
                      <td style={{width: '7%', textAlign: 'center'}}>{product.price}</td>
                      <td style={{width: '5%', textAlign: 'center'}}>{product.quantity}</td>
                      <td style={{width: '10%'}}>{GetCategoryById(product.categoryId)}</td>
                      <td style={{width: '7%', textAlign: 'center'}}>{new Date(product.dateAdded).toLocaleDateString()}</td>
                      <td style={{width: '7%', color: `${product.isAvailable ? 'green' : 'red'}`, textAlign: 'center'}}>{product.isAvailable ? 'Còn hàng' : 'Hết hàng'}</td>
                      <td style={{width: '10%'}}>
                        <div className='combo-action'>
                          <i onClick={() => handleUpdateClick(product.id)} class='bx bx-edit'></i>
                          <i onClick={() => DeleteProduct(product.id,product.name)} class='bx bx-trash' ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{textAlign: 'center', color:'red'}}>Không có dữ liệu</td>
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
        />
    </div>
  )
}

export default Products