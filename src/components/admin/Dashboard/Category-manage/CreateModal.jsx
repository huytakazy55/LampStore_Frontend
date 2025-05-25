import React, { useContext } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import CategoryManage from '../../../../Services/CategoryManage';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateModal = ({ openCreate, handleCreateClose, setCategoryData }) => {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleSubmitCreate = (values) => {
    CategoryManage.CreateCategory(values.name, values.description)
      .then((res) => {
        message.success('Thêm mới danh mục thành công!');
        setCategoryData(prevData => [...prevData, res.data]);
        form.resetFields();
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
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={handleCreateClose} danger>Đóng</Button>
          <Button type="primary" htmlType="submit" style={{ background: themeColors.EndColorLinear }}>Lưu lại</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateModal;