import type { Metadata } from "next";
import { Mogra, Merriweather, Urbanist, Nunito } from "next/font/google";
import "./globals.css";

const mogra = Mogra({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mogra-import",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather-import",
});

const urbanist = Urbanist({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-urbanist-import",
});

const nunito = Nunito({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-nunito-import",
});

export const metadata: Metadata = {
  title: "CEven Admin",
  description: "CEven Admin Portal",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${mogra.variable} ${merriweather.variable} ${urbanist.variable} ${nunito.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
