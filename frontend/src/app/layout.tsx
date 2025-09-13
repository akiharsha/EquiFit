import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PMIS Portal - Prime Minister Internship Scheme",
  description: "Official Prime Minister Internship Scheme portal for young Indians aged 21-24. Find government internship opportunities across ministries and partner organizations with AI-powered matching.",
  keywords: ["PM Internship Scheme", "PMIS Portal", "government internship", "Indian youth", "public service", "ministry internship", "Government of India"],
  authors: [{ name: "PMIS Portal Team" }],
  creator: "Government of India",
  publisher: "Ministry of Corporate Affairs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://equifit.vercel.app"),
  openGraph: {
    title: "PMIS Portal - Prime Minister Internship Scheme",
    description: "Official Prime Minister Internship Scheme portal for young Indians aged 21-24. Government of India initiative.",
    url: "https://equifit.vercel.app",
    siteName: "PMIS Portal",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PMIS Portal - Prime Minister Internship Scheme",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMIS Portal - Prime Minister Internship Scheme",
    description: "Official Prime Minister Internship Scheme portal for young Indians aged 21-24. Government of India initiative.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PMIS Portal",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#3b82f6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PMIS Portal" />
        <meta name="application-name" content="PMIS Portal" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
