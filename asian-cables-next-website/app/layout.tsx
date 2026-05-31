import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import RevealHook from "@/components/hooks/RevealProvider";
import FloatingBar from "@/components/layout/Floatingactions";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://asian-cables-next-website.vercel.app"),

  title: "Asian Cables | Mining & Telecom Cable Manufacturer",
  description:
    "Asian Cables delivers world-class power and telecom cable solutions for mining, industrial, utility, and critical infrastructure projects worldwide.",

  openGraph: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asian Cables",
        type: "image/jpeg",
      },
    ],
  },

  twitter: {
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asian Cables",
        type: "image/jpeg",
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
      </head>

      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
        <RevealHook />
        <FloatingBar />
      </body>
    </html>
  );
}
