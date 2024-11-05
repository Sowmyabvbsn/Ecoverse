import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ReduxProvider } from "./providers/ReduxProvider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Loader } from "@/components/Loader";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EcoBid",
  description: "Sustainable Auction Marketplace",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ReduxProvider>
            {children}
            <Loader />
          </ReduxProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
