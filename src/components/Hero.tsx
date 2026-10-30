"use client";

import { portfolioData } from "@/data/portfolioData";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { ArrowRight, Mail, ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";

import { HeroVisual3D } from "@/components/3d/HeroVisual3D";
import { LUXURY_EASE } from "@/lib/animation";

const ease = LUXURY_EASE;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden">
      {/* Background Grid */}
      <div
        className="tech-grid-bg absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Glow Effects */}
      <div
        className="glow-primary absolute top-[15%] right-[10%] w-[400px] h-[400px] animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="glow-accent absolute bottom-[20%] left-[5%] w-[300px] h-[300px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full py-28 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* ─── Left: Main Content ─── */}
          <div className="lg:col-span-7">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-border bg-card/60 backdrop-blur-sm text-xs font-mono text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{portfolioData.personal.availability}</span>
              </div>
            </motion.div>

            {/* Name — Oversized Display */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <p className="font-mono text-xs text-muted-foreground tracking-wider uppercase mb-3">
                &mdash; Portfolio of
              </p>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.92] text-foreground mb-4">
                {portfolioData.personal.name.split(" ")[0]}
                <br />
                <span className="text-primary">
                  {portfolioData.personal.name.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </motion.div>

            {/* Role */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease }}
              className="font-display text-lg sm:text-xl lg:text-2xl font-medium text-muted-foreground tracking-tight mt-4 mb-6 max-w-2xl"
            >
              {portfolioData.personal.headline}
            </motion.p>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-10"
            >
              {portfolioData.personal.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                data-magnetic="true"
                data-cursor-label="EXPLORE"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all duration-250 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5" />
              </a>

              <a
                href="#contact"
                data-magnetic="true"
                data-cursor-label="CONTACT"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-lg border border-border bg-card/60 backdrop-blur-sm text-foreground hover:bg-card hover:border-primary/40 text-sm font-semibold transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>Get in Touch</span>
              </a>

              <a
                href={portfolioData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic="true"
                data-cursor-label="GITHUB"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-border bg-card/40 hover:bg-card hover:border-primary/30 text-muted-foreground hover:text-foreground transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
            </motion.div>
          </div>

          {/* ─── Right: 3D Centerpiece & Technical Pillars ─── */}
          <div className="lg:col-span-5 flex flex-col items-center gap-6">
            {/* 3D Mathematical & Cryptographic Centerpiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="w-full flex justify-center"
            >
              <HeroVisual3D />
            </motion.div>

            {/* Core Disciplines Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease }}
              className="w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3"
            >
              {[
                {
                  label: "Full-Stack Systems",
                  detail: "React · Django · APIs",
                  accent: "bg-primary/10 text-primary border-primary/20",
                },
                {
                  label: "Defensive Security",
                  detail: "Cryptography · PQC",
                  accent: "bg-accent/10 text-accent-foreground border-accent/20",
                },
                {
                  label: "Analytical Inquiry",
                  detail: "Matrices · Dynamics",
                  accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
                },
              ].map((pillar) => (
                <div
                  key={pillar.label}
                  className={`p-3 rounded-lg border ${pillar.accent} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] text-center sm:text-left`}
                >
                  <div className="text-xs font-semibold mb-0.5">{pillar.label}</div>
                  <div className="text-[11px] opacity-70 font-mono truncate">{pillar.detail}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ─── Scroll Indicator ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-5 sm:left-8 lg:left-12 hidden sm:flex items-center gap-2 text-muted-foreground"
        >
          <ArrowDownRight className="w-4 h-4 animate-bounce" />
          <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}
