import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';
import ProductCard from '../components/ProductCard';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';

const HomePage = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTop = async () => {
            try {
                const { data } = await API.get('/products/top');
                setTopProducts(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTop();
    }, []);

    return (
        <div>
            {/* Hero */}
            <section className="hero">
                <div className="container">
                    <h1>Shop Everything.<br /><span>Pay Less. Get More.</span></h1>
                    <p>Discover thousands of products across electronics, fashion, and lifestyle — all in one place with fast shipping and easy returns.</p>
                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary">
                            <FiShoppingBag /> Shop Now <FiArrowRight />
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="section" style={{ borderBottom: '1px solid var(--border)' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <FiTruck size={28} />, title: 'Free Shipping', desc: 'On orders over $100' },
                            { icon: <FiShield size={28} />, title: 'Secure Payments', desc: '100% protected checkout' },
                            { icon: <FiShoppingBag size={28} />, title: 'Easy Returns', desc: '30-day hassle-free policy' },
                        ].map((f) => (
                            <div key={f.title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '0.2rem' }}>{f.icon}</div>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '0.2rem' }}>{f.title}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Products */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 className="section-title" style={{ margin: 0 }}>⭐ Top Rated</h2>
                        <Link to="/products" className="btn btn-secondary btn-sm">View All <FiArrowRight /></Link>
                    </div>
                    {loading ? (
                        <div className="spinner-wrap"><div className="spinner" /></div>
                    ) : (
                        <div className="products-grid">
                            {topProducts.map((p) => <ProductCard key={p._id} product={p} />)}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
