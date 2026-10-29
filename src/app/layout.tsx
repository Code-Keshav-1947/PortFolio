import type { Metadata } from "next";
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Keshav Sharma | Full-Stack Web Developer & Security Enthusiast",
  description:
    "Developer portfolio of Keshav Sharma. Full-stack engineering, robust systems, modern web development, cybersecurity, and mathematical sciences.",
  keywords: [
    "Keshav Sharma",
    "Full-Stack Developer",
    "Software Engineer",
    "Django",
    "React",
    "Next.js",
    "Cybersecurity",
    "TypeScript",
    "Baghpat India",
  ],
  authors: [{ name: "Keshav Sharma", url: "https://github.com/Code-Keshav-1947" }],
  openGraph: {
    title: "Keshav Sharma | Full-Stack Web Developer",
    description:
      "Modern full-stack web developer exploring engineering, cybersecurity, mathematics, and systems.",
    url: "https://github.com/Code-Keshav-1947",
    siteName: "Keshav Sharma Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keshav Sharma | Full-Stack Web Developer",
    description:
      "Modern full-stack web developer exploring engineering, cybersecurity, mathematics, and systems.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full scroll-smooth dark antialiased ${outfit.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
