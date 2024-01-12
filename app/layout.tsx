// Import necessary modules and components
import "./globals.css";
import type { Metadata } from "next";
import Nav from "@/components/navbar";
import Footer from "@/components/footer";
import { Cinzel, Montserrat } from "next/font/google";

// Define metadata for the page
export const metadata: Metadata = {
  title: "Oni Real Estate",
  description: "Houston's Owned Real Estate Firm",
};

// Define the RootLayout component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Link to Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;1,100;1,200;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        {/* Render the child components */}
        {children}
      </body>
    </html>
  );
}
