"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  type: "no-notifications" | "no-actions" | "evaluation-pending" | "no-analysis" | "no-results";
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

// Beautiful SVG illustrations for each empty state
function NoNotificationsIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background shapes */}
      <circle cx="80" cy="70" r="50" fill="url(#gradient-bg-notif)" opacity="0.15" />
      <circle cx="80" cy="70" r="35" fill="url(#gradient-bg-notif)" opacity="0.1" />

      {/* Bell body */}
      <path
        d="M80 30C65 30 53 42 53 57V75C53 78 51 81 48 83H112C109 81 107 78 107 75V57C107 42 95 30 80 30Z"
        fill="url(#gradient-bell)"
        stroke="#D4A853"
        strokeWidth="2"
      />

      {/* Bell clapper */}
      <circle cx="80" cy="95" r="8" fill="#F5D98E" stroke="#D4A853" strokeWidth="2" />

      {/* Bell top */}
      <path
        d="M80 30V22"
        stroke="#D4A853"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="80" cy="19" r="4" fill="#D4A853" />

      {/* Sleeping Zs */}
      <g className="animate-pulse">
        <text x="115" y="45" fill="#94A3B8" fontSize="16" fontWeight="bold" fontFamily="sans-serif">z</text>
        <text x="125" y="35" fill="#CBD5E1" fontSize="12" fontWeight="bold" fontFamily="sans-serif">z</text>
        <text x="133" y="28" fill="#E2E8F0" fontSize="9" fontWeight="bold" fontFamily="sans-serif">z</text>
      </g>

      {/* Decorative stars */}
      <circle cx="35" cy="45" r="2" fill="#F5D98E" opacity="0.6" />
      <circle cx="125" cy="85" r="2" fill="#F5D98E" opacity="0.6" />
      <circle cx="45" cy="95" r="1.5" fill="#D4A853" opacity="0.5" />

      {/* Subtle sparkles */}
      <path d="M30 70L32 73L35 70L32 67Z" fill="#F5D98E" opacity="0.7" />
      <path d="M130 60L131.5 62.5L134 60L131.5 57.5Z" fill="#F5D98E" opacity="0.5" />

      <defs>
        <linearGradient id="gradient-bg-notif" x1="30" y1="20" x2="130" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-bell" x1="53" y1="30" x2="107" y2="95" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF9C3" />
          <stop offset="0.5" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F5D98E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NoActionsIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background shapes */}
      <rect x="30" y="25" width="100" height="90" rx="12" fill="url(#gradient-bg-actions)" opacity="0.1" />

      {/* Clipboard */}
      <rect x="45" y="35" width="70" height="85" rx="8" fill="url(#gradient-clipboard)" stroke="#D4A853" strokeWidth="2" />

      {/* Clipboard clip */}
      <rect x="65" y="28" width="30" height="16" rx="4" fill="#D4A853" />
      <rect x="70" y="32" width="20" height="8" rx="2" fill="#FEF9C3" />

      {/* Empty lines on clipboard */}
      <rect x="55" y="55" width="50" height="4" rx="2" fill="#F5D98E" opacity="0.5" />
      <rect x="55" y="67" width="40" height="4" rx="2" fill="#F5D98E" opacity="0.4" />
      <rect x="55" y="79" width="45" height="4" rx="2" fill="#F5D98E" opacity="0.3" />
      <rect x="55" y="91" width="35" height="4" rx="2" fill="#F5D98E" opacity="0.2" />

      {/* Plus icon floating */}
      <g className="animate-bounce">
        <circle cx="125" cy="70" r="16" fill="url(#gradient-plus)" />
        <path d="M125 62V78M117 70H133" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Decorative elements */}
      <circle cx="35" cy="50" r="2" fill="#F5D98E" opacity="0.6" />
      <circle cx="130" cy="105" r="2" fill="#F5D98E" opacity="0.6" />
      <path d="M25 80L27 83L30 80L27 77Z" fill="#D4A853" opacity="0.5" />

      <defs>
        <linearGradient id="gradient-bg-actions" x1="30" y1="25" x2="130" y2="115" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-clipboard" x1="45" y1="35" x2="115" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEB" />
          <stop offset="1" stopColor="#FEF9C3" />
        </linearGradient>
        <linearGradient id="gradient-plus" x1="109" y1="54" x2="141" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function EvaluationPendingIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background glow */}
      <circle cx="80" cy="70" r="50" fill="url(#gradient-bg-eval)" opacity="0.15" />

      {/* Magnifying glass body */}
      <circle cx="70" cy="60" r="30" fill="url(#gradient-glass)" stroke="#D4A853" strokeWidth="3" />
      <circle cx="70" cy="60" r="22" fill="white" fillOpacity="0.3" stroke="#F5D98E" strokeWidth="1" />

      {/* Handle */}
      <path
        d="M92 82L115 105"
        stroke="url(#gradient-handle)"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* Sparkles inside magnifying glass */}
      <g className="animate-pulse">
        <path d="M65 55L67 58L70 55L67 52Z" fill="#D4A853" />
        <path d="M75 60L76.5 62.5L79 60L76.5 57.5Z" fill="#F5D98E" />
        <circle cx="62" cy="65" r="2" fill="#D4A853" opacity="0.7" />
      </g>

      {/* Question marks floating */}
      <text x="115" y="45" fill="#CBD5E1" fontSize="18" fontWeight="bold" fontFamily="sans-serif">?</text>
      <text x="28" y="55" fill="#E2E8F0" fontSize="14" fontWeight="bold" fontFamily="sans-serif">?</text>

      {/* Decorative dots */}
      <circle cx="130" cy="80" r="2" fill="#F5D98E" opacity="0.6" />
      <circle cx="35" cy="90" r="1.5" fill="#D4A853" opacity="0.5" />

      <defs>
        <linearGradient id="gradient-bg-eval" x1="30" y1="20" x2="130" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-glass" x1="40" y1="30" x2="100" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF9C3" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-handle" x1="92" y1="82" x2="115" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D4A853" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NoAnalysisIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background */}
      <circle cx="80" cy="70" r="55" fill="url(#gradient-bg-analysis)" opacity="0.1" />

      {/* Brain outline */}
      <path
        d="M80 25C60 25 45 40 45 60C45 70 50 78 55 82C55 95 65 105 80 105C95 105 105 95 105 82C110 78 115 70 115 60C115 40 100 25 80 25Z"
        fill="url(#gradient-brain)"
        stroke="#D4A853"
        strokeWidth="2"
      />

      {/* Brain details */}
      <path
        d="M65 50C70 45 75 48 80 45C85 48 90 45 95 50"
        stroke="#D4A853"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 65C68 60 72 65 80 62C88 65 92 60 100 65"
        stroke="#D4A853"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M65 80C72 75 75 80 80 77C85 80 88 75 95 80"
        stroke="#D4A853"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Light bulb on top */}
      <g className="animate-pulse">
        <circle cx="80" cy="15" r="8" fill="#FEF9C3" stroke="#D4A853" strokeWidth="1.5" />
        <path d="M80 8V5" stroke="#D4A853" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M73 10L70 7" stroke="#D4A853" strokeWidth="1" strokeLinecap="round" />
        <path d="M87 10L90 7" stroke="#D4A853" strokeWidth="1" strokeLinecap="round" />
      </g>

      {/* "5" badge */}
      <circle cx="125" cy="45" r="14" fill="url(#gradient-five)" />
      <text x="120" y="51" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">5</text>

      {/* Floating question marks */}
      <g opacity="0.4">
        <text x="35" y="45" fill="#94A3B8" fontSize="12" fontWeight="bold" fontFamily="sans-serif">?</text>
        <text x="40" y="100" fill="#CBD5E1" fontSize="10" fontWeight="bold" fontFamily="sans-serif">?</text>
        <text x="120" y="95" fill="#CBD5E1" fontSize="10" fontWeight="bold" fontFamily="sans-serif">?</text>
      </g>

      <defs>
        <linearGradient id="gradient-bg-analysis" x1="25" y1="15" x2="135" y2="125" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-brain" x1="45" y1="25" x2="115" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEB" />
          <stop offset="0.5" stopColor="#FEF9C3" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-five" x1="111" y1="31" x2="139" y2="59" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D97706" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NoResultsIllustration() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto"
    >
      {/* Background */}
      <circle cx="80" cy="70" r="50" fill="url(#gradient-bg-results)" opacity="0.12" />

      {/* Filter/Funnel */}
      <path
        d="M50 35H110L90 65V90L70 100V65L50 35Z"
        fill="url(#gradient-funnel)"
        stroke="#D4A853"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Cross mark */}
      <g className="animate-pulse">
        <circle cx="115" cy="85" r="15" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="2" />
        <path d="M109 79L121 91M121 79L109 91" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* Empty droplets */}
      <g opacity="0.3">
        <circle cx="80" cy="115" r="4" fill="#D4A853" />
        <circle cx="70" cy="122" r="2.5" fill="#F5D98E" />
        <circle cx="90" cy="120" r="2" fill="#F5D98E" />
      </g>

      {/* Decorative elements */}
      <circle cx="35" cy="50" r="2" fill="#F5D98E" opacity="0.6" />
      <circle cx="130" cy="45" r="2" fill="#F5D98E" opacity="0.5" />
      <path d="M40 75L42 78L45 75L42 72Z" fill="#D4A853" opacity="0.4" />

      <defs>
        <linearGradient id="gradient-bg-results" x1="30" y1="20" x2="130" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
        <linearGradient id="gradient-funnel" x1="50" y1="35" x2="110" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFBEB" />
          <stop offset="0.5" stopColor="#FEF9C3" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const illustrations = {
  "no-notifications": NoNotificationsIllustration,
  "no-actions": NoActionsIllustration,
  "evaluation-pending": EvaluationPendingIllustration,
  "no-analysis": NoAnalysisIllustration,
  "no-results": NoResultsIllustration,
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
    <div className={cn("text-center py-8", className)}>
      <div className="mb-4">
        <Illustration />
      </div>
      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-4">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          variant="outline"
          size="sm"
          className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
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
};
