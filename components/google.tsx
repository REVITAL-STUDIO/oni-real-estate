"use client";

import React, { useEffect, useRef } from "react";
import { Loader, LoaderOptions } from "@googlemaps/js-api-loader";

const Google: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyBamOgCKEhWHWq-2stqiQ5tLGwwNbErgks",
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
        }
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });
  }, []);

  return (
    <div className="w-full h-[40%]">
      <div ref={mapContainerRef} style={{ height: "100%" }}></div>
    </div>
  );
};

export default Google;
