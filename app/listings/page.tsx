import React from "react";
import Listing from "@/components/listing";
import Mls from "@/components/mls";

export default function Listings() {
  return (
    <div className="bg-black h-screen w-screen ">
      <div className="w-full h-1/6 bg-black"></div>
      <Listing />
      <Mls />
    </div>
  );
}
