import Home from "@/app/page";
import React from "react";
import Homes from "./homes";
import Google from "./google";

interface Price {
  label: string;
  min: number;
  max: number;
}

interface Filters {
  option: string;
  price: Price;
  beds: number;
  baths: number;
  location: string;
  property: string;
}

interface MLSProps {
  selectedFilters: Filters
}

const MLS: React.FC<MLSProps> = ({ selectedFilters }) => {
  return (
    <div className="flex h-screen justify-between">
      <Homes selectedFilters={selectedFilters} />
      <Google />
    </div>
  );
};

export default MLS;
