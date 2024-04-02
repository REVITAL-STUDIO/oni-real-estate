"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  faPenToSquare,
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CreateListing from "./create-listing";
import EditListing from "./edit-listing";
import { IoIosClose } from "react-icons/io";
import { useEdgeStore } from "@/lib/edgestore";
import LeadInfo from "./LeadInfo";
import PropertyInfo from "./PropertyInfo";
import { useSession } from "next-auth/react";
import ProfileSettings from "./ProfileSettings";

interface Lead {
  id: number;
  name: string;
  number: string;
  email: string;
  message: string;
  status: string;
  source: string;
  color: string;
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

interface User {
  id: string;
  name: string;
  email: string;
  number: string;
}

const AdminDashboard = () => {
  const { edgestore } = useEdgeStore();
  const { data: session, status } = useSession();
  //will contain array of listings data retrieved from db
  const [listings, setListings] = useState<Listing[]>([]);
  // will contain leads fetch from db
  const [leads, setLeads] = useState<Lead[]>([]);
  //used to display loading state to user when fetching listings
  const [loadingListings, setLoadingListings] = useState(true);
  const [loadingLeads, setLoadingLeads] = useState(true);
  // used to display an error messages to user
  const [errorMsg, seterrorMsg] = useState("");
  // variable to keep track of which listing user selects to view
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // variable to indicate when data has been recieved
  const [fetchedListingsData, setFetchedListingsData] = useState(false);
  const [fetchedLeadsData, setFetchedLeadsData] = useState(false);

  const [showDeleteLead, setShowDeleteLead] = useState(false);
  const [showDeleteListing, setShowDeleteListing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [listingsError, setListingsError] = useState(false);
  const [leadsError, setLeadsError] = useState(false);
  const [isLeadInfoOpen, setIsLeadInfoOpen] = useState(false);
  const [propertyInfo, openPropertyInfo] = useState(false);

  const [userData, setUserData] = useState<User>();
  const [userDataEdit, setUserDataEdit] = useState<User>();
  const [openMenu, setOpenMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
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

      const user: User = await response.json();
      setUserData(user);
      setUserDataEdit(user);
      setIsLoading(false);
    } catch (error) {
      console.log("Error Fetching User Data: ", error);
    }
  };

  useEffect(() => {
    if (session && status === "authenticated") {
      fetchUserData();
    }
  }, [session, status]);

  const handlePropertyInfo = (listing: Listing) => {
    //the listing to show in the property info page
    setSelectedListing(listing);
    openPropertyInfo((prevOpen) => !prevOpen);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    openPropertyInfo(false);
    document.body.style.overflow = "auto";
  };

  const handleOpenLeadInfo = () => {
    setIsLeadInfoOpen(true);
  };

  const handleCloseLeadInfo = () => {
    setIsLeadInfoOpen(false);
    fetchLeads();
  };
  const colorizeStatus = (status: string) => {
    console.log("In colorize func: ", status);
    switch (status) {
      case "new":
        return <div className="w-4 h-4 rounded-full bg-green-500"></div>;
      case "contacted":
        return <div className="w-4 h-4 rounded-full bg-yellow-500"></div>;
      case "converted":
        return <div className="w-4 h-4 rounded-full bg-blue-500"></div>;
      default:
        return <span className="text-gray-500">No Status</span>;
    }
  };

  const fetchLeads = async () => {
    setFetchedLeadsData(false);
    setLeadsError(false);
    setLoadingLeads(true);
    try {
      //requet to get listing data from api
      const response = await fetch(`/api/leads`, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error fetching Leads");
      }
      const data: Lead[] = await response.json();
      //setting listings data to Listings state variable
      data.sort((a, b) => a.name.localeCompare(b.name));
      setLeads(data);
      setFetchedLeadsData(true);
    } catch (error) {
      console.error(error);
      setLeadsError(true);
    } finally {
      setLoadingLeads(false);
      console.log("Leads: ", leads);
    }
  };
  const deleteLead = async (leadId: number) => {
    try {
      const response = await fetch(`/api/leads`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(leadId),
      });

      if (!response.ok) {
        throw new Error("Failed to delete Lead");
      }
      fetchLeads();
      setShowDeleteLead(false);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteListing = async (id: number) => {
    setIsError(false);
    try {
      //requet to get listing data from api
      const response = await fetch(`/api/listing`, {
        method: "DELETE",
        body: JSON.stringify(id),
      });
      if (!response.ok) {
        throw new Error("Error deleting Listing");
      }
      await deleteFiles();
      setShowDeleteListing(false);
      fetchListings();
    } catch (error) {
      setIsError(true);
      seterrorMsg("Error deleting Listing");
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
          console.error(error, " Error deleting image: ", url);
        }
      }
    }
  };

