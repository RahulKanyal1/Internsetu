import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Header } from "~/components/header";
import { Footer } from "~/components/footer";
import { CSPostHogProvider } from "./providers";
import { Toaster } from "~/components/ui/sonner";

export const metadata: Metadata = {
  title: "InternSetu - Government Internships Made Simple",
  description:
    "AI-powered government internship matching platform. Access 500+ verified opportunities across 50+ ministries. Connect with official government organizations and PSUs.",
  metadataBase: new URL("https://intern-setu.gov.in"),
  keywords: [
    "government internships",
    "government jobs",
    "ministry internships",
    "PSU internships",
    "NITI Aayog",
    "Digital India",
    "Smart Cities",
    "government careers",
    "india internships",
    "verified internships",
    "AI matching",
    "government opportunities",
    "student placements",
    "internship portal",
    "government initiatives",
    "youth empowerment",
    "skill development",
    "career guidance",
    "intern setu",
    "internsetu",
  ],
  authors: [
    { name: "Government of India", url: "https://india.gov.in" },
  ],
  creator: "Government of India - Digital India Initiative",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://intern-setu.gov.in",
    title: "InternSetu - Government Internships Made Simple",
    description:
      "AI-powered government internship matching platform. Access 500+ verified opportunities across 50+ ministries.",
    siteName: "InternSetu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "InternSetu - Government Internship Platform",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <CSPostHogProvider>
        <body className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
