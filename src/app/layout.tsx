import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import BottomNavigation from "@/components/BottomNavigation";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Умный холодильник - идеи блюд и список покупок",
  description: "Приложение для хранения продуктов, общения с ИИ-помощником и ведения списка покупок.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Умный холодильник"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#10b981'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Умный холодильник" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="192x192" href="/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="512x512" href="/icon-512x512.svg" />
      </head>
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="mx-auto w-full max-w-md min-h-screen">
              <Header />
              <main className="pb-20">
                {children}
              </main>
              <BottomNavigation />
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
