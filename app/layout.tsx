import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Oni Real Estate",
  description: "Houston's Owned Real Estate Firm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
