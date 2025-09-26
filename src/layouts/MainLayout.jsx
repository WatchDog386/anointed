// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ParticleBackground from "../components/ParticleBackground";

import { ThemeProvider } from "../contexts/ThemeContext";

export default function MainLayout() {
  return (
    <ThemeProvider>
      <ScrollToTop />

      <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden">
        {/* Background animation (particles) */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* Main content stack */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          {/* Critical: No top margin/padding — allows Hero to start at viewport top */}
          <main className="flex-1">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}