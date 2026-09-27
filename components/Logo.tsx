import React from 'react';

/**
 * The mark: a colophon.
 *
 * A solid disc with the monogram knocked out of it, the way a publisher stamps
 * a book — which suits an editorial page far better than a thin line glyph,
 * and keeps a readable silhouette down to favicon size where strokes vanish.
 * The accent notch sits on the rim as a fixed point of reference; on hover it
 * travels once around the disc.
 */
const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Omar Masmoudi"
    className={`logo ${className}`}
  >
    <defs>
      {/* Knock the letters out of the disc rather than drawing them on top,
          so the mark stays one solid shape. */}
      <mask id="om-knockout">
        <rect width="48" height="48" fill="white" />
        <text
          x="24"
          y="32.5"
          textAnchor="middle"
          fontFamily="'Instrument Serif', Georgia, serif"
          fontSize="25"
          fontStyle="italic"
          fill="black"
        >
          om
        </text>
      </mask>
    </defs>

    <circle cx="24" cy="24" r="22" fill="currentColor" mask="url(#om-knockout)" />

    <g className="logo-orbit">
      <circle cx="24" cy="2.5" r="4" fill="#C23A0A" />
    </g>
  </svg>
);

export default Logo;
