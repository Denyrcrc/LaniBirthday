// Simple confetti generator
const confetti = (opts = {}) => {
  const count = opts.particleCount || 50;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    const options = Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio)
    });
    window.confetti && window.confetti(options);
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
