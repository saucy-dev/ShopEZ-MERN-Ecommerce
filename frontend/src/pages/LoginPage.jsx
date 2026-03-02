import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            navigate(redirect);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="auth-page">
            <div className="auth-card card">
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{ fontSize: '2rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--accent), #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ShopEZ</div>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '700', marginTop: '0.5rem' }}>Sign In</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Welcome back! Enter your credentials.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    New to ShopEZ? <Link to={`/register${redirect !== '/' ? `?redirect=${redirect}` : ''}`} style={{ color: 'var(--accent)' }}>Create account</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
