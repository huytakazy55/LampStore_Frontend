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
        if(!productCreate.name || !productCreate.originalprice || !productCreate.quantity) {
          toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          return;
        }
        ProductManage.CreateProduct(
            productCreate.name, 
            productCreate.description || null, 
            productCreate.originalprice,
            productCreate.discount,
            productCreate.saleprice || null,
            productCreate.quantity, 
            productCreate.weight || null,
            productCreate.materials || null,            
            productCreate.categoryId || null,
            productCreate.tags || null,
            productCreate.rating || null,
            productCreate.viewcount || null,
            productCreate.reviewcount || null,
            productCreate.favorites || null, 
            productCreate.dateAdded, 
            productCreate.isAvailable || false
        )
        .then((res) => {
            toast.success("Thêm mới sản phẩm thành công!");
        
            setProductData(prevData => [...prevData, res.data]);
            setProductCreate(
              { 
                name: '', 
                description: '', 
                originalprice: '',
                discount: '',     
                saleprice: '',           
                quantity: '',
                weight: '',
                materials: '',
                categoryId: '', 
                tags: '',
                rating: '',
                viewcount: '',
                reviewcount: '',
                favorites: '',
                dateAdded: '', 
                isAvailable: false 

              });
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
      let fieldValue = type === 'checkbox' ? checked : value;
      
      const updatedProduct = { ...productCreate, [name]: fieldValue };
      if (name === 'discount') {
        fieldValue = Math.max(0, Math.min(100, Number(fieldValue)));
      }

      if (name === 'originalprice' || name === 'discount') {
        const originalPrice = parseFloat(updatedProduct.originalprice) || 0;
        const discount = parseFloat(updatedProduct.discount) || 0;
        productCreate.saleprice = originalPrice - (originalPrice * discount) / 100;
      }

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
                  <div style={{width: '36%'}}>
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
                    <div className='input-label'>Khối lượng <span style={{fontSize: '14px'}}>(Gram)</span></div>
                    <input name='weight' autoFocus required value={productCreate.weight} min={0} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Số lượng</div>
                    <input name='quantity' autoFocus required value={productCreate.quantity} min={0} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Giá bán</div>
                    <input name='originalprice' autoFocus required value={productCreate.originalprice} min={0} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Khuyến mãi <span style={{fontSize: '14px'}}>(%)</span></div>
                    <input name='discount' autoFocus required value={productCreate.discount} min={0} max={100} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá khuyến mãi</div>
                    <input name='saleprice' autoFocus required value={productCreate.saleprice} min={0} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Chất liệu sản phẩm</div>
                    <input name='materials' autoFocus required value={productCreate.materials} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='input-label'>Tags name</div>
                    <input name='tags' autoFocus required value={productCreate.tags} min={0} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={productCreate.description} rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div style={{display:'flex', justifyContent: 'start', alignItems: 'center', gap: '5px', fontWeight: 'bold'}} className='Modalborder-input'>
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
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%', marginTop: '3rem'}} className='Modalborder-input'>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt thích</div>
                    <input name='favorites' readOnly value={productCreate.favorites} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Đánh giá</div>
                    <input name='rating' readOnly value={productCreate.rating} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt đánh giá</div>
                    <input name='reviewcount' readOnly value={productCreate.reviewcount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt xem sản phẩm</div>
                    <input name='viewcount' readOnly value={productCreate.viewcount} min={0} type="text" onChange={handleInputChange} />
                  </div>
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