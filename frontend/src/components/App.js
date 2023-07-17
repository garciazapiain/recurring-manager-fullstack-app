import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./HomePage";

const App = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

const appDiv = document.getElementById("app");
ReactDOM.render(<App />, appDiv);
