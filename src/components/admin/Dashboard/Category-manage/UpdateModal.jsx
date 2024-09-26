import React, {useContext, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CategoryManage from '../../../../Services/CategoryManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';

const UpdateModal = ({openUpdate, handleUpdateClose, setCategoryData, style, updateId}) => {
    const {themeColors} = useContext(ThemeContext);
    const [updateData, setUpdateData] = useState({
        id: '',
        name: '',
        description: ''
    });
    const {t} = useTranslation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmitUpdate = (e) => {
        e.preventDefault();
        
        CategoryManage.UpdateCategory(updateData.id, updateData.name, updateData.description)
          .then((res) => {
            const updatedData = JSON.parse(res.config.data);
            setCategoryData((prevData) =>
              prevData.map((item) => (item.id === updatedData.id ? updatedData : item))
            );
            toast.success("Cập nhật bản ghi thành công");
            handleUpdateClose();
          })
          .catch((err) => {
            toast.error("Có lỗi xảy ra.");
          });
      };

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
    <Modal open={openUpdate} onClose={handleUpdateClose}>
        <Box sx={style}>
        <div style={{background: `${themeColors.EndColorLinear}`}} className='Modal-header'>
            <div style={{color: 'white'}} className='Header-title'>
            <i style={{color: `${themeColors.StartColorLinear}`}} class='bx bxs-edit' ></i>
            {t('Update')}
            </div>    
        </div>
        <div className='Modal-body'>
            <form action="" onSubmit={handleSubmitUpdate} method='post'>
            <div className='Modalborder-input'>
                <div className='input-label'>Tên danh mục</div>
                <input name='name' autoFocus required value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
            </div>
            <div className='Modalborder-input'>
                <div className='input-label'>Mô tả</div>
                <textarea name="description" type="text" value={updateData.description} rows={5} id="" onChange={handleInputChange} spellCheck="false">{updateData.description}</textarea>
            </div>
            <input type="hidden" name='id' value={updateData.id} onChange={handleInputChange} />
            </form>
        </div>
        <div className='Modal-footer'>
            <button onClick={handleSubmitUpdate} style={{background: `${themeColors.EndColorLinear}`}}>
                <i class='bx bx-save'></i>
                Lưu lại
            </button>
            <button onClick={handleUpdateClose} style={{background: 'red'}}>Đóng</button>
        </div>
        </Box>
    </Modal>
  )
}

export default UpdateModal