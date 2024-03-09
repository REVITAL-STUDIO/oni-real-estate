"use client";

import React, { useEffect, useRef, useState } from "react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch listings and update the state
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`,
          { method: "GET" }
        );
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Use effect to load Google Maps API and place markers
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.GOOGLE_MAPS, // Replace with your actual API key
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
                )}&key=${process.env.GOOGLE_GEO}`
              );
              const data = await response.json();
              if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                new googleAPI.maps.Marker({
                  position: { lat, lng },
                  map,
                  title: listing.address,
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
      <div ref={mapContainerRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default Google;
