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
  title: "Webify",
  description: "Webify — a live HTML/CSS/JS playground and editor.",
};

const suppressBenignErrorEvents = `(function(){
  window.addEventListener('error',function(e){
    if(e&&!(e.error instanceof Error)){
      e.stopImmediatePropagation();
      e.preventDefault();
      console.warn('[suppressed non-Error event]',e.message||e);
    }
  },true);
})();`;

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
        <script
          dangerouslySetInnerHTML={{ __html: suppressBenignErrorEvents }}
        />
        {children}
      </body>
    </html>
  );
}
