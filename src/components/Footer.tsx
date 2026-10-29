"use client";

import { portfolioData } from "@/data/portfolioData";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-card/40 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative subtle top edge glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-12 border-b border-border/60">
          {/* Brand & Editorial Signature */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold flex items-center justify-center shadow-sm">
                KS
              </span>
              <span className="font-display font-bold text-foreground text-base tracking-tight">
                {portfolioData.personal.name}
              </span>
              <span className="font-mono text-[10px] text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full ml-1">
                v2.6
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              {portfolioData.personal.headline} &mdash; focused on resilient full-stack systems, defensive security, and computational rigor.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for select engineering opportunities</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-4 flex flex-col space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
              Directory
            </span>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground">
              {portfolioData.navLinks.map((link, idx) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary transition-colors flex items-center gap-1 group"
                >
                  <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-primary/70">
                    {String(idx + 1).padStart(2, "0")}.
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect & Top Action */}
          <div className="md:col-span-3 flex md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground hidden md:block">
              Connect & Elevate
            </span>

            <div className="flex items-center gap-2.5">
              <a
                href={portfolioData.personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <GitHubIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-background hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToTop}
                type="button"
                data-magnetic="true"
                data-cursor-label="TOP"
                className="group flex items-center gap-1.5 px-3 h-9 rounded-lg border border-border bg-background hover:bg-card hover:border-primary/40 text-muted-foreground hover:text-primary text-xs font-mono transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span className="hidden sm:inline">TOP</span>
              </button>
            </div>
          </div>
        </div>

        {/* Colophon & Transparency */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-muted-foreground text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} {portfolioData.personal.name}.</span>
            <span className="text-muted-foreground/40">&bull;</span>
            <span>All rights reserved.</span>
          </div>

          <div className="text-muted-foreground/80">
            Engineered with <span className="text-foreground font-medium">Next.js 16</span>,{" "}
            <span className="text-foreground font-medium">React 19</span>,{" "}
            <span className="text-foreground font-medium">Tailwind v4</span> &{" "}
            <span className="text-foreground font-medium">Motion</span>.
          </div>
        </div>
      </div>
    </footer>
  );
}
