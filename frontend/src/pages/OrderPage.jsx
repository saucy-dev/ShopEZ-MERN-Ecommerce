import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const OrderPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrder = async () => {
        try {
            const { data } = await API.get(`/orders/${id}`);
            setOrder(data);
        } catch { toast.error('Error loading order'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchOrder(); }, [id]);

    const handleMarkPaid = async () => {
        try {
            await API.put(`/orders/${id}/pay`);
            toast.success('Order marked as paid!');
            fetchOrder();
        } catch { toast.error('Error updating order'); }
    };

    if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
    if (!order) return null;

    const statusColors = { pending: 'warning', processing: 'info', shipped: 'info', delivered: 'success', cancelled: 'danger' };

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '800px' }}>
                <div className="page-header">
                    <div className="page-title">Order #{order._id.slice(-8).toUpperCase()}</div>
                    <span className={`badge badge-${statusColors[order.status] || 'info'}`} style={{ marginTop: '0.5rem' }}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
                    <div>
                        <div className="card" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>📦 Shipping</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            <div style={{ marginTop: '0.5rem' }}>
                                {order.isDelivered ? <span className="badge badge-success">Delivered</span> : <span className="badge badge-warning">Not Delivered</span>}
                            </div>
                        </div>

                        <div className="card" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>💳 Payment</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{order.paymentMethod}</p>
                            <div style={{ marginTop: '0.5rem' }}>
                                {order.isPaid ? <span className="badge badge-success">Paid</span> : <span className="badge badge-danger">Not Paid</span>}
                            </div>
                        </div>

                        <div className="card">
                            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>🛍️ Items</h3>
                            {order.orderItems.map((item) => (
                                <div key={item._id} className="cart-item">
                                    <img className="cart-item-img" src={item.image} alt={item.name} />
                                    <div className="cart-item-info" style={{ flex: 1 }}>{item.name}</div>
                                    <span style={{ color: 'var(--text-muted)' }}>x{item.qty}</span>
                                    <span style={{ color: 'var(--accent)', fontWeight: '700' }}>${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="card" style={{ height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Summary</h3>
                        <div className="cart-summary-row"><span>Items</span><span>${order.itemsPrice?.toFixed(2)}</span></div>
                        <div className="cart-summary-row"><span>Tax</span><span>${order.taxPrice?.toFixed(2)}</span></div>
                        <div className="cart-summary-row"><span>Shipping</span><span>${order.shippingPrice?.toFixed(2)}</span></div>
                        <div className="cart-summary-row total"><span>Total</span><span>${order.totalPrice?.toFixed(2)}</span></div>
                        {!order.isPaid && (
                            <button className="btn btn-success btn-full" style={{ marginTop: '1rem' }} onClick={handleMarkPaid}>
                                Mark as Paid (Demo)
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
