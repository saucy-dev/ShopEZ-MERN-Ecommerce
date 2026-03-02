import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';
import { FiPackage, FiEye } from 'react-icons/fi';

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get('/orders/myorders').then(({ data }) => setOrders(data)).finally(() => setLoading(false));
    }, []);

    const statusColors = { pending: 'warning', processing: 'info', shipped: 'info', delivered: 'success', cancelled: 'danger' };

    return (
        <div className="section">
            <div className="container">
                <div className="page-header"><div className="page-title"><FiPackage style={{ marginRight: '0.5rem' }} />My Orders</div></div>
                {loading ? (
                    <div className="spinner-wrap"><div className="spinner" /></div>
                ) : orders.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No orders yet. <Link to="/products" style={{ color: 'var(--accent)' }}>Start shopping!</Link>
                    </div>
                ) : (
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th><th>Date</th><th>Total</th><th>Payment</th><th>Status</th><th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id}>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{o._id.slice(-8).toUpperCase()}</td>
                                        <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                        <td style={{ color: 'var(--accent)', fontWeight: '600' }}>${o.totalPrice?.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge badge-${o.isPaid ? 'success' : 'danger'}`}>{o.isPaid ? 'Paid' : 'Unpaid'}</span>
                                        </td>
                                        <td>
                                            <span className={`badge badge-${statusColors[o.status] || 'info'}`}>{o.status}</span>
                                        </td>
                                        <td>
                                            <Link to={`/orders/${o._id}`} className="btn btn-secondary btn-sm"><FiEye size={14} /> View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrdersPage;
