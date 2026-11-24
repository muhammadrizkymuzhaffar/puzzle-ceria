import React, {useMemo} from 'react';

const CONFETTI_COLORS = [
  '#FF6B4A',
  '#FFD166',
  '#06D6A0',
  '#38BDF8',
  '#FB7185',
  '#A78BFA',
];

interface Particle {
  id: number;
  left: number;
  color: string;
  size: number;
  tx: number;
  rot: number;
  dur: number;
  delay: number;
  isStar: boolean;
}

export const ConfettiBurst: React.FC = () => {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({length: 42}, (_, i) => ({
      id: i,
      left: (i * 2.4 + (i % 5) * 3) % 98,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 12 + (i % 4) * 4,
      tx: ((i % 7) - 3) * 42,
      rot: (i % 2 === 0 ? 1 : -1) * (360 + (i % 5) * 140),
      dur: 2.0 + (i % 5) * 0.35,
      delay: (i % 6) * 0.12,
      isStar: i % 3 === 0,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="animate-confetti absolute top-0"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              '--tx': `${p.tx}px`,
              '--rot': `${p.rot}deg`,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          {p.isStar ? (
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <polygon
                points="12,2 15,9 22,9.5 16.5,14.5 18.2,21.5 12,17.8 5.8,21.5 7.5,14.5 2,9.5 9,9"
                fill={p.color}
                stroke="#2D2424"
                strokeWidth="1.5"
              />
            </svg>
          ) : (
            <div
              className="w-full h-full rounded-sm border border-[#2D2424]/40"
              style={{backgroundColor: p.color}}
            />
          )}
        </div>
      ))}
    </div>
  );
};
