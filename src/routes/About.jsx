import React from "react";
import Navbar from "../components/Navbar";

const values = [
  {
    title: "Integrity",
    description: "We conduct our business with honesty, transparency, and ethical practices.",
  },
  {
    title: "Innovation",
    description: "We embrace creativity to deliver cutting-edge solutions for evolving needs.",
  },
  {
    title: "Excellence",
    description: "We strive for the highest standards in all our services and products.",
  },
  {
    title: "Collaboration",
    description: "We believe in teamwork to achieve shared success with clients and partners.",
  },
];

export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800 relative">
      {/* Fixed Background Image for whole page */}
      <div className="fixed inset-0 -z-10">
        <img 
          src="/logo4.webp" 
          alt="Knoxville Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      <Navbar />

      {/* Hero Section - now normal height */}
      <section className="relative pt-32 pb-20 text-center text-white bg-[#006d7c]">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Knoxville</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Pioneering digital solutions that transform businesses and empower communities
          </p>
        </div>
      </section>

      {/* Knoxville Info Section */}
      <section className="py-20 bg-white bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-blue-700 mb-6">What to know of Knoxville</h2>
              <p className="mb-4 text-gray-700">
                Founded by an experienced team from some of the biggest telecommunication brands,
                <strong> Knoxville</strong> offers simple, affordable access to its
                <strong> full-fibre</strong> network so everyone in the community can benefit,
                regardless of income, technical knowledge or age. <strong>Knoxville</strong> delivers
                the fastest broadband in the outskirts of Nairobi and Kiambu, to homes and businesses,
                public services and community groups can experience its life-changing
                <strong> full-fibre</strong> connectivity.
              </p>
            </div>

            {/* Image */}
            <div className="lg:w-1/2">
              <img
                src="/group2.jpg"
                alt="Knoxville Group"
                className="rounded-2xl shadow-lg w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-100 bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Purpose</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving innovation through purpose-led solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-blue-600">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To empower businesses and communities through reliable, innovative digital
                infrastructure that enables growth and creates opportunities.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Deliver cutting-edge solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Maintain uncompromising quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>Foster sustainable digital ecosystems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-lg border-t-4 border-green-600">
              <h3 className="text-2xl font-bold text-green-700 mb-6">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the catalyst for Africa's digital revolution, connecting people, businesses,
                and ideas through world-class infrastructure and services.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Bridge the digital divide</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Enable next-generation technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>Create lasting economic impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-white bg-opacity-90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The foundation of everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-all">
                <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-700">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knoxville Bio Section - now with solid color */}
      <section className="py-20 bg-[#006d7c] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Knoxville Bio</h2>
            <p className="text-lg mb-6">
              Knoxville Technologies is a Kenyan ISP focused on delivering ultra-fast, reliable, and
              affordable internet to underserved and developing regions. We deploy high-capacity
              fiber-optic infrastructure to enable digital inclusion and bridge the connectivity
              gap in urban and peri-urban communities.
            </p>
            <p className="text-lg mb-6">
              Our team is comprised of professionals with a deep understanding of network
              design, deployment, and service delivery. We believe everyone deserves access to
              world-class connectivity, regardless of location or income level. Knoxville aims to
              be the backbone of digital transformation by supporting education, innovation, and
              enterprise through better broadband.
            </p>
            <p className="text-lg">
              We are committed to empowering homes and businesses with seamless access to
              information, communication, and opportunity. Through innovation and collaboration,
              Knoxville continues to redefine connectivity in Kenya and beyond.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}