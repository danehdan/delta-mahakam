"use client";

import React, { useRef, useState } from "react";

export default function DonationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((centerY - y) / centerY) * 15; // Max 15 degrees
    const rotY = ((x - centerX) / centerX) * 15;

    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className="bri-card w-full max-w-[420px] h-[260px] rounded-2xl p-6 shadow-2xl cursor-pointer"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="font-heading text-2xl font-bold text-white tracking-wider">BRI</div>
        <div className="text-white/80 font-mono text-[10px] uppercase border border-white/30 px-2 py-1 rounded">
          Corporate
        </div>
      </div>
      <div className="gold-chip mb-6" />
      <div className="font-heading text-[24px] text-white/90 font-mono tracking-[0.15em] mb-4 embossed-text">
        0630 01 001914 56 4
      </div>
      <div className="flex justify-between items-end">
        <div>
          <div className="text-white/50 text-[10px] uppercase mb-1">Account Holder</div>
          <div className="font-heading text-white/90 uppercase tracking-widest text-sm embossed-text">
            YAYASAN DELTA MAHAKAM
          </div>
        </div>
        <div className="text-tertiary">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.33-.89-2.41-1.76H7.73c.09 1.66 1.16 2.82 3.17 3.22V19h2.36v-1.62c1.69-.32 2.91-1.39 2.91-3.04 0-2.36-1.92-2.92-3.86-3.2z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
