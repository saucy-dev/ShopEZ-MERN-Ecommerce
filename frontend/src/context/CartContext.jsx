import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const item = action.payload;
            const exists = state.cartItems.find((x) => x._id === item._id);
            const cartItems = exists
                ? state.cartItems.map((x) => (x._id === item._id ? item : x))
                : [...state.cartItems, item];
            return { ...state, cartItems };
        }
        case 'REMOVE_ITEM':
            return { ...state, cartItems: state.cartItems.filter((x) => x._id !== action.payload) };
        case 'UPDATE_QTY':
            return {
                ...state,
                cartItems: state.cartItems.map((x) =>
                    x._id === action.payload.id ? { ...x, qty: action.payload.qty } : x
                ),
            };
        case 'CLEAR_CART':
            return { ...state, cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };
        case 'SAVE_SHIPPING':
            return { ...state, shippingAddress: action.payload };
        case 'SAVE_PAYMENT':
            return { ...state, paymentMethod: action.payload };
        default:
            return state;
    }
};

const loadCart = () => {
    try {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };
    } catch { return { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' }; }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, loadCart());

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    const addToCart = (product, qty = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { ...product, qty } });
    };
    const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
    const clearCart = () => dispatch({ type: 'CLEAR_CART' });
    const saveShipping = (data) => dispatch({ type: 'SAVE_SHIPPING', payload: data });
    const savePayment = (method) => dispatch({ type: 'SAVE_PAYMENT', payload: method });

    const itemsCount = state.cartItems.reduce((a, c) => a + c.qty, 0);
    const subtotal = state.cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const tax = +(subtotal * 0.15).toFixed(2);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = +(subtotal + tax + shipping).toFixed(2);

    return (
        <CartContext.Provider value={{
            ...state, itemsCount, subtotal, tax, shipping, total,
            addToCart, removeFromCart, updateQty, clearCart, saveShipping, savePayment,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
