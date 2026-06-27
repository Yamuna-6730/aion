import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/store/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AION | Enterprise AI Operating System for Discovery",
  description: "Agentic AI Platform for B2B Discovery. Launch automated multi-agent search workflows, parse business signals, and connect target evidence.",
  keywords: ["AION", "Agentic AI", "Enterprise Operating System", "B2B Discovery", "Signals Intelligence", "Market Intelligence"],
  openGraph: {
    title: "AION | Enterprise AI Operating System",
    description: "Launch automated multi-agent search workflows, parse business signals, and connect target evidence.",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-fg-primary">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
