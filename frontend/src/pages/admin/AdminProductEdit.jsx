import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../api/axiosConfig';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

const AdminProductEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', price: '', description: '', image: '', brand: '', category: '', countInStock: '' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        API.get(`/products/${id}`).then(({ data }) => {
            setForm({ name: data.name, price: data.price, description: data.description, image: data.image, brand: data.brand, category: data.category, countInStock: data.countInStock });
        }).finally(() => setLoading(false));
    }, [id]);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await API.put(`/products/${id}`, { ...form, price: Number(form.price), countInStock: Number(form.countInStock) });
            toast.success('Product updated!');
            navigate('/admin/products');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error updating product');
        } finally { setSaving(false); }
    };

    if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '700px' }}>
                <div className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button className="btn btn-ghost" onClick={() => navigate('/admin/products')}><FiArrowLeft /></button>
                    <div className="page-title">Edit Product</div>
                </div>

                <div className="card">
                    {form.image && (
                        <img src={form.image} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '1.5rem' }} />
                    )}
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                            {[
                                { label: 'Product Name', name: 'name', type: 'text' },
                                { label: 'Brand', name: 'brand', type: 'text' },
                                { label: 'Price ($)', name: 'price', type: 'number' },
                                { label: 'Stock Qty', name: 'countInStock', type: 'number' },
                            ].map((f) => (
                                <div className="form-group" key={f.name}>
                                    <label>{f.label}</label>
                                    <input type={f.type} name={f.name} className="form-control" value={form[f.name]} onChange={handleChange} required />
                                </div>
                            ))}
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select name="category" className="form-control" value={form.category} onChange={handleChange}>
                                {['Electronics', 'Footwear', 'Accessories', 'Clothing', 'Home & Garden', 'Sports'].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input type="text" name="image" className="form-control" value={form.image} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" className="form-control" rows={4} value={form.description} onChange={handleChange} required />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full" disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminProductEdit;
