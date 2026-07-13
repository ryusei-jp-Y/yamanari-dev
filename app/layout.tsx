import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yamanari.dev"),
  title: {
    default: "yamanari.dev",
    template: "%s",
  },
  description:
    "Portfolio and service pages for Web Quality Crawler, Boarda, and Idle Clock.",
  openGraph: {
    title: "yamanari.dev",
    description:
      "Portfolio and service pages for Web Quality Crawler, Boarda, and Idle Clock.",
    url: "https://yamanari.dev",
    siteName: "yamanari.dev",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
