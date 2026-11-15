import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Self-hosted via next/font — matches the Inter weights used in the source.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TorchNova — Join the waitlist",
  description:
    "TorchNova is the platform where founders find their people, run their team, and let built-in AI handle the busywork. Early access opens soon.",
  icons: {
    icon: "/torchnova-logo-icon.svg",
    shortcut: "/torchnova-logo-icon.svg",
    apple: "/torchnova-logo-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#f3f1e8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
