import React from "react";
import Buyer from "@/components/buyer";
import Seller from "@/components/seller";
import Schedule from "@/components/schedule";
import Footer from "@/components/footer";

export default function Client() {
  return (
    <div className="bg-storm h-screen w-full ">
      <Buyer />
      <Seller />
      <Schedule />
    </div>
  );
}
