import React, { useState } from "react";
import styles from "./Keypad.module.css";

export const Button = (props) => {
  const { value, className, onClick } = props.data;
  const [btnStyle, setBtnStyle] = useState(className);

  const handleKeyDown = (event) => {
    if (event.key === value) {
      setBtnStyle(className + "Active");
    } else if (event.key === "Enter" && value === "=") {
      setBtnStyle(className + "Active");
    } else if (event.key === "*" && value === "x") {
      setBtnStyle(className + "Active");
    } else if (event.key === "Backspace" && value === "DEL") {
      setBtnStyle(className + "Active");
    } else if (event.key === "Delete" && value === "RESET") {
      setBtnStyle(className + "Active");
    }
  };

  const handleKeyUp = () => {
    setBtnStyle(className);
  };

  document.body.addEventListener("keydown", handleKeyDown);
  document.body.addEventListener("keyup", handleKeyUp);

  return (
    <>
      <button
        type="button"
        className={styles[btnStyle]}
        onClick={() => onClick(value)}
      >
        {value}
      </button>
    </>
  );
};
