"use client";
import React from "react";
import Listing from "@/components/listing";
import Footer from "@/components/footer";
import MLS from "@/components/mls";
import NavPages from "@/components/nav";
import { useState, useEffect } from "react";

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
  location: String;
  property: string;
}
export default function Listings() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    option: "",
    price: { label: "", min: 0, max: Number.MAX_SAFE_INTEGER },
    beds: 0,
    baths: 0,
    location: "",
    property: "",
  });

  const handleFiltersChange = (filters: Filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    const hasDisplayedSuccessMessage = sessionStorage.getItem(
      "successMessageDisplayed"
    );

    const queryParams = new URLSearchParams(window.location.search);
    const successParam = queryParams.get("success");
    console.log("Success param: ", successParam);

    if (successParam === "true" && !hasDisplayedSuccessMessage) {
      setShowSuccessMessage(true);

      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        sessionStorage.setItem("successMessageDisplayed", "true");
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []); // Run only once when component mounts

  return (
    <div className="h-screen w-full bg-white">
      <NavPages />
      <div className="w-full h-[20%]"></div>
      {showSuccessMessage && (
        <div className="absolute p-[1rem] bg-green-100/80 flex items-center justify-center rounded-lg mb-[2rem] w-[40%] left-[32%]">
          <p className="text-green-700">
            Registration Successfull! We thank you for making an account with
            us.
          </p>
        </div>
      )}
      <Listing onFiltersChange={handleFiltersChange} />
      <MLS selectedFilters={selectedFilters} />
      <Footer />
    </div>
  );
}
