import React, { useState, useEffect } from 'react';

const TypewriterHeader = () => {
  const fullText = 'Welcome to Knoxville Technologies Ltd.';
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 70); // typing speed

      return () => clearTimeout(timeout);
    } else {
      setDone(true);
    }
  }, [displayedText, fullText]);

  return (
    <h1 className="text-4xl font-bold text-center mt-10 z-10 relative text-white">
      {displayedText}
      {!done && <span className="animate-pulse">|</span>}
    </h1>
  );
};

export default TypewriterHeader;
