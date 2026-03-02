import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FiStar, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [reviewLoading, setReviewLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const { data } = await API.get(`/products/${id}`);
                setProduct(data);
            } catch { navigate('/products'); }
            finally { setLoading(false); }
        };
        fetch();
    }, [id]);

    const handleAdd = () => {
        addToCart(product, qty);
        toast.success('Added to cart!');
        navigate('/cart');
    };

    const handleReview = async (e) => {
        e.preventDefault();
        if (!user) { toast.error('Please login to review'); return; }
        setReviewLoading(true);
        try {
            await API.post(`/products/${id}/reviews`, { rating, comment });
            toast.success('Review submitted!');
            const { data } = await API.get(`/products/${id}`);
            setProduct(data);
            setComment('');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Error submitting review');
        } finally { setReviewLoading(false); }
    };

    if (loading) return <div className="spinner-wrap"><div className="spinner" /></div>;
    if (!product) return null;

    return (
        <div className="section">
            <div className="container">
                <button className="btn btn-ghost" onClick={() => navigate(-1)} style={{ marginBottom: '1.5rem' }}>
                    <FiArrowLeft /> Back
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
                    {/* Image */}
                    <div>
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', borderRadius: 'var(--radius)', aspectRatio: '1', objectFit: 'cover', background: 'var(--bg-card)' }}
                        />
                    </div>

                    {/* Info */}
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{product.category}</div>
                        <h1 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>{product.name}</h1>

                        <div className="stars" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {[1, 2, 3, 4, 5].map((s) => (
                                <FiStar key={s} fill={s <= product.rating ? 'currentColor' : 'none'} />
                            ))}
                            <span style={{ color: 'var(--text-muted)', marginLeft: '0.3rem' }}>({product.numReviews} reviews)</span>
                        </div>

                        <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '1rem' }}>
                            ${product.price?.toFixed(2)}
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>{product.description}</p>

                        <div className="card" style={{ marginBottom: '1.5rem' }}>
                            <div className="cart-summary-row">
                                <span>Brand</span><span style={{ color: 'var(--text-primary)' }}>{product.brand}</span>
                            </div>
                            <div className="cart-summary-row">
                                <span>Status</span>
                                <span style={{ color: product.countInStock > 0 ? 'var(--success)' : 'var(--danger)' }}>
                                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                                </span>
                            </div>
                            {product.countInStock > 0 && (
                                <div className="cart-summary-row">
                                    <span>Qty</span>
                                    <div className="qty-selector">
                                        <button className="qty-btn" onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                        <span className="qty-val">{qty}</span>
                                        <button className="qty-btn" onClick={() => setQty(q => Math.min(product.countInStock, q + 1))}>+</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            className="btn btn-primary btn-full"
                            onClick={handleAdd}
                            disabled={product.countInStock === 0}
                        >
                            <FiShoppingCart /> Add to Cart
                        </button>
                    </div>
                </div>

                {/* Reviews */}
                <div style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '1.5rem' }}>Customer Reviews</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Review list */}
                        <div>
                            {product.reviews.length === 0 ? (
                                <div className="card" style={{ color: 'var(--text-muted)' }}>No reviews yet. Be the first!</div>
                            ) : (
                                product.reviews.map((r) => (
                                    <div key={r._id} className="card" style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <strong>{r.name}</strong>
                                            <div className="stars">
                                                {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} size={12} fill={s <= r.rating ? 'currentColor' : 'none'} />)}
                                            </div>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>{r.comment}</p>
                                    </div>
                                ))
                            )}
                        </div>
                        {/* Write review */}
                        <div className="card">
                            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Write a Review</h3>
                            {!user ? (
                                <div className="alert alert-danger">Please login to leave a review.</div>
                            ) : (
                                <form onSubmit={handleReview}>
                                    <div className="form-group">
                                        <label>Rating</label>
                                        <select className="form-control" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                                            {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Comment</label>
                                        <textarea
                                            className="form-control"
                                            rows={4}
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button className="btn btn-primary btn-full" disabled={reviewLoading}>
                                        {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
