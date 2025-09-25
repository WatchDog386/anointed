import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  // Smooth scroll to top function
  const scrollToTop = () => {
    setIsScrolling(true);
    
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Reset scrolling state after animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  // Progress indicator based on scroll position
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar (GGCC Style) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-accent transition-all duration-200 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Scroll to Top Button (GGCC Style) */}
      <button
        onClick={scrollToTop}
        className={`
          fixed right-8 z-40
          bg-secondary text-white 
          rounded-full shadow-lg
          transition-all duration-300 ease-in-out
          btn-hover-effect
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}
          ${isScrolling ? 'animate-pulse-soft' : 'animate-bounce-soft'}
          group
        `}
        style={{
          bottom: '2rem',
          width: '3.5rem',
          height: '3.5rem',
        }}
        aria-label="Scroll to top"
      >
        {/* Main Button Content */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Arrow Icon */}
          <i className={`
            fas fa-chevron-up text-lg
            transition-transform duration-300
            ${isScrolling ? 'scale-110' : 'scale-100'}
          `}></i>
          
          {/* Progress Circle (Visible during scroll) */}
          <svg 
            className={`
              absolute inset-0 w-full h-full -rotate-90
              transition-opacity duration-300
              ${isScrolling ? 'opacity-100' : 'opacity-0'}
            `}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="text-accent opacity-30"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * scrollProgress) / 100}
              className="text-accent transition-all duration-150 ease-out"
            />
          </svg>
        </div>

        {/* Tooltip (Visible on hover) */}
        <div className={`
          absolute right-full mr-3 top-1/2 transform -translate-y-1/2
          bg-primary text-white text-sm font-montserrat font-semibold
          px-3 py-2 rounded-lg whitespace-nowrap
          opacity-0 group-hover:opacity-100
          transition-all duration-300 ease-in-out
          pointer-events-none
          shadow-lg
          before:content-[''] before:absolute before:left-full before:top-1/2 
          before:transform before:-translate-y-1/2
          before:border-4 before:border-transparent before:border-l-primary
        `}>
          Back to Top
          <span className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-primary"></span>
        </div>
      </button>

      {/* Scroll Indicator for Large Screens */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
        <div className="flex flex-col items-center space-y-4">
          {/* Scroll Text */}
          <div className="writing-mode-vertical-rl transform rotate-180">
            <span className="text-xs font-montserrat font-medium text-primary tracking-widest opacity-60">
              SCROLL
            </span>
          </div>
          
          {/* Scroll Line */}
          <div className="w-px h-32 bg-gradient-to-b from-primary to-transparent relative">
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-accent rounded-full animate-pulse-soft"
              style={{ top: `${Math.min(scrollProgress, 95)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Helper for Anchor Links */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Enhanced smooth scrolling for anchor links
          document.addEventListener('DOMContentLoaded', function() {
            // Smooth scroll for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
              anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                  const startPosition = window.pageYOffset;
                  const distance = targetPosition - startPosition;
                  const duration = 800;
                  let start = null;
                  
                  function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                  }
                  
                  function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                  }
                  
                  requestAnimationFrame(animation);
                }
              });
            });
          });
        `
      }} />
    </>
  );
};

export default ScrollToTop;