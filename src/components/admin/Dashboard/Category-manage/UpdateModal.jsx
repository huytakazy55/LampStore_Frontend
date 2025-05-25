import React, { useContext, useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import CategoryManage from '../../../../Services/CategoryManage';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../ThemeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateModal = ({ openUpdate, handleUpdateClose, setCategoryData, updateId }) => {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (openUpdate && updateId) {
      CategoryManage.GetCategoryById(updateId)
        .then((res) => {
          form.setFieldsValue({
            id: res?.data.id,
            name: res?.data.name,
            description: res?.data.description,
          });
        })
        .catch(() => {});
    }
  }, [openUpdate, updateId, form]);

  const handleSubmitUpdate = (values) => {
    CategoryManage.UpdateCategory(updateId, values.name, values.description)
      .then(() => {
        setCategoryData((prevData) =>
          prevData.map((item) => (item.id === updateId ? { ...item, ...values, id: updateId } : item))
        );
        message.success('Cập nhật bản ghi thành công');
        handleUpdateClose();
      })
      .catch(() => {
        message.error('Có lỗi xảy ra.');
      });
  };

  return (
    <Modal
      title={<span style={{ color: themeColors.StartColorLinear, fontWeight: 600 }}><i className="bx bxs-edit" style={{ color: themeColors.EndColorLinear, marginRight: 8 }}></i>{t('Update')}</span>}
      open={openUpdate}
      onCancel={handleUpdateClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmitUpdate}
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
          <Button onClick={handleUpdateClose} danger>Đóng</Button>
          <Button type="primary" htmlType="submit" style={{ background: themeColors.EndColorLinear }}>Lưu lại</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateModal;