import Providers from "@/app/providers";
import { MainNavbar } from "@/components";
import Footer from "@/components/layout/Footer";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700", "900"] });

export const metadata: Metadata = {
  title: "Boujou Normandie",
  description: "lorem ipsum dolor sit amec", //TODO
  manifest: "/manifest.json",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={roboto.className}>
        <Providers>
            <div className="flex flex-col min-h-screen">
              <MainNavbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </div>
        </Providers>
      </body>
    </html>
  );
}
