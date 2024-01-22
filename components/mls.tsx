import Home from "@/app/page";
import React from "react";
import Homes from "./homes";
import Google from "./google";

const MLS = () => {
  return (
    <div className="flex h-screen">
      <Homes />
      <Google />
    </div>
  );
};

export default MLS;
