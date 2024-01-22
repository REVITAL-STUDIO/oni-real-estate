import React from "react";
import Listing from "@/components/listing";
import Footer from "@/components/footer";
import Google from "@/components/google";
import Homes from "@/components/homes";
import Nav from "@/components/navbar";
import MLS from "@/components/mls";

export default function Listings() {
  return (
    <div className="h-screen w-full bg-white">
      <Nav />
      <div className="w-full h-[10%]"></div>
      <Listing />
      <div className="w-full h-[5%]"></div>

      <MLS />
      <Footer />
    </div>
  );
}
