import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mijoté — Mon carnet de recettes",
  description: "Vos recettes préférées avec quantités adaptables et étapes détaillées.",
  icons: {
    icon: process.env.GITHUB_ACTIONS ? "/recettes/favicon.svg" : "/favicon.svg",
    shortcut: process.env.GITHUB_ACTIONS ? "/recettes/favicon.svg" : "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
