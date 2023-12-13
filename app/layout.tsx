import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";

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
      <Nav />
      <body>{children}</body>
      <Footer />
    </html>
  );
}
