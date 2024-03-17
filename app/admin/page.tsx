"use client"
import NavPages from "@/components/nav";
import React from "react";
import Footer from "@/components/footer";
import AdminDashboard from "@/components/adminDashboard";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && status === "authenticated" && session.user.role != "admin") {
      router.push("/");
    }
  }, [session]);


  // Render only if user is authenticated as admin
  if (!session || status !== "authenticated" || session.user.role !== "admin") {
    // Redirecting or showing loading indicator if session is loading
    return null; // or return loading indicator
  }

  return (
    <div className="w-full h-screen">
      <NavPages />
      <div className="w-full h-[5%]"></div>
      <AdminDashboard />
    </div>
  );
}
