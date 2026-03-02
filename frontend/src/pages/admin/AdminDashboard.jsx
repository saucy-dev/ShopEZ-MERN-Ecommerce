import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/axiosConfig';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ordersRes, productsRes, usersRes] = await Promise.all([
                    API.get('/orders?page=1'),
                    API.get('/products?pageSize=100'),
                    API.get('/users'),
                ]);
                const orders = ordersRes.data;
                setRecentOrders(orders.orders.slice(0, 5));
                const revenue = orders.orders.reduce((a, o) => a + (o.totalPrice || 0), 0);
                setStats({
                    totalOrders: orders.total,
                    totalProducts: productsRes.data.total,
                    totalUsers: usersRes.data.length,
                    revenue: revenue.toFixed(2),
                });
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchData();
    }, []);

    if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

    return (
        <div className="section">
            <div className="container">
                <div className="page-header">
                    <div className="page-title">Admin Dashboard</div>
                </div>

                {stats && (
                    <div className="admin-stats">
                        {[
                            { label: 'Total Revenue', value: `$${stats.revenue}`, icon: <FiDollarSign />, color: 'var(--success)' },
                            { label: 'Total Orders', value: stats.totalOrders, icon: <FiPackage />, color: 'var(--accent)' },
                            { label: 'Products', value: stats.totalProducts, icon: <FiShoppingBag />, color: 'var(--warning)' },
                            { label: 'Users', value: stats.totalUsers, icon: <FiUsers />, color: '#ec4899' },
                        ].map((s) => (
                            <div key={s.label} className="stat-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                                    <div className="stat-label">{s.label}</div>
                                    <div style={{ color: s.color, fontSize: '1.3rem' }}>{s.icon}</div>
                                </div>
                                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Quick links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                    <Link to="/admin/products" className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
                        <span style={{ fontWeight: '600' }}><FiShoppingBag style={{ marginRight: '0.5rem' }} />Manage Products</span>
                        <FiArrowRight style={{ color: 'var(--accent)' }} />
                    </Link>
                    <Link to="/admin/orders" className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-primary)' }}>
                        <span style={{ fontWeight: '600' }}><FiPackage style={{ marginRight: '0.5rem' }} />Manage Orders</span>
                        <FiArrowRight style={{ color: 'var(--accent)' }} />
                    </Link>
                </div>

                {/* Recent Orders */}
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', fontWeight: '700' }}>Recent Orders</div>
                    <table className="admin-table">
                        <thead>
                            <tr><th>ID</th><th>Customer</th><th>Total</th><th>Status</th><th>Paid</th></tr>
                        </thead>
                        <tbody>
                            {recentOrders.map((o) => (
                                <tr key={o._id}>
                                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>#{o._id.slice(-8).toUpperCase()}</td>
                                    <td>{o.user?.name || 'N/A'}</td>
                                    <td style={{ color: 'var(--accent)', fontWeight: '600' }}>₹{o.totalPrice?.toFixed(2)}</td>
                                    <td><span className={`badge badge-${o.status === 'delivered' ? 'success' : 'info'}`}>{o.status}</span></td>
                                    <td><span className={`badge badge-${o.isPaid ? 'success' : 'danger'}`}>{o.isPaid ? 'Yes' : 'No'}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
