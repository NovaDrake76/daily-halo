import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://daily-halo.com";
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Daily Halo - Blue Archive Guess",
    template: "%s | Daily Halo",
  },
  description:
    "Can you guess the Blue Archive student? A new challenge every day!",
  keywords: [
    "Blue Archive",
    "Wordle",
    "Game",
    "Daily Halo",
    "Student Guess",
    "Anime",
  ],
  authors: [{ name: "Nova Drake" }],

  openGraph: {
    title: "Daily Halo - Blue Archive Guess",
    description:
      "Test your knowledge, Sensei! Can you identify the random student?",
    url: BASE_URL,
    siteName: "Daily Halo",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Daily Halo Game Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Daily Halo - Blue Archive Guess",
    description: "Can you guess the student of the day?",
    images: ["/opengraph-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },
};

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
        {GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
