import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { ClientProvider } from "@/components/client-provider";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Video Calls | Connect Instantly with High-Quality Online Meetings",
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
            <main className="max-w-5xl mx-auto px-3 py-6">{children}</main>
          </ClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
