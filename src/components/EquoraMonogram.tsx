import React from 'react';

interface MonogramProps {
  className?: string;
  size?: number;
  strokeWidth?: number;
}

/**
 * Equora Monogram
 * A stylized luxury "E" interwoven with a noble horseshoe curve.
 */
export const EquoraMonogram: React.FC<MonogramProps> = ({
  className = 'text-[#1A3326] dark:text-[#E8E2D5]',
  size = 40,
  strokeWidth = 2.2
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Horseshoe Arc */}
      <path
        d="M13 36 C 8 28, 8 18, 14 11 C 20 5, 28 5, 34 11 C 40 18, 40 28, 35 36"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Distinctive Horseshoe Stud Accents */}
      <circle cx="12" cy="27" r="1.3" fill="currentColor" />
      <circle cx="11" cy="19" r="1.3" fill="currentColor" />
      <circle cx="36" cy="27" r="1.3" fill="currentColor" />
      <circle cx="37" cy="19" r="1.3" fill="currentColor" />

      {/* Modern Equestrian Central E Monogram */}
      <path
        d="M20 16 H31 M20 16 V32 M20 24 H28 M20 32 H31"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
