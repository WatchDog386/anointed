import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Children data for sponsorship
const childrenData = [
  {
    id: 1,
    name: "Wildred Neisha",
    birthDate: "12th December 2019",
    grade: "Pre-Primary One",
    familyPosition: "Third-born",
    passions: ["reading", "classroom activities", "plating", "hairdressing"],
    personality: "Gentle spirit with dedication to studies",
    dream: "Becoming a nurse to care for the sick and give back to her community",
    challenges: [
      "Father works as fisherman with unstable income",
      "Father battles chronic illness",
      "Struggles with school expenses and daily necessities"
    ],
    needs: ["School Fees", "Learning Materials", "Basic Needs", "Healthcare"],
    image: "https://images.unsplash.com/photo-1516627145497-ae69578cfc42?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "High"
  },
  {
    id: 2,
    name: "Favour Nicole Grace",
    birthDate: "2nd October 2019",
    grade: "Grade One",
    familyPosition: "Third-born",
    passions: ["skipping ropes", "interacting with peers"],
    personality: "Friendly and lively",
    dream: "Becoming a doctor associated with compassion, service, and healing",
    challenges: [
      "Sleeps on a mat with only two meals daily during holidays",
      "Father works as security guard with meager earnings",
      "Mother suffers from chronic illness",
      "Lives in semi-permanent house"
    ],
    needs: ["School Fees", "Medical Care", "Nutrition", "Learning Materials"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "High"
  },
  {
    id: 3,
    name: "Jimmy Alex",
    birthDate: "18th November 2018",
    grade: "Grade One",
    familyPosition: "Third-born",
    passions: ["football", "athletics"],
    personality: "Energetic and cheerful",
    dream: "Becoming a teacher to uplift others and make positive impact",
    challenges: [
      "Sleeps on a mat with only two meals daily during holidays",
      "Both parents are educators but struggle financially",
      "Limited concentration due to hardships"
    ],
    needs: ["School Materials", "Nutrition Support", "School Fees", "Basic Bedding"],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Medium"
  },
  {
    id: 4,
    name: "Precious Kate",
    birthDate: "2nd August 2020",
    grade: "Pre-Primary One",
    familyPosition: "Only child",
    passions: ["coloring", "drawing", "making friends"],
    personality: "Cheerful with bright smile",
    dream: "Becoming a teacher to lift mother from poverty",
    challenges: [
      "Raised by single mother after father left due to domestic violence",
      "Mother is small-scale farmer struggling for food",
      "Often only one meal daily during holidays",
      "Lives in semi-permanent mud house"
    ],
    needs: ["School Fees", "Nutrition", "Learning Materials", "Housing Support"],
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "High"
  },
  {
    id: 5,
    name: "Blessing Akinyi",
    birthDate: "5th July 2018",
    grade: "Pre-Primary One",
    familyPosition: "Second-born",
    passions: ["reading storybooks", "singing"],
    personality: "Thoughtful, curious, and creative",
    dream: "Becoming a doctor to care for others",
    challenges: [
      "Raised by single mother with scarce resources",
      "Sleeps on a mat",
      "Struggles with school fees and learning materials"
    ],
    needs: ["School Fees", "Learning Materials", "Nutrition", "Medical Support"],
    image: "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Medium"
  },
  {
    id: 6,
    name: "David Omondi",
    birthDate: "15th March 2017",
    grade: "Grade Two",
    familyPosition: "First-born",
    passions: ["mathematics", "science experiments", "helping teachers"],
    personality: "Responsible and inquisitive",
    dream: "Becoming an engineer to build better communities",
    challenges: [
      "Orphaned and lives with elderly grandmother",
      "Grandmother relies on casual labor for income",
      "Frequently misses school due to lack of fees"
    ],
    needs: ["School Fees", "Uniform", "Books", "Mentorship"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "High"
  },
  {
    id: 7,
    name: "Grace Wambui",
    birthDate: "22nd September 2019",
    grade: "Pre-Primary One",
    familyPosition: "Fourth-born",
    passions: ["dancing", "storytelling", "helping with younger siblings"],
    personality: "Nurturing and expressive",
    dream: "Becoming a social worker to help vulnerable children",
    challenges: [
      "Large family with limited resources",
      "Parents are subsistence farmers",
      "Shares bed with three siblings"
    ],
    needs: ["School Fees", "Nutrition", "Bedding", "Educational Toys"],
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Medium"
  },
  {
    id: 8,
    name: "Samuel Kipchoge",
    birthDate: "8th June 2018",
    grade: "Grade One",
    familyPosition: "Second-born",
    passions: ["running", "drawing animals", "nature walks"],
    personality: "Adventurous and observant",
    dream: "Becoming a wildlife conservationist",
    challenges: [
      "Father disabled from work accident",
      "Mother sells vegetables in local market",
      "Long walk to school affects attendance"
    ],
    needs: ["School Fees", "Transport", "Learning Materials", "Nutrition"],
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Medium"
  },
  {
    id: 9,
    name: "Mary Atieno",
    birthDate: "30th November 2017",
    grade: "Grade Two",
    familyPosition: "Third-born",
    passions: ["writing stories", "debate club", "helping classmates"],
    personality: "Articulate and compassionate",
    dream: "Becoming a lawyer to fight for justice",
    challenges: [
      "Parents separated, lives with aunt",
      "Aunt has three children of her own",
      "Limited space and resources for studying"
    ],
    needs: ["School Fees", "Books", "Mentorship", "Study Space"],
    image: "https://images.unsplash.com/photo-1494790108755-2616c113a1c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Low"
  },
  {
    id: 10,
    name: "Joseph Kamau",
    birthDate: "14th April 2019",
    grade: "Pre-Primary One",
    familyPosition: "Fifth-born",
    passions: ["building with blocks", "counting games", "singing"],
    personality: "Energetic and quick learner",
    dream: "Becoming a pilot to see the world",
    challenges: [
      "Large family with eight children",
      "Father is casual laborer with irregular work",
      "Often shares textbooks with siblings"
    ],
    needs: ["School Fees", "Learning Materials", "Nutrition", "Healthcare"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    status: "Needs Sponsorship",
    urgency: "Medium"
  }
];

export default function SponsorshipGallery() {
  const [selectedChild, setSelectedChild] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState("all");
  
  const displayedChildren = showAll ? childrenData : childrenData.slice(0, 6);
  
  const filteredChildren = displayedChildren.filter(child => {
    if (filter === "all") return true;
    return child.urgency.toLowerCase() === filter.toLowerCase();
  });

  const openChildModal = (child) => {
    setSelectedChild(child);
    document.body.style.overflow = "hidden";
  };

  const closeChildModal = () => {
    setSelectedChild(null);
    document.body.style.overflow = "auto";
  };

  const handleSponsorClick = (child) => {
    // In a real application, this would redirect to sponsorship form
    alert(`Thank you for choosing to sponsor ${child.name}! You will be redirected to the sponsorship form.`);
    closeChildModal();
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
            Sponsor a Child's Future
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform a life through education. Browse through our children's profiles and choose to make a lasting impact.
          </p>
          
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{childrenData.length}</div>
              <div className="text-gray-600">Children Waiting</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">84%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
              <div className="text-gray-600">Years of Impact</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "all" 
                ? "bg-blue-600 text-white shadow-lg" 
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
            }`}
          >
            All Children
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "high" 
                ? "bg-red-600 text-white shadow-lg" 
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
            }`}
          >
            High Urgency
          </button>
          <button
            onClick={() => setFilter("medium")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              filter === "medium" 
                ? "bg-orange-500 text-white shadow-lg" 
                : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
            }`}
          >
            Medium Urgency
          </button>
        </motion.div>

        {/* Children Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <AnimatePresence>
            {filteredChildren.map((child, index) => (
              <motion.div
                key={child.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => openChildModal(child)}
              >
                {/* Urgency Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  child.urgency === "High" ? "bg-red-500" :
                  child.urgency === "Medium" ? "bg-orange-500" : "bg-green-500"
                }`}>
                  {child.urgency} Priority
                </div>

                {/* Child Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={child.image}
                    alt={child.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Child Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{child.name}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      ID: {child.id}
                    </span>
                  </div>
                  
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p className="text-sm"><span className="font-semibold">Age:</span> {child.birthDate}</p>
                    <p className="text-sm"><span className="font-semibold">Grade:</span> {child.grade}</p>
                    <p className="text-sm"><span className="font-semibold">Dream:</span> {child.dream.split('.')[0]}.</p>
                  </div>

                  {/* Needs Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {child.needs.slice(0, 2).map((need, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {need}
                      </span>
                    ))}
                    {child.needs.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                        +{child.needs.length - 2} more
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Sponsor {child.name.split(' ')[0]}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less Button */}
        {childrenData.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {showAll ? "Show Less" : `Show All ${childrenData.length} Children`}
            </button>
          </motion.div>
        )}

        {/* Child Detail Modal */}
        <AnimatePresence>
          {selectedChild && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={closeChildModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {/* Close Button */}
                  <button
                    onClick={closeChildModal}
                    className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors duration-300"
                  >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Hero Image */}
                  <div className="relative h-80">
                    <img
                      src={selectedChild.image}
                      alt={selectedChild.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h2 className="text-3xl font-bold mb-2">{selectedChild.name}</h2>
                      <p className="text-xl opacity-90">{selectedChild.dream}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Column - Basic Info */}
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-blue-900">About {selectedChild.name.split(' ')[0]}</h3>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900">Personal Details</h4>
                            <p className="text-gray-600">Born: {selectedChild.birthDate}</p>
                            <p className="text-gray-600">Grade: {selectedChild.grade}</p>
                            <p className="text-gray-600">Family: {selectedChild.familyPosition}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">Passions & Personality</h4>
                            <p className="text-gray-600">{selectedChild.personality}. Loves {selectedChild.passions.join(', ')}.</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">Current Situation</h4>
                            <ul className="text-gray-600 list-disc list-inside space-y-1">
                              {selectedChild.challenges.map((challenge, idx) => (
                                <li key={idx}>{challenge}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Right Column - Sponsorship Info */}
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-green-900">How You Can Help</h3>
                        
                        <div className="bg-green-50 rounded-xl p-6 mb-6">
                          <h4 className="font-semibold text-green-900 mb-4">Urgent Needs</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedChild.needs.map((need, idx) => (
                              <span
                                key={idx}
                                className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {need}
                              </span>
                            ))}
                          </div>
                          <p className="text-green-800 text-sm">
                            Your sponsorship will provide {selectedChild.name.split(' ')[0]} with the resources needed to pursue their education and dreams.
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-6">
                          <h4 className="font-semibold text-blue-900 mb-2">Sponsorship Impact</h4>
                          <ul className="text-blue-800 text-sm space-y-2 mb-4">
                            <li>• Full school fees coverage for one year</li>
                            <li>• Learning materials and uniform</li>
                            <li>• Basic healthcare and nutrition support</li>
                            <li>• Regular progress reports</li>
                            <li>• Personal correspondence with the child</li>
                          </ul>
                          
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSponsorClick(selectedChild)}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                          >
                            Sponsor {selectedChild.name.split(' ')[0]} - $35/month
                          </motion.button>
                          
                          <p className="text-center text-gray-600 text-sm mt-3">
                            Fully tax-deductible • Cancel anytime
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}