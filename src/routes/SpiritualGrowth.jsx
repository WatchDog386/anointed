// src/routes/SpiritualGrowth.jsx
import React from "react";

export default function SpiritualGrowth() {
  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section */}
      <div
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/PRAYING.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Spiritual Growth
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Rooted in Christ Section - Preserved as requested */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat mb-4">
              Rooted in Christ
            </h2>
            <p className="text-gray-700 mb-4">
              At Anointed Vessels Academy, spiritual formation stands at the heart of our mission. We believe that true education must not only sharpen the mind but also shape the heart.
            </p>
            <p className="text-gray-700">
              Our goal is to raise children who know God, walk in truth, and serve others with love and integrity.
            </p>
          </div>
          <div className="bg-light rounded-lg p-6">
            <blockquote className="text-xl italic text-primary font-['Ernest_Emily',_serif]">
              "Train up a child in the way he should go..."
            </blockquote>
            <p className="text-right mt-2 text-gray-600">— Proverbs 22:6</p>
          </div>
        </div>

        {/* Spiritual Growth Programs */}
        <div className="space-y-16">
          {/* Daily Devotion and Prayer Life */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Daily Devotion and Prayer Life
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Teachers and pupils gather for <strong>morning devotions</strong> with Bible reading, praise, and prayer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Students are encouraged to <strong>lead prayers</strong> and share short verses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>We maintain a <strong>Prayer Circle</strong> for interceding for families, school, and community</span>
                </li>
              </ul>
            </div>
            
            <img src="/morning-devotions.jpg" 
              alt="Students participating in morning devotions"
              className="rounded-lg aspect-[4/3] object-cover w-full"
/>          </div>

          {/* Bible Study and Christian Instruction */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500">Bible Study Image</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Bible Study and Christian Instruction
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span><strong>Age-appropriate Bible lessons</strong> teaching values like honesty, kindness, and forgiveness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span><strong>Scripture memory challenges</strong> and discussions for moral reasoning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Using storytelling, songs, and dramas to make God's Word practical</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Worship and Fellowship */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Worship and Fellowship
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Weekly <strong>Fellowship Day</strong> with praise, worship, and testimonies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Guest speakers including pastors and missionaries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Seasonal events like <strong>school crusades</strong> and community worship</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500">Worship Service Image</span>
            </div>
          </div>

          {/* Mentorship and Character Building */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500">Mentorship Image</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Mentorship and Character Building
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Teachers serve as <strong>spiritual mentors</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span><strong>"Be a Light" mentorship program</strong> pairing older and younger students</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Life skills and counseling emphasizing integrity, respect, and purity</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Christian Leadership and Service */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Christian Leadership and Service
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Students take <strong>Christian leadership roles</strong> (fellowship coordinators, choir leaders)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span><strong>Community service activities</strong> - visiting the sick, cleaning, helping elderly</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Emphasis on leadership beginning with humility and service</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500">Service Project Image</span>
            </div>
          </div>

          {/* Partnership with Local Churches */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 rounded-lg aspect-[4/3] flex items-center justify-center">
              <span className="text-gray-500">Church Partnership Image</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-primary font-montserrat mb-4">
                Partnership with Local Churches
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Local pastors help in <strong>discipling learners</strong> through visits and mentorship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Students participate in <strong>church youth programs</strong> during holidays</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span><strong>Joint prayer days</strong> and <strong>thanksgiving services</strong> with local congregations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Weekly Activities Summary */}
        <div className="bg-light rounded-xl p-8 text-center mt-16">
          <h3 className="text-xl font-montserrat font-bold text-primary mb-6">
            Our Spiritual Development Framework
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Daily Devotions", 
              "Bible Instruction", 
              "Prayer Circles", 
              "Fellowship Days", 
              "Mentorship Programs",
              "Service Projects",
              "Church Partnerships"
            ].map((act, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-white rounded-full text-sm font-montserrat text-secondary border border-accent shadow-sm"
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}