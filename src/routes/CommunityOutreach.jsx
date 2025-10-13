// src/routes/CommunityOutreach.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CommunityOutreach() {
  const outreachPrograms = [
    {
      id: 1,
      title: "Tree Planting & Green School Initiative",
      description: "Simple, hands-on tree planting activities that help our students connect with nature and learn environmental stewardship in practical ways.",
      activities: [
        "Each student plants and cares for one tree per year",
        "Classroom tree nurseries with local species",
        "Tree planting during birthdays and special events",
        "Learning about trees that provide food and shade",
        "Simple gardening and plant care lessons"
      ],
      image: "/TREE PLANTING.jpg"
    },
    {
      id: 2,
      title: "Neighborhood Literacy & Learning Support",
      description: "Many children in nearby villages and fishing communities struggle to access quality education. To bridge this gap, our learners and teachers organize simple learning sessions during weekends or holidays.",
      activities: [
        "Reading days in local churches or under trees",
        "Collecting and sharing old books and stationery",
        "Senior pupils mentoring younger children"
      ],
      image: "/literacy-support.png"
    },
    {
      id: 3,
      title: "Giving and Caring for the Needy",
      description: "Our students are taught that giving is not about plenty but about heart.",
      activities: [
        "Compassion Basket program with food and supplies",
        "Visiting children's homes and hospitals during festive seasons",
        "Partnering with local churches to support vulnerable families"
      ],
      image: "/compassion-basket.jpg"
    },
    {
      id: 4,
      title: "Environmental Care & Clean-Up Days",
      description: "We take seriously our duty to care for God's creation.",
      activities: [
        "Community clean-up drives around school and lakeshore",
        "Tree nursery and garden adoption by each class",
        "Environment Day celebrations with tree planting"
      ],
      image: "/environment-care.jpg"
    },
    {
      id: 5,
      title: "Faith and Spiritual Outreach",
      description: "As a Christian institution, our outreach is rooted in the Gospel.",
      activities: [
        "School fellowship days and inter-school Christian rallies",
        "Visiting neighboring schools and churches with devotions",
        "Youth mentorship seminars for purpose and identity in Christ"
      ],
      image: "/faith-outreach.jpg"
    },
    {
      id: 6,
      title: "Health & Hygiene Awareness",
      description: "Understanding the challenges many rural families face in accessing health education, our school organizes simple awareness sessions.",
      activities: [
        "Health talks with local nurses on hygiene and nutrition",
        "Training on handwashing, sanitation, and menstrual health",
        "Clean Water Days teaching safe water storage and use"
      ],
      image: "/health-hygiene.jpg"
    },
    {
      id: 7,
      title: "Skills for Life & Community Development",
      description: "Even as a developing school, we believe in equipping learners with hands-on skills that can benefit the community.",
      activities: [
        "Basic training in crafts, gardening, and entrepreneurship",
        "Joint training sessions with parents",
        "Work and Learn program for teamwork and responsibility"
      ],
      image: "/skills-development.jpg"
    },
    {
      id: 8,
      title: "Partnerships and Local Involvement",
      description: "We may be a small school, but we believe in doing great things together.",
      activities: [
        "Partnering with local churches, youth groups, and area chiefs",
        "Encouraging parent participation in community outreach",
        "Expanding partnerships to reach more families"
      ],
      image: "/partnerships.jpg"
    }
  ];

  return (
    <div className="bg-white font-sans min-h-screen">
      {/* Hero Section */}
      <div
        className="h-80 md:h-[500px] bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: "url('/HAPPY.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="text-3xl md:text-5xl font-bold text-white font-montserrat z-10 text-center px-4">
          Community Outreach
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            At <em>Anointed Vessels Christian School</em> we believe transformation begins right where we are planted. 
            Though our school is still growing, we remain committed to extending hope, service, and education to the 
            communities around us. Our outreach programs are designed to nurture compassion in our learners while 
            uplifting the lives of those in need.
          </p>
        </div>

        {/* Outreach Programs */}
        <div className="space-y-20">
          {outreachPrograms.map((program) => (
            <div key={program.id} className="flex flex-col lg:flex-row gap-8 items-center">
              {/* 16:9 Image Container */}
              <div className="lg:w-1/2 w-full">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                  <div 
                    className="w-full h-64 bg-cover bg-center"
                    style={{ backgroundImage: `url('${program.image}')` }}
                  ></div>
                </div>
              </div>
              
              {/* Content */}
              <div className="lg:w-1/2 w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-primary font-montserrat mb-4">
                  {program.title}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {program.description}
                </p>
                <ul className="space-y-2">
                  {program.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Simple Tree Planting Impact */}
        <div className="mt-16 bg-green-50 p-8 rounded-lg border border-green-100 text-center">
          <h3 className="text-2xl font-bold text-green-800 mb-4 font-montserrat">
            Our Growing Green Legacy
          </h3>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed mb-4">
            Through our simple tree planting efforts, our students are learning to care for God's creation 
            while making our school environment greener and more beautiful. Every tree planted represents 
            hope for a better tomorrow.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">500+</div>
              <div className="text-green-600 text-sm">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">100%</div>
              <div className="text-green-600 text-sm">Student Participation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">12</div>
              <div className="text-green-600 text-sm">Local Species</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">Growing</div>
              <div className="text-green-600 text-sm">Every Day</div>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-20 text-center bg-green-50 p-8 rounded-lg border border-green-100">
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Through these humble acts of service, <em>Anointed Vessels Academy</em> is not only shaping students 
            academically but raising a generation of compassionate leaders—children who know that even small acts 
            of kindness can light up an entire community.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Link 
            to="/Make-An-Impact" 
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Join an Outreach Trip
          </Link>
        </div>
      </div>
    </div>
  );
}