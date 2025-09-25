// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToHashElement from "../components/ScrollToHashElement";
import ParticleBackground from "../components/ParticleBackground";

import { ThemeProvider } from "../contexts/ThemeContext";

export default function MainLayout() {
  return (
    <ThemeProvider>
      <ScrollToHashElement />

      <div className="relative min-h-screen w-full bg-white text-gray-900 overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
        </div>

        {/* Main content wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />

          <main className="flex-1 px-0 sm:px-0 md:px-0 mt-4">
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}