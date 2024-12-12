import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./ui/Header/Header";
import { ApolloWrapper } from "./ApolloWrapper";

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
  title: "Recipe Box Frontend",
  description: "Store your recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <div className="min-h-full">
          <Header />
          <main>
            <ApolloWrapper>
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </ApolloWrapper>
          </main>
        </div>
      </body>
    </html>
  );
}
