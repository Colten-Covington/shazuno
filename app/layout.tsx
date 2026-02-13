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
      <body>{children}</body>
    </html>
  );
}
