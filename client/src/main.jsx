import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import "./i18n";
import { initSentry } from "./lib/sentry";
import App from "./App";
initSentry();
createRoot(document.getElementById("root")).render(<React.StrictMode>
        <App />
    </React.StrictMode>);
