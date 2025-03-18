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
            <div style={{background: `${themeColors.EndColorLinear}`}} className='w-full'>
              <div style={{color: 'white'}} className='h-full flex justify-start gap-2 items-center p-4 text-h2 font-semibold'>
                <i style={{color: `${themeColors.StartColorLinear}`}} className='bx bx-book-add text-h1'></i>
                {t('Create')}
              </div>    
            </div>
            <div className='w-full bg-gray-50 p-4 border-b border-gray-300'>
              <form action="" onSubmit={handleSubmitCreate} method='post'>
                <div className='w-full mb-2'>
                  <div className='mb-1 font-medium'>Tên danh mục</div>
                  <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='name' autoFocus required value={categoryCreate.name} type="text" onChange={handleInputChange} />
                </div>
                <div className='w-full mb-0'>
                  <div className='mb-1 font-medium'>Mô tả</div>
                  <textarea className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name="description" type="text" value={categoryCreate.description} rows={5} id="" onChange={handleInputChange}></textarea>
                </div>
              </form>
            </div>
            <div className='p-4 bg-gray-50 flex justify-end items-center gap-2'>
                <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleSubmitCreate} style={{background: `${themeColors.EndColorLinear}`}}>
                  <i className='bx bx-save -mt-[1px]'></i>
                  Lưu lại
                </button>
                <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleCreateClose} style={{background: 'red'}}>Đóng</button>
            </div>
          </Box>
        </Modal>
  )
}

export default CreateModal