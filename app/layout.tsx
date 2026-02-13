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
        <a href="#main-content" className="sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:outline-none">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
