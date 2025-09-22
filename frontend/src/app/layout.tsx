import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
        {/* Google Translate Widget */}
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2">
          {/* Discoverability label */}
          <div
            aria-hidden
            className="flex items-center gap-2 rounded-full bg-white text-gray-700 dark:bg-neutral-900 dark:text-gray-200 border border-gray-200 dark:border-neutral-700 px-3 py-1 shadow-md"
          >
            <span role="img" aria-label="language" className="text-base">🌐</span>
            <span className="text-sm font-medium">Translate</span>
          </div>
          {/* Custom language selector with native names */}
          <select
            id="pmis-language-select"
            className="bg-white dark:bg-neutral-900 text-sm text-gray-800 dark:text-gray-100 rounded-md px-2 py-1 shadow-md border border-gray-200 dark:border-neutral-700 focus:outline-none"
            title="Select language"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="bn">বাংলা</option>
            <option value="te">తెలుగు</option>
            <option value="mr">मराठी</option>
            <option value="ta">தமிழ்</option>
            <option value="ur">اردو</option>
            <option value="gu">ગુજરાતી</option>
            <option value="kn">ಕನ್ನಡ</option>
            <option value="or">ଓଡ଼ିଆ</option>
            <option value="ml">മലയാളം</option>
            <option value="pa">ਪੰਜਾਬੀ</option>
            <option value="as">অসমীয়া</option>
            <option value="ne">नेपाली</option>
            <option value="sd">سنڌي</option>
            <option value="sa">संस्कृतम्</option>
          </select>
          {/* Google-provided select will mount here (kept for functionality) */}
          <div
            id="google_translate_element"
            className="bg-white dark:bg-neutral-900 rounded-md p-1 shadow-md border border-gray-200 dark:border-neutral-700"
          />
        </div>
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'en',
                  includedLanguages: 'hi,bn,te,mr,ta,ur,gu,kn,or,ml,pa,as,ne,sd,sa',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script id="pmis-translate-controller" strategy="afterInteractive">
          {`
            (function(){
              function setCookie(name, value, days, domain) {
                var expires = '';
                if (days) {
                  var date = new Date();
                  date.setTime(date.getTime() + (days*24*60*60*1000));
                  expires = '; expires=' + date.toUTCString();
                }
                var domainPart = domain ? '; domain=' + domain : '';
                document.cookie = name + '=' + value + expires + '; path=/' + domainPart;
              }

              function applyGoogleTranslate(lang) {
                var value = '/en/' + lang;
                try {
                  setCookie('googtrans', value, 365);
                  setCookie('googtrans', value, 365, window.location.hostname);
                  var host = window.location.hostname;
                  if (host && host.indexOf('.') !== -1) {
                    // also set on top-level domain if possible
                    var parts = host.split('.');
                    if (parts.length > 1) {
                      var topLevel = '.' + parts.slice(-2).join('.');
                      setCookie('googtrans', value, 365, topLevel);
                    }
                  }
                } catch(e) {}

                // If the Google combo exists, trigger it; otherwise reload to let the widget pick up the cookie
                var combo = document.querySelector('.goog-te-combo');
                if (combo) {
                  combo.value = lang;
                  combo.dispatchEvent(new Event('change'));
                } else {
                  // delay a bit in case widget is still loading
                  setTimeout(function(){
                    var c2 = document.querySelector('.goog-te-combo');
                    if (c2) {
                      c2.value = lang;
                      c2.dispatchEvent(new Event('change'));
                    } else {
                      window.location.reload();
                    }
                  }, 400);
                }
              }

              function bindSelector(){
                var sel = document.getElementById('pmis-language-select');
                if (!sel) return;
                sel.addEventListener('change', function(e){
                  var lang = sel.value;
                  applyGoogleTranslate(lang);
                });
              }

              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', bindSelector);
              } else {
                bindSelector();
              }
            })();
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
