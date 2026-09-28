export default function Logo({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ms-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgb(var(--brand))" />
          <stop offset="1" stopColor="rgb(var(--brand-hover))" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#ms-logo-g)" />
      <circle cx="16" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="16" cy="16" r="2.5" fill="#fff" />
    </svg>
  )
}
