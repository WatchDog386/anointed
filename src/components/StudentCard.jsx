// /src/components/StudentCard.jsx
import React, { useState } from 'react';

const StudentCard = ({ student, onDelete, onEdit, index = 0 }) => {
  const [showPopup, setShowPopup] = useState(false);
  const isEven = index % 2 === 0;
  
  // Determine if this is an admin view (has edit/delete functions)
  const isAdminView = !!(onDelete || onEdit);

  // Format date for display (e.g., "18th November 2018")
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    // Add ordinal suffix
    const getOrdinal = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    return `${getOrdinal(day)} ${month} ${year}`;
  };

  return (
    <>
      <div className={`student-card ${isEven ? 'layout-left' : 'layout-right'} ${isAdminView ? 'admin-view' : ''}`}>
        {/* Image Section */}
        <div className="student-image">
          {student.imageUrl ? (
            <img
              src={student.imageUrl}
              alt={student.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image&bg=f6f4ee&fg=2b473f';
              }}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="no-image-placeholder">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
        </div>
        
        {/* Details Section */}
        <div className="student-details">
          {/* Header with Admin Actions */}
          <div className="student-header">
            <h3 className="student-name">
              {student.idNumber && <span className="id-number">ID: {student.idNumber}</span>}
              {student.name}
            </h3>
            
            {/* Admin action buttons */}
            {isAdminView && (
              <div className="admin-actions">
                <button
                  onClick={() => onEdit && onEdit(student)}
                  className="btn-edit"
                  aria-label={`Edit ${student.name}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(student._id)}
                  className="btn-delete"
                  aria-label={`Delete ${student.name}`}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Basic Information Grid */}
          <div className="basic-info-grid">
            <div className="info-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{student.dateOfBirth ? formatDate(student.dateOfBirth) : 'Not specified'}</span>
            </div>
            <div className="info-item">
              <span className="label">Class:</span>
              <span className="value">{student.class || 'Unknown'}</span>
            </div>
            <div className="info-item">
              <span className="label">Age:</span>
              <span className="value">{student.age || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Personality:</span>
              <span className="value">{student.personality || 'Bright and enthusiastic'}</span>
            </div>
          </div>

          {/* Academic Information */}
          <div className="academic-section">
            <h4>Academic Profile</h4>
            <div className="academic-details">
              {student.academicStrengths && (
                <div className="info-item">
                  <span className="label">Strengths:</span>
                  <span className="value">{student.academicStrengths}</span>
                </div>
              )}
              {student.overallPerformance && (
                <div className="info-item">
                  <span className="label">Performance:</span>
                  <span className="value">{student.overallPerformance}</span>
                </div>
              )}
              {student.achievements && (
                <div className="info-item">
                  <span className="label">Achievements:</span>
                  <span className="value">
                    {Array.isArray(student.achievements)
                      ? student.achievements.join(', ')
                      : student.achievements}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Support Needed (for public view) */}
          {!isAdminView && student.supportNeeded && (
            <div className="support-needed">
              <span className="support-label">Support needed:</span>
              <span className="support-text">{student.supportNeeded}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="student-actions">
            {!isAdminView && (
              <button 
                className="btn-know-more"
                onClick={() => setShowPopup(true)}
              >
                Get to Know Flex
              </button>
            )}
            {isAdminView && (
              <button className="btn-sponsor-admin">
                Manage Sponsorship
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Family Background Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h2>Getting to Know {student.name}</h2>
              <button 
                className="popup-close"
                onClick={() => setShowPopup(false)}
                aria-label="Close popup"
              >
                ×
              </button>
            </div>
            
            <div className="popup-body">
              {/* Family Background Section */}
              <div className="popup-section">
                <h3>Family Background</h3>
                <div className="section-content">
                  <p>{student.familyBackground || `${student.name} comes from a family facing economic challenges. Despite these circumstances, ${student.name.split(' ')[0]} remains dedicated to education and building a better future.`}</p>
                </div>
              </div>
              
              {/* Financial Situation Section */}
              <div className="popup-section">
                <h3>Financial Situation</h3>
                <div className="section-content">
                  <p>{student.financialSituation || `The family's financial situation makes it difficult to provide consistent educational support, school supplies, and proper nutrition. Your sponsorship can make a significant difference in ${student.name.split(' ')[0]}'s life.`}</p>
                </div>
              </div>
              
              {/* Aspirations Section */}
              <div className="popup-section">
                <h3>Dreams & Aspirations</h3>
                <div className="section-content">
                  <p>{student.aspirations || `${student.name} dreams of a bright future and is working hard in school to achieve their goals. With proper support and encouragement, these dreams can become reality.`}</p>
                </div>
              </div>
              
              {/* Support Needed Section */}
              {student.supportNeeded && (
                <div className="popup-section">
                  <h3>Support Needed</h3>
                  <div className="section-content">
                    <p>{student.supportNeeded}</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="popup-footer">
              <button 
                className="btn-close-popup"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              <button className="btn-sponsor-popup">
                Sponsor {student.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCard;