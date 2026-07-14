import type { Metadata } from "next";
import "./globals.css"; // veya sende hangi css importu varsa

export const metadata: Metadata = {
  title: "Tapınak",
  description: "Ultimate Service Official Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
