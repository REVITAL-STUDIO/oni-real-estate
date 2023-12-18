import React from "react";
import Buyer from "@/components/buyer";
import Seller from "@/components/seller";

export default function Client() {
  return (
    <div className="bg-black h-screen w-screen ">
      <div className="w-full h-1/6 bg-black"></div>
      <Buyer />
      <Seller />
    </div>
  );
}
