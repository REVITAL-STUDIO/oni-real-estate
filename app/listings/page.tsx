import React from "react";
import Listing from "@/components/listing";
import Footer from "@/components/footer";
import Google from "@/components/google";
import Homes from "@/components/homes";
import Nav from "@/components/navbar";
import MLS from "@/components/mls";
import NavPages from "@/components/nav";

export default function Listings() {
  return (
    <div className="h-screen w-full bg-white">
      <NavPages />
      <div className="w-full h-[25%]"></div>
      <Listing />
      <div className="w-full h-[5%] hidden xl:block"></div>
      <MLS />
      <Footer />
    </div>
  );
}
