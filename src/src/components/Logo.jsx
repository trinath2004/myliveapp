export default function Logo({ size = 64 }) {
  return (
    <div className="logo" aria-label="MTS logo">
      <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="mtsG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#22d3ee" />
            <stop offset="0.5" stopColor="#818cf8" />
            <stop offset="1" stopColor="#f472b6" />
          </linearGradient>
        </defs>
        <polygon
          points="32,3 58,18 58,46 32,61 6,46 6,18"
          fill="rgba(255,255,255,.08)"
          stroke="url(#mtsG)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M17 42V23l7.5 10L32 23l7.5 10L47 23v19"
          fill="none"
          stroke="url(#mtsG)"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="50" r="2.6" fill="url(#mtsG)" />
      </svg>
      <div className="logo-text">
        <span className="logo-word">MTS</span>
        <span className="logo-sub">Taste · Shop · Explore</span>
      </div>
    </div>
  );
}
