import React, { useContext } from "react";
import styles from "./Screen.module.css";
import { CalculatorContext } from "../../context/CalculatorContext";

export const Screen = () => {
  const {
    divideByZero,
    inputValue,
    previouslyValue,
    operation,
    operationResult,
  } = useContext(CalculatorContext);

  return (
    <div className={styles.screen}>
      <p
        className={styles.divideByZero}
        style={{ visibility: divideByZero ? "initial" : "hidden" }}
      >
        You can't divide by 0!
      </p>
      <p className={styles.inputValue}>
        {inputValue === null ? operationResult : inputValue}
      </p>
      <p className={styles.previouslyValue}>
        {previouslyValue} {operation}
      </p>
    </div>
  );
};
