"use client";

import { useState } from "react";
import { portfolioData, SkillCategory } from "@/data/portfolioData";
import { Code, Globe, Shield, Binary, Atom } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { motion, AnimatePresence } from "motion/react";

const categoryIcons: Record<string, React.ReactNode> = {
  "Web Development": <Globe className="w-4 h-4" />,
  "Programming Languages & Core Tech": <Code className="w-4 h-4" />,
  "Mathematics": <Binary className="w-4 h-4" />,
  "Physics & Science": <Atom className="w-4 h-4" />,
  "Cybersecurity & Cryptography": <Shield className="w-4 h-4" />,
};

const tabs = [
  { key: "All", label: "All" },
  { key: "Web Development", label: "Web Dev" },
  { key: "Languages", label: "Languages" },
  { key: "Mathematics", label: "Math" },
  { key: "Physics", label: "Physics" },
  { key: "Cybersecurity", label: "Security" },
];

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredCategories: SkillCategory[] =
    selectedCategory === "All"
      ? portfolioData.skills
      : portfolioData.skills.filter(
          (cat) =>
            cat.title.includes(selectedCategory) ||
            cat.badge.includes(selectedCategory)
        );

  return (
    <section id="skills" className="scroll-mt-20 py-24 sm:py-32 relative">
      <div className="section-divider" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32">
        {/* Header */}
        <SectionReveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-8">
            <div className="max-w-2xl">
              <div className="section-label mb-5">
                <span>Skills & Domains</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                Technical Breadth
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-relaxed max-w-xl">
                An honest presentation of technologies I build with alongside
                analytical domains I actively study and explore.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1 p-1 rounded-lg bg-card/60 border border-border text-xs self-start lg:self-end">
              {tabs.map((tab) => {
                const isActive = selectedCategory === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`relative px-3 py-1.5 rounded-md font-medium transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="skill-tab"
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

        {/* Category Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as const }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                className="group p-6 rounded-lg border border-border bg-card/30 card-interactive flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-9 h-9 rounded-md bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                        {categoryIcons[category.title] || <Code className="w-4 h-4" />}
                      </span>
                      <span className="font-display font-semibold text-foreground text-base">
                        {category.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm bg-muted text-muted-foreground border border-border/60 tracking-wider uppercase">
                      {category.badge}
                    </span>
                  </div>

                  <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/skill p-2.5 rounded-md border border-border/40 bg-background/30 hover:bg-background hover:border-primary/20 transition-all duration-250"
                      >
                        <div className="text-xs font-semibold text-foreground mb-0.5">
                          {skill.name}
                        </div>
                        {skill.note && (
                          <div className="text-[11px] text-muted-foreground leading-snug">
                            {skill.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-5 pt-3 border-t border-border/30 flex items-center justify-between text-[10px] text-muted-foreground font-mono tracking-wider">
                  <span>{category.skills.length} competencies</span>
                  <span className="uppercase text-primary/60">
                    No inflated ratings
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
