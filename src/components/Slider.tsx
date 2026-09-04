"use client";

import { useCallback, useEffect, useState } from "react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ArrowIcon } from "@/components/icons";

export function Slider({
  count,
  toneStart = 0,
  aspect = "aspect-[4/5]",
  labelPrefix = "Foto",
  autoPlayMs,
}: {
  count: number;
  toneStart?: number;
  aspect?: string;
  labelPrefix?: string;
  autoPlayMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const slides = Array.from({ length: count }, (_, i) => i);

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => (prev + dir + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (!autoPlayMs) return;
    const id = setInterval(() => go(1), autoPlayMs);
    return () => clearInterval(id);
  }, [autoPlayMs, go]);

  return (
    <div className="relative w-full">
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((i) => (
            <div key={i} className="h-full w-full flex-shrink-0">
              <PlaceholderImage
                tone={toneStart + i}
                label={`${labelPrefix} ${i + 1} / ${count}`}
                className="h-full w-full"
                iconClassName="h-10 w-10"
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <>
            <button
              aria-label="Sebelumnya"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 backdrop-blur-sm hover:bg-paper transition-colors"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              aria-label="Berikutnya"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-paper/80 backdrop-blur-sm hover:bg-paper transition-colors"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-4 flex items-center justify-center gap-2">
          {slides.map((i) => (
            <button
              key={i}
              aria-label={`Ke slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
