import React, { useState, useEffect, useCallback } from 'react';
import { soundService } from '../services/soundEffects';
import { triggerPopBurst } from '../services/confetti';

export interface Balloon {
  id: number;
  x: number; // percentage from left (5% - 90%)
  speed: number; // float duration in seconds
  color: string;
  size: number; // px width
  delay: number;
  swayDuration: number;
  label?: string;
}

const BALLOON_COLORS = [
  { bg: 'radial-gradient(circle at 35% 35%, #FFF2A1, #FFD700 60%, #B8860B 100%)', code: '#FFD700' },
  { bg: 'radial-gradient(circle at 35% 35%, #FFAFD4, #FF2E93 60%, #9C1155 100%)', code: '#FF2E93' },
  { bg: 'radial-gradient(circle at 35% 35%, #B4F8FF, #00C6FF 60%, #0072FF 100%)', code: '#00C6FF' },
  { bg: 'radial-gradient(circle at 35% 35%, #E4C8FF, #9B51E0 60%, #5B2C8C 100%)', code: '#9B51E0' },
  { bg: 'radial-gradient(circle at 35% 35%, #FFE9B3, #F39C12 60%, #B76800 100%)', code: '#F39C12' },
  { bg: 'radial-gradient(circle at 35% 35%, #FFFFFF, #E2E8F0 60%, #94A3B8 100%)', code: '#FFFFFF' },
];

interface BalloonsOverlayProps {
  activeTrigger: number;
}

export const BalloonsOverlay: React.FC<BalloonsOverlayProps> = ({ activeTrigger }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  const spawnBalloons = useCallback((count = 12) => {
    const newBalloons: Balloon[] = Array.from({ length: count }, (_, i) => {
      const colorObj = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
      return {
        id: Date.now() + i + Math.random(),
        x: 6 + Math.random() * 88,
        speed: 8 + Math.random() * 6, // 8-14s float
        color: colorObj.bg,
        size: 50 + Math.random() * 25,
        delay: Math.random() * 1.5,
        swayDuration: 2.5 + Math.random() * 2,
        label: ['✨', '🎂', '🥂', '🎉', '🌟', '💖'][Math.floor(Math.random() * 6)],
      };
    });

    setBalloons((prev) => [...prev, ...newBalloons]);
  }, []);

  useEffect(() => {
    if (activeTrigger > 0) {
      spawnBalloons(12);
    }
  }, [activeTrigger, spawnBalloons]);

  const handlePop = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundService.playBalloonPop();
    triggerPopBurst(e.clientX, e.clientY);
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  // Clean up balloons when they float out of view
  const handleAnimationEnd = (id: number) => {
    setBalloons((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          onAnimationEnd={() => handleAnimationEnd(balloon.id)}
          className="absolute bottom-[-120px] pointer-events-auto cursor-pointer group"
          style={{
            left: `${balloon.x}%`,
            animation: `floatUpward ${balloon.speed}s linear ${balloon.delay}s forwards`,
          }}
          onClick={(e) => handlePop(balloon.id, e)}
        >
          {/* Balloon Container with Sway */}
          <div
            className="flex flex-col items-center transition-transform hover:scale-110 active:scale-95"
            style={{
              animation: `balloonSway ${balloon.swayDuration}s ease-in-out infinite alternate`,
            }}
          >
            {/* Balloon Body */}
            <div
              className="relative rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-lg border border-white/20 flex items-center justify-center text-xs opacity-95 group-hover:brightness-110"
              style={{
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.25}px`,
                background: balloon.color,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3), inset 0 3px 8px rgba(255,255,255,0.6)',
              }}
            >
              {/* Highlight Glare */}
              <div className="absolute top-2 left-2 w-3 h-5 rounded-full bg-white/50 -rotate-30 blur-[0.5px]" />
              <span className="text-sm select-none opacity-80">{balloon.label}</span>
            </div>

            {/* Balloon Knot */}
            <div className="w-2.5 h-2 bg-amber-600/70 rounded-b-sm -mt-0.5" />

            {/* Balloon String */}
            <svg width="20" height="45" className="stroke-white/30 fill-none -mt-0.5">
              <path d="M 10 0 Q 15 15, 8 25 Q 2 35, 10 45" strokeWidth="1.2" />
            </svg>
          </div>
        </div>
      ))}

      {/* Global CSS for Balloon Movement */}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0);
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translateY(-120vh);
            opacity: 0;
          }
        }

        @keyframes balloonSway {
          0% {
            transform: rotate(-6deg) translateX(-10px);
          }
          100% {
            transform: rotate(6deg) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};
