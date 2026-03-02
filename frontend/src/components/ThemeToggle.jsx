import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
            <div className="theme-toggle-track">
                <span className="theme-icon theme-icon-moon">🌙</span>
                <span className="theme-icon theme-icon-sun">☀️</span>
                <div className={`theme-thumb ${isDark ? '' : 'theme-thumb-light'}`} />
            </div>
        </button>
    );
};

export default ThemeToggle;
