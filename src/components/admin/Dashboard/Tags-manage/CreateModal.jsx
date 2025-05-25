import React, {useContext, useState} from 'react'
import { Modal, Form, Input, Button, Space, Typography } from 'antd';
import { PlusOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import TagManage from '../../../../Services/TagManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;

const CreateModal = ({openCreate, handleCreateClose, fetchTags, style}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const [form] = Form.useForm();

    const handleSubmitCreate = async (values) => {
      if (!values.name) {
          toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          return;
      }
  
      try {
          const newTag = {
              name: values.name,
              description: values.description,
          };
  
          await TagManage.CreateTag(newTag)
          .then((res) => {
            fetchTags();
            toast.success("Thêm bản ghi thành công");
            handleCreateClose();
            form.resetFields();
          })
          .catch((err) => {
            toast.error("Có lỗi xảy ra.");
          });
      } catch (error) {
          console.error("Lỗi khi thêm tag:", error);
          toast.error("Có lỗi xảy ra khi thêm tag!");
      }
    };

    // Thêm CSS cho modal
    React.useEffect(() => {
        const customStyles = `
            .custom-modal .ant-modal-content {
                border-radius: 8px;
                overflow: hidden;
            }

            .custom-modal .ant-modal-header {
                padding: 16px 24px;
                border-bottom: 2px solid #f0f0f0;
                margin-bottom: 0;
            }

            .custom-modal .ant-modal-body {
                padding: 24px;
            }

            .custom-modal .ant-modal-footer {
                padding: 16px 24px;
                border-top: 1px solid #f0f0f0;
            }

            .custom-form .ant-form-item-label {
                font-weight: 500;
            }

            .custom-form .ant-input,
            .custom-form .ant-input-number,
            .custom-form .ant-select-selector {
                border-radius: 4px;
            }

            .custom-form .ant-input:hover,
            .custom-form .ant-input-number:hover,
            .custom-form .ant-select-selector:hover {
                border-color: ${themeColors.StartColorLinear};
            }

            .custom-form .ant-input:focus,
            .custom-form .ant-input-number:focus,
            .custom-form .ant-select-selector:focus {
                border-color: ${themeColors.StartColorLinear};
                box-shadow: 0 0 0 2px ${themeColors.StartColorLinear}20;
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = customStyles;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet);
        };
    }, [themeColors]);

    return (
      <Modal
        title={
          <div className="flex items-center gap-2">
            <PlusOutlined style={{ color: themeColors.StartColorLinear, fontSize: '20px' }} />
            <Title level={4} style={{ margin: 0, color: themeColors.StartColorLinear }}>
              Thêm tag mới
            </Title>
          </div>
        }
        open={openCreate}
        onCancel={handleCreateClose}
        width={800}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleCreateClose} 
            icon={<CloseOutlined />}
            danger
          >
            Đóng
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={() => form.submit()}
            icon={<SaveOutlined />}
            style={{background: themeColors.StartColorLinear}}
          >
            Lưu lại
          </Button>
        ]}
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitCreate}
          className="custom-form"
        >
          <Form.Item
            name="name"
            label="Tên tag"
            rules={[{ required: true, message: 'Vui lòng nhập tên tag!' }]}
          >
            <Input placeholder="Nhập tên tag" />
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <ReactQuill theme="snow" placeholder="Nhập mô tả tag" />
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default CreateModal; 