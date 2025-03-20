import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Providers from "./provider";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "PLANTD: Plant Today, Thrive Tomorrow",
  description:
    "PLANTD helps you grow a greener future by planting trees with every action. Join us in restoring nature, fighting climate change, and making a lasting impact.",
  keywords: [
    "PLANTD",
    "PLNTD",
    "Plant Today, Thrive Tomorrow",
    "Planting Trees",
    "Climate Change",
    "Restoring Nature",
    "Sustainable Future",
  ],
  openGraph: {
    title: "PLANTD: Plant Today, Thrive Tomorrow",
    description:
      "PLANTD helps you grow a greener future by planting trees with every action. Join us in restoring nature, fighting climate change, and making a lasting impact.",
    type: "website",
    url: "https://x.com/nishantweb3",
    siteName: "PLANTD",
  },
  twitter: {
    title: "PLANTD: Plant Today, Thrive Tomorrow",
    description:
      "PLANTD helps you grow a greener future by planting trees with every action. Join us in restoring nature, fighting climate change, and making a lasting impact.",
    card: "summary_large_image",
    site: "@nishantweb3",
    creator: "@nishantweb3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-[#1E1E1E] px-8 py-4 ${roboto.variable} antialiased`}>
        <Providers>
          <Suspense
            fallback={
              <div className="text-center my-32">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            <main className="relative max-w-screen min-h-screen">
              {children}
            </main>
          </Suspense>
        </Providers>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              minWidth: "max-content",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
