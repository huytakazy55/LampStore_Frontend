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

    //Submit form
    const handleSubmitCreate = async (e) => {
        e.preventDefault();
    
        if (!productCreate.name || !productCreate.originalprice || !productCreate.quantity) {
            toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
            return;
        }
    
        try {
            // Tạo sản phẩm trước
            const createProductResponse = await ProductManage.CreateProduct(
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
                productCreate.sellcount || null,
                productCreate.dateAdded,
                productCreate.isAvailable || false
            );
    
            const createdProduct = createProductResponse.data;
    
            const variantData = productTypes.flatMap(type =>
              type.options
                  .filter(option => option.trim() !== '')
                  .map(option => ({ type: type.typeName, value: option }))
            );
            
            if (variantData.length > 0) {
              await ProductManage.CreateVariantproduct(createdProduct.id, variantData);
            }
    
            // Đợi cả API tạo sản phẩm và biến thể hoàn thành
            toast.success("Thêm mới sản phẩm và các biến thể thành công!");
            setProductData(prevData => [...prevData, createdProduct]);
    
            // Reset form
            setProductCreate({
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
                sellcount: '',
                dateAdded: '',
                isAvailable: false
            });
            setProductTypes([{ typeName: '', options: [''] }]);
            handleCreateClose();
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi thêm sản phẩm hoặc biến thể!");
        }
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
            <div className='Modal-body' style={{maxHeight: '80vh', overflow: 'auto'}}>
              <form action="" onSubmit={handleSubmitCreate} method='post'>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '100%'}}>
                    <div className='input-label'>Tên sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='name' required autoComplete="off" autoFocus value={productCreate.name} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Danh mục sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
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
                    <div className='input-label'>Khối lượng <span style={{fontSize: '14px'}}>(Gram)</span><span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='weight' autoFocus required value={productCreate.weight} min={0} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Số lượng <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='quantity' autoFocus required value={productCreate.quantity} min={0} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Giá bán <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='originalprice' autoFocus required value={productCreate.originalprice} min={0} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Khuyến mãi <span style={{fontSize: '14px'}}>(%)</span> <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='discount' autoFocus required value={productCreate.discount} min={0} max={100} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá khuyến mãi <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='saleprice' autoFocus required value={productCreate.saleprice} min={0} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Chất liệu sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='materials' autoComplete="off" autoFocus required value={productCreate.materials} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='input-label'>Tags name <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='tags' autoComplete="off" autoFocus required value={productCreate.tags} min={0} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='Modalborder-input' style={{border: '1px solid #aaa', padding: '5px 10px', marginTop: '15px'}}>
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
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt mua sản phẩm</div>
                    <input name='sellcount' readOnly value={productCreate.sellcount} min={0} type="text" onChange={handleInputChange} />
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