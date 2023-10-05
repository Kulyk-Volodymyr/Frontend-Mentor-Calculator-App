import React, { useContext } from "react";
import styles from "./Keypad.module.css";
import { CalculatorContext } from "../../context/CalculatorContext";
import { Button } from "./Button";

export const Keypad = () => {
  const {
    handleReset,
    handleDel,
    handlePoint,
    handleDigit,
    handleZero,
    handleAction,
    handleEquals,
  } = useContext(CalculatorContext);

  const BUTTONS = [
    {
      id: 1,
      value: "7",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 2,
      value: "8",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 3,
      value: "9",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 4,
      value: "DEL",
      className: "btnDel",
      onClick: handleDel,
    },
    {
      id: 5,
      value: "4",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 6,
      value: "5",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 7,
      value: "6",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 8,
      value: "+",
      className: "btn",
      onClick: handleAction,
    },
    {
      id: 9,
      value: "1",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 10,
      value: "2",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 11,
      value: "3",
      className: "btn",
      onClick: handleDigit,
    },
    {
      id: 12,
      value: "-",
      className: "btn",
      onClick: handleAction,
    },
    {
      id: 13,
      value: ".",
      className: "btn",
      onClick: handlePoint,
    },
    {
      id: 14,
      value: "0",
      className: "btn",
      onClick: handleZero,
    },
    {
      id: 15,
      value: "/",
      className: "btn",
      onClick: handleAction,
    },
    {
      id: 16,
      value: "x",
      className: "btn",
      onClick: handleAction,
    },
    {
      id: 17,
      value: "RESET",
      className: "btnReset",
      onClick: handleReset,
    },
    {
      id: 18,
      value: "=",
      className: "btnEqual",
      onClick: handleEquals,
    },
  ];

  return (
    <div className={styles.keypad}>
      {BUTTONS.map((button) => (
        <Button data={button} key={button.id} />
      ))}
    </div>
  );
};
