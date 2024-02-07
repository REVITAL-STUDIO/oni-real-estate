import React from "react";
import Buyer from "@/components/buyer";
import Seller from "@/components/seller";
import Schedule from "@/components/schedule";
import Footer from "@/components/footer";
import NavPages from "@/components/nav";

export default function Client() {
  return (
    <div className="bg-eggshell h-screen w-full ">
      <NavPages />
      <div className="w-full h-[20%]"></div>
      <Buyer />
      <Seller />
      <Schedule />
      <Footer />
    </div>
  );
}
