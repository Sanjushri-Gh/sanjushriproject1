import { DM_Mono, Manrope, Playfair_Display } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});
export const metadata: Metadata = {
  title: "Sanjushri Foundation | Every future deserves a beginning",
  description: "Sanjushri Foundation works alongside communities to advance education, health, and women's livelihoods.",
  metadataBase: new URL("https://sanjushriproject1.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sanjushri Foundation | Every future deserves a beginning",
    description: "Locally led pathways to education, better health, and economic confidence.",
    siteName: "Sanjushri Foundation",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${playfair.variable} ${dmMono.variable}`}>{children}</body></html>;
}
