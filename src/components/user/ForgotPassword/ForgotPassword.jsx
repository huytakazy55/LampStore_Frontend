import React, { useState } from 'react';
import { Modal, Form, Input, Button, message, Typography, Alert } from 'antd';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import AuthService from '../../../Services/AuthService';

const { Title, Text } = Typography;

const ForgotPassword = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await AuthService.ForgotPassword(values.emailOrUsername);
      
      if (response.data.message || response.data.Message) {
        message.success(response.data.message || response.data.Message);
        form.resetFields();
        onCancel();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.Message || 
                          'Đã xảy ra lỗi. Vui lòng thử lại.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={
        <div style={{ textAlign: 'center' }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            Quên Mật Khẩu
          </Title>
        </div>
      }
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={450}
      centered
    >
      <div style={{ padding: '20px 0' }}>
        <Alert
          message="Hướng dẫn"
          description="Nhập email hoặc tên đăng nhập của bạn. Chúng tôi sẽ gửi mật khẩu mới đến email đã đăng ký."
          type="info"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            name="emailOrUsername"
            label="Email hoặc Tên đăng nhập"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email hoặc tên đăng nhập!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Nhập email hoặc tên đăng nhập"
              style={{ borderRadius: '6px' }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <Button 
                onClick={handleCancel}
                style={{ borderRadius: '6px' }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ borderRadius: '6px' }}
              >
                Gửi Yêu Cầu
              </Button>
            </div>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Bạn sẽ nhận được email chứa mật khẩu mới trong vài phút.
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassword; 