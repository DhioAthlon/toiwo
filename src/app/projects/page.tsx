import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectsGrid } from "./ProjectsGrid";
import { getProjects } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Projects",
  description: "Koleksi karya foto pernikahan, prewedding, dan keluarga.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-24 md:pt-40 md:pb-32">
      <SectionHeading kicker="Portofolio" title="Projects" className="mb-4" />
      <p className="text-muted max-w-lg mb-14">
        Setiap sesi adalah cerita yang berbeda. Jelajahi karya kami berdasarkan
        kategori di bawah ini.
      </p>
      <ProjectsGrid projects={projects} />
    </div>
  );
}
