import React, {useContext, useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ProductManage from '../../../../Services/ProductManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';
import Compressor from 'compressorjs';
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const UploadModal = ({style, openUpload, handleUploadClose, updateId, setProductData}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();

    //Get ảnh 
    const [ImagePath, setImagePath] = useState([]);
    //Upload ảnh 
    const [selectedImages, setSelectedImages] = useState([]);
    //Xác nhận upload thành công
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prevImages => [...prevImages, ...files]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setSelectedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
    };

    const handleImageUploadSubmit = (e) => {
        e.preventDefault();
        
        if (!selectedImages || selectedImages.length === 0) {
            toast.error("Chưa chọn ảnh để upload!");
            return;
        }
    
        const compressedImages = []; // Mảng để lưu trữ ảnh đã nén
        let uploadCount = 0; // Biến đếm số ảnh đã upload
    
        // Nén từng ảnh trong selectedImages
        selectedImages.forEach((image) => {
            new Compressor(image, {
                quality: 0.8, // Chất lượng ảnh nén từ 0 đến 1
                maxWidth: 500, // Độ rộng tối đa của ảnh nén
                maxHeight: 500, // Độ cao tối đa của ảnh nén
                success(result) {
                    compressedImages.push(result); // Thêm ảnh đã nén vào mảng
                    uploadCount++;
    
                    // Nếu đã nén tất cả các ảnh, thực hiện upload
                    if (uploadCount === selectedImages.length) {
                        const formData = new FormData();
                        compressedImages.forEach((compressedImage) => {
                            formData.append('imageFiles', compressedImage, compressedImage.name); // Thêm ảnh nén vào FormData
                        });
    
                        // Gọi API upload với formData
                        ProductManage.UploadImageProduct(updateId, formData)
                            .then((res) => {
                                toast.success("Upload ảnh thành công!");
                                setSelectedImages([]);
                                setUploadSuccess(true);
                                ProductManage.GetProduct()
                                .then((res) => {
                                    setProductData(res.data.$values);
                                })
                                .catch((err) => {
                                    toast.error("Có lỗi khi lấy dữ liệu sản phẩm!");
                                });
                                //handleUploadClose();
                            })
                            .catch((err) => {
                                toast.error(`Có lỗi khi upload ảnh! ${err.response.data}`);
                                handleUploadClose();
                            });
                    }
                },
                error(err) {
                    toast.error("Có lỗi xảy ra khi nén ảnh.");
                }
            });
        });
    };

    // Get images product
    useEffect(() => {
        if(openUpload) {
            ProductManage.GetProductImageById(updateId)
            .then((res) => {
                if (res.data && res.data.$values) {
                    setImagePath(res.data.$values);
                } else {
                    setImagePath([]);
                }
                setUploadSuccess(false);
            })
            .catch((err) => {
                if(err.response.status == '404')
                {
                    toast.error("Hình ảnh sản phẩm chưa được upload!");
                } else 
                {
                    toast.error("Có lỗi xảy ra!");
                }
            });
        }
    }, [updateId, uploadSuccess]);

    //Delete image
    const toggleDeleteProductImage = (imageId, indexRemove) => {
        ProductManage.DeleteProductImage(imageId)
        .then((res) => {
            toast.success(`Đã xóa hình ảnh thành công`);
            setImagePath( prevImg => prevImg.filter((_, index) => index !== indexRemove));
        })
        .catch((err) => {
            toast.error("Có lỗi xảy ra khi xóa hình ảnh");
        })
    }
        
    return (
        <Modal
            open={openUpload}
            onClose={handleUploadClose}
        >
            <Box sx={style}>
                <div style={{background: `${themeColors.EndColorLinear}`}} className='w-full'>
                    <div style={{color: 'white'}} className='h-full flex justify-start gap-2 items-center p-4 text-h2 font-semibold'>
                        <i style={{color: `${themeColors.StartColorLinear}`}} className='bx bxs-edit text-h1'></i>
                        {t('Upload')}
                    </div>
                </div>
                <div className='w-full bg-gray-50 p-4 border-b border-gray-300'>
                    <form onSubmit={handleImageUploadSubmit}>
                        {
                            ImagePath.length > 0 ? (
                                <div className='current-image'>
                                    <div className='text-normal font-medium mb-1'>Hình ảnh sản phẩm</div>
                                    <div className='mb-4 flex justify-center items-center gap-4'>
                                        {
                                            ImagePath.map((image, index) => (
                                                <div key={index} className='transition-transform duration-300 ease-linear cursor-pointer relative hover:scale-105'>
                                                    <img                                                        
                                                        src={`${API_ENDPOINT}${image.imagePath}`}
                                                        alt={`image-${index}`}
                                                        className='rounded-lg'
                                                        style={{ width: '135px', height: '100px' }}
                                                    />
                                                    <div onClick={() => toggleDeleteProductImage(image.id, index)} className='absolute -top-3 -right-2 text-red-700 text-h2 hover:scale-110'><i class='bx bxs-message-square-x' ></i></div>
                                                </div>                                
                                            ))
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className='current-image'>
                                    Không có dữ liệu
                                </div>
                            )
                        }                        
                        <div className='upload-image-section'>
                            <div className='text-normal font-medium mb-1'>Tải thêm hình ảnh</div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                multiple // nếu muốn cho phép upload nhiều ảnh
                            />
                        </div>
                        <div className='flex justify-center items-center flex-wrap gap-4 mt-5'>
                            {
                                selectedImages && selectedImages.length > 0 && (
                                    <div className='flex gap-4 flex-wrap justify-center'>
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className='relative w-48 h-32 rounded-lg overflow-hidden transition-transform duration-300 ease-linear hover:opacity-80'>
                                                <img 
                                                    src={URL.createObjectURL(image)} 
                                                    alt={`Preview ${index}`} 
                                                    className='w-full h-full border-[1px] border-gray-300 rounded p-1'                                                    
                                                />
                                                <button className='absolute top-1 right-1 bg-red-700/70 text-white border-none rounded-[50%] w-6 h-6 cursor-pointer flex justify-center items-center text-normal transition-colors duration-300 ease-linear hover:bg-red-700 focus:outline-none' type="button" onClick={() => handleRemoveImage(index)}>Xóa</button>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
                <div className='p-4 bg-gray-50 flex justify-end items-center gap-2'>
                    <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' type="submit" onClick={handleImageUploadSubmit} style={{background: `${themeColors.EndColorLinear}`}}>
                        <i className='bx bx-save -mt-[1px]'></i>
                        {t("Upload")}
                    </button>
                    <button className='border-[1px] border-gray-300 outline-none py-1 px-3 rounded text-white flex justify-center items-center gap-1' onClick={handleUploadClose} style={{background: 'red'}}>Đóng</button>
                </div>
            </Box>
        </Modal>
    )
}

export default UploadModal