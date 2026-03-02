import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import API from '../api/axiosConfig';
import { toast } from 'react-toastify';

const STEPS = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
    const { cartItems, subtotal, tax, shipping, total, saveShipping, savePayment, shippingAddress, paymentMethod, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [addr, setAddr] = useState(shippingAddress || { address: '', city: '', postalCode: '', country: '' });
    const [payment, setPayment] = useState(paymentMethod || 'PayPal');

    const handleShipping = (e) => {
        e.preventDefault();
        saveShipping(addr);
        setStep(1);
    };

    const handlePayment = (e) => {
        e.preventDefault();
        savePayment(payment);
        setStep(2);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            const { data } = await API.post('/orders', {
                orderItems: cartItems.map(i => ({ product: i._id, name: i.name, image: i.image, price: i.price, qty: i.qty })),
                shippingAddress: addr,
                paymentMethod: payment,
                itemsPrice: subtotal,
                taxPrice: tax,
                shippingPrice: shipping,
                totalPrice: total,
            });
            clearCart();
            toast.success('Order placed successfully!');
            navigate(`/orders/${data._id}`);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Order failed');
        } finally { setLoading(false); }
    };

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '700px' }}>
                <div className="page-header"><div className="page-title">Checkout</div></div>

                {/* Steps indicator */}
                <div className="steps">
                    {STEPS.map((s, i) => (
                        <div key={s} className={`step ${i === step ? 'active' : i < step ? 'done' : ''}`}>{i < step ? '✓' : i + 1}. {s}</div>
                    ))}
                </div>

                {/* Step 0: Shipping */}
                {step === 0 && (
                    <div className="card">
                        <h3 style={{ marginBottom: '1.2rem' }}>Shipping Address</h3>
                        <form onSubmit={handleShipping}>
                            {[
                                { label: 'Street Address', key: 'address', placeholder: '123 Main St' },
                                { label: 'City', key: 'city', placeholder: 'New York' },
                                { label: 'Postal Code', key: 'postalCode', placeholder: '10001' },
                                { label: 'Country', key: 'country', placeholder: 'United States' },
                            ].map((f) => (
                                <div className="form-group" key={f.key}>
                                    <label>{f.label}</label>
                                    <input className="form-control" value={addr[f.key]} placeholder={f.placeholder}
                                        onChange={(e) => setAddr(a => ({ ...a, [f.key]: e.target.value }))} required />
                                </div>
                            ))}
                            <button className="btn btn-primary btn-full">Continue</button>
                        </form>
                    </div>
                )}

                {/* Step 1: Payment */}
                {step === 1 && (
                    <div className="card">
                        <h3 style={{ marginBottom: '1.2rem' }}>Payment Method</h3>
                        <form onSubmit={handlePayment}>
                            {['PayPal', 'Credit Card', 'Cash on Delivery'].map((m) => (
                                <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', padding: '0.9rem', border: `1.5px solid ${payment === m ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', marginBottom: '0.7rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    <input type="radio" name="payment" value={m} checked={payment === m} onChange={() => setPayment(m)} />
                                    <span style={{ fontWeight: '500' }}>{m}</span>
                                </label>
                            ))}
                            <div style={{ display: 'flex', gap: '0.7rem' }}>
                                <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>Back</button>
                                <button className="btn btn-primary" style={{ flex: 1 }}>Continue</button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2: Review */}
                {step === 2 && (
                    <div>
                        <div className="card" style={{ marginBottom: '1rem' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Order Review</h3>
                            {cartItems.map((item) => (
                                <div key={item._id} className="cart-item">
                                    <img className="cart-item-img" src={item.image} alt={item.name} />
                                    <div className="cart-item-info" style={{ flex: 1 }}>{item.name}</div>
                                    <span style={{ color: 'var(--text-muted)' }}>x{item.qty}</span>
                                    <span style={{ fontWeight: '700', color: 'var(--accent)' }}>${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                                <div className="cart-summary-row"><span>Shipping to</span><span style={{ color: 'var(--text-primary)' }}>{addr.city}, {addr.country}</span></div>
                                <div className="cart-summary-row"><span>Payment</span><span style={{ color: 'var(--text-primary)' }}>{payment}</span></div>
                                <div className="cart-summary-row total"><span>Total</span><span>${total.toFixed(2)}</span></div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.7rem' }}>
                            <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={handlePlaceOrder} disabled={loading}>
                                {loading ? 'Placing Order...' : '🛍️ Place Order'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutPage;
