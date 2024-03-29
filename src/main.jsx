import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";

import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider
        value={{
          pt: Tailwind,
          ripple: true,
        }}
      >
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>
);
