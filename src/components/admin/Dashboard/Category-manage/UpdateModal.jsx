import React, {useContext, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CategoryManage from '../../../../Services/CategoryManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';

const UpdateModal = ({openUpdate, handleUpdateClose, setCategoryData, style, updateId}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const [updateData, setUpdateData] = useState({
        id: '',
        name: '',
        description: ''
    });

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
        <div style={{background: `${themeColors.EndColorLinear}`}} className='w-full'>
            <div style={{color: 'white'}} className='h-full flex justify-start gap-2 items-center p-4 text-h2 font-semibold'>
            <i style={{color: `${themeColors.StartColorLinear}`}} className='bx bxs-edit' ></i>
            {t('Update')}
            </div>    
        </div>
        <div className='w-full bg-gray-50 p-4 border-b border-gray-300'>
            <form action="" onSubmit={handleSubmitUpdate} method='post'>
            <div className='w-full mb-2'>
                <div className='mb-1 font-medium'>Tên danh mục</div>
                <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='name' autoFocus required value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
            </div>
            <div className='w-full mb-0'>
                <div className='mb-1 font-medium'>Mô tả</div>
                <textarea className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name="description" type="text" value={updateData.description} rows={5} id="" onChange={handleInputChange} spellCheck="false">{updateData.description}</textarea>
            </div>
            <input type="hidden" name='id' value={updateData.id} onChange={handleInputChange} />
            </form>
        </div>
        <div className='p-4 bg-gray-50 flex justify-end items-center gap-2'>
            <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleSubmitUpdate} style={{background: `${themeColors.EndColorLinear}`}}>
                <i className='bx bx-save -mt-[1px]'></i>
                Lưu lại
            </button>
            <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleUpdateClose} style={{background: 'red'}}>Đóng</button>
        </div>
        </Box>
    </Modal>
  )
}

export default UpdateModal