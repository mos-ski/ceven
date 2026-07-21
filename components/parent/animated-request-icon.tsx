"use client";

import { Clock } from "lucide-react";

const pulseKeyframes = `
@keyframes requestPulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.15) rotate(-6deg); }
  50% { transform: scale(1) rotate(0deg); }
  75% { transform: scale(1.15) rotate(6deg); }
}
.request-icon {
  animation: requestPulse 0.6s ease-in-out infinite;
}
`;

export function AnimatedRequestIcon() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div className="request-icon">
        <Clock size={24} className="text-cg-brand" />
      </div>
    </>
  );
}
