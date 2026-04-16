import React from 'react';
import { Modal, Tag, Select, Descriptions, Divider, Table } from 'antd';

const statusConfig = {
    Pending: { color: 'orange', label: 'Chờ xử lý' },
    Confirmed: { color: 'blue', label: 'Đã xác nhận' },
    Shipping: { color: 'cyan', label: 'Đang giao' },
    Completed: { color: 'green', label: 'Hoàn thành' },
    Cancelled: { color: 'red', label: 'Đã hủy' },
};

const formatPrice = (price) =>
{
    if (!price) return '0';
    return Number(price).toLocaleString('vi-VN');
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

const OrderDetailModal = ({ order, onClose, onStatusChange }) =>
{
    if (!order) return null;

    const items = order.orderItems?.$values || order.orderItems || [];

    const parseOptions = (optStr) =>
    {
        if (!optStr) return '';
        try
        {
            const obj = JSON.parse(optStr);
            return Object.entries(obj).map(([, v]) => v.value || v).join(', ');
        } catch { return optStr; }
    };

    const itemColumns = [
        {
            title: 'Sản phẩm',
            key: 'product',
            render: (_, record) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {record.productImage && (
                        <img
                            src={record.productImage.startsWith('http') ? record.productImage : `${API_ENDPOINT}${record.productImage}`}
                            alt={record.productName}
                            style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #f0f0f0' }}
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                    )}
                    <div>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{record.productName}</div>
                        {record.selectedOptions && (
                            <div style={{ fontSize: 12, color: '#888' }}>
                                Phân loại: {parseOptions(record.selectedOptions)}
                            </div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            width: 120,
            align: 'right',
            render: (price) => <span style={{ color: '#e11d48' }}>{formatPrice(price)}₫</span>,
        },
        {
            title: 'SL',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 60,
            align: 'center',
        },
        {
            title: 'Thành tiền',
            key: 'subtotal',
            width: 130,
            align: 'right',
            render: (_, record) => (
                <span style={{ fontWeight: 600 }}>{formatPrice(record.price * record.quantity)}₫</span>
            ),
        },
    ];

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 18, fontWeight: 600 }}>Chi tiết đơn hàng</span>
                    <Tag color="#1890ff" style={{ fontSize: 13 }}>
                        #{order.id?.substring(0, 8).toUpperCase()}
                    </Tag>
                </div>
            }
            open={true}
            onCancel={onClose}
            footer={null}
            width={800}
            styles={{ body: { maxHeight: '75vh', overflowY: 'auto' } }}
        >
            {/* Status bar */}
            <div style={{ background: '#fafafa', borderRadius: 8, padding: '12px 16px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <span style={{ color: '#666', marginRight: 8 }}>Trạng thái:</span>
                    <Tag color={statusConfig[order.status]?.color} style={{ fontSize: 14, padding: '2px 12px' }}>
                        {statusConfig[order.status]?.label || order.status}
                    </Tag>
                </div>
                <Select
                    value={order.status}
                    size="small"
                    style={{ width: 160 }}
                    onChange={(val) => onStatusChange(order.id, val)}
                    options={Object.entries(statusConfig).map(([key, val]) => ({
                        value: key,
                        label: val.label,
                    }))}
                />
            </div>

            {/* Customer info */}
            <Descriptions
                title={<span style={{ fontSize: 15 }}><i className='bx bx-user' style={{ marginRight: 6 }}></i>Thông tin khách hàng</span>}
                column={2}
                size="small"
                bordered
                style={{ marginBottom: 16 }}
            >
                <Descriptions.Item label="Họ tên">{order.fullName}</Descriptions.Item>
                <Descriptions.Item label="Số điện thoại">{order.phone}</Descriptions.Item>
                <Descriptions.Item label="Email">{order.email || '--'}</Descriptions.Item>
                <Descriptions.Item label="Ngày đặt">
                    {order.orderDate ? new Date(order.orderDate).toLocaleString('vi-VN') : '--'}
                </Descriptions.Item>
                <Descriptions.Item label="Địa chỉ" span={2}>
                    {[order.address, order.ward, order.district, order.city].filter(Boolean).join(', ')}
                </Descriptions.Item>
                {order.note && (
                    <Descriptions.Item label="Ghi chú" span={2}>
                        <span style={{ color: '#fa8c16' }}>{order.note}</span>
                    </Descriptions.Item>
                )}
            </Descriptions>

            {/* Order items */}
            <Divider orientation="left" style={{ fontSize: 14 }}>
                <i className='bx bx-package' style={{ marginRight: 6 }}></i>
                Danh sách sản phẩm ({items.length})
            </Divider>
            <Table
                columns={itemColumns}
                dataSource={items}
                rowKey="id"
                pagination={false}
                size="small"
                style={{ marginBottom: 16 }}
            />

            {/* Price summary */}
            <div style={{ background: '#fafafa', borderRadius: 8, padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#666' }}>Tạm tính:</span>
                    <span>{formatPrice(order.totalAmount - order.shippingFee)}₫</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#666' }}>Phí vận chuyển:</span>
                    <span style={{ color: order.shippingFee === 0 ? '#52c41a' : undefined }}>
                        {order.shippingFee === 0 ? 'Miễn phí' : `${formatPrice(order.shippingFee)}₫`}
                    </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ color: '#666' }}>Phương thức thanh toán:</span>
                    <Tag color={order.paymentMethod === 'cod' ? 'green' : 'blue'}>
                        {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' : 'Chuyển khoản'}
                    </Tag>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: 15 }}>Tổng cộng:</span>
                    <span style={{ fontWeight: 700, fontSize: 20, color: '#e11d48' }}>
                        {formatPrice(order.totalAmount)}₫
                    </span>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
