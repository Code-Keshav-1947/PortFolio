"use client";

import { useState } from "react";
import { portfolioData, Project } from "@/data/portfolioData";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ExternalLink, CheckCircle2, Bookmark, ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { motion, AnimatePresence } from "motion/react";
import { ProjectTiltCard } from "@/components/3d/ProjectTiltCard";
import { LUXURY_EASE } from "@/lib/animation";

export function Projects() {
  const [filter, setFilter] = useState<"all" | "verified" | "placeholders">("all");

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (filter === "verified") return project.isVerified;
    if (filter === "placeholders") return !project.isVerified;
    return true;
  });

  // Split into featured (first verified) and rest
  const featuredProject = filteredProjects.find((p) => p.isVerified && p.id !== "developer-portfolio");
  const otherProjects = filteredProjects.filter((p) => p !== featuredProject);

  return (
    <section id="projects" className="scroll-mt-20 py-24 sm:py-32 relative bg-card/20">
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
            <div className="max-w-2xl">
              <div className="section-label mb-5">
                <span>Featured Work</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                Projects & Engineering
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed">
                Authentic projects from verified GitHub repositories alongside
                structured placeholders for ongoing research.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center p-1 rounded-lg bg-card/60 border border-border text-xs self-start lg:self-end">
              {(
                [
                  { key: "all", label: `All (${portfolioData.projects.length})` },
                  { key: "verified", label: `Verified (${portfolioData.projects.filter((p) => p.isVerified).length})` },
                  { key: "placeholders", label: `Placeholders (${portfolioData.projects.filter((p) => !p.isVerified).length})` },
                ] as const
              ).map((tab) => {
                const isActive = filter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setFilter(tab.key)}
                    className={`relative px-3 py-1.5 rounded-md font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="project-tab"
                        className="absolute inset-0 bg-primary rounded-md"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: LUXURY_EASE }}
          >
            {/* Featured Project — Full Width */}
            {featuredProject && (
              <div className="mb-8">
                <ProjectCard project={featuredProject} featured />
              </div>
            )}

            {/* Other Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Customization Hint */}
        <SectionReveal delay={0.2}>
          <div className="mt-14 p-5 rounded-lg border border-dashed border-border bg-card/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-primary/10 text-primary font-bold border-l-2 border-primary">
                INFO
              </span>
              <span>
                All project data is maintained in{" "}
                <code className="font-mono text-foreground font-semibold px-1 py-0.5 rounded bg-muted text-xs">
                  portfolioData.ts
                </code>
              </span>
            </div>
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-xs text-primary hover:underline link-underline"
            >
              <span>View All Repositories</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}

/* ─── Project Card Component ─── */
function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <ProjectTiltCard
      featured={featured}
      maxTilt={featured ? 5 : 7}
      className={`group flex flex-col justify-between rounded-lg border transition-all duration-300 ${
        featured ? "p-7 sm:p-8" : "p-6"
      } ${
        project.isVerified
          ? "border-border bg-card/40 card-interactive"
          : "border-dashed border-border/60 bg-card/20 card-interactive"
      }`}
    >
      <div>
        {/* Header: Category + Status */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-sm bg-primary/10 text-primary border-l-2 border-primary uppercase tracking-wider">
            {project.category}
          </span>

          {project.isVerified ? (
            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              <span>{project.statusText || "Verified"}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-sm border border-amber-500/20">
              <Bookmark className="w-3 h-3" />
              <span>Placeholder</span>
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className={`font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-250 ${featured ? "text-2xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="text-xs font-mono text-muted-foreground mb-3 tracking-wide">
          {project.tagline}
        </p>

        {/* Description */}
        <p className={`text-sm text-foreground/80 leading-relaxed mb-5 ${featured ? "max-w-3xl" : ""}`}>
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70 mb-3 font-semibold">
            Key Features
          </h4>
          <ul className={`space-y-1.5 ${featured ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 space-y-0" : ""}`}>
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="text-xs text-muted-foreground flex items-start gap-2 leading-snug"
              >
                <span className="text-primary mt-0.5 shrink-0">—</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/40 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-muted/60 text-muted-foreground border border-border/30 tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="CODE"
            className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold border border-border bg-background/60 hover:bg-background hover:border-primary/30 text-foreground transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <GitHubIcon className="w-3.5 h-3.5" />
            <span>Source Code</span>
            <ArrowUpRight className="w-3 h-3 text-muted-foreground transition-transform duration-250 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>

          {project.liveUrl && project.liveUrl !== "#" ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-label="LIVE"
              className="group/link inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all duration-250"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="text-[10px] text-muted-foreground italic font-mono">
              {project.isVerified ? "Repository active" : "Add live URL in portfolioData.ts"}
            </span>
          )}
        </div>
      </div>
    </ProjectTiltCard>
  );
}
