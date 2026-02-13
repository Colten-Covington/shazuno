import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shazuno - Song Recognition for Suno",
  description: "Shazam-like application for Suno.com songs",
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
