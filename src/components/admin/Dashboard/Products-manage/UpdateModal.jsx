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

    //Thêm phân loại
    const [productTypes, setProductTypes] = useState([{ typeName: '', options: [''] }]);

    const handleAddProductType = () => {
      setProductTypes([...productTypes, { typeName: '', options: [''] }]);
    };

    const handleTypeChange = (index, value) => {
      const updatedTypes = [...productTypes];
      updatedTypes[index].typeName = value;
      setProductTypes(updatedTypes);
    };
    
    const handleOptionChangeByType = (typeIndex, optionIndex, value) => {
      const updatedTypes = [...productTypes];
      updatedTypes[typeIndex].options[optionIndex] = value;
    
      if (value && optionIndex === updatedTypes[typeIndex].options.length - 1) {
        updatedTypes[typeIndex].options.push('');
      }
      setProductTypes(updatedTypes);
    };
    
    const handleRemoveOptionByType = (typeIndex, optionIndex) => {
      const updatedTypes = [...productTypes];
      updatedTypes[typeIndex].options = updatedTypes[typeIndex].options.filter((_, i) => i !== optionIndex);
      setProductTypes(updatedTypes);
    };

    const handleRemoveProductType = (index) => {
      const updatedTypes = productTypes.filter((_, i) => i !== index);
      setProductTypes(updatedTypes);
    };

    useEffect(() => {
      if (updateId) {
          ProductManage.GetVariantByProductId(updateId)
              .then((variants) => {
                  const variantList = variants?.data?.$values || [];
  
                  const groupedVariants = variantList.reduce((acc, variant) => {
                      const typeName = variant?.type || "Unknown";
                      
                      const options = Array.isArray(variant.value)
                          ? variant.value
                          : (variant.value || "").split(",").map(option => option.trim());
  
                      if (!acc[typeName]) {
                          acc[typeName] = [];
                      }
                      
                      acc[typeName] = [...acc[typeName], ...options];
                      return acc;
                  }, {});
  
                  // Chuyển từ object sang array
                  const groupedArray = Object.entries(groupedVariants).map(([typeName, options]) => ({
                      typeName,
                      options: [...new Set(options), '']
                  }));
  
                  // Nếu không có dữ liệu, set mặc định 1 cặp
                  if (groupedArray.length === 0) {
                      setProductTypes([{ typeName: '', options: [''] }]);
                  } else {
                      setProductTypes(groupedArray);
                  }
              })
              .catch((err) => {
                  // Khi lỗi, đặt giá trị mặc định
                  setProductTypes([{ typeName: '', options: [''] }]);
                  console.error("Lỗi khi lấy phân loại sản phẩm:", err);
              });
      } 
    }, [updateId]);

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
        updateData.sellCount,
        updateData.dateAdded,
        updateData.isAvailable
      )
        .then((res) => {
          const updatedData = JSON.parse(res.config.data);
          ProductManage.GetProductById(updatedData.id)
          .then((res) => {
            const refreshedProductData = res.data;
            console.log(refreshedProductData);
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

    useEffect(() => {
      if(updateId) {
        ProductManage.GetProductById(updateId)
        .then((res) => {
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
            sellCount: res?.data.sellCount,
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
            <div className='Modal-body' style={{maxHeight: '80vh', overflow: 'auto'}}>
              <form action="" onSubmit={handleSubmitUpdate} method='post'>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '100%'}}>
                    <div className='input-label'>Tên sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='name' required autoFocus value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Danh mục sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <select style={{padding: '6.5px 10px'}} name="categoryId" value={updateData.categoryId} onChange={handleCategoryChange}>
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
                    <div className='input-label'>Khối lượng <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='weight' required value={updateData.weight} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Số lượng <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='quantity' required value={updateData.quantity} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Giá bán <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='originalprice' required value={updateData.originalprice} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Khuyến mãi <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='discount' required value={updateData.discount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá khuyến mãi <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='saleprice' required value={updateData.saleprice} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Chất liệu sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='materials' required value={updateData.materials} type="text" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='input-label'>Tags name <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='tags' required value={updateData.tags} type="text" onChange={handleInputChange} />
                  </div>
                </div>

                <div className='Modalborder-input' style={{padding: '5px 0px', marginTop: '15px'}}>
                  {productTypes.map((type, typeIndex) => (
                    <div key={typeIndex} style={{ marginBottom: '5px', position: 'relative', display: 'flex', justifyContent: 'start', gap: '2%' }}>
                      <div style={{ width: '35.8%'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="input-label">Phân loại sản phẩm {typeIndex + 1}</div>
                          {productTypes.length > 1 && (
                              <i style={{color: 'red', marginTop: '-5px', fontSize: '1.5rem', cursor: 'pointer'}} onClick={() => handleRemoveProductType(typeIndex)} class='bx bxs-x-square'></i>
                          )}
                        </div>
                        <input autoComplete="off" type="text" value={type.typeName} placeholder="Tên phân loại" onChange={(e) => handleTypeChange(typeIndex, e.target.value)}
                          style={{ width: '100%', marginBottom: '10px' }}
                        />
                      </div>
                      <div style={{width: '62%'}}>
                        <div className="input-label">Tùy chọn</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>  
                          {type.options.map((option, optionIndex) => (
                            <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '48%' }}>
                              <input
                                name={`Option-${typeIndex}-${optionIndex}`}
                                autoComplete="off"
                                value={option}
                                type="text"
                                placeholder={`Tùy chọn ${optionIndex + 1}`}
                                onChange={(e) => handleOptionChangeByType(typeIndex, optionIndex, e.target.value)}
                                style={{ flex: 1 }}
                              />
                              {optionIndex !== type.options.length - 1 && (
                                <i
                                  className="bx bx-trash"
                                  style={{ fontSize: '20px', color: 'red', cursor: 'pointer' }}
                                  onClick={() => handleRemoveOptionByType(typeIndex, optionIndex)}
                                ></i>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddProductType} style={{ marginTop: '10px', padding: '3px 10px', border: `1px solid ${themeColors.StartColorLinear}`, background: `${themeColors.EndColorLinear}`, color: 'white', borderRadius: '2px' }}>
                    Thêm phân loại <i class='bx bxs-layer-plus' ></i>
                  </button>
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
                  <div style={{width: '20%'}}>
                    <div className='input-label'>Số lượt thích</div>
                    <input name='favorites' readOnly value={updateData.favorites} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='input-label'>Đánh giá</div>
                    <input name='rating' readOnly value={updateData.rating} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='input-label'>Số lượt đánh giá</div>
                    <input name='reviewcount' readOnly value={updateData.reviewcount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='input-label'>Số lượt xem sản phẩm</div>
                    <input name='viewcount' readOnly value={updateData.viewcount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='input-label'>Số lượt mua sản phẩm</div>
                    <input name='sellcount' readOnly value={updateData.sellCount} type="number" onChange={handleInputChange} />
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