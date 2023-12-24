import SubNav from "@/components/nav";
import Nav from "@/components/navbar";
import React from "react";

export default function ClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SubNav />
      <main>{children}</main>
    </>
  );
}
