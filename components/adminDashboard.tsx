"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import Image from "next/image";
import home1 from "public/home1.webp";
import home2 from "public/home2.jpeg";
import home3 from "public/home3.jpeg";
import home4 from "public/home4.jpg";
import home5 from "public/home5.jpeg";
import home6 from "public/home6.jpeg";
import {
  faPenToSquare,
  faCheck,
  faPhone,
  faEnvelope,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import CreateListing from "./create-listing";
import EditListing from "./edit-listing";
import { IoIosClose } from "react-icons/io";
import { useEdgeStore } from "@/lib/edgestore";


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


const AdminDashboard = () => {
  const { edgestore } = useEdgeStore();

  //will contain array of listings data retrieved from db
  const [listings, setListings] = useState<Listing[]>([]);
  //used to display loading state to user when fetching listings 
  const [loading, setLoading] = useState(true);
  // used to display an error messages to user 
  const [errorMsg, seterrorMsg] = useState("");
  // variable to keep track of which listing user selects to view
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  // variable to indicate when data has been recieved
  const [fetchedListingsData, setFetchedListingsData] = useState(false)

  const [showDeleteListing, setShowDeleteListing] = useState(false);
  const [isError, setIsError] = useState(false)

  const deleteListing = async (id: number) => {
    setIsError(false)
    try {
      //requet to get listing data from api
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`, { method: 'DELETE', body: JSON.stringify(id) });
      if (!response.ok) {
        throw new Error("Error deleting Listing")
      }
      await deleteFiles()
      setShowDeleteListing(false)
      fetchListings()
    } catch (error) {
      setIsError(true)
      seterrorMsg("Error deleting Listing")
      console.error("Error fetching data:", error);
    }

  };

  //function to delete listing images from cloud storage
  const deleteFiles = async () => {
    if (selectedListing) {
      for (const url of selectedListing.pictures) {
        try {
          await edgestore.publicFiles.delete({
            url: url,
          });
        } catch (error) {
          console.error(error, " Error deleting image: ", url)
        }
      }
    }
  }

  const fetchListings = async () => {
    setFetchedListingsData(false)
    try {
      //requet to get listing data from api
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`, { method: 'GET' });
      const data: Listing[] = await response.json();
      //setting listings data to Listings state variable
      setListings(data);
      setFetchedListingsData(true)
    } catch (error) {
      console.error("Error fetching data:", error);
      seterrorMsg("Unable to show listings at this time, check network connection and try again.")
    } finally {
      setLoading(false);
      console.log("Listings", listings)
    }

  };

  // use effect so that listing data is fetched as component is loaded
  useEffect(() => {
    fetchListings();
  }, []);


  //Saved Listings
  //homes
  //homes
  const homes: StaticImport[] = [home1, home2, home3, home4, home5, home6];

  //addresses
  const addresses = [
    "123 Pinecrest Drive, Cinco Ranch, TX 77001",
    "456 Oakridge Lane, Houston, TX 77002",
    "3015 Flatbend Road, Cypress, TX 77004",
    "1012 Riverbend Road, Missouri City, TX 77004",
    "202 Sunset Boulevard, Pearland, TX 77005",
    "303 Lakeside Drive, Richmond, TX 77006",
  ];

  //Opening create lisitng form
  const [createListing, setCreateListing] = useState(false);
  const showCreateListing = (isOpen: boolean) => {
    if(!isOpen){
      fetchListings()
    }
    setCreateListing(isOpen);
  };

  const [editListing, setEditListing] = useState(false);
  const showEditListing = (isOpen: boolean) => {
    if(!isOpen){
      fetchListings()
    }
    setEditListing(isOpen);
  };

  useEffect(() => {
    if (createListing || editListing || showDeleteListing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createListing, editListing, showDeleteListing]);

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-[90%] h-4/5   rounded-2xl grid gap-4 grid-cols-2 grid-rows-2">
          {/* Admin Profile */}
          <div className=" col-span-1 row-span-1 bg-eggshell relative rounded-2xl flex justify-center items-center shadow-lg">
            <div className="w-2/3 h-[90%] rounded-2xl  flex flex-col items-center">
              <div className="w-fit left-5 h-[90%]  absolute flex flex-col justify-between">
                <h2 className="  font-medium font-agrandir tracking-wider">
                  Profile
                </h2>
                <button className="w-8 h-8 bg-white hover:bg-gray-200/20 rounded-full shadow-md flex justify-center items-center transition duration-200 ease-in-out">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    size="sm"
                    className="w-4 h-4"
                  />
                </button>
              </div>
              {/* Profile Picture */}
              <div className="w-full h-2/3 flex justify-center  items-center">
                <div className="w-44 h-44 rounded-2xl relative flex justify-center items-center">
                  <div className="w-36 h-36 bg-white inset-0 rounded-2xl shadow-md flex justify-center items-center">
                    <h2 className="text-5xl  font-montserrat">M</h2>
                  </div>
                  <div className="absolute w-7 h-7 bg-blue-500 shadow-sm left-[0%] bottom-0  rounded-full flex justify-center items-center">
                    <FontAwesomeIcon
                      icon={faCheck}
                      size="sm"
                      className="w-4  h-4 text-white"
                    />
                  </div>
                </div>
              </div>
              {/* Name */}
              <div className="w-full h-1/5 flex flex-col items-center justify-evenly">
                <span className="text-xs font-montserrat text-black/50">
                  Agent
                </span>
                <span className="text-base font-montserrat tracking-4">
                  Maya Peterson
                </span>
              </div>
            </div>
          </div>
          {/* Leads */}
          <div className=" col-span-1 row-span-1 relative bg-eggshell rounded-2xl shadow-lg">
            <div className="w-full absolute flex items-center justify-between">
              <h2 className="tracking-wider left-0  font-medium font-agrandir p-4">
                Leads
              </h2>
              <div className=" h-full flex p-4 gap-x-4">
                <div className="p-4 bg-black rounded-full shadow-lg w-32 h-16 text-white text-xs flex flex-col items-center justify-center">
                  <span className="text-xs">Leads</span>
                  <span className="text-lg">1</span>
                </div>
                <div className="p-4 bg-black rounded-full shadow-lg w-32 h-16 text-white flex flex-col items-center justify-center">
                  <span className="text-xs">Subscribers</span>
                  <span className="text-lg">4</span>
                </div>
              </div>
            </div>
            <section className="w-full h-full flex justify-evenly items-end">
              <div className="w-full h-[75%]  rounded-2xl flex justify-center ">
                <div className="w-5/6 h-full flex justify-center p-4">
                  <div className="w-full h-20 bg-white rounded-2xl text-black shadow-lg flex justify-between items-center">
                    {/* Client Lead */}
                    <div className="w-1/2 h-full flex justify-evenly items-center ">
                      <div className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center">
                        <span>C</span>
                      </div>
                      <span className="text-sm tracking-wider font-montserrat">
                        Charles Thomas
                      </span>
                    </div>
                    <div className="w-1/2 h-full flex justify-end items-center">
                      <button className="w-5 h-5 px-4">
                        <FontAwesomeIcon className="w-5 h-5" icon={faPhone} />{" "}
                      </button>
                      <button className="w-5 h-5 px-4">
                        <FontAwesomeIcon className="w-5 h-5" icon={faEnvelope} />
                      </button>
                      <button className="w-fit px-4 tracking-wider font-montserrat h-8 rounded-full  text-red-500 text-xs">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6.39989 18.3079L5.69189 17.5999L11.2919 11.9999L5.69189 6.39989L6.39989 5.69189L11.9999 11.2919L17.5999 5.69189L18.3079 6.39989L12.7079 11.9999L18.3079 17.5999L17.5999 18.3079L11.9999 12.7079L6.39989 18.3079Z"
                            fill="#FF0000"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Listings */}
          <div className="bg-eggshell relative col-span-2 rounded-br-2xl rounded-2xl  shadow-lg">
            <div className="flex justify-between items-center w-full h-1/6 ">
              <h2 className="p-4  left-0 font-agrandir font-medium tracking-wider">
                Listings
              </h2>
              <button
                onClick={()=>showCreateListing(true)}
                className="p-4 h-8 w-32 text-white bg-black shadow-lg rounded-full relative right-4 flex justify-evenly items-center text-xs hover:scale-105 active:scale-100"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> add listing
              </button>
            </div>
            <div className="w-full h-5/6  overflow-y-scroll block  p-4 ">



              {
                !fetchedListingsData ? <div className="flex justify-center items-center h-full">Loading Listings...</div> :

                  listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="w-3/4 h-28 bg-white rounded-2xl relative  shadow-lg float-right flex justify-between mb-8"
                    >
                      <Image
                        src={listing.pictures[0]}
                        alt="homes"
                        layout="responsive"
                        width={1}
                        height={1}
                        className="w-[100%] object-cover brightness-50 object-center contrast-125 rounded-2xl"
                      />
                      <div className="absolute flex justify-between items-center w-full h-full">
                        <span className="px-4 font-montserrat text-white text-sm w-1/4">
                          {listing.address}
                        </span>
                        <div className="w-1/4 h-full flex justify-end relative items-center right-2 ">
                          <button className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md  flex justify-center items-center rounded-full  text-xs ">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.125 13.5415C6.875 5.20817 18.125 5.20817 21.875 13.5415"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.5 17.708C12.0896 17.708 11.6833 17.6272 11.3041 17.4701C10.925 17.3131 10.5805 17.0829 10.2903 16.7927C10.0001 16.5025 9.76992 16.158 9.61288 15.7789C9.45583 15.3998 9.375 14.9934 9.375 14.583C9.375 14.1726 9.45583 13.7663 9.61288 13.3871C9.76992 13.008 10.0001 12.6635 10.2903 12.3733C10.5805 12.0831 10.925 11.8529 11.3041 11.6959C11.6833 11.5388 12.0896 11.458 12.5 11.458C13.3288 11.458 14.1237 11.7872 14.7097 12.3733C15.2958 12.9593 15.625 13.7542 15.625 14.583C15.625 15.4118 15.2958 16.2067 14.7097 16.7927C14.1237 17.3788 13.3288 17.708 12.5 17.708Z"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                          <button onClick={() => { setSelectedListing(listing); showEditListing(true) }} className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md rounded-full  text-xs">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M16 5.00011L19 8.00011M20.385 6.58511C20.7788 6.19126 21.0001 5.65709 21.0001 5.10011C21.0001 4.54312 20.7788 4.00895 20.385 3.61511C19.9912 3.22126 19.457 3 18.9 3C18.343 3 17.8088 3.22126 17.415 3.61511L9 12.0001V15.0001H12L20.385 6.58511Z"
                                stroke="white"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </button>
                          <button onClick={() => { setSelectedListing(listing); setShowDeleteListing(true) }} className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md rounded-full  text-xs">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.39989 18.3079L5.69189 17.5999L11.2919 11.9999L5.69189 6.39989L6.39989 5.69189L11.9999 11.2919L17.5999 5.69189L18.3079 6.39989L12.7079 11.9999L18.3079 17.5999L17.5999 18.3079L11.9999 12.7079L6.39989 18.3079Z"
                                fill="#FF0000"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))



              }




            </div>
          </div>

          {/* Opening Add Homes */}
          {createListing && (
            <div className="fixed left-0 top-0 bg-black/90 w-full h-full z-20">
              <button
                onClick={()=>showCreateListing(false)}
                className="absolute right-2 top-2 p-4 flex justify-center items-center z-50"
              >
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
                ></span>
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
                ></span>
              </button>

              <CreateListing />
            </div>
          )}
          {/* Opening Add Homes */}
          {editListing && selectedListing && (
            <div className="fixed left-0 top-0 bg-black/90 w-full h-full z-20">
              <button
                onClick={() => showEditListing(false)}
                className="absolute right-2 top-2 p-4 flex justify-center items-center z-50"
              >
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
                ></span>
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
                ></span>
              </button>

              <EditListing listingId={selectedListing.id} />
            </div>
          )}
        </div>
        {/* Delete Listing Modal */}
        {showDeleteListing && selectedListing && (
          <div className="fixed left-0 top-0 bg-black/90 w-full h-full z-20 flex justify-center items-center">
            <button
              onClick={() => setShowDeleteListing(false)}
              className="absolute right-2 top-2 p-4 flex justify-center items-center z-50"
            >
              <span
                className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
              ></span>
              <span
                className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
              ></span>
            </button>

            <div className="bg-white w-[40%] flex flex-col items-center text-center py-4 rounded-md">
              {isError && <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] "><p className="text-red-400">{errorMsg}</p><IoIosClose className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={() => setIsError(false)} /></div>}

              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>
                <p className="font-semibold text-3xl">Confirm Delete</p>
              </div>
              <p className="mt-[5%] text-gray-400">Are you sure you want to delete listing? This action cannot be undone.</p>
              <div className="mt-[5%] w-[30%]">
                <p className="text-gray-600">{selectedListing.address}</p>
                <Image
                  src={selectedListing.pictures[0]}
                  alt="homes"
                  layout="responsive"
                  width={1}
                  height={1}
                  className="w-[100%] object-cover brightness-50 object-center contrast-125 rounded-2xl"
                />
              </div>
              <div className="mt-[8%] flex gap-4">
                <button onClick={() => setShowDeleteListing(false)} className="text-lg  ring-2 ring-gray-300 px-16 py-4 rounded-md hover:bg-gray-300 active:bg-white">Cancel</button>
                <button onClick={() => deleteListing(selectedListing.id)} className="text-lg text-white bg-red-500 px-16 py-4 rounded-md hover:bg-red-700 active:bg-red-500">Delete</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {!createListing && !editListing && !showDeleteListing && (
        <Footer />
      )}
    </div>
  );
};

export default AdminDashboard;
