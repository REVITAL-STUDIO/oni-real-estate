import React from "react";

import Dashboard from "@/components/userDashboard";
import NavPages from "@/components/nav";
import Footer from "@/components/footer";

export default function UserPage() {
  return (
    <div className="h-screen w-full">
      <NavPages />
      <div className="w-full h-[8%]"></div>
      <Dashboard />
      <Footer />
    </div>
  );
}
