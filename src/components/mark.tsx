export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M10.5 19.5c0-5.2 3.4-9 5.5-9s5.5 3.8 5.5 9c0 2.4-1.2 4-2.6 4.8-.8.5-1.8.7-2.9.7s-2.1-.2-2.9-.7c-1.4-.8-2.6-2.4-2.6-4.8Z"
        fill="var(--color-primary-foreground)"
        opacity="0.95"
      />
      <path
        d="M16 8.5c.2 2.2-.2 4.4-1.4 6.2"
        stroke="var(--color-primary)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
