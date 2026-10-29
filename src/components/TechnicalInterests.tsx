"use client";

import { portfolioData, TechnicalInterest } from "@/data/portfolioData";
import { Binary, Atom, ShieldCheck, Compass } from "lucide-react";
import { SectionReveal, StaggerContainer, staggerItem } from "@/components/SectionReveal";
import { motion } from "motion/react";

export function TechnicalInterests() {
  const getIcon = (category: string) => {
    switch (category) {
      case "Mathematics":
        return <Binary className="w-5 h-5" />;
      case "Physics & Science":
        return <Atom className="w-5 h-5" />;
      case "Cybersecurity & Cryptography":
        return <ShieldCheck className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const getCategoryAccent = (category: string) => {
    switch (category) {
      case "Mathematics":
        return "text-primary bg-primary/10 border-primary/20";
      case "Physics & Science":
        return "text-accent-foreground bg-accent/10 border-accent/20";
      case "Cybersecurity & Cryptography":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <section id="interests" className="scroll-mt-20 py-24 sm:py-32 relative">
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        {/* Header */}
        <SectionReveal>
          <div className="max-w-3xl mb-14">
            <div className="section-label mb-5">
              <span>Interdisciplinary Inquiry</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Beyond the
              <br />
              <span className="text-primary">codebase</span>.
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-4 leading-relaxed max-w-xl">
              Modern software engineering is vastly enhanced by grounding in
              abstract mathematics, physics, and cryptographic security.
            </p>
          </div>
        </SectionReveal>

        {/* Interest Cards */}
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6" staggerDelay={0.12}>
          {portfolioData.technicalInterests.map((interest: TechnicalInterest, idx) => {
            const accentClass = getCategoryAccent(interest.category);
            return (
              <motion.div
                key={interest.id}
                variants={staggerItem}
                className="group flex flex-col justify-between p-6 sm:p-7 rounded-lg border border-border bg-card/30 card-interactive"
              >
                <div>
                  {/* Icon + Category */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className={`p-2.5 rounded-md border ${accentClass} transition-all duration-300 group-hover:scale-105`}>
                      {getIcon(interest.category)}
                    </div>
                    <span className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-sm bg-muted text-muted-foreground tracking-wider uppercase">
                      {interest.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                    {interest.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2 mb-6">
                    <h4 className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70 font-semibold">
                      Exploration Areas
                    </h4>
                    <ul className="space-y-2">
                      {interest.topics.map((topic, topicIdx) => (
                        <li
                          key={topicIdx}
                          className="text-xs text-foreground/80 flex items-start gap-2 leading-snug"
                        >
                          <span className="text-primary mt-0.5 shrink-0">—</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Relevance Footer */}
                <div className="pt-4 border-t border-border/40">
                  <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-primary font-semibold mb-1.5">
                    How it informs my code
                  </div>
                  <div className="text-xs text-muted-foreground italic leading-relaxed">
                    &ldquo;{interest.relevance}&rdquo;
                  </div>
                </div>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
