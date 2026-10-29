export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: "Full-Stack" | "Backend / API" | "Security / Cryptography" | "Scientific / Simulation";
  tags: string[];
  features: string[];
  repoUrl: string;
  liveUrl?: string;
  isVerified: boolean;
  statusText?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  badge: string;
  skills: {
    name: string;
    level?: string;
    note?: string;
  }[];
}

export interface TechnicalInterest {
  id: string;
  title: string;
  category: "Mathematics" | "Physics & Science" | "Cybersecurity & Cryptography";
  iconName: string;
  description: string;
  topics: string[];
  relevance: string;
}

export const portfolioData = {
  personal: {
    name: "Keshav Sharma",
    handle: "Code-Keshav-1947",
    headline: "Full-Stack Web Developer & Technical Problem Solver",
    subheadline:
      "Building resilient web applications and exploring the intersections of software engineering, cybersecurity, mathematical foundations, and physical systems.",
    location: "Baghpat, Uttar Pradesh, India",
    email: "code.keshav.1947@gmail.com",
    availability: "Available for freelance, full-time roles & technical collaborations",
    githubUrl: "https://github.com/Code-Keshav-1947",
    linkedinUrl: "https://linkedin.com/in/code-keshav-placeholder", // Replace with your LinkedIn URL
    twitterUrl: "https://x.com/code_keshav_placeholder", // Replace with your Twitter / X URL
    bio: [
      "I am a full-stack developer driven by first-principles thinking and technical rigor. Rather than treating frameworks as black boxes, I focus on understanding underlying data structures, API contracts, protocols, and defensive security postures.",
      "My technical interests extend beyond routine web development into mathematics (linear algebra, calculus, probability), foundational physics (Lagrangian and quantum mechanics), and cryptography. This broad lens sharpens my approach to software architecture, algorithmic efficiency, and resilient system design.",
    ],
    principles: [
      {
        title: "First-Principles Engineering",
        description:
          "Deconstructing problems to fundamental truths before architecting solutions, avoiding premature abstraction and unnecessary dependencies.",
      },
      {
        title: "Defensive By Design",
        description:
          "Treating security, data integrity, and input validation as first-class architectural constraints rather than afterthoughts.",
      },
      {
        title: "Continuous Synthesis",
        description:
          "Bridging abstract mathematics and scientific theory with pragmatic web applications and robust distributed systems.",
      },
    ],
  },

  skills: [
    {
      title: "Web Development",
      description: "Building responsive, modern user interfaces and robust server-side APIs.",
      badge: "Full-Stack Architecture",
      skills: [
        { name: "Full-Stack Architecture", note: "End-to-end web system design" },
        { name: "React", note: "SPA development, hooks, state management" },
        { name: "Angular", note: "Component-based architecture & TypeScript" },
        { name: "Vue", note: "Reactive components & modern tooling" },
        { name: "Node.js", note: "Asynchronous runtime, Express, REST APIs" },
        { name: "Django & DRF", note: "MVC patterns, ORM, RESTful endpoints" },
        { name: "PostgreSQL", note: "Relational modeling, indexing & queries" },
        { name: "MongoDB", note: "Document store & dynamic schemas" },
        { name: "MySQL", note: "Relational database schema & transactions" },
      ],
    },
    {
      title: "Programming Languages & Core Tech",
      description: "Strong command of core languages across web, backend, and native environments.",
      badge: "Languages",
      skills: [
        { name: "JavaScript (ES6+)", note: "Event loop, asynchronous patterns, DOM" },
        { name: "TypeScript", note: "Static typing, generics, strict type safety" },
        { name: "Python", note: "Backend services, scripting, automation" },
        { name: "Java", note: "Object-oriented systems & Android basics" },
        { name: "Kotlin", note: "Modern Android development & idioms" },
        { name: "HTML5 & Semantic Web", note: "Accessible, standards-compliant markup" },
        { name: "CSS3 & Modern Layouts", note: "Flexbox, Grid, custom properties, responsive design" },
        { name: "Markdown", note: "Technical documentation & structured content" },
      ],
    },
    {
      title: "Mathematics",
      description: "Core analytical frameworks applied to algorithms, optimization, and modeling.",
      badge: "Areas of Study",
      skills: [
        { name: "Linear Algebra", note: "Vectors, matrices, transformations, eigenvalues" },
        { name: "Calculus", note: "Differential & integral calculus, rates of change, optimization" },
        { name: "Probability & Statistics", note: "Stochastic processes, distributions, data reasoning" },
        { name: "Euclidean Geometry", note: "Geometric proofs, spatial transformations, coordinate systems" },
      ],
    },
    {
      title: "Physics & Science",
      description: "Theoretical physics concepts inspiring systematic simulation and modeling.",
      badge: "Areas of Study",
      skills: [
        { name: "Newtonian Mechanics", note: "Classical dynamics, kinematics, conservation laws" },
        { name: "Lagrangian Mechanics", note: "Principle of least action, generalized coordinates" },
        { name: "Quantum Mechanics", note: "Wave functions, state spaces, superposition concepts" },
      ],
    },
    {
      title: "Cybersecurity & Cryptography",
      description: "Defensive security research, protocol analysis, and vulnerability mitigation.",
      badge: "Security Focus",
      skills: [
        { name: "Network Security", note: "Traffic inspection, protocol security, firewalls" },
        { name: "Application Security", note: "OWASP Top 10, sanitization, authentication" },
        { name: "Penetration Testing", note: "Vulnerability scanning, ethical assessment" },
        { name: "Cryptography", note: "Symmetric & asymmetric ciphers, hashing, PKI" },
        { name: "Post-Quantum Cryptography", note: "Lattice-based & quantum-resistant schemes" },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "schobase",
      title: "SchoBase",
      tagline: "Full-Stack School Database Management System",
      description:
        "A structured database management platform engineered with Django REST Framework and clean API architectures. Designed to handle student records, administrative workflows, and relational data querying with role-based integrity.",
      category: "Full-Stack",
      tags: ["Python", "Django", "Django REST Framework", "JavaScript", "Relational DB", "REST API"],
      features: [
        "Clean RESTful API endpoints for academic and administrative records",
        "Role-based access control and secure data isolation",
        "Relational schema design with optimized queries",
        "Modular backend architecture with extensibility for external mobile/web clients",
      ],
      repoUrl: "https://github.com/Code-Keshav-1947/SchoBase",
      isVerified: true,
      statusText: "Verified Public Repository",
    },
    {
      id: "graphic-point",
      title: "Graphic Point (Django)",
      tagline: "Creative Media & Graphic Asset Showcase Platform",
      description:
        "A web-centric asset management and showcase platform built in Python & Django. Enables structured cataloging, template-driven rendering, and responsive presentation of digital graphics.",
      category: "Backend / API",
      tags: ["Python", "Django", "JavaScript", "HTML5", "CSS3", "Asset Management"],
      features: [
        "Dynamic template rendering with Django's MVC/MVT architecture",
        "Organized media asset categorization and metadata handling",
        "Responsive, mobile-friendly interface design",
        "Structured modular apps for easy feature additions",
      ],
      repoUrl: "https://github.com/Code-Keshav-1947/Graphic-Point-in-django",
      isVerified: true,
      statusText: "Verified Public Repository",
    },
    {
      id: "developer-portfolio",
      title: "Developer Portfolio Platform",
      tagline: "Modern, Minimalist & Responsive Portfolio Website",
      description:
        "Engineered with Next.js App Router, React 19, TypeScript, and Tailwind CSS. Built with zero unnecessary dependencies, fluid theme switching, high accessibility, and modular content architecture.",
      category: "Full-Stack",
      tags: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Turbopack", "A11y"],
      features: [
        "Fully responsive layouts across mobile, tablet, and desktop viewports",
        "Accessible dark and light mode toggle with system preference sync",
        "Modular data architecture for effortless project & skill updates",
        "Zero bloated dependencies; optimal performance and instant page loads",
      ],
      repoUrl: "https://github.com/Code-Keshav-1947",
      liveUrl: "#",
      isVerified: true,
      statusText: "Current Live Website",
    },
    {
      id: "crypto-security-lab",
      title: "Security & Cryptographic Research Lab",
      tagline: "Defensive Security Tools & Cipher Experimentation",
      description:
        "[Customizable Placeholder] An experimental testbed exploring cipher implementations, entropy analysis, and defensive vulnerability scanning against OWASP vulnerabilities.",
      category: "Security / Cryptography",
      tags: ["Python", "Cryptography", "Security Auditing", "Network Protocols"],
      features: [
        "Implementation of core cryptographic primitives and hashing workflows",
        "Automated header inspection and vulnerability check scripts",
        "Exploration of post-quantum lattice-based encryption algorithms",
        "Detailed security audit logs and documentation",
      ],
      repoUrl: "https://github.com/Code-Keshav-1947",
      isVerified: false,
      statusText: "Placeholder — Add Your Project Details in portfolioData.ts",
    },
    {
      id: "math-physics-sim",
      title: "Dynamical Systems Simulation Engine",
      tagline: "Interactive Numerical Simulations of Classical & Physical Mechanics",
      description:
        "[Customizable Placeholder] Interactive simulations visualizing physical phenomena—such as double pendulums, orbits, and harmonic oscillators—using Lagrangian formulations and numerical integration.",
      category: "Scientific / Simulation",
      tags: ["JavaScript", "TypeScript", "Canvas API", "Numerical Analysis", "Physics"],
      features: [
        "Numerical integration algorithms (Runge-Kutta, Euler-Cromer)",
        "Real-time canvas rendering of state vectors and trajectory phase spaces",
        "Interactive parameter controls for mass, damping, and energy conservation",
        "Mathematical formulation write-ups for each physical model",
      ],
      repoUrl: "https://github.com/Code-Keshav-1947",
      isVerified: false,
      statusText: "Placeholder — Add Your Project Details in portfolioData.ts",
    },
  ] as Project[],

  technicalInterests: [
    {
      id: "mathematics",
      title: "Mathematical Foundations",
      category: "Mathematics",
      iconName: "Binary",
      description:
        "Mathematics provides the foundational vocabulary for computational reasoning. I study mathematical structures to design better algorithms, understand optimization manifolds, and model real-world relationships.",
      topics: [
        "Linear Algebra: Matrix decompositions, vector spaces, and coordinate transforms",
        "Calculus: Gradient descent, optimization curves, and continuous dynamics",
        "Probability & Statistics: Bayesian reasoning, distributions, and error modeling",
        "Euclidean Geometry: Axiomatic deductions, transformations, and spatial models",
      ],
      relevance: "Informs algorithm complexity analysis, spatial computing, and scalable data representations.",
    },
    {
      id: "physics",
      title: "Physical Systems & Dynamics",
      category: "Physics & Science",
      iconName: "Atom",
      description:
        "Physics trains intuition for how interconnected systems evolve over time. The transition from Newtonian equations to Lagrangian action principles highlights the elegance of finding optimal system trajectories.",
      topics: [
        "Newtonian Mechanics: Kinematics, force balance, momentum, and conservative fields",
        "Lagrangian Mechanics: Generalized coordinates and Euler-Lagrange equations of motion",
        "Quantum Mechanics: State vectors, Hilbert spaces, and probabilistic wave mechanics",
      ],
      relevance: "Inspires simulations, continuous time modeling, and systematic troubleshooting.",
    },
    {
      id: "cryptography",
      title: "Cryptography & Post-Quantum Security",
      category: "Cybersecurity & Cryptography",
      iconName: "Shield",
      description:
        "Cryptography is the mathematical shield of information systems. As quantum computing advances, understanding both classical asymmetric algorithms (RSA, ECC) and post-quantum alternatives (lattice-based schemes) is paramount.",
      topics: [
        "Classical Cryptography: AES, RSA, Elliptic Curves, Diffie-Hellman key exchanges",
        "Cryptographic Hash Functions: Collision resistance, Merkle trees, authentication codes",
        "Post-Quantum Cryptography: Lattice-based cryptography (Kyber/Dilithium), quantum threat modeling",
        "Network & Application Defense: TLS handshakes, CORS, CSP policies, and zero-trust principles",
      ],
      relevance: "Ensures every web service and API is engineered with rigorous defensive security principles.",
    },
  ] as TechnicalInterest[],

  navLinks: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Interests", href: "#interests" },
    { name: "GitHub", href: "#github" },
    { name: "Contact", href: "#contact" },
  ],
};

