// src/components/TypewriterHeader.jsx
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypewriterHeader = () => {
  return (
    <h1 className="text-4xl font-bold text-center mt-10">
      <Typewriter
        words={[
          'Welcome to KnoxVille Technologies LTD',
          'Home of Fibre Internet',
          'Secure. Scalable. Smart.'
        ]}
        loop={0} // 0 = infinite loop
        cursor
        cursorStyle="|"
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1500}
      />
    </h1>
  );
};

export default TypewriterHeader;
