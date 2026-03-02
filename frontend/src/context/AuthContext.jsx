import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('userInfo');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        const { data } = await API.post('/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const register = async (name, email, password) => {
        const { data } = await API.post('/users/register', { name, email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        setUser(data);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
