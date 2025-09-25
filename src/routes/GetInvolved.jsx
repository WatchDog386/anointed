// src/routes/GetInvolved.jsx
import React from "react";

export default function GetInvolved() {
  return (
    <div className="font-open-sans">
      <div 
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/hero-involved.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Get Involved
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
          There are many ways to partner with us in raising the next generation of Christian leaders.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Sponsor a Child", desc: "$35/month changes a life forever.", link: "/ChildSponsorship" },
            { title: "Donate", desc: "One-time or recurring gifts support our mission.", link: "/cta" },
            { title: "Volunteer", desc: "Serve on a mission trip or remotely.", link: "/Make-An-Impact" },
            { title: "Pray", desc: "Join our prayer team for students and staff.", link: "/SpiritualGrowth" },
            { title: "Partner", desc: "Churches & organizations, let’s collaborate.", link: "/about" },
            { title: "Spread the Word", desc: "Follow and share our story.", link: "/gallery" }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-lg text-[#2b473f] font-montserrat mb-2">{item.title}</h3>
              <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
              <a
                href={item.link}
                className="text-[#932528] font-montserrat font-medium text-sm hover:text-[#8CA9B4]"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}