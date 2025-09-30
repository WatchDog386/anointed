// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Optional: Preload critical fonts (GGCC uses Montserrat + Open Sans)
const preloadFonts = () => {
  const fonts = [
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap"
  ];

  fonts.forEach(href => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = href;
    document.head.appendChild(link);

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = href;
    document.head.appendChild(style);
  });
};

const initApp = () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <LanguageProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </LanguageProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Preload fonts early for better LCP 
if (document.readyState === "complete" || document.readyState === "interactive") {
  preloadFonts();
  setTimeout(initApp, 0);
} else {
  document.addEventListener("DOMContentLoaded", () => {
    preloadFonts();
    initApp();
  });
}