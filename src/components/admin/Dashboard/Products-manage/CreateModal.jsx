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
    const [productVariant, setProductVariant] = useState({
      price: 0,
      discountPrice: 0,
      stock: 0,
      weight: 0,
      materials: "",
      sku: ""
    })

    //Thêm phân loại
    const [productTypes, setProductTypes] = useState([{ typeName: '', options: [''] }]);

    const handleAddProductType = () => {
      setProductTypes([...productTypes, { typeName: '', options: [''] }]);
    };

    const handleTypeChange = (index, values) => {
      const updatedTypes = [...productTypes];
      updatedTypes[index].typeName = values;
      setProductTypes(updatedTypes);      
    };
    
    const handleOptionChangeByType = (typeIndex, optionIndex, values) => {
      const updatedTypes = [...productTypes];
      updatedTypes[typeIndex].options[optionIndex] = values;
    
      if (values && optionIndex === updatedTypes[typeIndex].options.length - 1) {
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
    
        if (!productCreate.name || !productVariant.price || !productVariant.stock ) {
            toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
            return;
        }
    
        try {   
          const variantTypes = productTypes
          .filter(type => type.typeName.trim() !== "" && type.options.some(opt => opt.trim() !== ""))
          .map(type => ({
            name: type.typeName,
            values: type.options.filter(opt => opt.trim() !== "")
          }));

          setProductCreate(prev => ({...prev, variantTypes: variantTypes }));

          ProductManage.CreateProduct(productCreate)
          .then((res) => {
            console.log(res);
            setProductCreate({
              name: "",
              description: "",
              reviewCount: 0,
              tags: "",
              viewCount: 0,
              favorites: 0,
              sellCount: 0,
              categoryId: "",
              status: 1,
              productVariant: [],
              variantTypes: []              
            });
            setProductTypes([{ typeName: '', options: [''] }]);
            handleCreateClose();
            toast.success("Thêm mới sản phẩm thành công!");
            })
          .catch((err) => {
            toast.error("Có lỗi xảy ra khi thêm sản phẩm hoặc biến thể!")
          });            
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra khi thêm sản phẩm hoặc biến thể!");
        }
    };

    useEffect(() => {
      setProductCreate(Pre => )
    },[productTypes])
    
    //handle input
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      let fieldValue = type === 'checkbox' ? checked : value;

      setProductCreate(prev => ({ ...prev, [name]: fieldValue }));
    };

    const handleProductVariantChange = (e) => {
      const { name, value } = e.target;
      setProductVariant( prev => ({...prev, [name]: value}));
      setProductCreate(Prev => ({...Prev, productVariant: [productVariant]}));
    }
    const handleCategoryChange = (e) => {
        setProductCreate( prev => ({ ...prev, categoryId: e.target.value }));
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
                    <input name='weight' required value={productCreate.weight} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Tồn kho <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='stock' required value={productCreate.stock} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Chất liệu sản phẩm <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='materials' autoComplete="off" required value={productCreate.materials} type="text" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='input-label'>Tags name <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='tags' autoComplete="off" required value={productCreate.tags} min={0} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}} className='Modalborder-input'>
                  <div style={{width: '36%'}}>
                    <div className='input-label'>Giá bán <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='price' required value={productCreate.price} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>Giá khuyến mãi <span style={{color: 'red', fontSize: '15px'}}>*</span></div>
                    <input name='discountPrice' required value={productCreate.discountPrice} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='input-label'>SKU</div>
                    <input name='sku' value={productCreate.sku} type="text" onChange={handleProductVariantChange} />
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
                  <textarea name="description" type="text" value={productCreate.description} rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div style={{display:'flex', justifyContent: 'start', alignItems: 'center', gap: '5px', fontWeight: 'bold'}} className='Modalborder-input'>
                  <input
                      style={{width: '2%'}} 
                      type="checkbox" 
                      id='status' 
                      checked={productCreate.status} 
                      name='status' 
                      onChange={handleInputChange}
                  />
                  <label htmlFor="status">Hoạt động</label>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: '2%', marginTop: '3rem'}} className='Modalborder-input'>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt thích</div>
                    <input name='favorites' readOnly value={productCreate.favorites} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  {/* <div style={{width: '25%'}}>
                    <div className='input-label'>Đánh giá</div>
                    <input name='rating' readOnly value={productCreate.rating} min={0} type="text" onChange={handleInputChange} />
                  </div> */}
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt đánh giá</div>
                    <input name='reviewCount' readOnly value={productCreate.reviewCount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt xem sản phẩm</div>
                    <input name='viewCount' readOnly value={productCreate.viewCount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='input-label'>Số lượt mua sản phẩm</div>
                    <input name='sellCount' readOnly value={productCreate.sellCount} min={0} type="text" onChange={handleInputChange} />
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