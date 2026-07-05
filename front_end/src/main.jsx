import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap-icons/font/bootstrap-icons.css";

/* DataTables CSS (ONLY bootstrap5 version) */
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import "./index.css";

/* jQuery */
import $ from "jquery";
window.$ = $;
window.jQuery = $;

/* DataTables JS */
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </StrictMode>
);