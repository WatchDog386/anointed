import React, { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Context
import { LanguageProvider } from "./contexts/LanguageContext";

// Layouts
import MainLayout from "./layouts/MainLayout";

// AVCS Pages
import Home from "./routes/Home";
import About from "./routes/About";
import Stories from "./routes/Stories";
import Testimonials from "./routes/testimonials";
import CTA from "./routes/CTA"; // ✅ renamed from Contact
import staff from "./routes/staff";
import Board from "./routes/Board";


const TrackPageViews = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-6TTHG2D146", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="staff" element={<staff />} />
        <Route path="board" element={<Board />} />
        
        
        <Route path="stories" element={<Stories />} />
        <Route path="testimonials" element={<Testimonials />} />
        <Route path="cta" element={<CTA />} /> {/* ✅ route for CTA */}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ParallaxProvider>
        <LanguageProvider>
          <Helmet>
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-6TTHG2D146"></script>
            <script>
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-6TTHG2D146');
              `}
            </script>
          </Helmet>

          <TrackPageViews />
          <AppRoutes />
        </LanguageProvider>
      </ParallaxProvider>
    </HelmetProvider>
  );
}