import { useTheme } from '../context/themeContext';
import toggleStyles from '../styles/toggle.module.css';

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className={toggleStyles.btn} onClick={toggleTheme}>
      <div className={`${toggleStyles.slider} ${isDark ? toggleStyles.sliderDark : ''}`}>
        {isDark ? '☀️' : '🌙'}
      </div>
    </button>
  );
};

export default ThemeToggle;