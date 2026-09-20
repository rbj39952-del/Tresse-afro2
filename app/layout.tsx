import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tresse Afro",
  description: "Annuaire des coiffures afro à Paris et Île-de-France",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tresse Afro",
  },
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#09090B" />
      </head>
      <body>{children}</body>
    </html>
  );
}
