import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webify - Online Code Editor",
  description:
    "A lightweight browser-based IDE for HTML, CSS, and JavaScript with live preview. Write code and see results instantly.",
  keywords: [
    "code editor",
    "online IDE",
    "HTML editor",
    "CSS editor",
    "JavaScript editor",
    "live preview",
    "web development",
  ],
  openGraph: {
    title: "Webify - Online Code Editor",
    description:
      "Write HTML, CSS and JavaScript with instant live preview in your browser. No setup required.",
    url: "https://webify-five.vercel.app",
    siteName: "Webify",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Webify - Online Code Editor",
    description:
      "Write HTML, CSS and JavaScript with instant live preview in your browser.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}