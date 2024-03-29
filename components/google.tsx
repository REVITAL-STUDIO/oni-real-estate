"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";
import PropertyInfo from "./PropertyInfo";

interface Listing {
  index: number;
  id: number;
  address: string;
  description: string;
  pictures: string[];
  beds: number;
  baths: number;
  area: number;
  price: number;
}

const Google: React.FC = () => {
  // State variables for listings, loading state, and error
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null); // State to track selected listing


  // Set overflow property when component mounts and unmounts
  useEffect(() => {
    document.body.style.overflow = selectedListing ? "hidden" : "auto";

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedListing]);

  // Fetch listings and update the state
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `/api/listing`,
          { method: "GET" }
        );
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    fetchListings();
  }, []);

  // Use effect to load Google Maps API and place markers
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS, // Replace with your actual API key
      version: "weekly",
    } as LoaderOptions);

    loader
      .load()
      .then((googleAPI) => {
        if (mapContainerRef.current) {
          const map = new googleAPI.maps.Map(mapContainerRef.current, {
            center: { lat: 29.7604, lng: -95.3698 },
            zoom: 8,
          });

          // Geocode each listing's address and place a marker
          listings.forEach(async (listing) => {
            try {
              const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  listing.address
                )}&key=${process.env.NEXT_PUBLIC_GOOGLE_GEO}`
              );
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                new googleAPI.maps.Marker({
                  position: { lat, lng },
                  map,
                  title: listing.address,
                  icon: {
                    path: googleAPI.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                    fillColor: "#FF0000", // your desired color
                    fillOpacity: 1,
                    strokeWeight: 0,
                    scale: 5, // adjust the size of the marker
                  },
                }).addListener("click", () => {
                  setSelectedListing(listing); // Set the selected listing when marker is clicked
                });
              } else {
                throw new Error("No results found");
              }
            } catch (error) {
              console.error("Error geocoding address:", error);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });
  }, [listings]); // Trigger effect when listings change

  return (
    <div className="w-2/5 hidden xl:block ">
      <div ref={mapContainerRef} style={{ height: "100%" }}>
        {selectedListing && (
          <div className="absolute top-0 left-0 bg-white p-4">
            {/* Additional information about the selected listing */}
            <PropertyInfo
              selectedListing={selectedListing}
              handleClose={() => setSelectedListing(null)} // Close the modal when handleClose is called
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Google;
