import confetti from 'canvas-confetti';

/**
 * Luxury Confetti Emitters
 */
export const triggerGrandCelebration = () => {
  const duration = 3.5 * 1000;
  const end = Date.now() + duration;

  const colors = ['#FFD700', '#F39C12', '#FF2E93', '#FFFFFF', '#00FFFF', '#E5A91E'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.75 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      zIndex: 9999,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.75 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  // Big initial blast
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF2E93', '#FFFFFF', '#F39C12'],
    zIndex: 9999,
    scalar: 1.3,
  });
};

export const triggerWishBurst = () => {
  confetti({
    particleCount: 80,
    spread: 90,
    origin: { y: 0.55 },
    colors: ['#FFD700', '#FFEAA7', '#FF7675', '#74B9FF', '#FFFFFF'],
    shapes: ['star', 'circle'],
    scalar: 1.4,
    zIndex: 9999,
  });
};

export const triggerChampagneSpray = () => {
  const end = Date.now() + 1500;
  const colors = ['#FFD700', '#FFF5B8', '#F39C12', '#FFFFFF'];

  (function spray() {
    confetti({
      particleCount: 7,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      origin: { x: 0.5, y: 0.7 },
      colors,
      zIndex: 9999,
      scalar: 1.1,
    });

    if (Date.now() < end) {
      requestAnimationFrame(spray);
    }
  })();
};

export const triggerPopBurst = (x: number, y: number, color?: string) => {
  confetti({
    particleCount: 30,
    spread: 60,
    origin: {
      x: Math.max(0, Math.min(1, x / window.innerWidth)),
      y: Math.max(0, Math.min(1, y / window.innerHeight)),
    },
    colors: color ? [color, '#FFFFFF', '#FFD700'] : ['#FF2E93', '#FFD700', '#00FFFF'],
    scalar: 1.1,
    zIndex: 9999,
  });
};
