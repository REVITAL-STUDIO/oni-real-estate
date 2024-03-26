// Import necessary modules and components
import "./globals.css";
import type { Metadata } from "next";
import Provider from "@/components/Provider";
import { EdgeStoreProvider } from "../lib/edgestore";
import ToasterProvider from "@/components/ToasterProvider";

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
        <Provider>
          <EdgeStoreProvider>
            <main className="grow">
              {/* Render the child components */}
              <ToasterProvider />
              {children}
            </main>
          </EdgeStoreProvider>
        </Provider>
      </body>
    </html>
  );
}
