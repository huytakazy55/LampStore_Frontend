import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Space, Button, Modal, Checkbox, Row, Col, message, Input } from 'antd';
import UserManage from '../../../../Services/UserManage';

const Roles = () => {
  const [users, setUsers] = useState([]);
  const [roleData, setRoleData] = useState({});
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [creating, setCreating] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await UserManage.GetUserAccount();
      const list = res.$values || [];
      setUsers(list);

      // preload roles per user
      await Promise.all(
        list.map(async (user) => {
          try {
            const r = await UserManage.GetRoleById(user.id);
            setRoleData(prev => ({
              ...prev,
              [user.id]: r.data.$values || [],
            }));
          } catch (err) {
            setRoleData(prev => ({
              ...prev,
              [user.id]: [],
            }));
          }
        })
      );
    } catch (error) {
      message.error('Không tải được danh sách người dùng');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRoles = async () => {
    try {
      const roles = await UserManage.GetAvailableRoles();
      setAvailableRoles(roles.$values || roles || []);
    } catch (error) {
      message.error('Không tải được danh sách quyền');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAvailableRoles();
  }, []);

  const openRoleModal = (user) => {
    const roles = roleData[user.id];
    const normalized = roles?.$values || roles || [];
    setSelectedRoles(normalized);
    setModalUser(user);
    setModalOpen(true);
  };

  const handleAssignRoles = async () => {
    if (!modalUser) return;
    setSaving(true);
    try {
      await UserManage.AssignRoles(modalUser.id, selectedRoles);
      message.success('Cập nhật quyền thành công');
      const res = await UserManage.GetRoleById(modalUser.id);
      setRoleData(prev => ({
        ...prev,
        [modalUser.id]: res.data.$values || [],
      }));
      setModalOpen(false);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        message.error('Bạn không có quyền thực hiện hành động này!');
      } else if (error.response?.data) {
        message.error(error.response.data);
      } else {
        message.error('Có lỗi xảy ra khi cập nhật quyền');
      }
    } finally {
      setSaving(false);
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      width: 70,
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName',
      width: 220,
    },
    {
      title: 'Quyền hiện tại',
      dataIndex: 'roles',
      key: 'roles',
      render: (_, record) => {
        const roles = roleData[record.id];
        if (!roles) return '...';
        const list = roles.$values || roles;
        if (!list || list.length === 0) return 'Chưa có';
        return (
          <Space wrap>
            {list.map(r => (
              <Tag color="blue" key={r}>{r}</Tag>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button size="small" onClick={() => openRoleModal(record)}>
          Phân quyền
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card 
        title="Quản lý quyền" 
        bordered={false}
        extra={
          <Button type="primary" onClick={() => setCreateModalOpen(true)}>
            Thêm quyền
          </Button>
        }
      >
        <Table
          rowKey="id"
          dataSource={users}
          columns={columns}
          loading={loading}
          pagination={false}
        />
      </Card>

      <Modal
        title={`Phân quyền - ${modalUser?.userName || ''}`}
        open={modalOpen}
        onOk={handleAssignRoles}
        onCancel={() => setModalOpen(false)}
        confirmLoading={saving}
      >
        <Checkbox.Group
          style={{ width: '100%' }}
          value={selectedRoles}
          onChange={setSelectedRoles}
        >
          <Row gutter={[0, 8]}>
            {availableRoles.map(role => (
              <Col span={24} key={role}>
                <Checkbox value={role}>{role}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Modal>

      <Modal
        title="Thêm quyền mới"
        open={createModalOpen}
        onOk={async () => {
          if (!newRoleName.trim()) {
            message.error('Tên quyền không được để trống');
            return;
          }
          setCreating(true);
          try {
            await UserManage.AddRole(newRoleName.trim());
            message.success('Tạo quyền thành công');
            setNewRoleName('');
            setCreateModalOpen(false);
            fetchAvailableRoles();
          } catch (error) {
            if (error.response?.data) {
              message.error(error.response.data);
            } else {
              message.error('Không thể tạo quyền');
            }
          } finally {
            setCreating(false);
          }
        }}
        onCancel={() => setCreateModalOpen(false)}
        confirmLoading={creating}
      >
        <Input
          placeholder="Tên quyền (ví dụ: Manager)"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          maxLength={50}
        />
      </Modal>
    </div>
  );
};

export default Roles;

