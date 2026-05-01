import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LenisProvider } from "@/components/lenis-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hunt. A workshop, not a studio.",
  description:
    "Hunt builds software the slow way. One operator. One machine. Software hunted by hand.",
  metadataBase: new URL("https://hunt.computer"),
  openGraph: {
    title: "Hunt.computer",
    description: "A workshop, not a studio. By Hunter, from Lima.",
    images: ["/brand/01-hero-hunt-wordmark.png"],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
