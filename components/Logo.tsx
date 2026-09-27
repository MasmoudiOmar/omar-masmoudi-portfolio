import React from 'react';

/**
 * The mark: a trajectory inside a seal.
 *
 * Four nodes rising along a path — the shape of an agent run, which is what
 * Omar spends his time reading. Reads as a monogram stroke at small sizes and
 * as instrumentation up close. The final node is the accent, because that is
 * the one you actually care about: where the run ended up.
 *
 * On hover the path redraws itself, left to right.
 */
const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Omar Masmoudi"
    className={`logo ${className}`}
  >
    <circle cx="20" cy="20" r="18.5" stroke="currentColor" strokeWidth="1.75" opacity="0.9" />

    <path
      className="logo-path"
      d="M10.5 26 L16.5 19.5 L23 22.5 L29.5 12.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle cx="10.5" cy="26" r="1.7" fill="currentColor" />
    <circle cx="16.5" cy="19.5" r="1.7" fill="currentColor" />
    <circle cx="23" cy="22.5" r="1.7" fill="currentColor" />
    <circle className="logo-dot" cx="29.5" cy="12.5" r="3" fill="#D9420C" />
  </svg>
);

export default Logo;
