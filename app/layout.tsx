import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buzz Stack - Modern Next.js Boilerplate",
  description: "Production-ready Next.js 15 boilerplate with React 18, TypeScript, and Tailwind CSS. Built with best practices and accessibility in mind.",
  keywords: ["nextjs", "react", "typescript", "tailwind", "boilerplate", "starter", "template"],
  authors: [{ name: "Buzz Stack Team" }],
  openGraph: {
    title: "Buzz Stack - Modern Next.js Boilerplate",
    description: "Production-ready Next.js boilerplate with best practices",
    type: "website",
    locale: "en_US",
    siteName: "Buzz Stack",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buzz Stack - Modern Next.js Boilerplate",
    description: "Production-ready Next.js boilerplate with best practices",
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
      <body className="font-sans antialiased">
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
