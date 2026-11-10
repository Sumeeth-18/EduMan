import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "EduMan. | Manage Every Student.",
    template: "%s | EduMan.",
  },
  description: "EduMan. - Complete Education Management Platform for tutors, tuition centres, coaching centres and educational organisations.",
  keywords: ["education management", "student management", "attendance", "fee management", "school ERP", "coaching centre"],
  authors: [{ name: "EduMan" }],
  creator: "EduMan",
  publisher: "EduMan",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://eduman.app",
    siteName: "EduMan.",
    title: "EduMan. | Manage Every Student.",
    description: "Complete Education Management Platform for tutors, tuition centres, coaching centres and educational organisations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EduMan. - Manage Every Student",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EduMan. | Manage Every Student.",
    description: "Complete Education Management Platform for tutors, tuition centres, coaching centres and educational organisations.",
    images: ["/og-image.png"],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#204E72" },
    { media: "(prefers-color-scheme: dark)", color: "#B3CCE0" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}