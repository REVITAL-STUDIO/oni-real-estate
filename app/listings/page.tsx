import React from "react";
import Listing from "@/components/listing";
import Mls from "@/components/mls";
import Footer from "@/components/footer";

export default function Listings() {
  return (
    <div className="h-screen w-full ">
      <div className="w-full h-[10%]"></div>
      <Listing />
      <Mls />
      <Footer />
    </div>
  );
}
