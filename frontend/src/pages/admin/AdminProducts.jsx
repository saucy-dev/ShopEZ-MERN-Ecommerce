import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`/products?pageSize=10&page=${page}`);
            setProducts(data.products);
            setPages(data.pages);
        } catch { toast.error('Error loading products'); }
        finally { setLoading(false); }
    };

    useEffect(() => { fetchProducts(); }, [page]);

    const handleCreate = async () => {
        if (!window.confirm('Create a new sample product?')) return;
        try {
            const { data } = await API.post('/products', {
                name: 'New Product',
                price: 0,
                description: 'Sample description',
                image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                brand: 'Brand',
                category: 'Electronics',
                countInStock: 0,
            });
            toast.success('Product created! Edit it now.');
            navigate(`/admin/products/${data._id}/edit`);
        } catch { toast.error('Error creating product'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await API.delete(`/products/${id}`);
            toast.success('Product deleted');
            fetchProducts();
        } catch { toast.error('Error deleting product'); }
    };

    return (
        <div className="section">
            <div className="container">
                <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="page-title">Manage Products</div>
                    <button className="btn btn-primary" onClick={handleCreate}><FiPlus /> New Product</button>
                </div>
                {loading ? (
                    <div className="spinner-wrap"><div className="spinner" /></div>
                ) : (
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="admin-table">
                            <thead>
                                <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p._id}>
                                        <td><img src={p.image} alt={p.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px' }} /></td>
                                        <td style={{ color: 'var(--text-primary)', fontWeight: '500', maxWidth: '200px' }}>{p.name}</td>
                                        <td>{p.category}</td>
                                        <td style={{ color: 'var(--accent)', fontWeight: '600' }}>${p.price?.toFixed(2)}</td>
                                        <td>
                                            <span className={`badge badge-${p.countInStock > 0 ? 'success' : 'danger'}`}>{p.countInStock}</span>
                                        </td>
                                        <td style={{ display: 'flex', gap: '0.5rem' }}>
                                            <Link to={`/admin/products/${p._id}/edit`} className="btn btn-secondary btn-sm">
                                                <FiEdit size={14} />
                                            </Link>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p._id)}>
                                                <FiTrash2 size={14} />
                                            </button>
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

export default AdminProducts;
