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
    <>
      <style>
        {`
          .ant-input::placeholder {
            color: rgba(255, 255, 255, 0.7) !important;
          }
          .ant-form-item-explain-error {
            color: #ff4d4f !important;
            font-size: 12px !important;
            position: absolute !important;
            top: 2.5rem !important;
            left: 2rem !important;
          }
        `}
      </style>
      <Modal
        open={visible}
        onCancel={handleCancel}
        footer={null}
        width={400}
        centered
        closable={false}
        styles={{
          body: { padding: 0 },
          content: { padding: 0, background: 'transparent' }
        }}
      >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className='w-full h-auto bg-white/13 backdrop-blur-2xl border-[2px] border-white rounded-[10px] p-10 text-white text-center shadow-lg shadow-gray-400'
      >

        <div className='text-h1 font-medium mb-8' style={{ textShadow: '1px 0 10px #fff', fontSize: '2rem' }}>
          Quên Mật Khẩu
        </div>
        
        <div className='mb-6 text-sm opacity-80'>
          Nhập email hoặc tên đăng nhập của bạn. Chúng tôi sẽ gửi mật khẩu mới đến email đã đăng ký.
        </div>

        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="emailOrUsername"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email hoặc tên đăng nhập!',
              },
            ]}
            style={{ margin: 0 }}
          >
            <div className='flex justify-between items-center border-b-2 border-white h-10 mb-8 relative'>
              <i className='bx bxs-user text-h3'></i>
              <Input
                type="text" 
                placeholder='Email hoặc tên đăng nhập'
                style={{ 
                  width: '100%', 
                  paddingLeft: '10px', 
                  paddingTop: '5px',
                  paddingBottom: '0px',
                  color: 'white',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  fontSize: '16px',
                  lineHeight: '1.2'
                }}
                bordered={false}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </div>
          </Form.Item>

          <div className='flex gap-4 justify-center'>
            <button 
              type="button"
              onClick={handleCancel}
              className='px-6 py-2 rounded-2xl border-2 border-white bg-transparent text-white hover:bg-white/10 transition-all'
              style={{ minWidth: '100px' }}
            >
              Hủy
            </button>
            <button 
              type="submit"
              disabled={loading}
              className='px-6 py-2 rounded-2xl border-2 border-white bg-transparent text-white hover:bg-white/10 transition-all disabled:opacity-50'
              style={{ minWidth: '100px' }}
            >
              {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
            </button>
          </div>
        </Form>

        <div className='mt-6 text-xs opacity-70'>
          Bạn sẽ nhận được email chứa mật khẩu mới trong vài phút.
        </div>
      </div>
    </Modal>
    </>
  );
};

export default ForgotPassword; 