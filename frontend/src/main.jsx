import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// This mounts the app into the root div on the page.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
