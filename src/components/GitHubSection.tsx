"use client";

import { portfolioData } from "@/data/portfolioData";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SectionReveal, StaggerContainer, staggerItem } from "@/components/SectionReveal";
import { motion } from "motion/react";

export function GitHubSection() {
  const verifiedRepos = portfolioData.projects.filter(
    (p) => p.isVerified && p.id !== "developer-portfolio"
  );

  return (
    <section id="github" className="scroll-mt-20 py-24 sm:py-32 relative bg-card/20">
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left */}
          <SectionReveal className="lg:col-span-5" direction="left">
            <div className="section-label mb-5">
              <span>Open Source</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-5">
              Verified
              <br />
              <span className="text-primary">repositories</span>.
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
              I publish full-stack architectures, API implementations, and
              defensive security tooling openly on GitHub under{" "}
              <code className="font-mono text-foreground font-semibold px-1 py-0.5 rounded bg-muted text-xs">
                {portfolioData.personal.handle}
              </code>
              .
            </p>

            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all duration-250 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <GitHubIcon className="w-4 h-4" />
              <span>github.com/{portfolioData.personal.handle}</span>
              <ArrowUpRight className="w-4 h-4 opacity-60 transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </SectionReveal>

          {/* Right: Repo Cards */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.1}>
              <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Verified Public Repositories
              </div>
            </SectionReveal>

            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {verifiedRepos.map((repo) => (
                <motion.a
                  key={repo.id}
                  variants={staggerItem}
                  href={repo.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-label="GITHUB"
                  className="block p-5 rounded-lg border border-border bg-card/30 card-interactive group"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-muted-foreground group-hover:text-primary transition-colors shrink-0">
                        <GitHubIcon className="w-4 h-4" />
                      </span>
                      <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                        {portfolioData.personal.handle}/{repo.title}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/20 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed line-clamp-2">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {repo.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-muted/60 text-muted-foreground tracking-wider"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1 text-primary text-xs font-mono font-medium group-hover:underline shrink-0">
                      <span>Inspect</span>
                      <ArrowUpRight className="w-3 h-3 transition-transform duration-250 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </motion.a>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
