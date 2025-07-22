import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Button, Table, Tag, Space, Modal, Select, Input } from 'antd';
import { MessageOutlined, UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ChatService from '../../../../Services/ChatService';
import AdminChatWindow from './AdminChatWindow';
import { useDispatch, useSelector } from 'react-redux';
import { setChats } from '../../../../redux/slices/chatSlice';

const AdminChatDashboard = () => {
  const dispatch = useDispatch();
  const chats = useSelector(state => state.chat.chats);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isChatWindowOpen, setIsChatWindowOpen] = useState(false);
  const [statistics, setStatistics] = useState({});
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [selectedChatForAssign, setSelectedChatForAssign] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [allChats, stats] = await Promise.all([
        ChatService.getAllChats(),
        ChatService.getChatStatistics()
      ]);
      
      // Handle .NET serialization format
      const chatList = allChats?.$values || allChats || [];
      dispatch(setChats(chatList));
      setStatistics(stats);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      dispatch(setChats([]));
    } finally {
      setLoading(false);
    }
  };

  const openChat = (chat) => {
    setSelectedChat(chat);
    setIsChatWindowOpen(true);
  };

  const closeChatWindow = () => {
    setIsChatWindowOpen(false);
    setSelectedChat(null);
    // Refresh data when closing chat
    loadDashboardData();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return 'green'; // Open
      case 2: return 'orange'; // InProgress  
      case 3: return 'blue'; // Resolved
      case 4: return 'gray'; // Closed
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1: return 'Mở';
      case 2: return 'Đang xử lý';
      case 3: return 'Đã giải quyết';
      case 4: return 'Đã đóng';
      default: return 'Không xác định';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 1: return 'gray'; // Low
      case 2: return 'blue'; // Normal
      case 3: return 'orange'; // High
      case 4: return 'red'; // Urgent
      default: return 'gray';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 1: return 'Thấp';
      case 2: return 'Bình thường';
      case 3: return 'Cao';
      case 4: return 'Khẩn cấp';
      default: return 'Không xác định';
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id) => id.slice(0, 8) + '...'
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'subject',
      key: 'subject',
      width: 200,
    },
    {
      title: 'Người dùng',
      dataIndex: ['user', 'userName'],
      key: 'userName',
      width: 120,
      render: (userName) => userName || 'N/A'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      )
    },
    {
      title: 'Ưu tiên',
      dataIndex: 'priority',
      key: 'priority',
      width: 100,
      render: (priority) => (
        <Tag color={getPriorityColor(priority)}>
          {getPriorityText(priority)}
        </Tag>
      )
    },
    {
      title: 'Admin phụ trách',
      dataIndex: ['assignedAdmin', 'userName'],
      key: 'assignedAdmin',
      width: 120,
      render: (adminName) => adminName || 'Chưa giao'
    },
    {
      title: 'Tạo lúc',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date) => new Date(date).toLocaleDateString('vi-VN')
    },
    {
      title: 'Thao tác',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            size="small"
            onClick={() => openChat(record)}
          >
            Xem
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Tổng chats"
              value={statistics?.total || 0}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang mở"
              value={statistics?.open || 0}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đang xử lý"
              value={statistics?.inProgress || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Đã giải quyết"
              value={statistics?.resolved || 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Chat List Table */}
      <Card title="Danh sách Chat Hỗ trợ" extra={
        <Button onClick={loadDashboardData} loading={loading}>
          Làm mới
        </Button>
      }>
        <Table
          columns={columns}
          dataSource={chats}
          rowKey="id"
          loading={loading}
          scroll={{ x: 800 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} chats`
          }}
        />
      </Card>

      {/* Admin Chat Window Modal */}
      <Modal
        title="Chat Hỗ trợ"
        open={isChatWindowOpen}
        onCancel={closeChatWindow}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {selectedChat && (
          <AdminChatWindow 
            chat={selectedChat}
            onClose={closeChatWindow}
            onUpdate={loadDashboardData}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminChatDashboard; 