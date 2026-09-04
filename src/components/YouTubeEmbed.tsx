"use client";

import { useState } from "react";
import { PlayIcon } from "@/components/icons";

/**
 * Click-to-play YouTube facade: shows the video's own thumbnail (fetched
 * directly from YouTube, no API key needed) and only loads the real iframe
 * once clicked, so a page full of film cards doesn't load N embedded players
 * up front.
 */
export function YouTubeEmbed({
  youtubeId,
  className = "",
}: {
  youtubeId: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative ${className}`}>
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Putar video"
      className={`group relative block w-full ${className}`}
    >
      {/* hqdefault always exists; maxresdefault doesn't for every video */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper/85 backdrop-blur-sm transition-transform group-hover:scale-110">
          <PlayIcon className="h-6 w-6 translate-x-0.5" />
        </span>
      </div>
    </button>
  );
}
