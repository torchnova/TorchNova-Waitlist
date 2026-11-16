import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { publicUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});


const SITE_URL = publicUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "TorchNova",
  description:
    "TorchNova is a private platform for founders: one place for the people, the plan and the work behind a new company.",
  openGraph: {
    title: "TorchNova",
    description: "A private platform for founders.",
    siteName: "TorchNova",
    type: "website",
  },
  icons: {
    icon: "/torchnova-logo-icon.svg",
    shortcut: "/torchnova-logo-icon.svg",
    apple: "/torchnova-logo-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
  themeColor: "#e9eee7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Start every load at the top so the opening animation is seen —
            the browser would otherwise restore the previous scroll position. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{history.scrollRestoration='manual';if(!location.hash)window.scrollTo(0,0)}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
