import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`/orders?page=${page}`);
            setOrders(data.orders);
            setPages(data.pages);
        } catch { toast.error('Error loading orders'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchOrders(); }, [page]);

    const updateStatus = async (id, status) => {
        try {
            await API.put(`/orders/${id}/status`, { status });
            toast.success('Status updated!');
            fetchOrders();
        } catch { toast.error('Error updating status'); }
    };

    const statusColors = { pending: 'warning', processing: 'info', shipped: 'info', delivered: 'success', cancelled: 'danger' };

    return (
        <div className="section">
            <div className="container">
                <div className="page-header"><div className="page-title">Manage Orders</div></div>
                {loading ? (
                    <div className="spinner-wrap"><div className="spinner" /></div>
                ) : (
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="admin-table">
                            <thead>
                                <tr><th>ID</th><th>Customer</th><th>Date</th><th>Total</th><th>Paid</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id}>
                                        <td style={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>#{o._id.slice(-8).toUpperCase()}</td>
                                        <td>{o.user?.name || 'N/A'}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                                        <td style={{ color: 'var(--accent)', fontWeight: '600' }}>₹{o.totalPrice?.toFixed(2)}</td>
                                        <td><span className={`badge badge-${o.isPaid ? 'success' : 'danger'}`}>{o.isPaid ? 'Yes' : 'No'}</span></td>
                                        <td>
                                            <select
                                                className="form-control"
                                                style={{ padding: '0.3rem 0.5rem', fontSize: '0.8rem' }}
                                                value={o.status}
                                                onChange={(e) => updateStatus(o._id, e.target.value)}
                                            >
                                                {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <Link to={`/orders/${o._id}`} className="btn btn-secondary btn-sm">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {pages > 1 && (
                    <div className="pagination">
                        {[...Array(pages)].map((_, i) => (
                            <button key={i + 1} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;
