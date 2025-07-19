import { useState } from "react";
import "./themeToggle.css";

function ThemeToggle() {

const [checked, setChecked] = useState(true);

  return (
    <div className="theme-toggle">
        <input type="checkbox" 
            id="theme-toggle"
            checked={checked}  
            onChange={(e) => setChecked(e.target.checked)} 
        />
        <label  htmlFor="theme-toggle"></label>
    </div>
  );
}

export default ThemeToggle;