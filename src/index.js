import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoalProvider } from "./context/GoalContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <GoalProvider>
        <App />
      </GoalProvider>
    </AuthProvider>
  </React.StrictMode>
);
