import React, { useCallback } from "react"; // ✅ import React!
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: {
          color: {
            value: "#000",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#3a8decff",
          },
          links: {
            color: "#f3c8c8ff",
            distance: 150,
            enable: true,
          },
          move: {
            enable: true,
            speed: 2,
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
