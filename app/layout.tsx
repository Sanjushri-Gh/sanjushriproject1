import type { Metadata } from "next";
import "./globals.css";

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
  return <html lang="en"><body>{children}</body></html>;
}
