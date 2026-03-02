import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminProductEdit from './pages/admin/AdminProductEdit';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AuthProvider>
                    <CartProvider>
                        <Navbar />
                        <main>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/products" element={<ProductListPage />} />
                                <Route path="/products/:id" element={<ProductDetailPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route path="/cart" element={<CartPage />} />
                                <Route path="" element={<PrivateRoute />}>
                                    <Route path="/checkout" element={<CheckoutPage />} />
                                    <Route path="/orders/:id" element={<OrderPage />} />
                                    <Route path="/my-orders" element={<MyOrdersPage />} />
                                </Route>
                                <Route path="" element={<AdminRoute />}>
                                    <Route path="/admin" element={<AdminDashboard />} />
                                    <Route path="/admin/products" element={<AdminProducts />} />
                                    <Route path="/admin/products/:id/edit" element={<AdminProductEdit />} />
                                    <Route path="/admin/orders" element={<AdminOrders />} />
                                </Route>
                            </Routes>
                        </main>
                        <Footer />
                    </CartProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
