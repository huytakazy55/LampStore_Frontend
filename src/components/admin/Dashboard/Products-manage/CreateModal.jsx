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
  
      if (!productCreate.name || !productVariant.price || !productVariant.stock) {
          toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          return;
      }
  
      try {
          // Xử lý danh sách phân loại
          const variantTypes = productTypes
            .filter(type => type.typeName.trim() !== "" && type.options.some(opt => opt.trim() !== ""))
            .map(type => ({
              name: type.typeName,
              values: type.options.filter(opt => opt.trim() !== "")
            }));
          // Cập nhật productCreate trước khi gọi API
          const updatedProduct = {
              ...productCreate,
              productVariants: [productVariant],
              variantTypes: variantTypes
          };
  
          await ProductManage.CreateProduct(updatedProduct)
          .then((res) => {
            toast.success("Thêm mới sản phẩm thành công!");
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
                productVariants: [],
                variantTypes: []              
            });
            setProductTypes([{ typeName: '', options: [''] }]);
            setProductData( prev => [...prev, res]);
            handleCreateClose();
          })
          .catch((err) => {
            toast.error("Có lỗi khi thêm mới sản phẩm!")
          })
      } catch (error) {
          console.error("Lỗi khi thêm sản phẩm:", error);
          toast.error("Có lỗi xảy ra khi thêm sản phẩm hoặc biến thể!");
      }
    };
    
    //handle input
    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;
      let fieldValue = type === 'checkbox' ? checked : value;

      setProductCreate(prev => ({ ...prev, [name]: fieldValue }));
    };

    const handleProductVariantChange = (e) => {
      const { name, value } = e.target;
      setProductVariant( prev => ({...prev, [name]: value}));
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
            <div style={{background: `${themeColors.EndColorLinear}`}} className='w-full'>
              <div style={{color: 'white'}} className='h-full flex justify-start gap-2 items-center p-4 text-h2 font-semibold'>
                <i style={{color: `${themeColors.StartColorLinear}`}} className='bx bx-book-add' ></i>
                {t('Create')}
              </div>
            </div>
            <div className='w-full bg-gray-50 p-4 border-b border-gray-300 max-h-[80vh] overflow-auto'>
              <form action="" onSubmit={handleSubmitCreate} method='post'>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div className='w-full'>
                    <div className='mb-1 font-medium'>Tên sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='name' required autoComplete="off" autoFocus value={productCreate.name} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Danh mục sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <select className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' style={{padding: '6.5px 10px'}} name="categoryId" value={productCreate.categoryId} onChange={handleCategoryChange}>
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
                    <div className='mb-1 font-medium'>Khối lượng <span style={{fontSize: '14px'}}>(Gram)</span><span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='weight' required value={productCreate.weight} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>Tồn kho <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='stock' required value={productCreate.stock} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Chất liệu sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='materials' autoComplete="off" required value={productCreate.materials} type="text" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='mb-1 font-medium'>Tags name <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='tags' autoComplete="off" required value={productCreate.tags} min={0} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Giá bán <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='price' required value={productCreate.price} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>Giá khuyến mãi <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='discountPrice' required value={productCreate.discountPrice} min={0} type="number" onChange={handleProductVariantChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>SKU</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='sku' value={productCreate.sku} type="text" onChange={handleProductVariantChange} />
                  </div>
                </div>
                <div className='w-full mb-2' style={{padding: '5px 0px', marginTop: '15px'}}>
                  {productTypes.map((type, typeIndex) => (
                    <div key={typeIndex} style={{ marginBottom: '5px', position: 'relative', display: 'flex', justifyContent: 'start', gap: '2%' }}>
                      <div style={{ width: '35.8%'}}>
                        <div className='flex justify-between items-center'>
                          <div className="mb-1 font-medium">Phân loại sản phẩm {typeIndex + 1}</div>
                          {productTypes.length > 1 && (
                              <i style={{color: 'red', marginTop: '-5px', fontSize: '1.5rem', cursor: 'pointer'}} onClick={() => handleRemoveProductType(typeIndex)} className='bx bxs-x-square'></i>
                          )}
                        </div>
                        <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' autoComplete="off" type="text" value={type.typeName} placeholder="Tên phân loại" onChange={(e) => handleTypeChange(typeIndex, e.target.value)}
                          style={{ width: '100%', marginBottom: '10px' }}
                        />
                      </div>
                      <div style={{width: '62%'}}>
                        <div className="mb-1 font-medium">Tùy chọn</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>  
                          {type.options.map((option, optionIndex) => (
                            <div key={optionIndex} style={{ display: 'flex', alignItems: 'center', gap: '5px', width: '48%' }}>
                              <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small'
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
                    Thêm phân loại <i className='bx bxs-layer-plus' ></i>
                  </button>
                </div>
                <div className='w-full mb-2'>
                  <div className='mb-1 font-medium'>Mô tả</div>
                  <textarea className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name="description" type="text" value={productCreate.description} rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div className='w-full mb-2 flex justify-start items-center gap-1 font-bold'>
                  <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small'
                      style={{width: '2%'}} 
                      type="checkbox" 
                      id='status' 
                      checked={productCreate.status} 
                      name='status' 
                      onChange={handleInputChange}
                  />
                  <label htmlFor="status">Hoạt động</label>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%] mt-4'>
                  <div style={{width: '25%'}}>
                    <div className='mb-1 font-medium'>Số lượt thích</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='favorites' readOnly value={productCreate.favorites} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='mb-1 font-medium'>Số lượt đánh giá</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='reviewCount' readOnly value={productCreate.reviewCount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='mb-1 font-medium'>Số lượt xem sản phẩm</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='viewCount' readOnly value={productCreate.viewCount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '25%'}}>
                    <div className='mb-1 font-medium'>Số lượt mua sản phẩm</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='sellCount' readOnly value={productCreate.sellCount} min={0} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <input type="hidden" name='dateAdded' value={productCreate.dateAdded} readOnly />
              </form>
            </div>
            <div className='p-4 bg-gray-50 flex justify-end items-center gap-2'>
                <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleSubmitCreate} type="submit" style={{background: `${themeColors.EndColorLinear}`}}>
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