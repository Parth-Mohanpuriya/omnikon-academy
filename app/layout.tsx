import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VantaBackground from "@/components/VantaBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omnikon Academy — Developer Education Platform",
  description: "Build production-ready skills with structured courses in React, Next.js, Go, gRPC, Docker, and Kubernetes. Open-source first, community-driven developer education.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <VantaBackground />
        {children}
      </body>
    </html>
  );
}
