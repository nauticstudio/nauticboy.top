import React from "react";
import { Outfit, JetBrains_Mono, Unbounded } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} ${unbounded.variable} font-sans min-h-screen bg-brand-dark text-white overflow-x-hidden`}
      >
        <MotionConfig reducedMotion="user">
          {children}
          <GrainOverlay />
        </MotionConfig>
      </body>
    </html>
  );
}
