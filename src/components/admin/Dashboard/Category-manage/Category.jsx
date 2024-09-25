import React, {useContext, useEffect, useState, useMemo} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Pagination from '@mui/material/Pagination';
import './Category.css'
import {ThemeContext} from '../../../../ThemeContext';
import CategoryManage from '../../../../Services/CategoryManage';
import { toast } from 'react-toastify';

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


const Category = () => {
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
  const [categoryData, setCategoryData] = useState([]);
  const [categoryCreate, setCategoryCreate] = useState({
    name: '',
    description: ''
  });

  useEffect( () => {
    CategoryManage.GetCategory()
    .then((res) => {
      setCategoryData(res.data.$values);
    })
    .catch((err) => {
      console.log(err);
    })
  },[])

  const DeleteCategory = (id, name) => {
    CategoryManage.DeleteCategory(id, name)
      .then((res) => {
        setCategoryData(prevData => prevData.filter(category => category.id !== id));
        toast.success(`Đã xóa bản ghi có id = ${id}: ${name}`);
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    CategoryManage.CreateCategory(categoryCreate.name, categoryCreate.description)
      .then((res) => {
        toast.success("Thêm mới danh mục thành công!");
  
        setCategoryData(prevData => [...prevData, res.data]);
        setCategoryCreate({ name: '', description: '' });
        handleCreateClose(); // Tắt modal sau khi thành công
      })
      .catch((err) => {
        toast.error("Có lỗi xảy ra!");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryCreate({ ...categoryCreate, [name]: value });
  };
  // Giới hạn số từ có trong 1 hàng của bảng dữ liệu
  const truncateWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' . . .';
    }
    return text;
  };

  const handleUpdateClick = (id) => {
    handleUpdateOpen();
    setUpdateId(id);
  }

  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //Pagination
  const currentItems = useMemo(() => {
    return categoryData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [categoryData, page, itemsPerPage]);
  //Get Category by id
  useEffect(() => {
    if(updateId != 0) {
      CategoryManage.GetCategoryById(updateId)
      .then((res) => {
        setUpdateData({
          id: res?.data.id,
          name: res?.data.name,
          description: res?.data.description
        });
      })
      .catch((err) => {
        console.log(err);
      })
    }
  },[updateId])
  return (
    <div>
        <div className='RightBody-title'>
          {t('Category')}
        </div>
        <div onClick={handleCreateOpen} className='Create-Category' style={{background: `${themeColors.EndColorLinear}`}}>
            <i class='bx bx-duplicate'></i>
            {t('Create')}
          </div>
        <div className='RightBody-breadcrumbs'>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link component={RouterLink} to="/admin" color="inherit">
              {t('Home')}
            </Link>
            <Typography color="textPrimary">{t('Category')}</Typography>
          </Breadcrumbs>
        </div>
        <div className='Category'>
          <table>
            <thead>
              <tr style={{background: `${themeColors.EndColorLinear}`, color: `${themeColors.StartColorLinear}`}}>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Mô tả</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {
                currentItems.length > 0 ? (
                  currentItems.map((category, index) => (
                    <tr key={category.id}>
                      <td style={{textAlign: 'center', width: '5%'}}>{index + 1}</td>
                      <td style={{width: '25%'}}>{truncateWords(category.name, 10)}</td>
                      <td style={{width: '60%'}}>{truncateWords(category.description, 25)}</td>
                      <td style={{width: '10%'}}>
                        <div className='combo-action'>
                          <i onClick={() => handleUpdateClick(category.id)} class='bx bx-edit'></i>
                          <i onClick={() => DeleteCategory(category.id,category.name)} class='bx bx-trash' ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center', color:'red'}}>Không có dữ liệu</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          {
            categoryData.length > itemsPerPage && (
              <Pagination
                size="small"
                variant="outlined" shape="rounded"
                count={Math.ceil(categoryData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                style={{ display: 'flex', justifyContent: 'right', marginTop: '20px' }}
              />
            )
          }
        </div>
        {/* Modal Create */}
        <Modal
          open={openCreate}
          onClose={handleCreateClose}
        >
          <Box sx={style}>
            <div style={{background: `${themeColors.EndColorLinear}`}} className='Modal-header'>
              <div style={{color: 'white'}} className='Header-title'>
                <i style={{color: `${themeColors.StartColorLinear}`}} class='bx bx-book-add' ></i>
                {t('Create')}
              </div>    
            </div>
            <div className='Modal-body'>
              <form action="" onSubmit={handleSubmit} method='post'>
                <div className='Modalborder-input'>
                  <div className='input-label'>Tên danh mục</div>
                  <input name='name' autoFocus required value={categoryCreate.name} type="text" onChange={handleInputChange} />
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={categoryCreate.description} rows={5} id="" onChange={handleInputChange}></textarea>
                </div>
              </form>
            </div>
            <div className='Modal-footer'>
                <button onClick={handleSubmit} style={{background: `${themeColors.EndColorLinear}`}}>
                  <i class='bx bx-save'></i>
                  Lưu lại
                </button>
                <button onClick={handleCreateClose} style={{background: 'red'}}>Đóng</button>
            </div>
          </Box>
        </Modal>
        {/* Modal Update */}
        <Modal
          open={openUpdate}
          onClose={handleUpdateClose}
        >
          <Box sx={style}>
            <div style={{background: `${themeColors.EndColorLinear}`}} className='Modal-header'>
              <div style={{color: 'white'}} className='Header-title'>
                <i class='bx bxs-edit' ></i>
                {t('Update')}
              </div>    
            </div>
            <div className='Modal-body'>
              <form action="" onSubmit={handleSubmit} method='post'>
                <div className='Modalborder-input'>
                  <div className='input-label'>Tên danh mục</div>
                  <input name='name' autoFocus required value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={updateData.description} rows={5} id="" onChange={handleInputChange} spellCheck="false">{updateData.description}</textarea>
                </div>
              </form>
            </div>
            <div className='Modal-footer'>
                <button onClick={handleSubmit} style={{background: `${themeColors.EndColorLinear}`}}>
                  <i class='bx bx-save'></i>
                  Lưu lại
                </button>
                <button onClick={handleUpdateClose} style={{background: 'red'}}>Đóng</button>
            </div>
          </Box>
        </Modal>
    </div>
  )
}

export default Category