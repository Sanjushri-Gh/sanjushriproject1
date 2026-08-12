import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarunya Foundation | Every future deserves a beginning",
  description: "Aarunya Foundation works alongside communities to advance education, health, and women's livelihoods.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
