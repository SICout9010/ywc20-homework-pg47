import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ywc20.mrphuripat.me"),
  title: "YWC20 - PG47 HOMEWORK",
  description: "YWC20 - PG47 HOMEWORK",
  openGraph: {
    title: "YWC20 - PG47 HOMEWORK",
    description: "@2025 TWA.",
    images: [
      {
        url: "/og-image2.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSansThai.variable} antialiased dark`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