  const fetchListings = async () => {
    setFetchedListingsData(false);
    setLoadingListings(true);
    setListingsError(false);
    try {
      //requet to get listing data from api
      const response = await fetch(`/api/listing`, { method: "GET" });

      if (!response.ok) {
        throw new Error("Error fetching listings");
      }
      const data: Listing[] = await response.json();
      //setting listings data to Listings state variable
      setListings(data);
      setFetchedListingsData(true);
    } catch (error) {
      console.error(error);
      setListingsError(true);
      seterrorMsg(
        "Error loading listings, check network connection and try again."
      );
    } finally {
      setLoadingListings(false);
    }
  };

  // use effect so that listing data is fetched as component is loaded
  useEffect(() => {
    fetchLeads();
    fetchListings();
  }, []);

  //Opening create lisitng form
  const [createListing, setCreateListing] = useState(false);
  const showCreateListing = (isOpen: boolean) => {
    if (!isOpen) {
      fetchListings();
    }
    setCreateListing(isOpen);
  };

  const [editListing, setEditListing] = useState(false);
  const showEditListing = (isOpen: boolean) => {
    if (!isOpen) {
      fetchListings();
    }
    setEditListing(isOpen);
  };

  useEffect(() => {
    if (createListing || editListing || showDeleteListing || showDeleteLead) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [createListing, editListing, showDeleteListing, showDeleteLead]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="h-20 w-20 border-4 border-mint rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
      </div>
    );
  }

