"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import PropertyInfo from "./PropertyInfo";
import Email from "next-auth/providers/email";

// Home Info

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

interface SavedListing {
  email: string;
  listingId: number;
}

const Homes = () => {
  const { data: session } = useSession();

  //will contain array of listings data retrieved from db
  const [listings, setListings] = useState<Listing[]>([]);
  //used to display loading state to user when fetching listings
  const [loading, setLoading] = useState(true);
  // used to display an error message to user if failed to fetch listings
  const [error, setError] = useState<string | null>(null);
  // variable to keep track of which listing user selects to view
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // Fetch listings and update the state
  const fetchListings = async () => {
    try {
      //request to get listing data from api
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`,
        { method: "GET" }
      );
      const data: Listing[] = await response.json();
      //setting listings data to Listings state variable
      setListings(data);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error");
    } finally {
      setLoading(false);
      console.log("Listings", listings);
    }
  };

  // use effect so that listing data is fetched as component is loaded
  useEffect(() => {
    fetchListings();
  }, []);

  const handlePropertyInfo = (listing: Listing) => {
    //the listing to show in the property info page
    setSelectedListing(listing);
    openPropertyInfo((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    openPropertyInfo(false);
  };

  //Saved Listing Function

  //will contain the information of the listings being sent to client
  const [saveProp, setSaveProp] = useState<SavedListing[]>([]);
  //Data needed for save listing

  const sendFavListing = async (saveList: SavedListing) => {
    try {
      console.log("Sending request with updatedSaveProp:", saveList);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/favorites`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
            listingId: listings[0].id, // Assuming you want to access the first listing's ID
          }),
        }
      );

      if (response.ok) {
        const data: SavedListing[] = await response.json();
        // Verify the structure of the response and update the state accordingly
        if (Array.isArray(data)) {
          setSaveProp(data);
          console.log("Property:", data);
        } else {
          console.error("Invalid response format");
        }
      } else {
        console.error("Failed to update favorites");
        // Handle non-OK response
      }
    } catch (error) {
      console.error("Error updating favorites", error);
      // Handle error
    }
  };

  const toggleSavedListing = async (saveList: SavedListing) => {
    if (!session) {
      // Handle case when user is not logged in
      console.log("User not logged in");
      // You might want to show a login modal or redirect the user to the login page
      return; // Early return if user is not logged in
    }
    try {
      // Check if the listing is already saved
      const isSaved = saveProp.some(
        (item) =>
          item.listingId === saveList.listingId && item.email === saveList.email
      );

      if (isSaved) {
        console.log("Property already saved");
        // No need to return JSX here, handle the UI logic in the component
        return; // Early return if property is already saved
      }

      // If the listing is not saved, add it
      const updatedSaveProp = [...saveProp, saveList];

      // Call sendFavListing to update favorites
      await sendFavListing(saveList); // Pass saveList to sendFavListing

      // Update the saveProp state with the updated list of saved listings
      setSaveProp(updatedSaveProp);
    } catch (error) {
      console.error("Error toggling saved status", error);
      // Handle error
    }
  };

  //Open Info Page & close
  const [propertyInfo, openPropertyInfo] = useState(false);

  useEffect(() => {
    // If propertyInfo is open, prevent scrolling by adding a class to the body
    if (propertyInfo) {
      document.body.style.overflow = "hidden";
    } else {
      // If propertyInfo is closed, allow scrolling by removing the class
      document.body.style.overflow = "auto";
    }

    // Cleanup function to reset body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [propertyInfo]);

  if (loading) {
    return (
      <div className="w-[50%] flex justify-center items-center">
        <div className="h-20 w-20 border-4 border-mint rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-3/5 h-full flex justify-center items-center">
        <p>Oops! Something went wrong. Please try again.</p>
        <button onClick={fetchListings}>Retry</button>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-3/5 h-full flex flex-col items-center overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap justify-around gap-y-4 w-full  p-4">
        {listings.map((listing) => (
          <div
            className="xl:w-[50%] w-[100%] flex flex-col p-4 "
            key={listing.id}
          >
            <div
              onClick={() => handlePropertyInfo(listing)}
              className=" relative w-[100%] my-4 hover:cursor-pointer"
            >
              <div className="w-full h-full ">
                <Image
                  src={listing.pictures[0]}
                  className=" w-[100%] object-cover rounded-lg brightness-90 shadow-md"
                  alt="homes"
                  width={1}
                  height={1}
                  layout="responsive"
                />
              </div>
              <div className="absolute w-full h-full bg-black/50 opacity-0 duration-300 flex justify-center items-center hover:opacity-100 hover:rounded-lg hover:flex top-0 ease-in-out hover:justify-center hover:items-center">
                <p className="text-white text-xl font-regular font-montserrat underline underline-offset-8">
                  View Home
                </p>
              </div>
            </div>
            {/* Housing Cards */}
            <div className="w-full h-1/2 flex flex-col justify-evenly font-medium text-gray-600 ">
              <div className="flex flex-col justify-center">
                <h2 className="text-base font-montserrat font-regular p-2 w-3/5">
                  {listing.address}
                </h2>
                <p className="font-light p-2 text-sm">{`${listing.beds} beds | ${listing.baths} baths |  ${listing.area} sqft`}</p>
                {session && (
                  <button
                    onClick={() =>
                      toggleSavedListing({
                        listingId: listing.id,
                        email: session?.user.email,
                      })
                    }
                    className="w-20 h-10 font-agrandir tracking-wide flex justify-evenly items-center p-2"
                  >
                    <span>
                      {saveProp.some(
                        (saveList) => saveList.listingId === listing.id
                      ) ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="lg"
                          className="w-4 h-4 text-pine px-2"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="lg"
                          className="w-4 h-4 text-black px-2"
                        />
                      )}
                    </span>
                    <span>
                      {saveProp.some(
                        (saveList) => saveList.listingId === listing.id
                      )
                        ? "Saved"
                        : "Save"}
                    </span>
                  </button>
                )}
              </div>
              {/* address and bookmark */}
              <AnimatePresence>
                {propertyInfo && selectedListing && (
                  <PropertyInfo
                    selectedListing={selectedListing}
                    handleClose={handleClose}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homes;
