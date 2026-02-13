import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shazuno - Song Recognition for Suno",
  description: "Shazam-like application for Suno.com songs. Search through Suno artist libraries using text or voice input with smart matching.",
  keywords: ["suno", "song recognition", "music search", "lyrics search", "voice search", "shazam"],
  authors: [{ name: "Shazuno Team" }],
  openGraph: {
    title: "Shazuno - Song Recognition for Suno",
    description: "Shazam-like application for Suno.com songs",
    type: "website",
    locale: "en_US",
    siteName: "Shazuno",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shazuno - Song Recognition for Suno",
    description: "Shazam-like application for Suno.com songs",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7c3aed" },
    { media: "(prefers-color-scheme: dark)", color: "#581c87" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
