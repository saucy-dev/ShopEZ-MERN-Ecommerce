import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirm) { toast.error('Passwords do not match'); return; }
        setLoading(true);
        try {
            await register(form.name, form.email, form.password);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--accent), #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ShopEZ</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>Create Account</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Join thousands of happy shoppers.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
                        { label: 'Email', name: 'email', type: 'email', placeholder: 'you@example.com' },
                        { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
                        { label: 'Confirm Password', name: 'confirm', type: 'password', placeholder: '••••••••' },
                    ].map((f) => (
                        <div className="form-group" key={f.name}>
                            <label>{f.label}</label>
                            <input type={f.type} name={f.name} className="form-control" value={form[f.name]} onChange={handleChange} required placeholder={f.placeholder} />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--accent)' }}>Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
