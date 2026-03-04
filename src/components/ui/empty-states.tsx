"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  type: "no-notifications" | "no-actions" | "evaluation-pending" | "no-analysis" | "no-results" | "no-whys";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// CSS animations for the illustrations
const animationStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes sparkle {
    0%, 100% { opacity: 0.3; transform: scale(0.8); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes ring {
    0% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
    100% { transform: rotate(-5deg); }
  }
  @keyframes draw {
    0% { stroke-dashoffset: 100; }
    100% { stroke-dashoffset: 0; }
  }
  @keyframes wave {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-3px); }
    75% { transform: translateX(3px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes glow {
    0%, 100% { filter: drop-shadow(0 0 3px rgba(245, 217, 142, 0.5)); }
    50% { filter: drop-shadow(0 0 12px rgba(245, 217, 142, 0.8)); }
  }
  @keyframes bounce-soft {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.95); opacity: 0.7; }
    50% { transform: scale(1.05); opacity: 0.3; }
    100% { transform: scale(0.95); opacity: 0.7; }
  }
`;

// Beautiful SVG illustrations for each empty state
function NoNotificationsIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Animated background rings */}
        <circle
          cx="90" cy="80" r="60"
          fill="none"
          stroke="url(#gradient-ring-notif)"
          strokeWidth="0.5"
          opacity="0.3"
          style={{ animation: "pulse-ring 3s ease-in-out infinite" }}
        />
        <circle
          cx="90" cy="80" r="50"
          fill="url(#gradient-bg-notif)"
          opacity="0.12"
        />
        <circle
          cx="90" cy="80" r="38"
          fill="url(#gradient-bg-notif)"
          opacity="0.08"
        />

        {/* Bell body with glow effect */}
        <g style={{ animation: "ring 4s ease-in-out infinite", transformOrigin: "90px 55px" }}>
          <path
            d="M90 38C72 38 58 52 58 70V90C58 94 55 98 51 100H129C125 98 122 94 122 90V70C122 52 108 38 90 38Z"
            fill="url(#gradient-bell-main)"
            stroke="url(#gradient-bell-stroke)"
            strokeWidth="2.5"
            style={{ filter: "drop-shadow(0 4px 12px rgba(212, 168, 83, 0.3))" }}
          />

          {/* Bell shine */}
          <path
            d="M68 55C70 48 78 42 90 42"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Bell clapper */}
          <ellipse cx="90" cy="110" rx="10" ry="8" fill="url(#gradient-clapper)" stroke="#C99A2E" strokeWidth="2" />

          {/* Bell top ring */}
          <path
            d="M90 38V28"
            stroke="#C99A2E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="90" cy="23" r="5" fill="url(#gradient-top-ball)" stroke="#C99A2E" strokeWidth="1.5" />
        </g>

        {/* Animated sleeping Zs with better styling */}
        <g style={{ animation: "float 3s ease-in-out infinite" }}>
          <text x="130" y="50" fill="url(#gradient-z1)" fontSize="20" fontWeight="800" fontFamily="system-ui">z</text>
        </g>
        <g style={{ animation: "float 3s ease-in-out infinite 0.3s" }}>
          <text x="142" y="38" fill="url(#gradient-z2)" fontSize="15" fontWeight="700" fontFamily="system-ui">z</text>
        </g>
        <g style={{ animation: "float 3s ease-in-out infinite 0.6s" }}>
          <text x="152" y="28" fill="url(#gradient-z3)" fontSize="11" fontWeight="600" fontFamily="system-ui">z</text>
        </g>

        {/* Decorative stars with sparkle animation */}
        <g style={{ animation: "sparkle 2s ease-in-out infinite" }}>
          <circle cx="35" cy="50" r="3" fill="#F5D98E" />
          <path d="M35 46V54M31 50H39" stroke="#F5D98E" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2s ease-in-out infinite 0.5s" }}>
          <circle cx="145" cy="95" r="2.5" fill="#D4A853" />
          <path d="M145 92V98M142 95H148" stroke="#D4A853" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2s ease-in-out infinite 1s" }}>
          <circle cx="50" cy="115" r="2" fill="#F5D98E" opacity="0.8" />
        </g>

        {/* Floating particles */}
        <circle cx="40" cy="75" r="2" fill="#FDE68A" opacity="0.5" style={{ animation: "bounce-soft 2.5s ease-in-out infinite" }} />
        <circle cx="140" cy="70" r="1.5" fill="#F5D98E" opacity="0.4" style={{ animation: "bounce-soft 2.5s ease-in-out infinite 0.5s" }} />

        <defs>
          <linearGradient id="gradient-ring-notif" x1="30" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="1" stopColor="#D4A853" />
          </linearGradient>
          <linearGradient id="gradient-bg-notif" x1="30" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-bell-main" x1="58" y1="38" x2="122" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" />
            <stop offset="0.3" stopColor="#FDE68A" />
            <stop offset="0.7" stopColor="#FCD34D" />
            <stop offset="1" stopColor="#F5D98E" />
          </linearGradient>
          <linearGradient id="gradient-bell-stroke" x1="58" y1="38" x2="122" y2="110" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gradient-clapper" x1="80" y1="102" x2="100" y2="118" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="gradient-top-ball" x1="85" y1="18" x2="95" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" />
            <stop offset="1" stopColor="#D4A853" />
          </linearGradient>
          <linearGradient id="gradient-z1" x1="130" y1="30" x2="150" y2="55" gradientUnits="userSpaceOnUse">
            <stop stopColor="#94A3B8" />
            <stop offset="1" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="gradient-z2" x1="142" y1="23" x2="157" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CBD5E1" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="gradient-z3" x1="152" y1="17" x2="163" y2="33" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function NoActionsIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Background decorative shape */}
        <rect x="30" y="20" width="120" height="120" rx="20" fill="url(#gradient-bg-actions)" opacity="0.08" style={{ animation: "fadeIn 0.5s ease-out" }} />

        {/* Main clipboard with shadow */}
        <g style={{ filter: "drop-shadow(0 8px 20px rgba(212, 168, 83, 0.25))" }}>
          <rect x="50" y="30" width="80" height="100" rx="10" fill="url(#gradient-clipboard-main)" stroke="url(#gradient-clipboard-stroke)" strokeWidth="2.5" />

          {/* Clipboard shine */}
          <path
            d="M55 45C55 42 58 38 65 38"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Clipboard clip with detail */}
        <rect x="72" y="22" width="36" height="20" rx="6" fill="url(#gradient-clip)" stroke="#B8860B" strokeWidth="1.5" />
        <rect x="78" y="28" width="24" height="9" rx="3" fill="#FFFBEB" stroke="#D4A853" strokeWidth="0.5" />

        {/* Animated checklist lines */}
        <g>
          <rect x="62" y="55" width="56" height="5" rx="2.5" fill="#F5D98E" opacity="0.6" style={{ animation: "wave 3s ease-in-out infinite" }} />
          <rect x="62" y="70" width="45" height="5" rx="2.5" fill="#F5D98E" opacity="0.5" style={{ animation: "wave 3s ease-in-out infinite 0.2s" }} />
          <rect x="62" y="85" width="50" height="5" rx="2.5" fill="#F5D98E" opacity="0.4" style={{ animation: "wave 3s ease-in-out infinite 0.4s" }} />
          <rect x="62" y="100" width="38" height="5" rx="2.5" fill="#F5D98E" opacity="0.3" style={{ animation: "wave 3s ease-in-out infinite 0.6s" }} />
        </g>

        {/* Floating plus button with glow */}
        <g style={{ animation: "float 2.5s ease-in-out infinite", filter: "drop-shadow(0 4px 15px rgba(245, 158, 11, 0.4))" }}>
          <circle cx="142" cy="75" r="20" fill="url(#gradient-plus-bg)" />
          <circle cx="142" cy="75" r="16" fill="url(#gradient-plus)" />
          <path d="M142 66V84M133 75H151" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </g>

        {/* Sparkle decorations */}
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite" }}>
          <circle cx="35" cy="55" r="3" fill="#FDE68A" />
          <path d="M35 51V59M31 55H39" stroke="#F5D98E" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 0.7s" }}>
          <circle cx="145" cy="120" r="2" fill="#D4A853" />
        </g>

        {/* Floating dots */}
        <circle cx="28" cy="90" r="2" fill="#FDE68A" opacity="0.6" style={{ animation: "bounce-soft 3s ease-in-out infinite" }} />
        <circle cx="160" cy="50" r="1.5" fill="#F5D98E" opacity="0.5" style={{ animation: "bounce-soft 3s ease-in-out infinite 1s" }} />

        <defs>
          <linearGradient id="gradient-bg-actions" x1="30" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="gradient-clipboard-main" x1="50" y1="30" x2="130" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFBEB" />
            <stop offset="0.5" stopColor="#FEF9C3" />
            <stop offset="1" stopColor="#FEF3C7" />
          </linearGradient>
          <linearGradient id="gradient-clipboard-stroke" x1="50" y1="30" x2="130" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gradient-clip" x1="72" y1="22" x2="108" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gradient-plus-bg" x1="122" y1="55" x2="162" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" stopOpacity="0.3" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient-plus" x1="126" y1="59" x2="158" y2="91" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function EvaluationPendingIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Background glow effect */}
        <circle cx="80" cy="75" r="55" fill="url(#gradient-bg-eval)" opacity="0.12" />
        <circle cx="80" cy="75" r="42" fill="url(#gradient-bg-eval)" opacity="0.06" />

        {/* Magnifying glass with detailed styling */}
        <g style={{ animation: "float 4s ease-in-out infinite", filter: "drop-shadow(0 6px 15px rgba(212, 168, 83, 0.3))" }}>
          {/* Glass rim */}
          <circle cx="75" cy="65" r="35" fill="url(#gradient-glass-outer)" stroke="url(#gradient-glass-stroke)" strokeWidth="4" />

          {/* Glass inner */}
          <circle cx="75" cy="65" r="27" fill="url(#gradient-glass-inner)" />

          {/* Glass reflection */}
          <path
            d="M55 50C60 42 70 38 82 42"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M52 58C55 52 62 48 72 50"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.4"
          />

          {/* Handle with gradient */}
          <path
            d="M102 92L128 118"
            stroke="url(#gradient-handle-main)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <path
            d="M102 92L128 118"
            stroke="url(#gradient-handle-highlight)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </g>

        {/* Animated sparkles inside magnifying glass */}
        <g style={{ animation: "glow 2s ease-in-out infinite" }}>
          <path d="M70 58L72 62L76 58L72 54Z" fill="#D4A853" />
          <circle cx="65" cy="70" r="2.5" fill="#F5D98E" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 0.5s" }}>
          <path d="M82 68L83.5 71L86 68L83.5 65Z" fill="#FDE68A" />
        </g>

        {/* Floating question marks */}
        <g style={{ animation: "float 3s ease-in-out infinite" }}>
          <text x="130" y="48" fill="url(#gradient-question1)" fontSize="22" fontWeight="800" fontFamily="system-ui">?</text>
        </g>
        <g style={{ animation: "float 3s ease-in-out infinite 0.5s" }}>
          <text x="28" y="60" fill="url(#gradient-question2)" fontSize="16" fontWeight="700" fontFamily="system-ui">?</text>
        </g>
        <g style={{ animation: "float 3s ease-in-out infinite 1s" }}>
          <text x="145" y="90" fill="url(#gradient-question3)" fontSize="12" fontWeight="600" fontFamily="system-ui">?</text>
        </g>

        {/* Decorative elements */}
        <g style={{ animation: "sparkle 3s ease-in-out infinite" }}>
          <circle cx="150" cy="55" r="2.5" fill="#F5D98E" />
          <path d="M150 52V58M147 55H153" stroke="#F5D98E" strokeWidth="1" strokeLinecap="round" />
        </g>
        <circle cx="35" cy="100" r="2" fill="#D4A853" opacity="0.6" style={{ animation: "bounce-soft 2.5s ease-in-out infinite" }} />

        <defs>
          <linearGradient id="gradient-bg-eval" x1="25" y1="20" x2="135" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-glass-outer" x1="40" y1="30" x2="110" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" />
            <stop offset="0.5" stopColor="#FDE68A" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-glass-stroke" x1="40" y1="30" x2="110" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gradient-glass-inner" x1="48" y1="38" x2="102" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.9" />
            <stop offset="0.5" stopColor="#FFFBEB" stopOpacity="0.7" />
            <stop offset="1" stopColor="#FEF9C3" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="gradient-handle-main" x1="102" y1="92" x2="128" y2="118" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C99A2E" />
            <stop offset="1" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="gradient-handle-highlight" x1="102" y1="92" x2="128" y2="118" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#A67C00" />
          </linearGradient>
          <linearGradient id="gradient-question1" x1="130" y1="26" x2="152" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor="#94A3B8" />
            <stop offset="1" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="gradient-question2" x1="28" y1="44" x2="44" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#CBD5E1" />
            <stop offset="1" stopColor="#94A3B8" />
          </linearGradient>
          <linearGradient id="gradient-question3" x1="145" y1="78" x2="157" y2="94" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E2E8F0" />
            <stop offset="1" stopColor="#CBD5E1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function NoAnalysisIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Background glow */}
        <circle cx="90" cy="80" r="60" fill="url(#gradient-bg-analysis)" opacity="0.1" />
        <circle cx="90" cy="80" r="45" fill="url(#gradient-bg-analysis)" opacity="0.06" />

        {/* Brain illustration with details */}
        <g style={{ filter: "drop-shadow(0 6px 18px rgba(212, 168, 83, 0.25))" }}>
          {/* Brain shape */}
          <path
            d="M90 30C65 30 48 50 48 75C48 88 54 98 62 105C62 122 75 135 90 135C105 135 118 122 118 105C126 98 132 88 132 75C132 50 115 30 90 30Z"
            fill="url(#gradient-brain-main)"
            stroke="url(#gradient-brain-stroke)"
            strokeWidth="2.5"
          />

          {/* Brain folds - detailed */}
          <path
            d="M65 55C72 48 78 52 90 48C102 52 108 48 115 55"
            stroke="#C99A2E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M58 72C68 65 75 70 90 67C105 70 112 65 122 72"
            stroke="#C99A2E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M62 90C72 82 78 88 90 85C102 88 108 82 118 90"
            stroke="#C99A2E"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M70 105C78 98 82 102 90 100C98 102 102 98 110 105"
            stroke="#C99A2E"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />

          {/* Brain highlight */}
          <path
            d="M60 55C65 45 78 38 92 40"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>

        {/* Animated light bulb idea moment */}
        <g style={{ animation: "glow 2s ease-in-out infinite", transformOrigin: "90px 15px" }}>
          <circle cx="90" cy="15" r="10" fill="url(#gradient-bulb)" stroke="#D4A853" strokeWidth="2" />
          <path d="M90 5V0" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" />
          <path d="M80 8L76 4" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M100 8L104 4" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M75 15H70" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M105 15H110" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* "5" badge with animation */}
        <g style={{ animation: "float 3s ease-in-out infinite", filter: "drop-shadow(0 4px 10px rgba(245, 158, 11, 0.35))" }}>
          <circle cx="145" cy="50" r="18" fill="url(#gradient-five-outer)" />
          <circle cx="145" cy="50" r="14" fill="url(#gradient-five)" />
          <text x="139" y="56" fill="white" fontSize="16" fontWeight="800" fontFamily="system-ui">5</text>
        </g>

        {/* Floating question marks around brain */}
        <g opacity="0.5">
          <text x="30" y="50" fill="#94A3B8" fontSize="14" fontWeight="bold" fontFamily="system-ui" style={{ animation: "float 3.5s ease-in-out infinite" }}>?</text>
          <text x="38" y="120" fill="#CBD5E1" fontSize="11" fontWeight="bold" fontFamily="system-ui" style={{ animation: "float 3.5s ease-in-out infinite 0.5s" }}>?</text>
          <text x="140" y="110" fill="#CBD5E1" fontSize="12" fontWeight="bold" fontFamily="system-ui" style={{ animation: "float 3.5s ease-in-out infinite 1s" }}>?</text>
        </g>

        {/* Sparkle decorations */}
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite" }}>
          <circle cx="35" cy="75" r="2.5" fill="#F5D98E" />
          <path d="M35 72V78M32 75H38" stroke="#F5D98E" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 1s" }}>
          <circle cx="155" cy="85" r="2" fill="#D4A853" />
        </g>

        <defs>
          <linearGradient id="gradient-bg-analysis" x1="30" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-brain-main" x1="48" y1="30" x2="132" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFBEB" />
            <stop offset="0.4" stopColor="#FEF9C3" />
            <stop offset="0.8" stopColor="#FDE68A" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-brain-stroke" x1="48" y1="30" x2="132" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
          <linearGradient id="gradient-bulb" x1="80" y1="5" x2="100" y2="25" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="gradient-five-outer" x1="127" y1="32" x2="163" y2="68" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FDE68A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#F59E0B" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient-five" x1="131" y1="36" x2="159" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="1" stopColor="#D97706" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function NoResultsIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Background */}
        <circle cx="90" cy="80" r="55" fill="url(#gradient-bg-results)" opacity="0.1" />

        {/* Filter/Funnel with detail */}
        <g style={{ filter: "drop-shadow(0 6px 15px rgba(212, 168, 83, 0.25))" }}>
          <path
            d="M50 30H130L105 70V100L75 115V70L50 30Z"
            fill="url(#gradient-funnel-main)"
            stroke="url(#gradient-funnel-stroke)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Funnel highlight */}
          <path
            d="M58 35L72 35"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <path
            d="M65 50L80 65"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.3"
          />

          {/* Filter lines inside */}
          <path d="M65 42H115" stroke="#D4A853" strokeWidth="1" opacity="0.4" />
          <path d="M72 52H108" stroke="#D4A853" strokeWidth="1" opacity="0.3" />
        </g>

        {/* Animated X mark with glow */}
        <g style={{ animation: "float 3s ease-in-out infinite", filter: "drop-shadow(0 3px 10px rgba(239, 68, 68, 0.3))" }}>
          <circle cx="140" cy="90" r="20" fill="#FEE2E2" stroke="#FECACA" strokeWidth="2" />
          <circle cx="140" cy="90" r="15" fill="#FEF2F2" />
          <path d="M132 82L148 98M148 82L132 98" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Empty droplets with animation */}
        <g style={{ animation: "bounce-soft 2s ease-in-out infinite" }}>
          <ellipse cx="90" cy="130" rx="5" ry="4" fill="#D4A853" opacity="0.6" />
        </g>
        <g style={{ animation: "bounce-soft 2s ease-in-out infinite 0.3s" }}>
          <ellipse cx="78" cy="138" rx="3.5" ry="2.5" fill="#F5D98E" opacity="0.5" />
        </g>
        <g style={{ animation: "bounce-soft 2s ease-in-out infinite 0.6s" }}>
          <ellipse cx="102" cy="136" rx="3" ry="2" fill="#FDE68A" opacity="0.4" />
        </g>

        {/* Decorative sparkles */}
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite" }}>
          <circle cx="35" cy="55" r="2.5" fill="#F5D98E" />
          <path d="M35 52V58M32 55H38" stroke="#F5D98E" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 0.8s" }}>
          <circle cx="155" cy="50" r="2" fill="#D4A853" />
        </g>

        {/* Floating particles */}
        <circle cx="40" cy="85" r="2" fill="#FDE68A" opacity="0.5" style={{ animation: "bounce-soft 3s ease-in-out infinite 0.5s" }} />
        <circle cx="160" cy="70" r="1.5" fill="#F5D98E" opacity="0.4" style={{ animation: "bounce-soft 3s ease-in-out infinite 1s" }} />

        <defs>
          <linearGradient id="gradient-bg-results" x1="35" y1="25" x2="145" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-funnel-main" x1="50" y1="30" x2="130" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFBEB" />
            <stop offset="0.4" stopColor="#FEF9C3" />
            <stop offset="0.8" stopColor="#FDE68A" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-funnel-stroke" x1="50" y1="30" x2="130" y2="115" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function NoWhysIllustration() {
  return (
    <div className="relative">
      <style>{animationStyles}</style>
      <svg
        width="180"
        height="160"
        viewBox="0 0 180 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* Background rings */}
        <circle cx="90" cy="80" r="60" fill="url(#gradient-bg-whys)" opacity="0.08" />
        <circle cx="90" cy="80" r="45" fill="url(#gradient-bg-whys)" opacity="0.05" />

        {/* Tree trunk */}
        <g style={{ filter: "drop-shadow(0 4px 12px rgba(212, 168, 83, 0.2))" }}>
          <rect x="82" y="90" width="16" height="45" rx="4" fill="url(#gradient-trunk)" stroke="#B8860B" strokeWidth="1.5" />
          <rect x="85" y="95" width="3" height="35" rx="1.5" fill="#C99A2E" opacity="0.4" />
        </g>

        {/* Tree branches - representing 5 whys */}
        <g style={{ animation: "fadeIn 0.5s ease-out" }}>
          {/* Branch 1 */}
          <g style={{ animation: "wave 4s ease-in-out infinite" }}>
            <path d="M90 90C90 75 70 65 55 55" stroke="url(#gradient-branch)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="52" cy="52" r="12" fill="url(#gradient-leaf)" stroke="#D4A853" strokeWidth="2" />
            <text x="47" y="57" fill="#8B6914" fontSize="14" fontWeight="800" fontFamily="system-ui">1</text>
          </g>

          {/* Branch 2 */}
          <g style={{ animation: "wave 4s ease-in-out infinite 0.2s" }}>
            <path d="M90 88C90 70 110 58 128 48" stroke="url(#gradient-branch)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="132" cy="45" r="12" fill="url(#gradient-leaf)" stroke="#D4A853" strokeWidth="2" />
            <text x="127" y="50" fill="#8B6914" fontSize="14" fontWeight="800" fontFamily="system-ui">2</text>
          </g>

          {/* Branch 3 - center */}
          <g style={{ animation: "wave 4s ease-in-out infinite 0.4s" }}>
            <path d="M90 90C90 68 90 50 90 35" stroke="url(#gradient-branch)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="90" cy="28" r="14" fill="url(#gradient-leaf-main)" stroke="#C99A2E" strokeWidth="2.5" />
            <text x="85" y="34" fill="#8B6914" fontSize="15" fontWeight="800" fontFamily="system-ui">3</text>
          </g>

          {/* Branch 4 */}
          <g style={{ animation: "wave 4s ease-in-out infinite 0.6s" }}>
            <path d="M85 92C78 78 58 75 42 72" stroke="url(#gradient-branch)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="38" cy="72" r="10" fill="url(#gradient-leaf-dim)" stroke="#D4A853" strokeWidth="1.5" opacity="0.7" />
            <text x="34" y="77" fill="#A67C00" fontSize="12" fontWeight="700" fontFamily="system-ui">4</text>
          </g>

          {/* Branch 5 */}
          <g style={{ animation: "wave 4s ease-in-out infinite 0.8s" }}>
            <path d="M95 92C102 78 122 75 138 72" stroke="url(#gradient-branch)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <circle cx="142" cy="72" r="10" fill="url(#gradient-leaf-dim)" stroke="#D4A853" strokeWidth="1.5" opacity="0.6" />
            <text x="138" y="77" fill="#A67C00" fontSize="12" fontWeight="700" fontFamily="system-ui">5</text>
          </g>
        </g>

        {/* Sparkles */}
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite" }}>
          <circle cx="68" cy="35" r="2" fill="#FDE68A" />
          <path d="M68 32V38M65 35H71" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 0.7s" }}>
          <circle cx="112" cy="30" r="1.5" fill="#F5D98E" />
        </g>
        <g style={{ animation: "sparkle 2.5s ease-in-out infinite 1.4s" }}>
          <circle cx="155" cy="58" r="2" fill="#D4A853" />
        </g>

        {/* Ground line */}
        <path d="M45 135C60 132 120 132 135 135" stroke="#D4A853" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

        <defs>
          <linearGradient id="gradient-bg-whys" x1="30" y1="20" x2="150" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF3C7" />
            <stop offset="1" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="gradient-trunk" x1="82" y1="90" x2="98" y2="135" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A853" />
            <stop offset="1" stopColor="#A67C00" />
          </linearGradient>
          <linearGradient id="gradient-branch" x1="50" y1="40" x2="130" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#C99A2E" />
            <stop offset="1" stopColor="#8B6914" />
          </linearGradient>
          <linearGradient id="gradient-leaf" x1="40" y1="40" x2="65" y2="65" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="gradient-leaf-main" x1="76" y1="14" x2="104" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFBEB" />
            <stop offset="0.5" stopColor="#FEF9C3" />
            <stop offset="1" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="gradient-leaf-dim" x1="28" y1="62" x2="52" y2="82" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FEF9C3" stopOpacity="0.8" />
            <stop offset="1" stopColor="#FDE68A" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

const illustrations = {
  "no-notifications": NoNotificationsIllustration,
  "no-actions": NoActionsIllustration,
  "evaluation-pending": EvaluationPendingIllustration,
  "no-analysis": NoAnalysisIllustration,
  "no-results": NoResultsIllustration,
  "no-whys": NoWhysIllustration,
};

export function EmptyState({
  type,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  const Illustration = illustrations[type];

  return (
    <div className={cn(
      "text-center py-10 px-6",
      "animate-in fade-in-0 duration-500",
      className
    )}>
      <div className="mb-6 transform transition-transform hover:scale-105 duration-300">
        <Illustration />
      </div>
      <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-5 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          size="sm"
          className="
            border-2 border-amber-300 text-amber-700 font-medium
            hover:bg-amber-50 hover:border-amber-400 hover:shadow-md
            dark:border-amber-600 dark:text-amber-300 dark:hover:bg-amber-900/30
            transition-all duration-300 transform hover:scale-105
            shadow-sm
          "
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Export individual illustrations for custom usage
export {
  NoNotificationsIllustration,
  NoActionsIllustration,
  EvaluationPendingIllustration,
  NoAnalysisIllustration,
  NoResultsIllustration,
  NoWhysIllustration,
};
