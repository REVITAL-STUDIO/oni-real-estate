"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClose, faCheck } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
// Homes
import home1 from "public/home1.webp";
import home2 from "public/home2.jpeg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";
import {
  StaticImageData,
  StaticImport,
} from "next/dist/shared/lib/get-img-props";

// Home Info

type Bookmark = 1 | 2 | 3 | 4 | 5 | 6 | null;

interface InfoEstate {
  beds: number;
  baths: number;
  sqft: number;
}

interface Listing {
  id: number;
  address: string;
  description: string;
  pictures: string[];
  beds: number;
  baths: number;
  area: number;
  price: number;
}



//Adding Save Homes
async function saveListing(email: string, listingId: number, index: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/favorites/route.ts`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, listingId }),
      }
    );
    if (!res.ok) {
      throw new Error("Failed to add listing");
    }
  } catch (error) {
    console.error("Error saving listing:", error);
    throw error;
  }
}

const Homes = () => {
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
      //requet to get listing data from api
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`, { method: 'GET' });
      const data: Listing[] = await response.json();
      //setting listings data to Listings state variable
      setListings(data);
      console.log("Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error")
    } finally {
      setLoading(false);
      console.log("Listings", listings)
    }

  };

  //Retrieving Homes from DB
  const [homes, setHomes] = useState([
    home1,
    home2,
    home3,
    home4,
    home5,
    home6,
  ]);


  // use effect so that listing data is fetched as component is loaded
  useEffect(() => {
    fetchListings();
  }, []);

  //addresses
  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "3015 Flatbend Road, Cypress, TX 77004",
    "1012 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  //prices
  const prices = [
    "$3,000,000",
    "$1,800,000",
    "$1,600,000",
    "$350,000",
    "$1,500,000",
    "$2,000,000",
  ];

  //Detailed Info
  const infoEstate = [
    { beds: 5, baths: 3, sqft: 3500 },
    { beds: 4, baths: 2, sqft: 5000 },
    { beds: 6, baths: 4, sqft: 2000 },
    { beds: 3, baths: 2, sqft: 7500 },
    { beds: 4, baths: 3, sqft: 4000 },
    { beds: 5, baths: 4, sqft: 3000 },
  ];

  const [selectedImage, setSelectedImage] = useState<StaticImport | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [selectedPrices, setSelectedPrices] = useState<string | null>(null);

  const handlePropertyInfo = (listing: Listing) => {
    //the listing to show in the property info page
    setSelectedListing(listing);
    openPropertyInfo((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    openPropertyInfo(false);
  };

  //Favorite Listing
  const [saveProp, setSaveProp] = useState<boolean[]>([]);

  // Function to handle the click event on a button to toggle save
  const handleSavedToggle = async (
    index: number,
    email: string,
    listingId: number
  ) => {
    try {
      // Toggle the save state of the item at the clicked index
      const newSaveProp = [...saveProp];
      newSaveProp[index] = !newSaveProp[index];

      const email = "";
      const listingId = 1;

      await saveListing(email, listingId, index);
      setSaveProp(newSaveProp);

      // Log the updated saveProp array
      console.log("Listing added to favorites successfully!");
    } catch (error) {
      console.error("Error adding listing to favorites:", error);
    }
  };

  useEffect(() => {
    console.log(saveProp, "It's working");
  }, [saveProp]);

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
    return (<p>Loading properties...</p>)
  }

  if (error) {
    return (<div>
      <p>Oops! Something went wrong. Please try again.</p>
      <button onClick={fetchListings}>Retry</button>
    </div>)
  }

  return (
    <div className="w-full xl:w-3/5 h-full flex flex-col items-center overflow-y-auto custom-scrollbar">
      <div className="flex flex-wrap justify-around gap-y-4 w-full  p-4">
        {listings.map((listing) => (
          <div className="xl:w-[50%] w-[100%] flex flex-col p-4 " key={listing.id}>
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
                  layout='responsive'
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
                <button
                  // onClick={() => handleSavedToggle(index, email, listingId)}
                  className="w-20 h-10 font-agrandir tracking-wide flex justify-evenly items-center p-2"
                >
                  {/* <span>
                    {saveProp[index] ? (
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="lg"
                        className="w-4 h-4 text-pine"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faPlus}
                        size="lg"
                        className="w-4 h-4 text-black"
                      />
                    )}
                  </span>
                  <span>{saveProp[index] ? "Saved" : "Save"}</span> */}
                </button>
              </div>
              {/* address and bookmark */}
              <AnimatePresence>
                {propertyInfo && (
                  <div className="fixed inset-0 z-50">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="bg-forest w-full h-full flex flex-col justify-center items-center relative overflow-y-auto another-scrollbar"
                    >
                      <button
                        onClick={handleClose}
                        className="w-auto h-auto absolute top-2 right-2"
                      >
                        <FontAwesomeIcon
                          className="hover:text-black/50 text-white duration-100 w-6 h-6"
                          icon={faClose}
                          size="lg"
                        />
                      </button>
                      <motion.section
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -100 }}
                        transition={{ ease: "easeInOut", duration: 0.5 }}
                        className=" w-[95%] h-[100%]  rounded-2xl flex flex-col justify-evenly items-center"
                      >
                        {/* Home and Description */}
                        <div className="w-full h-full flex flex-col xl:flex-row justify-around items-center">
                          <div className="xl:w-1/2 w-[95%]  xl:h-5/6 h-1/2 rounded-lg p-4 ">
                            <Image
                              src={
                                selectedListing?.pictures[0] !== null
                                  ? `${selectedListing?.pictures[0]}`
                                  : "/default-image-url.jpg"
                              }
                              width={1}
                              height={1}
                              layout="responsive"
                              className="rounded-lg w-[100%] h-[100%] brightness-90 object-cover"
                              alt="homes"
                            />
                          </div>
                          <div className="xl:w-2/5 w-full h-full xl:h-5/6 text-white">
                            <h2 className="text-3xl xl:text-5xl  text-white font-agrandir font-regular">
                              {selectedListing?.address}
                            </h2>
                            <h2 className="  py-2 font-montserrat text-pine font-bold tracking-wide text-2xl xl:text-4xl ">
                              {selectedListing?.price?.toLocaleString('en-US', { style: 'currency', currency: 'USD',  maximumFractionDigits: 0 },)}
                            </h2>
                            <p className="text-xs tracking-wider md:flex font-montserrat font-regular text-justify xl:w-3/4 py-2">
                              {selectedListing?.description}
                            </p>
                            <p className="text-base font-montserrat font-regular py-4">
                              {selectedListing
                                ? `${selectedListing?.beds} Beds | ${selectedListing?.baths} Baths | ${selectedListing?.area} sqft`
                                : "No information available"}
                            </p>{" "}
                            {/* Phone and Email */}
                            <div className="w-full h-1/4  bg-black flex shadow-lg">
                              <section className="w-full flex items-center ">
                                <div className="h-full w-2/5 "></div>
                              </section>
                            </div>
                            <div className="w-full h-1/6  flex  items-center">
                              <button className="w-1/2 h-12 border border-border rounded-xl shadow-md flex justify-center items-center">
                                Contact Us.
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Card Info */}
                      </motion.section>
                    </motion.div>
                  </div>
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
