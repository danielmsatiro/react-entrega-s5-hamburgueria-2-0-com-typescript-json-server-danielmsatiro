import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { AppProvider } from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <CssBaseline />
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
