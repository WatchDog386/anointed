import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypewriterHeader = () => {
  return (
    <h1 className="text-4xl font-bold text-center mt-10 z-10 relative">
      <Typewriter
        words={[
          'Welcome to KnoxVille Technologies LTD',
          'Home of Fibre Internet',
          'Secure. Scalable. Smart.'
        ]}
        loop={0}
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
