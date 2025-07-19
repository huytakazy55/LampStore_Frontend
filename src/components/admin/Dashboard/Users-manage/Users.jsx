import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Table, Input, Button, Breadcrumb, Modal, Pagination, message, Space, Row, Col, Card } from 'antd';
import { LockOutlined, UnlockOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../../../ThemeContext';
import UserManage from '../../../../Services/UserManage';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

const API_URL = process.env.REACT_APP_API_ENDPOINT;

const Users = () => {
  const { themeColors } = useContext(ThemeContext);
  const { t } = useTranslation();
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;
  const [loading, setLoading] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openBulkDelete, setOpenBulkDelete] = useState(false);
  const [bulkDeleteLoading, setBulkDeleteLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  const fetchUsers = () => {
    setLoading(true);
    UserManage.GetUserAccount()
      .then((res) => {
        setUserData(res.$values);
        setLoading(false);
      })
      .catch(() => {
        message.error('Có lỗi xảy ra!');
        setLoading(false);
      });
  };

  // Load users khi component mount hoặc khi navigate đến trang users
  useEffect(() => {
    if (location.pathname === '/admin/users') {
      // Nếu đã initialized và đang navigate lại vào trang users, reset state
      if (hasInitialized) {
        setSearchTerm('');
        setPage(1);
        setSelectedRowKeys([]);
        setRoleData({});
      }
      
      fetchUsers();
      setHasInitialized(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userData.length > 0) {
      userData.forEach(user => {
        UserManage.GetRoleById(user.id)
          .then((res) => {
            setRoleData(prevState => ({
              ...prevState,
              [user.id]: res.data.$values,
            }));
          })
          .catch(() => {
            message.error(`Lỗi khi lấy role của ${user.userName}`);
          });
      });
    }
  }, [userData]);

  const updateUserLockStatus = (userId, isLocked) => {
    setUserData(prevData =>
      prevData.map(user =>
        user.id === userId ? { ...user, lockoutEnd: isLocked ? new Date(Date.now() + 1000 * 60 * 60) : null } : user
      )
    );
  };

  const LockUser = (userId, username) => {
    UserManage.LockUser(userId, username)
      .then(() => {
        message.success(`Đã khóa tài khoản ${username}`);
        updateUserLockStatus(userId, true);
      })
      .catch(() => {
        message.error('Có lỗi xảy ra');
      });
  };

  const UnLockUser = (userId, username) => {
    UserManage.UnLockUser(userId, username)
      .then(() => {
        message.success(`Đã mở khóa tài khoản ${username}`);
        updateUserLockStatus(userId, false);
      })
      .catch(() => {
        message.error('Có lỗi xảy ra');
      });
  };

  const filteredUsers = useMemo(() => {
    return userData.filter(user =>
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [userData, searchTerm]);

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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 200,
      align: 'center',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'userName',
      key: 'userName',
      width: 250,
      align: 'center',
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.userName.localeCompare(b.userName),
      filters: [
        ...Array.from(new Set(filteredUsers.map(u => u.userName))).map(name => ({
          text: name,
          value: name,
        }))
      ],
      onFilter: (value, record) => record.userName === value,
    },
    {
      title: 'Nhóm quyền',
      dataIndex: 'role',
      key: 'role',
      width: 150,
      align: 'center',
      render: (text, record) => roleData[record.id] ? roleData[record.id] : 'Loading...',
      sorter: (a, b) => {
        const roleA = roleData[a.id] || '';
        const roleB = roleData[b.id] || '';
        return roleA.localeCompare(roleB);
      },
      filters: [
        ...Array.from(new Set(Object.values(roleData))).map(role => ({
          text: role,
          value: role,
        }))
      ],
      onFilter: (value, record) => (roleData[record.id] || '') === value,
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      align: 'center',
      render: (text, record) => (
        <Space size="middle" style={{justifyContent: 'center', width: '100%'}}>
          {record.lockoutEnd && new Date(record.lockoutEnd) > new Date() ? (
            <Button
              icon={<UnlockOutlined />}
              onClick={() => UnLockUser(record.id, record.userName)}
              type="primary"
              size="small"
            >
              Mở khóa
            </Button>
          ) : (
            <Button
              icon={<LockOutlined />}
              onClick={() => LockUser(record.id, record.userName)}
              danger
              size="small"
            >
              Khóa
            </Button>
          )}
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
      const response = await axios.delete(`${API_URL}/users/bulk`, {
        data: { ids: selectedRowKeys }
      });
      if (response.data.success) {
        message.success(t('DeleteSuccess'));
        setSelectedRowKeys([]);
        fetchUsers();
      } else {
        message.error(t('DeleteFailed'));
      }
    } catch (error) {
      message.error(t('DeleteFailed'));
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
            {t('Users')}
          </div>
          <Breadcrumb
            items={[
              { title: t('Home') },
              { title: t('Users') }
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
              placeholder="Tìm kiếm tên người dùng..."
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
        <div style={{padding: '0 24px 24px 24px'}}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredUsers}
            rowKey="id"
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
              total={filteredUsers.length}
              onChange={setPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateUser
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
        onSuccess={() => {
          setOpenCreate(false);
          fetchUsers();
        }}
      />

      {/* Edit Modal */}
      {currentUser && (
        <EditUser
          open={openEdit}
          onCancel={() => {
            setOpenEdit(false);
            setCurrentUser(null);
          }}
          onSuccess={() => {
            setOpenEdit(false);
            setCurrentUser(null);
            fetchUsers();
          }}
          user={currentUser}
        />
      )}

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

export default Users;
