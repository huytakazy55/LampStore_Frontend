import React, {useContext, useState, useEffect} from 'react'
import { Modal, Form, Input, Select, InputNumber, Checkbox, Button, Space, Typography } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import ProductManage from '../../../../Services/ProductManage';
import TagManage from '../../../../Services/TagManage';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {ThemeContext} from '../../../../ThemeContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography;

const UpdateModal = ({openUpdate, handleUpdateClose, fetchProducts, style, categories, product}) => {
    const {themeColors} = useContext(ThemeContext);
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [tags, setTags] = useState([]);

    //Thêm phân loại
    const [productTypes, setProductTypes] = useState([{ typeName: '', options: [''] }]);

    const handleAddProductType = () => {
      setProductTypes([...productTypes, { typeName: '', options: [''] }]);
    };

    const handleTypeChange = (index, value) => {
      const updatedTypes = [...productTypes];
      updatedTypes[index].typeName = value;
      setProductTypes(updatedTypes);
    };
    
    const handleOptionChangeByType = (typeIndex, optionIndex, value) => {
      const updatedTypes = [...productTypes];
      updatedTypes[typeIndex].options[optionIndex] = value;
    
      if (value && optionIndex === updatedTypes[typeIndex].options.length - 1) {
        updatedTypes[typeIndex].options.push('');
      }
      setProductTypes(updatedTypes);
    };
    
    const handleRemoveOptionByType = (typeIndex, optionIndex) => {
      const updatedTypes = [...productTypes];
      updatedTypes[typeIndex].options = updatedTypes[typeIndex].options.filter((_, i) => i !== optionIndex);
      setProductTypes(updatedTypes);
    };

    const handleRemoveProductType = (index) => {
      const updatedTypes = productTypes.filter((_, i) => i !== index);
      setProductTypes(updatedTypes);
    };

    const [updateData, setUpdateData] = useState({
      id: '',
      name: '', 
      description: '', 
      categoryId: '', 
      tags: '',
      rating: '',
      viewcount: '',
      reviewcount: '',
      favorites: '',
      dateAdded: '', 
      status: '' 
    });

    const [variantData, setVariantData] = useState({
      price: 0,
      discountPrice: 0,
      stock: 0,
      materials: '',
      weight: 0,
      sku: ''
    });

    const handleSubmitUpdate = async (values) => {
      if (!values.name || !values.price || !values.stock) {
          toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc!");
          return;
      }
  
      try {
          const variantTypes = productTypes
            .filter(type => type.typeName.trim() !== "" && type.options.some(opt => opt.trim() !== ""))
            .map(type => ({
              name: type.typeName,
              values: type.options.filter(opt => opt.trim() !== "")
            }));

          const updatedProduct = {
              id: updateData.id,
              name: values.name,
              description: values.description,
              categoryId: values.categoryId,
              tags: values.tags ? values.tags.join(',') : '',
              reviewCount: values.reviewCount,
              viewCount: values.viewCount,
              favorites: values.favorites,
              sellCount: values.sellCount,
              dateAdded: values.dateAdded,
              status: values.status,
              productVariants: [{
                price: values.price,
                discountPrice: values.discountPrice,
                stock: values.stock,
                materials: values.materials,
                weight: values.weight,
                sku: values.sku
              }],
              variantTypes: variantTypes
          };
  
          await ProductManage.UpdateProduct(updatedProduct)
          .then((res) => {
            fetchProducts();
            toast.success("Cập nhật bản ghi thành công");
            handleUpdateClose();
          })
          .catch((err) => {
            toast.error("Có lỗi xảy ra.");
          });
      } catch (error) {
          console.error("Lỗi khi cập nhật sản phẩm:", error);
          toast.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
      }
    };

    useEffect(() => {
      if (product) {
        const fetchData = async () => {
          try {
            const [productRes, variantRes, typeRes] = await Promise.all([
              ProductManage.GetProductById(product.id),
              ProductManage.GetVariantById(product.id),
              ProductManage.GetProductTypeByProductId(product.id)
            ]);
    
            const formData = {
              id: productRes?.data?.id,
              name: productRes?.data?.name,
              description: productRes?.data?.description,
              categoryId: productRes?.data?.categoryId,
              tags: productRes?.data?.tags ? productRes?.data?.tags.split(',') : [],
              rating: productRes?.data?.rating,
              viewCount: productRes?.data?.viewCount,
              reviewCount: productRes?.data?.reviewCount,
              favorites: productRes?.data?.favorites,
              sellCount: productRes?.data?.sellCount,
              dateAdded: productRes?.data?.dateAdded,
              status: productRes?.data?.status,
              price: variantRes?.data?.price,
              discountPrice: variantRes?.data?.discountPrice,
              stock: variantRes?.data?.stock,
              materials: variantRes?.data?.materials,
              weight: variantRes?.data?.weight,
              sku: variantRes?.data?.sku
            };
            
            // Reset form trước khi set giá trị mới
            form.resetFields();
            form.setFieldsValue(formData);
            setUpdateData(formData);
            setVariantData({
              price: variantRes?.data?.price,
              discountPrice: variantRes?.data?.discountPrice,
              stock: variantRes?.data?.stock,
              materials: variantRes?.data?.materials,
              weight: variantRes?.data?.weight,
              sku: variantRes?.data?.sku
            });
    
            if (typeRes?.data?.$values?.length > 0) {
              const mappedTypes = await Promise.all(
                typeRes.data.$values.map(async (type) => {
                  const valueRes = await ProductManage.GetProductValueByTypeId(type.id);
                  return {
                    typeName: type.name,
                    options: valueRes?.data?.$values || ['']
                  };
                })
              );
              
              const sortedTypes = typeRes.data.$values.map(type => 
                mappedTypes.find(mt => mt.typeName === type.name)
              ).filter(Boolean);
              
              setProductTypes(sortedTypes.reverse());
            }
          } catch (error) {
            toast.error("Có lỗi khi lấy dữ liệu.");
            console.error(error);
          }
        };
    
        fetchData();
      }
    }, [product, form]);

    useEffect(() => {
      const currentDate = new Date().toISOString();
      form.setFieldValue('dateAdded', currentDate);
    }, [form]);

    useEffect(() => {
        TagManage.GetTag()
            .then((res) => {
                setTags(res.data.$values);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Thêm CSS cho modal
    useEffect(() => {
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
            <EditOutlined style={{ color: themeColors.StartColorLinear, fontSize: '20px' }} />
            <Title level={4} style={{ margin: 0, color: themeColors.StartColorLinear }}>
              Cập nhật sản phẩm
            </Title>
          </div>
        }
        open={openUpdate}
        onCancel={handleUpdateClose}
        width={1200}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleUpdateClose} 
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
          onFinish={handleSubmitUpdate}
          className="custom-form"
        >
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              name="categoryId"
              label="Danh mục sản phẩm"
              className="w-1/3"
              rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
            >
              <Select placeholder="Chọn danh mục">
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="price"
              label="Giá bán"
              className="w-1/3"
              rules={[{ required: true, message: 'Vui lòng nhập giá bán!' }]}
            >
              <InputNumber 
                style={{width: '100%'}} 
                min={0} 
                placeholder="Nhập giá bán"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Số lượng"
              className="w-1/3"
              rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
            >
              <InputNumber 
                style={{width: '100%'}} 
                min={0} 
                placeholder="Nhập số lượng"
              />
            </Form.Item>
          </div>

          <div className="flex gap-4">
            <Form.Item
              name="discountPrice"
              label="Giá khuyến mãi"
              className="w-1/3"
            >
              <InputNumber 
                style={{width: '100%'}} 
                min={0} 
                placeholder="Nhập giá khuyến mãi"
                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>

            <Form.Item
              name="materials"
              label="Chất liệu"
              className="w-1/3"
            >
              <Input placeholder="Nhập chất liệu" />
            </Form.Item>

            <Form.Item
              name="weight"
              label="Cân nặng (kg)"
              className="w-1/3"
            >
              <InputNumber 
                style={{width: '100%'}} 
                min={0} 
                step={0.1}
                placeholder="Nhập cân nặng"
              />
            </Form.Item>
          </div>

          <div className="flex gap-4">
            <Form.Item
              name="sku"
              label="SKU"
              className="w-1/3"
            >
              <Input placeholder="Nhập mã SKU" />
            </Form.Item>

            <Form.Item
              name="tags"
              label="Tags"
              className="w-2/3"
            >
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Chọn tags"
                options={tags.map(tag => ({
                  label: tag.name,
                  value: tag.id
                }))}
                allowClear
                showSearch
                optionFilterProp="label"
                filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
              />
            </Form.Item>
          </div>

          <div className="mt-4 mb-4">
            {productTypes.map((type, typeIndex) => (
              <div key={typeIndex} className="mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="flex gap-4">
                  <div className="w-1/3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">Phân loại sản phẩm {typeIndex + 1}</div>
                      {productTypes.length > 1 && (
                        <Button 
                          type="text" 
                          danger 
                          icon={<CloseOutlined />}
                          onClick={() => handleRemoveProductType(typeIndex)}
                        />
                      )}
                    </div>
                    <Input
                      value={type.typeName}
                      placeholder="Tên phân loại"
                      onChange={(e) => handleTypeChange(typeIndex, e.target.value)}
                    />
                  </div>
                  <div className="w-2/3">
                    <div className="font-medium mb-2">Tùy chọn</div>
                    <div className="flex flex-wrap gap-2">
                      {type.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex gap-2 w-[48%]">
                          <Input
                            value={option}
                            placeholder={`Tùy chọn ${optionIndex + 1}`}
                            onChange={(e) => handleOptionChangeByType(typeIndex, optionIndex, e.target.value)}
                          />
                          {optionIndex !== type.options.length - 1 && (
                            <Button
                              type="text"
                              danger
                              icon={<CloseOutlined />}
                              onClick={() => handleRemoveOptionByType(typeIndex, optionIndex)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              type="primary"
              onClick={handleAddProductType}
              icon={<SaveOutlined />}
              style={{background: themeColors.StartColorLinear}}
            >
              Thêm phân loại
            </Button>
          </div>

          <Form.Item name="description" label="Mô tả">
            <ReactQuill theme="snow" placeholder="Nhập mô tả sản phẩm" />
          </Form.Item>

          <Form.Item name="status" valuePropName="checked">
            <Checkbox>Hoạt động</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    );
}

export default UpdateModal;