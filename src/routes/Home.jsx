// src/routes/Home.jsx
import React from "react";
import { Helmet } from "react-helmet-async";

import Hero from "../components/Hero";
import Stories from "./Stories";
import Testimonials from "./Testimonials"; // ✅ match Testimonials.jsx
import CTA from "./CTA";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>
          Anointed Vessels Christian School | Growing Christian Leaders in Kenya
        </title>
        <meta
          name="description"
          content="Anointed Vessels Christian School provides holistic, Christ-centered education to vulnerable children in Kenya. Sponsor a child today and transform a life."
        />
        <meta
          property="og:title"
          content="Anointed Vessels Christian School | Holistic Education in Kenya"
        />
        <meta
          property="og:description"
          content="Empowering the next generation of Christian leaders through education, spiritual growth, and community care in Kenya."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com" />
        {/* <meta property="og:image"/HAPPYCHILDREN.jpg" /> */}
      </Helmet>

      <section id="hero">
        <Hero />
      </section>

      <section id="stories">
        <Stories />
      </section>

      <section id="testimonials">
        <Testimonials /> {/* ✅ component usage */}
      </section>

      <section id="cta">
        <CTA />
      </section>
    </>
  );
}
