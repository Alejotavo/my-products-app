
import "./themeToggle.css";
import { useTheme } from './../../context/themeContext';

function ThemeToggle() {

const { theme, toggleTheme } = useTheme();



  return (
    <div className="theme-toggle">
        <input type="checkbox" 
            id="theme-toggle"
            checked={theme === 'dark'}  
            onChange={toggleTheme} 
        />
        <label  htmlFor="theme-toggle"></label>
    </div>
  );
}

export default ThemeToggle;