import Nav from "@/components/navbar";
import React from "react";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
