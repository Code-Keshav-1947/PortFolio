"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { portfolioData } from "@/data/portfolioData";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const ease = [0.21, 0.47, 0.32, 0.98] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    portfolioData.navLinks.forEach((link) => {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1, ease }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/60 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="#"
            className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1 -ml-1"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-primary-foreground font-mono text-xs font-bold transition-all duration-300 group-hover:rounded-lg group-hover:scale-105">
              KS
            </span>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-tight text-foreground">
                {portfolioData.personal.name}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:block tracking-wide">
                Full-Stack · Security
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5">
            {portfolioData.navLinks.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href={portfolioData.personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic="true"
              data-cursor-label="GITHUB"
              className="flex items-center justify-center w-9 h-9 rounded-md border border-border hover:border-primary/30 bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>

            <ThemeToggle />

            <a
              href="#contact"
              data-magnetic="true"
              data-cursor-label="TALK"
              className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold bg-primary text-primary-foreground hover:brightness-110 transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="flex items-center justify-center w-9 h-9 rounded-md border border-border bg-card/60 text-foreground hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease }}
            className="md:hidden overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="px-5 pt-3 pb-6">
              <div className="flex flex-col space-y-0.5 mb-4">
                {portfolioData.navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.25 }}
                    className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </motion.a>
                ))}
              </div>

              <div className="pt-3 border-t border-border flex items-center gap-3">
                <a
                  href={portfolioData.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md border border-border bg-card text-xs font-medium text-foreground hover:bg-muted transition-colors"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:brightness-110 transition-all"
                >
                  <span>Connect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
