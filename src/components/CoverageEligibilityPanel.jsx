import React from 'react';
import { motion } from 'framer-motion';

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const CoverageEligibilityPanel = ({ address, isEligible, isLoading, onClose }) => {
  return (
    <motion.div
      className="absolute bottom-6 right-6 z-50 w-full max-w-xs md:max-w-sm"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Coverage Status</h3>
          <button
            onClick={onClose}
            aria-label="Close coverage panel"
            className="text-gray-400 hover:text-gray-700 dark:hover:text-white p-1 rounded-full transition-colors"
          >
            <CrossIcon />
          </button>
        </div>

        {isLoading ? (
          <div className="flex items-center space-x-3">
            <Spinner />
            <p className="text-gray-600 dark:text-gray-400">Checking coverage...</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Address:</p>
            <p className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4 line-clamp-2">{address}</p>

            <div
              className={`flex items-center space-x-2 mb-4 ${
                isEligible ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}
            >
              {isEligible ? <CheckIcon /> : <CrossIcon />}
              <span className="font-semibold">{isEligible ? 'Coverage available' : 'No coverage'}</span>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {isEligible ? (
                <p>Great news! We offer high-speed fiber internet at this location. Contact us to get connected.</p>
              ) : (
                <p>We're expanding our network! Register your interest to be notified when coverage becomes available in your area.</p>
              )}
            </div>

            <button
              className={`w-full px-4 py-2 font-medium rounded-lg transition-colors ${
                isEligible
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => alert(isEligible ? 'Get connected' : 'Register interest')}
            >
              {isEligible ? 'Get Connected' : 'Register Interest'}
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};
