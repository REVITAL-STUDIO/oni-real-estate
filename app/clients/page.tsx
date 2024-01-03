import React from "react";
import Buyer from "@/components/buyer";
import Seller from "@/components/seller";
import Schedule from "@/components/schedule";
import Footer from "@/components/footer";
import Nav from "@/components/navbar";

export default function Client() {
  return (
    <div className="bg-white h-screen w-full ">
      <Nav />
      <div className="w-full h-1/6"></div>
      <Buyer />
      <Seller />
      <Schedule />
      <Footer />
    </div>
  );
}
