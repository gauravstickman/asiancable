import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import RevealHook from "@/components/hooks/RevealProvider";
import FloatingBar from "@/components/layout/Floatingactions";
import "./globals.css";
import { ScrollbarController } from "../components/hooks/ScrollbarController";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asian-cables-next-website.vercel.app"),
  icons: {
    icon: "/favicon.png",
  },

  title: "Asian Cables | An RPG Group Company",
  description:
    "Asian Cables delivers world-class power and telecom cable solutions for mining, industrial, utility, and critical infrastructure projects worldwide.",

  openGraph: {
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Asian Cables",
        type: "image/png",
      },
    ],
  },

  twitter: {
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Asian Cables",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${workSans.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/cfj6tra.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" />

      </head>

      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <div className="site-wrapper">
          <ScrollbarController />
          {children}
          <RevealHook />
          <FloatingBar />
        </div>
      </body>
    </html>
  );
}
