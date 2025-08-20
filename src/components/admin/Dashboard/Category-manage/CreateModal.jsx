import React, { useContext, useState } from 'react';
import { Modal, Form, Input, Button, Upload, Image, Switch } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import CategoryManage from '../../../../Services/CategoryManage';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';
import ReactQuill from 'react-quill';
import Compressor from 'compressorjs';
import 'react-quill/dist/quill.snow.css';

const CreateModal = ({ openCreate, handleCreateClose, setCategoryData }) => {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (file) => {
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (file.size > maxSize) {
      message.error("Kích thước ảnh phải nhỏ hơn 2MB.");
      return false;
    }

    setUploading(true);
    
    // Sử dụng Compressor.js để nén ảnh
    new Compressor(file, {
      quality: 0.8, // Chất lượng ảnh nén từ 0 đến 1
      maxWidth: 800, // Độ rộng tối đa của ảnh nén
      maxHeight: 600, // Độ cao tối đa của ảnh nén
      mimeType: 'image/jpeg', // Chuyển đổi sang JPEG để giảm dung lượng
      success(compressedFile) {
        // Nén ảnh thành công, tạo file với tên đúng extension
        const fileName = `category_${Date.now()}.jpg`;
        const renamedFile = new File([compressedFile], fileName, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        
        // Tiến hành upload
        CategoryManage.UploadImage(renamedFile)
          .then((response) => {
            const uploadedImageUrl = response.data.imageUrl;
            setImageUrl(uploadedImageUrl);
            message.success('Upload ảnh thành công!');
          })
          .catch((error) => {
            message.error('Upload ảnh thất bại!');
          })
          .finally(() => {
            setUploading(false);
          });
      },
      error(err) {
        message.error("Có lỗi xảy ra khi nén ảnh.");
        setUploading(false);
      }
    });
    
    return false; // Prevent default upload behavior
  };

  const handleSubmitCreate = (values) => {
    CategoryManage.CreateCategory(values.name, values.description, imageUrl, values.isDisplayed !== false)
      .then((res) => {
        message.success('Thêm mới danh mục thành công!');
        setCategoryData(prevData => [...prevData, res.data]);
        form.resetFields();
        setImageUrl('');
        handleCreateClose();
      })
      .catch(() => {
        message.error('Có lỗi xảy ra!');
      });
  };

  return (
    <Modal
      title={<span style={{ color: themeColors.StartColorLinear, fontWeight: 600 }}><i className="bx bx-book-add" style={{ color: themeColors.EndColorLinear, marginRight: 8 }}></i>{t('Create')}</span>}
      open={openCreate}
      onCancel={handleCreateClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitCreate}
      >
        <Form.Item
          name="name"
          label="Tên danh mục"
          rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
        >
          <Input placeholder="Nhập tên danh mục" autoFocus />
        </Form.Item>
        <Form.Item
          name="description"
          label="Mô tả"
        >
          <ReactQuill theme="snow" placeholder="Nhập mô tả danh mục" style={{minHeight: 90, maxHeight: 120, overflow: 'auto'}} />
        </Form.Item>
        <Form.Item
          label="Ảnh danh mục"
        >
          <Upload
            beforeUpload={handleImageUpload}
            showUploadList={false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} loading={uploading}>
              {uploading ? 'Đang nén và upload...' : 'Chọn ảnh'}
            </Button>
          </Upload>
          <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
            Ảnh sẽ được tự động nén và thay đổi kích thước. Tối đa 2MB.
          </div>
          {imageUrl && (
            <div style={{ marginTop: 8 }}>
              <Image
                width={100}
                height={100}
                src={`${process.env.REACT_APP_API_ENDPOINT}${imageUrl}`}
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            </div>
          )}
        </Form.Item>
        <Form.Item
          name="isDisplayed"
          label="Hiển thị"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch 
            checkedChildren="Hiện" 
            unCheckedChildren="Ẩn"
            defaultChecked={true}
          />
        </Form.Item>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleCreateClose} danger>Đóng</Button>
          <Button type="primary" htmlType="submit" style={{ background: themeColors.EndColorLinear }}>Lưu lại</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateModal;