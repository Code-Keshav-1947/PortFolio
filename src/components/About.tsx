"use client";

import { portfolioData } from "@/data/portfolioData";
import { Terminal, Shield, Compass } from "lucide-react";
import { SectionReveal, StaggerContainer, staggerItem } from "@/components/SectionReveal";
import { motion } from "motion/react";

export function About() {
  const icons = [Terminal, Shield, Compass];

  return (
    <section id="about" className="scroll-mt-20 py-24 sm:py-32 relative">
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left: Narrative */}
          <SectionReveal className="lg:col-span-5" direction="left">
            <div className="section-label mb-6">
              <span>About & Approach</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-8">
              Engineering with
              <br />
              <span className="text-primary">curiosity</span> &{" "}
              <span className="text-accent-foreground">first principles</span>.
            </h2>

            <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-[1.75]">
              {portfolioData.personal.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Location Card */}
            <div className="mt-10 p-5 rounded-lg border border-border bg-card/40">
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-mono text-[10px] text-primary font-semibold uppercase tracking-[0.12em]">
                  Location
                </span>
                <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                  UTC+5:30
                </span>
              </div>
              <div className="text-sm font-medium text-foreground">
                {portfolioData.personal.location}
              </div>
              <div className="text-xs text-muted-foreground mt-1.5">
                Open to asynchronous collaboration and global remote teams.
              </div>
            </div>
          </SectionReveal>

          {/* Right: Principles */}
          <div className="lg:col-span-7">
            <SectionReveal delay={0.1}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-6 pl-1">
                Core Technical Principles
              </h3>
            </SectionReveal>

            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {portfolioData.personal.principles.map((principle, index) => {
                const IconComponent = icons[index % icons.length];
                return (
                  <motion.div
                    key={principle.title}
                    variants={staggerItem}
                    className="group p-6 rounded-lg border border-border bg-card/40 card-interactive"
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 text-primary shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-base font-semibold text-foreground mb-2">
                          {principle.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {principle.description}
                        </p>
                      </div>
                    </div>

                    {/* Index number */}
                    <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                      <span className="font-mono text-[10px] text-muted-foreground tracking-wider">
                        Principle {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
