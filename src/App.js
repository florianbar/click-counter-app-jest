import { useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [showError, setShowError] = useState(false);

  const incrementCounter = () => {
    setShowError(false);
    setCount(count + 1);
  };

  const decrementCounter = () => {
    let newCount = count;
    if (count > 0) {
      newCount = count - 1;
    } else {
      setShowError(true);
    }
    setCount(newCount);
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        The counter is currently <span data-test="count">{count}</span>
      </h1>
      <button data-test="increment-button" onClick={incrementCounter} style={{marginRight: "0.5em"}}>
        Increment
      </button>
      <button data-test="decrement-button" onClick={decrementCounter}>
        Decrement
      </button>
      {showError && <div data-test="error-message" style={{color: "red"}}>Counter can't go below zero</div>}
    </div>
  );
}

export default App;
