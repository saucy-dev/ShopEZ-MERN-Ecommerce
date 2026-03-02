import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiArrowRight, FiShoppingBag } from 'react-icons/fi';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQty, subtotal, tax, shipping, total, itemsCount } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="section">
                <div className="container" style={{ textAlign: 'center', padding: '5rem 0' }}>
                    <FiShoppingBag size={64} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h2 style={{ marginBottom: '0.5rem' }}>Your cart is empty</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Looks like you haven't added anything yet.</p>
                    <Link to="/products" className="btn btn-primary">Browse Products</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container">
                <div className="page-header">
                    <div className="page-title">Shopping Cart <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}>({itemsCount} items)</span></div>
                </div>
                <div className="cart-grid">
                    {/* Items */}
                    <div>
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item">
                                <img className="cart-item-img" src={item.image} alt={item.name} />
                                <div className="cart-item-info">
                                    <Link to={`/products/${item._id}`} style={{ fontWeight: '600', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.name}</Link>
                                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>{item.category}</div>
                                </div>
                                <div className="qty-selector">
                                    <button className="qty-btn" onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}>−</button>
                                    <span className="qty-val">{item.qty}</span>
                                    <button className="qty-btn" onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                                </div>
                                <div style={{ fontWeight: '700', color: 'var(--accent)', minWidth: '80px', textAlign: 'right' }}>
                                    ${(item.price * item.qty).toFixed(2)}
                                </div>
                                <button className="btn-ghost btn" onClick={() => removeFromCart(item._id)}>
                                    <FiTrash2 size={16} style={{ color: 'var(--danger)' }} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="card" style={{ height: 'fit-content' }}>
                        <h3 style={{ marginBottom: '1rem', fontWeight: '700' }}>Order Summary</h3>
                        <div className="cart-summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                        <div className="cart-summary-row"><span>Tax (15%)</span><span>₹{tax.toFixed(2)}</span></div>
                        <div className="cart-summary-row"><span>Shipping</span><span>{shipping === 0 ? <span style={{ color: 'var(--success)' }}>FREE</span> : `₹${shipping.toFixed(2)}`}</span></div>
                        <div className="cart-summary-row total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
                        <button className="btn btn-primary btn-full" style={{ marginTop: '1rem' }} onClick={() => navigate('/checkout')}>
                            Proceed to Checkout <FiArrowRight />
                        </button>
                        <Link to="/products" className="btn btn-secondary btn-full" style={{ marginTop: '0.5rem' }}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
