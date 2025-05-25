import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { useTranslation } from 'react-i18next';
import UserManage from '../../../../Services/UserManage';

const EditUser = ({ open, onCancel, onSuccess, user }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        userName: user.userName,
        email: user.email,
        role: user.role
      });
    }
  }, [user, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const response = await UserManage.UpdateUser(user.id, values);
      if (response.data.success) {
        message.success(t('UpdateSuccess'));
        onSuccess();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      message.error(t('UpdateFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={t('EditUser')}
      open={open}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="userName"
          label={t('Username')}
          rules={[
            { required: true, message: t('PleaseInputUsername') },
            { min: 3, message: t('UsernameMinLength') }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('Email')}
          rules={[
            { required: true, message: t('PleaseInputEmail') },
            { type: 'email', message: t('InvalidEmail') }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label={t('Role')}
          rules={[{ required: true, message: t('PleaseSelectRole') }]}
        >
          <Select>
            <Select.Option value="Admin">{t('Admin')}</Select.Option>
            <Select.Option value="User">{t('User')}</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUser; 