import { useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiUser, FiSearch, FiLogOut, FiPackage, FiGrid, FiChevronDown } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemsCount } = useCart();
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim()) navigate(`/products?keyword=${keyword.trim()}`);
        else navigate('/products');
    };

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">ShopEZ</Link>

                <div className="navbar-search">
                    <form className="search-bar" onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary btn-sm">
                            <FiSearch />
                        </button>
                    </form>
                </div>

                <div className="navbar-links">
                    <ThemeToggle />
                    <NavLink to="/products" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Products
                    </NavLink>

                    <NavLink to="/cart" className={({ isActive }) => `nav-link cart-icon ${isActive ? 'active' : ''}`}>
                        <FiShoppingCart size={20} />
                        {itemsCount > 0 && <span className="cart-badge">{itemsCount}</span>}
                    </NavLink>

                    {user ? (
                        <div className="dropdown">
                            <button className="nav-link btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                <FiUser /> {user.name.split(' ')[0]} <FiChevronDown size={14} />
                            </button>
                            <div className="dropdown-menu">
                                <Link to="/my-orders" className="dropdown-item"><FiPackage size={14} /> My Orders</Link>
                                {user.isAdmin && (
                                    <Link to="/admin" className="dropdown-item"><FiGrid size={14} /> Admin Panel</Link>
                                )}
                                <button onClick={logout} className="dropdown-item"><FiLogOut size={14} /> Logout</button>
                            </div>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary btn-sm">Sign In</Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
