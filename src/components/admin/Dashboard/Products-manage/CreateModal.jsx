import React, {useContext, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductManage from '../../../../Services/ProductManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';


const CreateModal = ({openCreate, handleCreateClose, productCreate, setProductData, setProductCreate, style, categories}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();

    //Submit form
    const handleSubmitCreate = (e) => {
        e.preventDefault();
        if(!productCreate.name || !productCreate.price || !productCreate.quantity) {
          toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          return;
        }
        ProductManage.CreateProduct(
            productCreate.name, 
            productCreate.description || null, 
            productCreate.price, 
            productCreate.quantity, 
            productCreate.categoryId || null, 
            productCreate.dateAdded, 
            productCreate.isAvailable || false
        )
        .then((res) => {
            toast.success("Thêm mới sản phẩm thành công!");
        
            setProductData(prevData => [...prevData, res.data]);
            setProductCreate({ name: '', description: '', price: '', quantity: '', categoryId: '', dateAdded: '', isAvailable: false });
            handleCreateClose();
        })
        .catch((err) => {
            toast.error("Có lỗi xảy ra!");
        });
    };

    //handle input
    useEffect(() => {
      const currentDate = new Date().toISOString();
      setProductCreate(prev => ({
          ...prev,
          dateAdded: currentDate
      }));
    }, [setProductCreate]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === 'checkbox' ? checked : value;

      setProductCreate({ ...productCreate, [name]: fieldValue });
    };
    const handleCategoryChange = (e) => {
        setProductCreate({ ...productCreate, categoryId: e.target.value });
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
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '100%'}}>
                    <div className='input-label'>Tên sản phẩm</div>
                    <input name='name' required autoFocus value={productCreate.name} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '40%'}}>
                    <div className='input-label'>Danh mục sản phẩm</div>
                    <select style={{padding: '6.5px 10px'}} name="categoryId" value={productCreate.categoryId} onChange={handleCategoryChange}>
                      <option value="" disabled>-- Chọn danh mục --</option>
                      {
                          categories.length > 0 ? (
                            categories.map((category, index) => (
                              <option key={index} value={category.id}>{category.name}</option>
                            ))
                          ) : 'không có danh mục nào'
                      }
                    </select>
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá bán</div>
                    <input name='price' autoFocus required value={productCreate.price} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Số lượng</div>
                    <input name='quantity' autoFocus required value={productCreate.quantity} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={productCreate.description} rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div style={{display:'flex', justifyContent: 'start', alignItems: 'center', gap: '5px'}} className='Modalborder-input'>
                  <input 
                      style={{width: '2%'}} 
                      type="checkbox" 
                      id='isAvailable' 
                      checked={productCreate.isAvailable} 
                      name='isAvailable' 
                      onChange={handleInputChange}
                  />
                  <label htmlFor="isAvailable">Hoạt động</label>
                </div>
                <input type="hidden" name='dateAdded' value={productCreate.dateAdded} readOnly />
              </form>
            </div>
            <div className='Modal-footer'>
                <button onClick={handleSubmitCreate} type="submit" style={{background: `${themeColors.EndColorLinear}`}}>
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