/**
 * Core domain types and interfaces for Keshav Sharma's portfolio.
 * Separates data structure contracts from component implementation.
 */

export type ProjectCategory =
  | "Full-Stack"
  | "Backend / API"
  | "Security / Cryptography"
  | "Scientific / Simulation";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  features: string[];
  repoUrl: string;
  liveUrl?: string;
  isVerified: boolean;
  statusText?: string;
}

export interface SkillItem {
  name: string;
  level?: string;
  note?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  badge: string;
  skills: SkillItem[];
}

export type InterestCategory =
  | "Mathematics"
  | "Physics & Science"
  | "Cybersecurity & Cryptography";

export interface TechnicalInterest {
  id: string;
  title: string;
  category: InterestCategory;
  iconName: string;
  description: string;
  topics: string[];
  relevance: string;
}

export interface TechnicalPrinciple {
  title: string;
  description: string;
}

export interface PersonalInfo {
  name: string;
  handle: string;
  headline: string;
  subheadline: string;
  location: string;
  email: string;
  availability: string;
  githubUrl: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  bio: string[];
  principles: TechnicalPrinciple[];
}

export interface NavLink {
  name: string;
  href: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  technicalInterests: TechnicalInterest[];
  navLinks: NavLink[];
}

/** 3D Interactive Workbench modes */
export type VisualizerMode = "crypto" | "physics" | "math";

/** Custom cursor interaction modes */
export type CursorMode = "default" | "hover" | "action" | "text-hide";
