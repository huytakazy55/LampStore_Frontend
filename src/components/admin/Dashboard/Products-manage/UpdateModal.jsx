import React, {useContext, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductManage from '../../../../Services/ProductManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';


const UpdateModal = ({openUpdate, handleUpdateClose, setProductData, style, categories, updateId}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const [updateData, setUpdateData] = useState({
      id: '',
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
      isAvailable: '' 
  });


    const handleSubmitUpdate = (e) => {
      e.preventDefault();
      
      ProductManage.UpdateProduct(
        updateData.id, 
        updateData.name, 
        updateData.description, 
        updateData.originalprice,
        updateData.discount,
        updateData.saleprice,
        updateData.quantity,
        updateData.weight,
        updateData.materials,
        updateData.categoryId,
        updateData.tags,
        updateData.rating,
        updateData.viewcount,
        updateData.reviewcount,
        updateData.favorites,
        updateData.dateAdded,
        updateData.isAvailable
      )
        .then((res) => {
          const updatedData = JSON.parse(res.config.data);
          ProductManage.GetProductById(updatedData.id)
          .then((res) => {
            const refreshedProductData = res.data;
            setProductData((prevData) =>
              prevData.map((item) => (item.id === refreshedProductData.id ? refreshedProductData : item))
            );
          })
          .catch((err) => {
            toast.error("Có lỗi khi lấy thông tin sản phẩm mới.");
          });
          toast.success("Cập nhật bản ghi thành công");
          handleUpdateClose();
        })
        .catch((err) => {
          toast.error("Có lỗi xảy ra.");
        });
    };

    // Lấy dữ liệu vào form
    useEffect(() => {
      if(updateId) {
        ProductManage.GetProductById(updateId)
        .then((res) => {
          console.log(res.data);
          setUpdateData({
            id: res?.data.id,
            name: res?.data.name,
            description: res?.data.description,
            originalprice: res?.data.originalPrice,
            discount: res?.data.discount,
            saleprice: res?.data.salePrice,
            quantity: res?.data.quantity,
            weight: res?.data.weight,
            materials: res?.data.materials,
            categoryId: res?.data.categoryId,
            tags: res?.data.tags,
            rating: res?.data.rating,
            viewcount: res?.data.viewCount,
            reviewcount: res?.data.reviewCount,
            favorites: res?.data.favorites,
            dateAdded: res?.data.dateAdded,
            isAvailable: res?.data.isAvailable
          })
        })
      }
    },[updateId])

    //lấy ngày hiện tại
    useEffect(() => {
      const currentDate = new Date().toISOString();
      setUpdateData(prev => ({
          ...prev,
          dateAdded: currentDate // Gán dateAdded trực tiếp vào productCreate
      }));
    }, [setProductData]);

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;

      let fieldValue = type === 'checkbox' ? checked : value;
      const updatedProduct = { ...updateData, [name]: fieldValue };

      if (name === 'discount') {
        fieldValue = Math.max(0, Math.min(100, Number(fieldValue)));
      }
      
      if(name === 'originalprice' || name === 'discount'){
        const originalPrice = parseFloat(updatedProduct.originalprice || 0);
        const discount = parseFloat(updatedProduct.discount || 0);
        updateData.saleprice = originalPrice - (originalPrice * discount / 100);
      }
      
      setUpdateData({ ...updateData, [name]: fieldValue });

    };
    const handleCategoryChange = (e) => {
        setUpdateData({ ...updateData, categoryId: e.target.value });
    };

    const GetCategoryById = (id) => {
      const category = categories.find(category => category.id === id);
      return category ? category.name : ''
    }

  return (
    <Modal
          open={openUpdate}
          onClose={handleUpdateClose}
        >
          <Box sx={style}>
            <div style={{background: `${themeColors.EndColorLinear}`}} className='Modal-header'>
              <div style={{color: 'white'}} className='Header-title'>
                <i style={{color: `${themeColors.StartColorLinear}`}} class='bx bxs-edit' ></i>
                {t('Update')}
              </div>
            </div>
            <div className='Modal-body'>
              <form action="" onSubmit={handleSubmitUpdate} method='post'>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '100%'}}>
                    <div className='input-label'>Tên sản phẩm</div>
                    <input name='name' required autoFocus value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Danh mục sản phẩm</div>
                    <select style={{padding: '6.5px 10px'}} name="categoryId" value={updateData.categoryId} onChange={handleCategoryChange}>
                      <option value={updateData.categoryId} selected>{GetCategoryById(updateData.categoryId)}</option>
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
                    <div className='input-label'>Khối lượng</div>
                    <input name='weight' required value={updateData.weight} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Số lượng</div>
                    <input name='quantity' required value={updateData.quantity} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Giá bán</div>
                    <input name='originalprice' required value={updateData.originalprice} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Khuyến mãi</div>
                    <input name='discount' required value={updateData.discount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá khuyến mãi</div>
                    <input name='saleprice' required value={updateData.saleprice} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Chất liệu sản phẩm</div>
                    <input name='materials' required value={updateData.materials} type="text" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='input-label'>Tags name</div>
                    <input name='tags' required value={updateData.tags} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='Modalborder-input'>
                  <div className='input-label'>Mô tả</div>
                  <textarea name="description" type="text" value={updateData.description} spellCheck="false" rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div style={{display:'flex', justifyContent: 'start', alignItems: 'center', gap: '5px'}} className='Modalborder-input'>
                  <input 
                      style={{width: '2%'}} 
                      type="checkbox" 
                      id='isAvailable' 
                      checked={updateData.isAvailable} 
                      name='isAvailable' 
                      onChange={handleInputChange}
                  />
                  <label htmlFor="isAvailable">Hoạt động</label>
                </div>

                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Giá bán</div>
                    <input name='originalprice' required value={updateData.originalprice} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Khuyến mãi</div>
                    <input name='discount' required value={updateData.discount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Giá khuyến mãi</div>
                    <input name='saleprice' required value={updateData.saleprice} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Giá khuyến mãi</div>
                    <input name='saleprice' required value={updateData.saleprice} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <input type="hidden" name='dateAdded' value={updateData.dateAdded} readOnly />
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