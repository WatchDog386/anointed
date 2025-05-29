import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";

// Preload critical assets
const preloadResources = () => {
  // Preload Leaflet CSS for coverage map
  const leafletCSS = document.createElement('link');
  leafletCSS.rel = 'preload';
  leafletCSS.as = 'style';
  leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
  document.head.appendChild(leafletCSS);
  
  // Preload Leaflet Omnivore for KML support
  const omnivoreJS = document.createElement('link');
  omnivoreJS.rel = 'preload';
  omnivoreJS.as = 'script';
  omnivoreJS.href = 'https://unpkg.com/leaflet-omnivore@0.3.4/leaflet-omnivore.min.js';
  document.head.appendChild(omnivoreJS);
};

// Initialize the app
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

// Execute preloading before rendering
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  preloadResources();
  setTimeout(initApp, 0);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    preloadResources();
    initApp();
  });
}