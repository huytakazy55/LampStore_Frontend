import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductManage from '../../../../Services/ProductManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';


const CreateModal = ({openCreate, handleCreateClose, productCreate, setProductData, setProductCreate, style}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const handleSubmitCreate = (e) => {
        e.preventDefault();
        ProductManage.CreateCategory(productCreate.name, productCreate.description)
        .then((res) => {
            toast.success("Thêm mới danh mục thành công!");
        
            setProductData(prevData => [...prevData, res.data]);
            setProductCreate({ name: '', description: '' });
            handleCreateClose();
        })
        .catch((err) => {
            toast.error("Có lỗi xảy ra!");
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductCreate({ ...productCreate, [name]: value });
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
                  <div style={{width: '70%'}}>
                    <div className='input-label'>Tên sản phẩm</div>
                    <input name='name' autoFocus required value={productCreate.name} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Danh mục sản phẩm</div>
                    <input name='name' autoFocus required value={productCreate.name} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '35%'}}>
                    <div className='input-label'>Giá bán</div>
                    <input name='name' autoFocus required value={productCreate.name} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '35%'}}>
                    <div className='input-label'>Số lượng</div>
                    <input name='name' autoFocus required value={productCreate.name} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '28%'}}>
                    <div className='input-label'>Số lượng</div>
                    <select name="" id="">
                      <option selected value="1">Đèn khung</option>
                      <option value="1">1</option>
                    </select>
                  </div>
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={productCreate.description} rows={3} id="" onChange={handleInputChange}></textarea>
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