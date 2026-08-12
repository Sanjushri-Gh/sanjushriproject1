import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanjushri Foundation | Every future deserves a beginning",
  description: "Sanjushri Foundation works alongside communities to advance education, health, and women's livelihoods.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
