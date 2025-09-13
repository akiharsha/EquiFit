import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EquiFit - AI PM Internship Scheme Matcher",
  description: "AI-powered recommendation engine for Prime Minister Internship Scheme applications. Find your perfect government internship opportunity with our intelligent matching system for young Indians aged 21-24.",
  keywords: ["PM Internship Scheme", "government internship", "AI matching", "internship finder", "Indian youth", "public service", "ministry internship"],
  authors: [{ name: "EquiFit Team" }],
  creator: "EquiFit",
  publisher: "EquiFit",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://equifit.vercel.app"),
  openGraph: {
    title: "EquiFit - AI PM Internship Scheme Matcher",
    description: "AI-powered recommendation engine for Prime Minister Internship Scheme applications for young Indians aged 21-24",
    url: "https://equifit.vercel.app",
    siteName: "EquiFit",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EquiFit - AI PM Internship Scheme Matcher",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EquiFit - AI PM Internship Scheme Matcher",
    description: "AI-powered recommendation engine for Prime Minister Internship Scheme applications for young Indians aged 21-24",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EquiFit",
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
        <meta name="apple-mobile-web-app-title" content="EquiFit" />
        <meta name="application-name" content="EquiFit" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
