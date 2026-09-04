// Stand-in for real photography until actual assets are supplied.
// Swap this out for `next/image` once files exist in /public/images.

const TONES = [
  "from-stone-300 via-stone-200 to-stone-100",
  "from-neutral-400 via-neutral-300 to-neutral-200",
  "from-amber-100 via-stone-200 to-stone-300",
  "from-stone-400 via-stone-300 to-stone-200",
  "from-zinc-400 via-zinc-300 to-zinc-200",
];

export function PlaceholderImage({
  tone = 0,
  label,
  className = "",
  iconClassName = "h-8 w-8",
}: {
  tone?: number;
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  const gradient = TONES[tone % TONES.length];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className={`${iconClassName} text-ink/25`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 8a2 2 0 0 1 2-2h1.5l1-1.5h7l1 1.5H18a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"
        />
        <circle cx="12" cy="12.5" r="3.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label ? (
        <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.18em] text-ink/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
