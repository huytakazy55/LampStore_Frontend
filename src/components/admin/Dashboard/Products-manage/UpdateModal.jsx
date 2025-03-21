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


    const [updateData, setUpdateData] = useState({
      id: '',
      name: '', 
      description: '', 
      categoryId: '', 
      tags: '',
      rating: '',
      viewcount: '',
      reviewcount: '',
      favorites: '',
      dateAdded: '', 
      status: '' 
    });

    const [variantData, setVariantData] = useState({
      price: 0,
      discountPrice: 0,
      stock: 0,
      materials: '',
      weight: 0,
      sku: ''
    });

    const handleSubmitUpdate = (e) => {
      e.preventDefault();
      
      ProductManage.UpdateProduct(
        updateData.id, 
        updateData.name, 
        updateData.description, 
        updateData.categoryId,
        updateData.tags,
        updateData.rating,
        updateData.viewcount,
        updateData.reviewcount,
        updateData.favorites,
        updateData.sellCount,
        updateData.dateAdded,
        updateData.status
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

    // lay du lieu cho form
    useEffect(() => {
      if (updateId) {
        const fetchData = async () => {
          try {
            const [productRes, variantRes, typeRes] = await Promise.all([
              ProductManage.GetProductById(updateId),
              ProductManage.GetVariantById(updateId),
              ProductManage.GetProductTypeByProductId(updateId)
            ]);
    
            setUpdateData({
              id: productRes?.data.id,
              name: productRes?.data.name,
              description: productRes?.data.description,
              categoryId: productRes?.data.categoryId,
              tags: productRes?.data.tags,
              rating: productRes?.data.rating,
              viewcount: productRes?.data.viewCount,
              reviewcount: productRes?.data.reviewCount,
              favorites: productRes?.data.favorites,
              sellCount: productRes?.data.sellCount,
              dateAdded: productRes?.data.dateAdded,
              status: productRes?.data.status
            });
    
            setVariantData({
              price: variantRes?.data.price,
              discountPrice: variantRes?.data.discountPrice,
              stock: variantRes?.data.stock,
              materials: variantRes?.data.materials,
              weight: variantRes?.data.weight,
              sku: variantRes?.data.sku
            });
    
            // Lấy thông tin phân loại
            if (typeRes?.data?.$values?.length > 0) {
              const mappedTypes = typeRes.data.$values.map(async (type) => {
                const valueRes = await ProductManage.GetProductValueByTypeId(type.id);
                return {
                  typeName: type.name,
                  options: valueRes?.data?.$values || ['']
                };
              });
    
              // Chờ tất cả dữ liệu được resolve
              const resolvedTypes = await Promise.all(mappedTypes);
              setProductTypes(resolvedTypes);
            }
          } catch (error) {
            toast.error("Có lỗi khi lấy dữ liệu.");
            console.error(error);
          }
        };
    
        fetchData();
      }
    }, [updateId]);

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

      if (Object.keys(variantData).includes(name)) {
          setVariantData((prev) => ({
              ...prev,
              [name]: fieldValue
          }));
      } else {
          setUpdateData((prev) => ({
              ...prev,
              [name]: fieldValue
          }));
      }
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
            <div style={{background: `${themeColors.EndColorLinear}`}} className='w-full'>
              <div className='h-full flex justify-start gap-2 items-center p-4 text-h2 font-semibold text-white'>
                <i className={`bx bxs-edit text-${themeColors.StartColorLinear}`} ></i>
                {t('Update')}
              </div>
            </div>
            <div className='w-full bg-gray-50 p-4 border-b border-gray-300 max-h-[80vh] overflow-auto'>
              <form action="" onSubmit={handleSubmitUpdate} method='post'>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '100%'}}>
                    <div className='mb-1 font-medium'>Tên sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='name' required autoFocus value={updateData.name} type="text" spellCheck="false" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Danh mục sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <select className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name="categoryId" value={updateData.categoryId} onChange={handleCategoryChange}>
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
                    <div className='mb-1 font-medium'>Khối lượng <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='weight' required value={variantData.weight} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>Số lượng <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='stock' required value={variantData.stock} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Chất liệu sản phẩm <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='materials' required value={variantData.materials} type="text" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '62%'}}>
                    <div className='mb-1 font-medium'>Tags name <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='tags' required value={updateData.tags} type="text" onChange={handleInputChange} />
                  </div>
                </div>
                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '36%'}}>
                    <div className='mb-1 font-medium'>Giá bán <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='price' required value={variantData.price} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>Giá khuyến mãi <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='discountPrice' required value={variantData.discountPrice} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '30%'}}>
                    <div className='mb-1 font-medium'>SKU <span className='text-red-700 text-base'>*</span></div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='sku' required value={variantData.sku} type="text" onChange={handleInputChange} />
                  </div>
                </div>            
                <div className='Modalborder-input' style={{padding: '5px 0px', marginTop: '15px'}}>
                  {productTypes.map((type, typeIndex) => (
                    <div key={typeIndex} style={{ marginBottom: '5px', position: 'relative', display: 'flex', justifyContent: 'start', gap: '2%' }}>
                      <div style={{ width: '35.8%'}}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div className="mb-1 font-medium">Phân loại sản phẩm {typeIndex + 1}</div>
                          {productTypes.length > 1 && (
                              <i style={{color: 'red', marginTop: '-5px', fontSize: '1.5rem', cursor: 'pointer'}} onClick={() => handleRemoveProductType(typeIndex)} className='bx bxs-x-square'></i>
                          )}
                        </div>
                        <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small mb-3' autoComplete="off" type="text" value={type.typeName} placeholder="Tên phân loại" onChange={(e) => handleTypeChange(typeIndex, e.target.value)} />
                      </div>
                      <div className='w-[62%]'>
                        <div className="mb-1 font-medium">Tùy chọn</div>
                        <div className='flex flex-wrap gap-3'>  
                          {type.options.map((option, optionIndex) => (
                            <div key={optionIndex} className='flex items-center gap-1 w-[48%]'>
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
                                  className='bx bx-trash text-sm text-red-600 cursor-pointer'
                                  onClick={() => handleRemoveOptionByType(typeIndex, optionIndex)}
                                ></i>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddProductType} className={`mt-3 py-1 px-3 border-[1px] border-${themeColors.StartColorLinear} bg-${themeColors.EndColorLinear} text-white rounded-sm`}>
                    Thêm phân loại <i className='bx bxs-layer-plus' ></i>
                  </button>
                </div>

                <div className='w-full mb-2'>
                  <div className='mb-1 font-medium'>Mô tả</div>
                  <textarea className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name="description" type="text" value={updateData.description} spellCheck="false" rows={4} id="" onChange={handleInputChange}></textarea>
                </div>
                <div className='w-full mb-2 flex justify-start items-center gap-1 font-bold'>
                  <input className='w-[2%] border-[1px] border-gray-300 outline-none py-1 px-3 text-small'
                      type="checkbox" 
                      id='status'
                      checked={updateData.status}
                      name='status'
                      onChange={handleInputChange}
                  />
                  <label htmlFor="status">Hoạt động</label>
                </div>

                <div className='w-full mb-2 flex justify-between gap-[2%]'>
                  <div style={{width: '20%'}}>
                    <div className='mb-1 font-medium'>Số lượt thích</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='favorites' readOnly value={updateData.favorites} type="number" onChange={handleInputChange} />                    
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='mb-1 font-medium'>Đánh giá</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='rating' readOnly value={updateData.rating} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='mb-1 font-medium'>Số lượt đánh giá</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='reviewcount' readOnly value={updateData.reviewcount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='mb-1 font-medium'>Số lượt xem sản phẩm</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='viewcount' readOnly value={updateData.viewcount} type="number" onChange={handleInputChange} />
                  </div>
                  <div style={{width: '20%'}}>
                    <div className='mb-1 font-medium'>Số lượt mua sản phẩm</div>
                    <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' name='sellcount' readOnly value={updateData.sellCount} type="number" onChange={handleInputChange} />
                  </div>
                </div>
                <input className='w-full border-[1px] border-gray-300 outline-none py-1 px-3 text-small' type="hidden" name='dateAdded' value={updateData.dateAdded} readOnly />
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