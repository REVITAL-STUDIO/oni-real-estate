"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import PropertyInfo from "./PropertyInfo";

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
  availability: string;
  location: string;
  type: string;
}

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
interface User {
  id: string;
  name: string;
  email: string;
  number: string;
  favoriteListingsIds: number[];
}

interface HomesProps {
  selectedFilters: Filters;
}

const Homes: React.FC<HomesProps> = ({ selectedFilters }) => {
  const { data: session } = useSession();

  //will contain array of listings data retrieved from db
  const [listings, setListings] = useState<Listing[]>([]);
  // Filtered listings state
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  //used to display loading state to user when fetching listings
  const [loading, setLoading] = useState(true);
  // used to display an error message to user if failed to fetch listings
  const [error, setError] = useState(false);
  // variable to keep track of which listing user selects to view
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [user, setUser] = useState<User>();

  // Fetch listings and update the state
  const fetchListings = async () => {
    setLoading(true);
    try {
      //request to get listing data from api
      const response = await fetch(`/api/listing`, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error fetching Listings");
      }
      const data: Listing[] = await response.json();
      //setting listings data to Listings state variable
      setListings(data);
      setFilteredListings(data);
      if (session) {
        await fetchUserData();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(true);
    } finally {
      setLoading(false);
      console.log("Listings:", listings);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/user/${session?.user.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error retrieving user infromation");
      }

      const data = await response.json();
      await setUser(data);
    } catch (error) {
      console.error("Error Fetching User Data: ", error);
    }
  };

  useEffect(() => {
    // Filter logic based on the selected filters

    const filtered = listings.filter((listing) => {
      if (selectedFilters.option) {
        if (listing.availability != selectedFilters.option) {
          return false;
        }
      }
      if (selectedFilters.price.label != "") {
        if (
          listing.price < selectedFilters.price.min ||
          listing.price > selectedFilters.price.max
        ) {
          return false;
        }
      }
      if (selectedFilters.beds > 0) {
        if (listing.beds < selectedFilters.beds) {
          return false;
        }
      }
      if (selectedFilters.baths > 0) {
        if (listing.baths < selectedFilters.baths) {
          return false;
        }
      }
      if (selectedFilters.location != "") {
        if (listing.location != selectedFilters.location) {
          return false;
        }
      }
      if (selectedFilters.property != "") {
        if (listing.type != selectedFilters.property) {
          return false;
        }
      }
      return true;
    });

    // Update the filtered listings state
    setFilteredListings(filtered);
  }, [selectedFilters, listings]);

  // use effect so that listing data is fetched as component is loaded
  useEffect(() => {
    fetchListings();
  }, [session]);

  useEffect(() => {}, [user?.favoriteListingsIds]);

  const handlePropertyInfo = (listing: Listing) => {
    //the listing to show in the property info page
    setSelectedListing(listing);
    openPropertyInfo((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    openPropertyInfo(false);
  };

  //function to save listing
  const favoriteListing = async (id: number) => {
    try {
      const response = await fetch(`/api/listing/favorites/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user.email,
          listingId: id, // Assuming you want to access the first listing's ID
        }),
      });
      if (!response.ok) {
        throw new Error("Favoriting Listing Error");
      }
    } catch (error) {
      console.error("Error updating favorites", error);
      // Handle error
    }
    if (user) {
      const updatedFavoriteListingsIds = [...user.favoriteListingsIds, id];
      setUser({ ...user, favoriteListingsIds: updatedFavoriteListingsIds });
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
      <div className="w-[100%] flex justify-center items-center">
        <div className="h-20 w-20 border-4 border-mint rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
        <p className="p-4 text-center">
          Oops! Something went wrong. Please try loading listings again.
        </p>
        <button
          onClick={() => fetchListings()}
          className="w-40 h-12 text-white text-xs tracking-wider font-montserrat transition ease-in-out duration-150 bg-black hover:bg-black/60  rounded-xl  hover:shadow-lg active:bg-black"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full xl:w-3/5   h-full flex flex-col  overflow-y-auto custom-scrollbar">
      <div className="flex flex-col xl:justify-start xl:flex-row justify-evenly gap-4 w-full items-start  p-4">
        {filteredListings.map((listing) => (
          <div
            className="xl:w-[50%] w-[100%] flex flex-col p-4 shadow-xl"
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
                <p className="text-white text-sm font-regular font-montserrat border rounded-full py-2 px-4">
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
                {session && user && (
                  <button
                    onClick={() => favoriteListing(listing.id)}
                    className="w-20 h-10 font-agrandir tracking-wide flex justify-evenly items-center p-2 hover:scale-110 hover:text-pine active:scale-100 active:text-gray-600"
                  >
                    <span>
                      {user?.favoriteListingsIds.includes(listing.id) ? (
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
                      {user?.favoriteListingsIds.includes(listing.id)
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
