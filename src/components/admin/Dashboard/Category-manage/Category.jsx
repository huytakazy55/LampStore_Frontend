import React, {useContext, useEffect, useState, useMemo} from 'react'
import { Breadcrumbs, Link } from '@mui/material';
import { NavigateNext as NavigateNextIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import './Category.css'
import CategoryManage from '../../../../Services/CategoryManage';
import { toast } from 'react-toastify';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';

const style = {
  position: 'absolute',
  top: '35%',
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
  // Giới hạn số từ có trong 1 hàng của bảng dữ liệu
  const truncateWords = (text, maxWords) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' . . .';
    }
    return text;
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };
  //Pagination
  const currentItems = useMemo(() => {
    return categoryData.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [categoryData, page, itemsPerPage]);

  const handleUpdateClick = (id) => {
    handleUpdateOpen();
    setUpdateId(id);
  }

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
                        <div className='flex justify-center items-center gap-3'>
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
        <CreateModal 
          openCreate={openCreate}
          handleCreateClose={handleCreateClose}
          categoryCreate={categoryCreate} 
          setCategoryData={setCategoryData} 
          setCategoryCreate={setCategoryCreate} 
          style={style} 
        />
        {/* Modal Update */}
        <UpdateModal
          openUpdate={openUpdate}
          handleUpdateClose={handleUpdateClose}
          setCategoryData={setCategoryData}
          style={style}
          updateData={updateData}
          updateId={updateId}
        />
    </div>
  )
}

export default Category