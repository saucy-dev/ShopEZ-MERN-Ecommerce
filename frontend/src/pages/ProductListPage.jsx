import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axiosConfig';
import ProductCard from '../components/ProductCard';
import { FiSearch } from 'react-icons/fi';

const categories = ['All', 'Electronics', 'Footwear', 'Accessories', 'Clothing'];

const ProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('All');
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const kw = params.get('keyword') || '';
        setKeyword(kw);
    }, [location.search]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (keyword) params.set('keyword', keyword);
                if (category !== 'All') params.set('category', category);
                params.set('page', page);
                const { data } = await API.get(`/products?${params}`);
                setProducts(data.products);
                setPages(data.pages);
                setTotal(data.total);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [keyword, category, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        const kw = e.target.keyword.value.trim();
        setPage(1);
        navigate(kw ? `/products?keyword=${kw}` : '/products');
    };

    return (
        <div className="section">
            <div className="container">
                {/* Header */}
                <div className="page-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <div className="page-title">Products</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                            {total} results{keyword && ` for "${keyword}"`}
                        </div>
                    </div>
                    <form onSubmit={handleSearch} className="search-bar" style={{ maxWidth: '320px', flex: 1 }}>
                        <input name="keyword" className="form-control" defaultValue={keyword} placeholder="Search..." />
                        <button type="submit" className="btn btn-primary btn-sm"><FiSearch /></button>
                    </form>
                </div>

                {/* Category Filter */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                    {categories.map((c) => (
                        <button
                            key={c}
                            className={`btn btn-sm ${category === c ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => { setCategory(c); setPage(1); }}
                        >{c}</button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="spinner-wrap"><div className="spinner" /></div>
                ) : products.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
                        No products found.
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map((p) => <ProductCard key={p._id} product={p} />)}
                    </div>
                )}

                {/* Pagination */}
                {pages > 1 && (
                    <div className="pagination">
                        {[...Array(pages)].map((_, i) => (
                            <button
                                key={i + 1}
                                className={`page-btn ${page === i + 1 ? 'active' : ''}`}
                                onClick={() => setPage(i + 1)}
                            >{i + 1}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductListPage;
