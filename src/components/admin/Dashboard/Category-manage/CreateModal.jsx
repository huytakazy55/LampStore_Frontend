import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CategoryManage from '../../../../Services/CategoryManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';


const CreateModal = ({openCreate, handleCreateClose, categoryCreate, setCategoryData, setCategoryCreate, style}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const handleSubmitCreate = (e) => {
        e.preventDefault();
        CategoryManage.CreateCategory(categoryCreate.name, categoryCreate.description)
        .then((res) => {
            toast.success("Thêm mới danh mục thành công!");
        
            setCategoryData(prevData => [...prevData, res.data]);
            setCategoryCreate({ name: '', description: '' });
            handleCreateClose();
        })
        .catch((err) => {
            toast.error("Có lỗi xảy ra!");
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoryCreate({ ...categoryCreate, [name]: value });
      };
  return (
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
              <form action="" onSubmit={handleSubmitCreate} method='post'>
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
                <button onClick={handleSubmitCreate} style={{background: `${themeColors.EndColorLinear}`}}>
                  <i class='bx bx-save'></i>
                  Lưu lại
                </button>
                <button onClick={handleCreateClose} style={{background: 'red'}}>Đóng</button>
            </div>
          </Box>
        </Modal>
  )
}

export default CreateModal