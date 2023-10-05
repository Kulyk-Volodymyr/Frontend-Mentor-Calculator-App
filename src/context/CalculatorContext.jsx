import Decimal from "./decimal.js"; // https://github.com/MikeMcl/decimal.js

import React, { createContext, useState, useEffect } from "react";

export const CalculatorContext = createContext(null);

export const CalculatorContextProvider = (props) => {
  const [divideByZero, setDivideByZero] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [previouslyValue, setPreviouslyValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [operationResult, setOperationResult] = useState("0");

  useEffect(() => {
    setTimeout(() => {
      setDivideByZero(false);
    }, 5000);
  }, [divideByZero === true]);

  const handleReset = () => {
    if (inputValue !== null) setInputValue(null);
    if (previouslyValue !== null) setPreviouslyValue(null);
    if (operation !== null) setOperation(null);
    if (operationResult !== "0") setOperationResult("0");
  };

  const handleDel = () => {
    if (operation === "=") {
      setInputValue(operationResult);
      setPreviouslyValue(null);
      setOperation(null);
      setOperationResult("0");
    } else if (inputValue !== null) {
      if (inputValue.length > 1) {
        setInputValue((prev) => prev.slice(0, -1));
      } else if (inputValue.length === 1) {
        setInputValue("0");
      }
    } else if (inputValue === null && operationResult !== "0") {
      if (operationResult.length === 1) {
        setInputValue("0");
      } else {
        setInputValue(operationResult.slice(0, -1));
      }
    }
  };

  const handlePoint = () => {
    if (inputValue === null) {
      if (operation === "=") {
        setInputValue("0.");
        setOperationResult("0");
        setPreviouslyValue(null);
        setOperation(null);
      } else {
        setInputValue("0.");
      }
    } else if (!inputValue.includes(".")) {
      setInputValue((prev) => prev + ".");
    }
  };

  const handleDigit = (digit) => {
    if (inputValue === null) {
      if (operation === "=") {
        setInputValue(digit);
        setPreviouslyValue(null);
        setOperation(null);
      } else {
        setInputValue(digit);
      }
    } else if (inputValue.length === 1 && inputValue[0] === "0") {
      setInputValue(digit);
    } else {
      setInputValue((prev) => prev + digit);
    }
  };

  const handleZero = () => {
    if (inputValue === null) {
      if (operation === "=") {
        setInputValue("0");
        setPreviouslyValue(null);
        setOperation(null);
      } else {
        setInputValue("0");
      }
    } else if (inputValue[0] !== "0") {
      setInputValue((prev) => prev + "0");
    } else {
      if (inputValue.length > 1 && inputValue[1] === ".") {
        setInputValue((prev) => prev + "0");
      }
    }
  };

  const handleAction = (action) => {
    if (operation === null) {
      if (
        typeof inputValue === "string" ||
        typeof previouslyValue === "string"
      ) {
        setOperation(action);
        setPreviouslyValue(inputValue);
        setOperationResult(inputValue);
        setInputValue(null);
      }
    } else if (inputValue == null) {
      if (operation === "=") {
        setPreviouslyValue(operationResult);
        setOperation(action);
      } else {
        setOperation(action);
      }
    } else if (+inputValue === "0" && operation === "/") {
      handleDivideByZero();
    } else {
      setOperation(action);
      let result = performAnAction();
      setPreviouslyValue(result);
      setOperationResult(result);
      setInputValue(null);
    }
  };

  const handleEquals = () => {
    if (operation !== null && inputValue !== null) {
      if (+inputValue === 0 && operation === "/") {
        handleDivideByZero();
      } else if (operation !== "=") {
        setOperation("=");
        let result = performAnAction();
        setPreviouslyValue((prev) => prev + " " + operation + " " + inputValue);
        setOperationResult(result);
        setInputValue(null);
      }
    }
  };

  const handleDivideByZero = () => {
    setOperation("/");
    setDivideByZero(true);
    setInputValue(null);
    setOperationResult("0");
  };

  const performAnAction = () => {
    let result;
    let operand1 = Number(previouslyValue);
    let operand2 = Number(inputValue);
    if (operation === "+") {
      result = operand1 + operand2;
    } else if (operation === "-") {
      result = operand1 - operand2;
    } else if (operation === "x") {
      result = operand1 * operand2;
    } else if (operation === "/") {
      result = operand1 / operand2;
    }
    if (!Number.isSafeInteger(result)) {
      if (operation === "+") {
        let x = new Decimal(previouslyValue);
        let y = new Decimal(inputValue);
        result = x.plus(y);
      } else if (operation === "-") {
        let x = new Decimal(previouslyValue);
        let y = new Decimal(inputValue);
        result = x.minus(y);
      } else if (operation === "x") {
        let x = new Decimal(previouslyValue);
        let y = new Decimal(inputValue);
        result = x.times(y);
      } else if (operation === "/") {
        let x = new Decimal(previouslyValue);
        let y = new Decimal(inputValue);
        result = x.dividedBy(y);
      }
    }
    return String(result);
  };

  const handleKeyPress = (event) => {
    event.preventDefault();
    if ("123456789".includes(event.key)) {
      handleDigit(event.key);
    } else if (event.key === "0") {
      handleZero();
    } else if ("+-*/".includes(event.key)) {
      event.key === "*" ? handleAction("x") : handleAction(event.key);
    } else if (event.key === ".") {
      handlePoint();
    } else if (event.key === "=") {
      handleEquals();
    } else if (event.key === "Enter") {
      handleEquals();
    } else if (event.key === "Backspace") {
      handleDel();
    } else if (event.key === "Delete") {
      handleReset();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyPress);
    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  });

  const contextValue = {
    divideByZero,
    setDivideByZero,
    inputValue,
    setInputValue,
    previouslyValue,
    setPreviouslyValue,
    operation,
    operationResult,
    handleReset,
    handleDel,
    handlePoint,
    handleDigit,
    handleZero,
    handleAction,
    handleEquals,
  };

  return (
    <CalculatorContext.Provider value={contextValue}>
      {props.children}
    </CalculatorContext.Provider>
  );
};
