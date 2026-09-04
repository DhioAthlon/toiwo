"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import { categories, projects } from "@/lib/data";

export function ProjectsGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-5 py-2 text-xs uppercase tracking-[0.15em] border transition-colors ${
              active === cat
                ? "bg-ink text-paper border-ink"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
