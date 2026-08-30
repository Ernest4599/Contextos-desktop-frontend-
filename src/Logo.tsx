function Logo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M75 30 A38 38 0 1 0 75 70"
        className="stroke-slate-900 dark:stroke-white"
        strokeWidth="10"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="68" y="42" width="10" height="16" rx="5" fill="#2563eb" />
    </svg>
  )
}

export default Logo
