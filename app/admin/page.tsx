import NavPages from "@/components/nav";
import React from "react";
import Footer from "@/components/footer";
import AdminDashboard from "@/components/adminDashboard";

export default function AdminPage() {
  return (
    <div className="w-full h-screen">
      <NavPages />
      <div className="w-full h-[5%]"></div>
      <AdminDashboard />
      <Footer />
    </div>
  );
}
