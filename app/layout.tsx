import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Llibreria Pàgina 128",
  description: "Llibreria Pàgina 128, pronta per a la seva inauguració",
  generator: "tausistemas.cl",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
