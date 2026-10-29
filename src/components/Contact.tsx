"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolioData";
import { GitHubIcon } from "@/components/icons/GitHubIcon";
import { Copy, Check, Send, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(portfolioData.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subjectEncoded = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name} via Portfolio`
    );
    const bodyEncoded = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:${portfolioData.personal.email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32 relative">
      <div className="section-divider" aria-hidden="true" />

      {/* Background Glow */}
      <div
        className="glow-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] animate-pulse-glow"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-24 sm:pt-32 relative">
        {/* Big CTA Headline */}
        <SectionReveal>
          <div className="text-center mb-16">
            <div className="section-label mb-5 mx-auto w-fit">
              <span>Let&apos;s Connect</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground leading-[0.95] mb-5">
              Have a project
              <br />
              <span className="text-primary">in mind?</span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Whether you&apos;re a founder, a developer, or exploring
              intersections of software and security — my inbox is always open.
            </p>
          </div>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <SectionReveal className="lg:col-span-5" direction="left" delay={0.1}>
            {/* Email Card */}
            <div className="p-5 rounded-lg border border-border bg-card/40 card-interactive mb-6">
              <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.12em] mb-3 font-semibold">
                Direct Email
              </div>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="font-mono text-xs sm:text-sm text-foreground font-semibold hover:text-primary transition-colors truncate"
                  title="Send email directly"
                >
                  {portfolioData.personal.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  data-cursor-label="COPY"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border bg-background/60 hover:bg-background text-xs font-medium text-foreground transition-all duration-250 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Typically responds within 24 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary shrink-0">
                  <GitHubIcon className="w-4 h-4" />
                </span>
                <a
                  href={portfolioData.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary font-mono link-underline"
                >
                  github.com/{portfolioData.personal.handle}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-6 border-t border-border/40">
              <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-3 font-semibold">
                Find Me
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={portfolioData.personal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-card/40 hover:border-primary/30 hover:bg-card text-sm font-medium text-foreground transition-all duration-250"
                >
                  <GitHubIcon className="w-4 h-4" />
                  <span className="text-xs">GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Right: Contact Form */}
          <SectionReveal className="lg:col-span-7" delay={0.15}>
            <div className="p-6 sm:p-8 rounded-lg border border-border bg-card/40 card-interactive">
              <h3 className="font-display text-lg font-bold text-foreground mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-muted-foreground mb-6 font-mono tracking-wide">
                Opens your default email client with the message pre-filled.
              </p>

              {submitted && (
                <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold">Email client launched!</div>
                    <div className="text-muted-foreground mt-0.5">
                      If it did not open, email directly to{" "}
                      <span className="font-mono font-medium text-foreground">
                        {portfolioData.personal.email}
                      </span>
                      .
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-medium text-foreground mb-1.5"
                    >
                      Your Name <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-md border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-medium text-foreground mb-1.5"
                    >
                      Your Email <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-md border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Project Inquiry / Technical Collaboration"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-md border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-foreground mb-1.5"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Hello Keshav, I'd like to discuss a project..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-md border border-border bg-background/60 text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  data-magnetic="true"
                  data-cursor-label="SEND"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all duration-250 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via Email</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
