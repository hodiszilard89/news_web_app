import { useState, useEffect } from "react";

import "./App.css";

interface AppProps {
  id: number;
}

export const App = ({ id }: AppProps) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("The count is: ", count);
    return () => {
      console.log("I am beign clened up!");
    };
  }, [count]);
  return (
    <div className="tutorial">
      <h1>Count: {count}</h1>
      <button
        onClick={() => {
          setCount(count - 1);
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment
      </button>
    </div>
  );
};
