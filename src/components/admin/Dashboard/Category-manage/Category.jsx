import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Table, Input, Button, Breadcrumb, Pagination, Modal, message, Space, Row, Col, Card } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../../../ThemeContext';
import CategoryManage from '../../../../Services/CategoryManage';
import { useTranslation } from 'react-i18next';
import CreateModal from './CreateModal';
import UpdateModal from './UpdateModal';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const Category = () => {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [categoryData, setCategoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [updateData, setUpdateData] = useState({ id: '', name: '', description: '' });
  const [categoryCreate, setCategoryCreate] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openBulkDelete, setOpenBulkDelete] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);

  const fetchCategories = () => {
    setLoading(true);
    CategoryManage.GetCategory()
      .then((res) => {
        setCategoryData(res.data.$values);
        setLoading(false);
      })
      .catch(() => {
        message.error('Có lỗi xảy ra!');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id, name) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: `Bạn có chắc muốn xóa danh mục "${name}"?`,
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: () => {
        CategoryManage.DeleteCategory(id, name)
          .then(() => {
            setCategoryData(prev => prev.filter(category => category.id !== id));
            message.success(`Đã xóa bản ghi có id = ${id}: ${name}`);
          })
          .catch(() => {
            message.error('Có lỗi xảy ra');
          });
      },
    });
  };

  const filteredCategories = useMemo(() => {
    return categoryData.filter(category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categoryData, searchTerm]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 60,
      align: 'center',
      render: (text, record, index) => (page - 1) * itemsPerPage + index + 1,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      align: 'center',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        ...Array.from(new Set(filteredCategories.map(c => c.name))).map(name => ({
          text: name,
          value: name,
        }))
      ],
      onFilter: (value, record) => record.name === value,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      align: 'center',
      render: (text) => text && text.split(' ').slice(0, 25).join(' ') + (text.split(' ').length > 25 ? ' ...' : ''),
      sorter: (a, b) => (a.description || '').localeCompare(b.description || ''),
      filters: [
        ...Array.from(new Set(filteredCategories.map(c => c.description))).map(desc => ({
          text: desc && desc.split(' ').slice(0, 8).join(' ') + (desc.split(' ').length > 8 ? ' ...' : ''),
          value: desc,
        }))
      ],
      onFilter: (value, record) => record.description === value,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      align: 'center',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      render: (date) => new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')
    },
    {
      title: 'Ngày sửa đổi',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 120,
      align: 'center',
      sorter: (a, b) => {
        if (!a.updatedAt) return -1;
        if (!b.updatedAt) return 1;
        return new Date(a.updatedAt) - new Date(b.updatedAt);
      },
      render: (date) => date ? new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-') : '--'
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <Space size="middle" style={{justifyContent: 'center', width: '100%'}}>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setUpdateId(record.id);
              setOpenUpdate(true);
            }}
            size="small"
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id, record.name)}
            danger
            size="small"
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnWidth: 40,
    columnTitle: '',
  };

  const handleBulkDelete = async () => {
    try {
      setBulkDeleteLoading(true);
      if (!selectedRowKeys || selectedRowKeys.length === 0) {
        message.error('Vui lòng chọn bản ghi để xóa!');
        return;
      }
      const response = await CategoryManage.BulkDeleteCategories(selectedRowKeys);
      if (response.data.success || response.status === 200 || response.status === 204) {
        message.success(`Đã xóa ${selectedRowKeys.length} bản ghi!`);
        setSelectedRowKeys([]);
        fetchCategories();
      } else {
        message.error('Có lỗi xảy ra khi xóa bản ghi!');
      }
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa bản ghi!');
    } finally {
      setBulkDeleteLoading(false);
      setOpenBulkDelete(false);
    }
  };

  const customStyles = `
    .custom-table .ant-table-thead > tr > th {
      background: #fafafa;
      font-weight: 600;
      color: #1f1f1f;
      padding: 16px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    .custom-table .ant-table-tbody > tr > td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      transition: all 0.3s;
    }
    
    .custom-table .ant-table-tbody > tr:hover > td {
      background: #f6f8fc;
    }
    
    .custom-table .ant-table-cell {
      font-size: 14px;
    }
    
    .custom-table .ant-table-row-selected td {
      background: #e6f7ff;
    }
    
    .custom-table .ant-table-pagination {
      margin: 16px;
      padding: 16px 0;
      border-top: 1px solid #f0f0f0;
    }
    
    .custom-table .ant-table-thead > tr:first-child th:first-child {
      border-top-left-radius: 8px;
    }
    
    .custom-table .ant-table-thead > tr:first-child th:last-child {
      border-top-right-radius: 8px;
    }
    
    .custom-table .ant-table-tbody > tr:last-child td:first-child {
      border-bottom-left-radius: 8px;
    }
    
    .custom-table .ant-table-tbody > tr:last-child td:last-child {
      border-bottom-right-radius: 8px;
    }

    .custom-table .ant-checkbox-wrapper {
      transform: scale(0.8);
    }

    .custom-table .ant-table {
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    .custom-table .ant-table-container {
      border: 1px solid #f0f0f0;
      border-radius: 8px;
    }

    .custom-table .ant-table-tbody > tr > td {
      background: #fff;
    }

    .custom-table .ant-table-tbody > tr:nth-child(even) > td {
      background: #fafafa;
    }

    .custom-table .ant-table-tbody > tr:hover > td {
      background: #f6f8fc !important;
    }

    .custom-table .ant-table-row-selected td {
      background: #e6f7ff !important;
    }

    .custom-table .ant-table-row-selected:hover td {
      background: #bae7ff !important;
    }

    .custom-table .ant-tag {
      margin: 0;
      padding: 2px 8px;
      border-radius: 4px;
    }

    .custom-table .ant-space {
      gap: 8px !important;
    }

    .custom-table .ant-btn {
      border-radius: 4px;
    }

    .custom-table .ant-btn-text {
      padding: 4px 8px;
    }

    .custom-table .ant-btn-text:hover {
      background: #f5f5f5;
    }
  `;

  return (
    <div style={{padding: '24px'}}>
      <div style={{
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
      }}>
        {/* Title Bar */}
        <div
          className="admin-title-bar"
          style={{
            background: '#f6f8fc',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            padding: '24px 24px 16px 24px',
            marginBottom: 0
          }}
        >
          <div style={{fontSize: '1.5rem', fontWeight: 600, color: themeColors.StartColorLinear}}>
            {t('Category')}
          </div>
          <Breadcrumb
            items={[
              { title: t('Home') },
              { title: t('Category') }
            ]}
            style={{ marginTop: '8px' }}
          />
        </div>
        {/* Filter Bar */}
        <div
          className="admin-filter-bar"
          style={{
            padding: '16px 24px',
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <Space>
            <Input.Search
              placeholder="Tìm kiếm tên danh mục..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
            />
            {selectedRowKeys.length > 0 && (
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                onClick={() => setOpenBulkDelete(true)}
                loading={bulkDeleteLoading}
              >
                {t('DeleteSelected')} ({selectedRowKeys.length})
              </Button>
            )}
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpenCreate(true)}>
            {t('Create')}
          </Button>
        </div>
        {/* Table */}
        <div className="admin-table-wrapper" style={{padding: '0 24px 24px 24px'}}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredCategories}
            rowKey="id"
            pagination={false}
            loading={loading}
            bordered
            size="middle"
            scroll={{ x: 900 }}
            className="custom-table"
          />
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={itemsPerPage}
              total={filteredCategories.length}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
      {/* Modal Create */}
      <CreateModal
        openCreate={openCreate}
        handleCreateClose={() => setOpenCreate(false)}
        categoryCreate={categoryCreate}
        setCategoryData={setCategoryData}
        setCategoryCreate={setCategoryCreate}
      />
      {/* Modal Update */}
      <UpdateModal
        openUpdate={openUpdate}
        handleUpdateClose={() => setOpenUpdate(false)}
        setCategoryData={setCategoryData}
        updateData={updateData}
        updateId={updateId}
      />
      {/* Bulk Delete Modal */}
      <Modal
        title={t('ConfirmDelete')}
        open={openBulkDelete}
        onOk={handleBulkDelete}
        onCancel={() => setOpenBulkDelete(false)}
        confirmLoading={bulkDeleteLoading}
      >
        <p>{t('ConfirmDeleteSelected', { count: selectedRowKeys.length })}</p>
      </Modal>
    </div>
  );
};

export default Category;