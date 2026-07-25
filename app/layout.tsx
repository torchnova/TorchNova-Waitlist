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
    "TORCHNOVA is the private network where founders trade intros, unblock each other, and hand off the ideas they're not chasing. Early access opens soon.",
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
  themeColor: "#f6f7f9",
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