  if (!isLoading && userData && userDataEdit) {
    return (
      <div>
        <div className="w-full h-1000 border border-red-500 md:h-screen flex justify-center items-center">
          <div className="w-[90%] max-h-[80%] grid gap-y-6 grid-row-1  ">
            {/* Admin Profile */}
            <div className=" xl:col-span-1 col-span-2 row-span-2 xl:row-span-1  bg-gray-400/10 transition ease-in-out duration-100 relative rounded-2xl flex justify-center items-center shadow-lg">
              <div className="w-full h-[100%] rounded-2xl  flex flex-col">
                <div className="w-fit ">
                  <h2 className=" p-4 font-medium font-agrandir tracking-wider">
                    Profile
                  </h2>
                </div>
                {/* Profile Picture */}
                <div className="w-full h-full  flex flex-col justify-evenly  items-center">
                  <div className="w-24 h-24  rounded-2xl relative flex justify-center items-center">
                    <div className="w-full h-full  p-4  bg-white inset-0 rounded-2xl shadow-md flex justify-center items-center">
                      <h2 className="xl:text-5xl text-3xl font-montserrat">
                        {userData.name.charAt(0).toUpperCase()}
                      </h2>
                    </div>
                    <div className="absolute  w-4 h-4 bg-blue-500 shadow-xl left-[-5%] -bottom-2  rounded-full flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faCheck}
                        size="sm"
                        className="w-2  h-2 text-white"
                      />
                    </div>
                  </div>
                  <div className="w-full h-1/2 flex flex-col items-center py-4 justify-evenly">
                    <span className="text-xs font-montserrat text-black/50">
                      Agent
                    </span>
                    <span className="text-base font-montserrat tracking-4">
                      {userData.name}
                    </span>
                  </div>
                </div>
                {/* Name */}
                <div className="p-4">
                  {" "}
                  <button
                    onClick={() => setOpenMenu(true)}
                    className="w-8 h-8 bg-white hover:bg-gray-200/20 rounded-full shadow-md flex justify-center items-center transition duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="sm"
                      className="w-4 h-4"
                    />
                  </button>{" "}
                </div>
              </div>
            </div>
            {/* Leads */}
            <div className=" col-span-2 500 h-[75%] bg-gray-400/10 transition ease-in-out duration-100 rounded-2xl shadow-lg">
              {/* Lead Count */}
              {/* <div className="w-full h-[15%] flex items-center justify-between ">
                <h2 className="tracking-wider left-0  font-medium font-agrandir p-4">
                  Leads
                </h2>
                <div className=" h-full  flex p-2 gap-x-4">
                  <div className="p-4 bg-black rounded-full shadow-lg  py-0 w-32   text-white text-xs flex items-center justify-evenly">
                    <span className="text-lg">{leads.length}</span>
                    <span className="text-xs">Leads</span>
                  </div>
                </div>
              </div> */}
              {/* Leads Cards */}
              <div className="w-full max-h-[85%] overflow-y-scroll  flex justify-center ">
                {/* <div className="h-full w-full flex justify-center "> */}
                {!fetchedLeadsData && loadingLeads ? (
                  <div className="flex justify-center border  items-center h-full">
                    {" "}
                    <div className=" h-6 w-6 md:h-10 md:w-10  border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                  </div>
                ) : (
                  <div className="w-[95%] h-full   flex flex-col items-center justify-center">
                    {!leadsError &&
                      leads.map((lead) => (
                        <div
                          key={lead.id}
                          className="w-full bg-white rounded-2xl text-black shadow-lg flex justify-between items-center mb-[1rem] py-[1rem]"
                        >
                          {/* Client Lead */}
                          <div className="w-1/5 h-full flex justify-center items-center ">
                            <div
                              className={`w-10 h-10 rounded-full flex justify-center items-center ${lead.color}`}
                            >
                              <span>{lead.name.charAt(0).toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="w-1/2 px-2  flex items-center">
                            <span className="text-sm  w-full tracking-wider font-montserrat">
                              {lead.name}
                            </span>
                          </div>

                          <div className="w-1/2 h-full flex justify-between items-center">
                            <div className="relative ">
                              {colorizeStatus(lead.status)}
                            </div>
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                handleOpenLeadInfo();
                              }}
                              className="text-lg text-blue-500 flex items-center justify-center  hover:text-gray-500 active:text-blue-500"
                            >
                              view
                            </button>
                            <button
                              onClick={() => {
                                setSelectedLead(lead);
                                setShowDeleteLead(true);
                              }}
                              className="w-fit px-4 tracking-wider font-montserrat h-8 rounded-full  text-red-500 text-xs"
                            >
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
                      ))}
                    {leadsError && (
                      <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <p>
                          Oops! Something went wrong. Please try loading leads
                          again.
                        </p>
                        <button
                          onClick={() => fetchLeads()}
                          className="w-40 h-12 text-white text-xs tracking-wider font-montserrat transition ease-in-out duration-150 bg-black hover:bg-black/60  rounded-xl  hover:shadow-lg active:bg-black"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                )}
                {isLeadInfoOpen && selectedLead && (
                  <div>
                    <motion.section
                      initial={{ opacity: 0, y: -100 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -100 }}
                      transition={{ ease: "easeInOut", duration: 0.5 }}
                      className="fixed inset-0 z-50 flex justify-center items-center "
                    >
                      <LeadInfo
                        onClose={handleCloseLeadInfo}
                        selectedLead={selectedLead}
                      />
                    </motion.section>
                  </div>
                )}
              </div>
              {/* </div> */}
            </div>
            {/* Listings */}
            <div className="bg-gray-400/10 max-h-[45%] border border-blue-500 relative col-span-2 rounded-br-2xl rounded-2xl transition ease-in-out duration-100 shadow-lg">
              <div className="flex justify-between w-full items-center h-[12%] ">
                <h2 className="p-4 left-0 font-agrandir font-medium tracking-wider">
                  Listings
                </h2>
                <button
                  onClick={() => showCreateListing(true)}
                  className="p-4  w-32 text-white bg-black shadow-lg duration-200 ease-in-out transition rounded-full relative right-2 flex justify-evenly items-center text-xs hover:scale-105 active:scale-100"
                >
                  <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> add
                  listing
                </button>
              </div>
              <div className="w-full border border-blue-500 h-3/4   ">
                {!fetchedListingsData && loadingListings ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="h-6 w-6 md:h-10 md:w-10  border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                  </div>
                ) : (
                  <div>
                    {!listingsError &&
                      listings.map((listing) => (
                        <div
                          key={listing.id}
                          className="w-[95%] h-20 bg-white rounded-2xl relative  shadow-lg  flex justify-center mb-8"
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
                            <span className="px-4  font-montserrat text-white text-xs xl:text-sm xl:w-1/4 w-1/2">
                              {listing.address}
                            </span>
                            <div className="w-1/4 h-full flex justify-end relative items-center right-2 ">
                              <button
                                onClick={() => handlePropertyInfo(listing)}
                                className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md  flex justify-center items-center rounded-full  text-xs "
                              >
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
                              <button
                                onClick={() => {
                                  setSelectedListing(listing);
                                  showEditListing(true);
                                }}
                                className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md rounded-full  text-xs"
                              >
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
                              <button
                                onClick={() => {
                                  setSelectedListing(listing);
                                  setShowDeleteListing(true);
                                }}
                                className=" p-4 tracking-wider font-montserrat hover:bg-white/40 hover:shadow-md rounded-full  text-xs"
                              >
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
                      ))}
                    {listingsError && (
                      <div className="w-full h-full flex flex-col gap-3 justify-center items-center">
                        <p>
                          Oops! Something went wrong. Please try loading
                          listings again.
                        </p>
                        <button
                          onClick={() => fetchListings()}
                          className="w-40 h-12 text-white text-xs tracking-wider font-montserrat transition ease-in-out duration-150 bg-black hover:bg-black/60  rounded-xl  hover:shadow-lg active:bg-black"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Opening Add Homes */}
            {createListing && (
              <AnimatePresence>
                <motion.div
                  variants={{
                    visible: { opacity: 1 },
                    exit: { opacity: 0 }, // Define exit variant with opacity 0
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ ease: "easeInOut", duration: 1 }}
                  className="fixed left-0 top-0 bg-black/95 w-full h-full z-50"
                >
                  <button
                    onClick={() => showCreateListing(false)}
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
                </motion.div>
              </AnimatePresence>
            )}
            {/* Opening Add Homes */}
            {editListing && selectedListing && (
              <AnimatePresence>
                <motion.div
                  variants={{
                    visible: { opacity: 1 },
                    exit: { opacity: 0 }, // Define exit variant with opacity 0
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ ease: "easeInOut", duration: 1 }}
                  className="fixed left-0 top-0 bg-black/90 w-full h-full z-50"
                >
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
                </motion.div>
              </AnimatePresence>
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
                {isError && (
                  <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] ">
                    <p className="text-red-400">{errorMsg}</p>
                    <IoIosClose
                      className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer"
                      onClick={() => setIsError(false)}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="font-semibold text-3xl">Confirm Delete</p>
                </div>
                <p className="mt-[5%] text-gray-400">
                  Are you sure you want to delete listing? This action cannot be
                  undone.
                </p>
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
                  <button
                    onClick={() => setShowDeleteListing(false)}
                    className="text-lg  ring-2 ring-gray-300 px-16 py-4 rounded-md hover:bg-gray-300 active:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteListing(selectedListing.id)}
                    className="text-lg text-white bg-red-500 px-16 py-4 rounded-md hover:bg-red-700 active:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Delete Lead Modal */}
          {showDeleteLead && selectedLead && (
            <div className="fixed left-0 top-0 bg-black/90 w-full h-full z-20 flex justify-center items-center">
              <button
                onClick={() => setShowDeleteLead(false)}
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
                {isError && (
                  <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] ">
                    <p className="text-red-400">{errorMsg}</p>
                    <IoIosClose
                      className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer"
                      onClick={() => setIsError(false)}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-12 h-12 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                    />
                  </svg>
                  <p className="font-semibold text-3xl">Confirm Delete</p>
                </div>
                <p className="mt-[5%] text-gray-400">
                  Are you sure you want to delete lead? This action cannot be
                  undone.
                </p>
                <div className="mt-[2%] w-[30%]">
                  <p className="text-gray-900 font-semibold text-lg">
                    {selectedLead.name}
                  </p>

                  <p className="text-gray-600">"{selectedLead.message}"</p>
                </div>
                <div className="mt-[8%] flex gap-4">
                  <button
                    onClick={() => setShowDeleteLead(false)}
                    className="text-lg  ring-2 ring-gray-300 px-16 py-4 rounded-md hover:bg-gray-300 active:bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteLead(selectedLead.id)}
                    className="text-lg text-white bg-red-500 px-16 py-4 rounded-md hover:bg-red-700 active:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
          <AnimatePresence>
            {propertyInfo && selectedListing && (
              <PropertyInfo
                selectedListing={selectedListing}
                handleClose={handleClose}
              />
            )}
          </AnimatePresence>
        </div>
        {!createListing &&
          !editListing &&
          !showDeleteListing &&
          !propertyInfo && <Footer />}

        {/* User Profile settings */}
        <ProfileSettings
          openMenu={openMenu}
          setOpenMenu={setOpenMenu}
          userInfo={userData}
          setUserInfo={setUserData}
        />
      </div>
    );
  }
};

export default AdminDashboard;
