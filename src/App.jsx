import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

// Context
import { LanguageProvider } from "./contexts/LanguageContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages (Routes)
import Home from "./routes/Home";
import About from "./routes/About";
import Services from "./routes/Services";
import Faqs from "./routes/faqs";
import Contact from "./routes/Contact";
import WifiPlans from "./routes/WifiPlans";
import Technicians from "./routes/Technicians";
import Articles from "./routes/Articles";
import ArticleDetail from "./routes/ArticleDetail";
import CoverageMap from "./routes/CoverageMap";

// Components
import TypewriterHeader from "./components/TypewriterHeader";

export default function App() {
  return (
    <ParallaxProvider>
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route
              index
              element={
                <>
                  <TypewriterHeader />
                  <Home />
                </>
              }
            />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="faq" element={<Faqs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="wifiplans" element={<WifiPlans />} />
            <Route path="technicians" element={<Technicians />} />
            <Route path="technicians/:issue" element={<Technicians />} />
            <Route path="articles" element={<Articles />} />
            <Route path="articles/:slug" element={<ArticleDetail />} />
            <Route path="coverage" element={<CoverageMap />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LanguageProvider>
    </ParallaxProvider>
  );
}
