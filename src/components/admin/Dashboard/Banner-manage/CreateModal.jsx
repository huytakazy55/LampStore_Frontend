import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, Switch, InputNumber, message } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import BannerService from '../../../../Services/BannerService';

const CreateModal = ({ onClose, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (info) => {
        if (info.file.status === 'removed') {
            setImageFile(null);
            setPreviewUrl('');
            return;
        }
        const file = info.file?.originFileObj || (info.fileList && info.fileList[0]?.originFileObj);
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.type)) {
                message.error('Chỉ chấp nhận file JPG, JPEG, PNG, GIF!');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                message.error('File quá lớn! Kích thước tối đa là 5MB.');
                return;
            }
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (!imageFile) {
                message.error('Vui lòng chọn hình ảnh cho banner!');
                setLoading(false);
                return;
            }
            const uploadResult = await BannerService.uploadBannerImage(imageFile);
            let imageUrl = '';
            if (uploadResult && uploadResult.imageUrl) {
                imageUrl = uploadResult.imageUrl;
            } else if (uploadResult && typeof uploadResult === 'string') {
                imageUrl = uploadResult;
            } else if (uploadResult && uploadResult.url) {
                imageUrl = uploadResult.url;
            } else {
                message.error('Lỗi: Không nhận được URL hình ảnh từ server!');
                setLoading(false);
                return;
            }
            const createData = {
                ...values,
                imageUrl: imageUrl
            };
            await BannerService.createBanner(createData);
            message.success('Tạo banner thành công');
            form.resetFields();
            setImageFile(null);
            setPreviewUrl('');
            onSuccess();
        } catch (error) {
            if (error.response?.data?.errors?.ImageUrl) {
                message.error('Lỗi: Vui lòng chọn hình ảnh cho banner!');
            } else if (error.response?.data?.errors) {
                const errorMessages = Object.values(error.response.data.errors).flat();
                message.error(`Lỗi: ${errorMessages.join(', ')}`);
            } else if (error.response?.data) {
                message.error(`Lỗi: ${error.response.data}`);
            } else {
                message.error('Lỗi khi tạo banner');
            }
        } finally {
            setLoading(false);
        }
    };

    const uploadProps = {
        beforeUpload: () => false, // Prevent auto upload
        onChange: handleImageChange,
        accept: 'image/*',
        showUploadList: false,
    };

    return (
        <Modal
            title="Tạo Banner Mới"
            open={true}
            onCancel={onClose}
            footer={null}
            width={600}
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    isActive: true,
                    order: 0
                }}
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                >
                    <Input placeholder="Nhập tiêu đề banner" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Mô tả"
                >
                    <Input.TextArea 
                        rows={3} 
                        placeholder="Nhập mô tả banner"
                    />
                </Form.Item>

                <Form.Item
                    label="Hình ảnh"
                    required
                    validateStatus={!imageFile ? 'error' : ''}
                    help={!imageFile ? 'Vui lòng chọn hình ảnh cho banner!' : ''}
                >
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                    </Upload>
                    {previewUrl && (
                        <div style={{ marginTop: 8 }}>
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '4px'
                                }}
                            />
                        </div>
                    )}
                </Form.Item>

                <Form.Item
                    name="linkUrl"
                    label="Link URL"
                >
                    <Input placeholder="Nhập link URL (tùy chọn)" />
                </Form.Item>

                <Form.Item
                    name="order"
                    label="Thứ tự"
                >
                    <InputNumber 
                        min={0} 
                        placeholder="Nhập thứ tự hiển thị"
                        style={{ width: '100%' }}
                    />
                </Form.Item>

                <Form.Item
                    name="isActive"
                    label="Trạng thái"
                    valuePropName="checked"
                >
                    <Switch 
                        checkedChildren="Hoạt động" 
                        unCheckedChildren="Không hoạt động" 
                    />
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                        Hủy
                    </Button>
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading}
                        icon={<PlusOutlined />}
                    >
                        Tạo Banner
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateModal; 