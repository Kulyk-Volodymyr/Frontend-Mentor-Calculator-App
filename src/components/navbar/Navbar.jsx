import React, { useState } from "react";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  const [themeValue, setThemeValue] = useState(1);

  const changeTheme = () => {
    const root = document.getElementById("root");
    const theme = document.querySelector('input[id="theme"]');
    setThemeValue(theme.value);
    root.className = `App Theme${theme.value}`;
  };

  return (
    <div className={styles.navbar}>
      <p className={styles.title}>calc</p>
      <div className={styles.theme}>
        <label htmlFor="theme">theme</label>
        <div className={styles.themeValues}>
          <datalist id="theme" className={styles.datalist}>
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
          </datalist>
          <input
            type="range"
            id="theme"
            min="1"
            max="3"
            value={themeValue}
            onInput={changeTheme}
          />
        </div>
      </div>
    </div>
  );
};
