import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const handleAdd = (e) => {
        e.preventDefault();
        if (product.countInStock === 0) return;
        addToCart(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    return (
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
            <div className="product-card">
                <img className="product-card-img" src={product.image} alt={product.name} loading="lazy" />
                <div className="product-card-body">
                    <span className="product-card-category">{product.category}</span>
                    <div className="product-card-name">{product.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }} className="stars">
                        <FiStar fill="currentColor" />
                        <span>{product.rating?.toFixed(1)}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>({product.numReviews})</span>
                    </div>
                    <div className="product-card-price">${product.price?.toFixed(2)}</div>
                </div>
                <div className="product-card-footer">
                    <span style={{ fontSize: '0.8rem', color: product.countInStock > 0 ? 'var(--success)' : 'var(--danger)' }}>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={handleAdd}
                        disabled={product.countInStock === 0}
                    >
                        <FiShoppingCart size={14} /> Add
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
