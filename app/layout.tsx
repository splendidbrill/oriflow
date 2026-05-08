import type { Metadata } from "next";
import { Nunito, Playfair_Display, Caveat, Bricolage_Grotesque, JetBrains_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";
import AuthModal from "./components/AuthModal";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Oriflow — Stop fixing yourself. Start listening.",
  description:
    "Oriflow isn't another app that promises a 'better you' in 7 days. It's a quiet space to talk to yourself, properly — without affirmations, gurus, or guilt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${playfair.variable} ${caveat.variable} ${bricolage.variable} ${jetbrainsMono.variable} ${nunitoSans.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
