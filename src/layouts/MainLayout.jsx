import React from "react";
import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToHashElement from "../components/ScrollToHashElement";
import ParticleBackground from "../components/ParticleBackground";

import { ThemeProvider } from "../contexts/ThemeContext";

export default function MainLayout() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToHashElement />

        <div className="min-h-screen w-full bg-gradient-to-br from-black via-stone-800 to-stone-200 relative">
          <ParticleBackground />

          <div className="relative min-h-screen w-full z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-white z-0" />

            <div className="relative z-10 text-gray-100">
              <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-white text-gray-100">
                <Navbar />
                <main className="pt-32 px-4 sm:px-6 md:px-8">
                  <Outlet />
                </main>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}
