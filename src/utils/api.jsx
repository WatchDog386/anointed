// /src/utils/api.js

// Use environment variable for API base URL (fallback to localhost for dev)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Helper to get auth header (using standard JWT Bearer format)
export const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Generic request function for JSON data
export const apiRequest = async (endpoint, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.msg || 'Something went wrong');
  }

  return response.json();
};

// Special function for file uploads (FormData)
export const uploadRequest = async (endpoint, formData, method = 'POST') => {
  // Get auth header for protected routes
  const authHeader = getAuthHeader();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      ...authHeader, // Include Authorization header for protected routes
      // DO NOT set Content-Type - browser will set it with correct boundary for FormData
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || error.msg || 'Upload failed');
  }

  return response.json();
};