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
                toast.error("Có lỗi xảy ra!");
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
                <div style={{background: `${themeColors.EndColorLinear}`}} className='Modal-header'>
                    <div style={{color: 'white'}} className='Header-title'>
                        <i style={{color: `${themeColors.StartColorLinear}`}} className='bx bxs-edit'></i>
                        {t('Upload')}
                    </div>
                </div>
                <div className='Modal-body'>
                    <form onSubmit={handleImageUploadSubmit}>
                        {
                            ImagePath.length > 0 ? (
                                <div className='current-image'>
                                    <div className='current-image-label'>Hình ảnh sản phẩm</div>
                                    <div className='border-product-image'>
                                        {
                                            ImagePath.map((image, index) => (
                                                <div key={index} className='border-Img'>
                                                    <img                                                        
                                                        src={`${API_ENDPOINT}${image.imagePath}`}
                                                        alt={`image-${index}`}
                                                        className='image-item'
                                                        style={{ width: '135px', height: '100px' }}
                                                    />
                                                    <div onClick={() => toggleDeleteProductImage(image.id, index)} className='Delete-button'><i class='bx bxs-message-square-x' ></i></div>
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
                            <div className='input-label'>Tải thêm hình ảnh</div>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                                multiple // nếu muốn cho phép upload nhiều ảnh
                            />
                        </div>
                        <div className='preview-section'>
                            {
                                selectedImages && selectedImages.length > 0 && (
                                    <div className='image-preview'>
                                        {selectedImages.map((image, index) => (
                                            <div key={index} className='image-container'>
                                                <img 
                                                    src={URL.createObjectURL(image)} 
                                                    alt={`Preview ${index}`} 
                                                    className='preview-img' 
                                                    style={{maxWidth: '150px', maxHeight: '100px'}}
                                                />
                                                <button className='removeImg' type="button" onClick={() => handleRemoveImage(index)}>Xóa</button>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    </form>
                </div>
                <div className='Modal-footer'>
                    <button type="submit" onClick={handleImageUploadSubmit} style={{background: `${themeColors.EndColorLinear}`}}>
                        <i className='bx bx-save'></i>
                        {t("Upload")}
                    </button>
                    <button onClick={handleUploadClose} style={{background: 'red'}}>Đóng</button>
                </div>
            </Box>
        </Modal>
    )
}

export default UploadModal