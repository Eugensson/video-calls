import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ClientProvider } from "@/components/client-provider";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Video Calls | Connect Instantly with High-Quality Online Meetings",
    template: "%s | Video Calls",
  },
  description:
    "Host seamless video calls with crystal-clear audio and HD video. Enjoy secure, reliable, and user-friendly online meetings for teams, friends, and clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <ClientProvider>
            <Navbar />
            <main className="max-w-5xl mx-auto h-[85vh] px-4 md:px-6 py-6">
              {children}
            </main>
          </ClientProvider>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
