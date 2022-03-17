import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./globalStyles.css";
import { SnackbarProvider } from "notistack";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
