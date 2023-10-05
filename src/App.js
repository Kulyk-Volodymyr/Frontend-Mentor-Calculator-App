import "./App.css";
import { CalculatorContextProvider } from "./context/CalculatorContext";
import { Navbar } from "./components/navbar/Navbar";
import { Screen } from "./components/screen/Screen";
import { Keypad } from "./components/keypad/Keypad";

function App() {
  return (
    <>
      <div className="Calculator">
        <CalculatorContextProvider>
          <Navbar />
          <Screen />
          <Keypad />
        </CalculatorContextProvider>
      </div>
      <div className="Attribution">
        <p>
          Challenge by
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a
            href="https://github.com/Kulyk-Volodymyr/Frontend-Mentor-Calculator-App"
            target="_blank"
            rel="noopener noreferrer"
          >
            Volodymyr Kulyk
          </a>
          .
        </p>
      </div>
    </>
  );
}

export default App;
