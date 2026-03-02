import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <p>© {new Date().getFullYear()} <strong>ShopEZ</strong> – One-Stop Online Shop. All rights reserved.</p>
            <p style={{ marginTop: '0.5rem' }}>
                <Link to="/products" style={{ color: 'var(--accent)', marginRight: '1rem' }}>Products</Link>
                <Link to="/cart" style={{ color: 'var(--accent)' }}>Cart</Link>
            </p>
        </div>
    </footer>
);

export default Footer;
