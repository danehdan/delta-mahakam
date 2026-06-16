import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Yayasan Delta Mahakam - Portal Energi 3D",
  description: "Membangun Kompetensi, Menciptakan Profesionalisme, Menuju Industri Energi Masa Depan.",
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="id"
      className={`${montserrat.variable} ${inter.variable} dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="antialiased bg-[#0d1321] text-[#dde2f6]">
        {children}
      </body>
    </html>
  );
}

