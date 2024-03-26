"use client";

import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
  faPenToSquare,
  faCheck,
  faPlus,
  faUser,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion  } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileSettings from "./ProfileSettings";
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

interface User {
  id: string;
  name: string;
  email: string;
  number: string;
}

const Dashboard = () => {
  const { data: session, status } = useSession(); // Include status to check if session data is loading
  const [userData, setUserData] = useState<User>();
  const [userDataEdit, setUserDataEdit] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [propertyInfo, openPropertyInfo] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);


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



  // Fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${session?.user.email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    // Only fetch user data if session is available and not loading
    if (session && status === "authenticated" && session.user.role == "user") {
      fetchUserData();
      receiveListing();
    } else if (status === "loading") {
      // Session is still loading, do nothing or show a loading indicator
    } else {
      // No active session, redirect to login page
      router.push("/listings");
    }
  }, [session, status, router]);


  //Open menu
  const [openMenu, setOpenMenu] = useState(false);

  // Set overflow property when component mounts and unmounts
  useEffect(() => {
    document.body.style.overflow = openMenu || openMenu ? "hidden" : "auto";

    // Cleanup function
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openMenu]);


  //will contain array of listings data retrieved from db
  const [homes, setHomes] = useState<Listing[]>([]);

  //POST request for retrieving the saved listing
  const receiveListing = async () => {
    try {
      console.log("Homes:", homes);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/favorites`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
          }),
        }
      );
      if (res.ok) {
        const data: Listing[] = await res.json();
        setHomes(data);
        console.log("Retrieved Favorites: ", data);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error receiving Listing", error);
    }
  };

  //Delete request for deleting the saved listing
  const deleteListing = async (id: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/favorites`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: session?.user.email,
            listingId: id,
          }),
        }
      );
      if (res.ok) {
        const data: Listing[] = await res.json();
        setHomes(data);
        console.log("Delete Favorites: ", data);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error("Error deleting Listing", error);
    }
  };

  //deleting favorite listing from user dashboard
  const removeProperty = async (id: number) => {
    try {
      // Call deleteListing function to delete the property from the server
      await deleteListing(id);

      // Update the homes state after successful deletion
      if (homes) {
        const updatedHomes = homes.filter((home) => home.id !== id);
        setHomes(updatedHomes);
        console.log("Removing Home:", updatedHomes);
      } else {
        throw new Error("Homes state is null or undefined.");
      }
    } catch (error) {
      console.error("Error Removing Property, please try again later", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="h-20 w-20 border-4 border-mint rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
      </div>
    );
  }
  if (!isLoading && userData && userDataEdit) {
    return (
      <div className="w-full h-screen flex justify-center items-center ">
        <motion.div
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeIn", duration: 0.8 }}
          className="w-[90%] h-[80%] md:h-90% bg-gray-200  shadow-2xl rounded-2xl flex flex-col xl:flex-row"
        >
          {/* Profile */}
          <AnimatePresence>
            <div
              key="profile"
              className="xl:w-1/3 w-full  h-full md:h-1/2 xl:h-full flex justify-center items-center "
            >
              {/* Profile Circle */}
              <div className="w-full md:h-full flex justify-center items-center">
                <div className="w-4/5 md:w-5/6 h-5/6 md:h-4/6  xl:w-3/5 xl:h-3/6 rounded-2xl bg-white shadow-md  flex flex-col  items-center xl:py-2">
                  <div className="w-5/6 h-1/6 flex items-center justify-between">
                    <FontAwesomeIcon
                      className="text-mint"
                      icon={faUser}
                      size="lg"
                    />
                    <button
                      onClick={() => setOpenMenu(true)}
                      className="w-8 h-8 hover:bg-gray-100/20 rounded-full bg-white shadow-md flex justify-center items-center transition duration-200 ease-in-out"
                    >
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        className="w-5 h-5 text-black"
                      />
                    </button>
                  </div>
                  {/* Profile Picture */}
                  <div className="w-full h-2/3 flex justify-center items-center">
                    <div className="w-44 h-44 relative rounded-2xl flex justify-center items-center">
                      <div className="w-36 h-36 bg-gray-300/20 inset-0 rounded-2xl shadow-md flex justify-center items-center">
                        <h2 className="text-3xl text-black font-montserrat">
                          {userData &&
                            userData.name &&
                            userData.name.charAt(0).toUpperCase()}
                        </h2>
                      </div>
                      <div className="absolute w-7 h-7 bg-blue-500 shadow-sm left-0 bottom-0 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="sm"
                          className="w-4  h-4 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  {/* User info */}
                  <div className=" h-1/6 flex flex-col justify-center items-center gap-2">
                    <h2 className="font-agrandir py-1 px-4 flex justify-center items-center text-sm  bg-black/75 rounded-full text-white tracking-wider">
                      {userData.name}
                    </h2>
                    <h2 className="text-sm font-montserrat">
                      {userData.email}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </AnimatePresence>
          {/* Saved Listing */}
          <AnimatePresence>
            <div className="xl:w-2/3 w-full h-full md:h-1/2 xl:h-full  flex justify-center items-center ">
              <div className="xl:w-[95%] xl:h-[90%] w-4/5 h-[80%]  rounded-2xl bg-white shadow-md overflow-y-scroll">
                <section className="w-1/4 h-1/6 xl:w-[10%] flex justify-center">
                  <FontAwesomeIcon
                    className="text-mint p-4 w-6 h-6"
                    icon={faHouse}
                  />
                </section>
                <ul className="w-full h-5/6 flex flex-col items-center ">
                  {homes.length === 0 ? (
                    <div className="w-full h-5/6 flex flex-col justify-evenly items-center">
                      <Link
                        className="w-32 h-32 bg-gray-300/20 shadow-lg rounded-2xl flex justify-center items-center  hover:shadow-2xl  transition duration-300 ease-in-out"
                        href="/listings"
                      >
                        <FontAwesomeIcon
                          icon={faPlus}
                          className=" w-8 h-8 text-black"
                          size="lg"
                        />
                      </Link>
                      <p className="bg-black/75 py-1 px-4 text-white rounded-full text-sm">
                        List is currently empty.
                      </p>
                    </div>
                  ) : (
                    homes.map((home) => (
                      <li
                        key={home.id}
                        className="md:w-5/6 w-[90%] relative h-1/3  rounded-2xl my-4  bg-to-gradient-l from-black via-white/30 to-transparent shadow-md transition duration-150 ease-in-out"
                      >
                        <Image
                          src={home.pictures[0]}
                          alt="homes"
                          layout="fill"
                          className="w-[100%] object-cover brightness-50 object-center contrast-125 rounded-2xl"
                        />
                        <div className="absolute top-1/4 md:top-2/5 w-full flex  justify-between">
                          <h2 className=" font-montserrat w-3/4 md:w-1/3 text-sm md:text-base text-white px-4">
                            {home.address}
                          </h2>
                          <div className="md:w-1/6 w-1/3 flex justify-evenly">
                            <button
                              onClick={() => handlePropertyInfo(home)}
                              className="md:w-10 md:h-10 w-6 h-6 flex justify-center items-center"
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
                              onClick={() => removeProperty(home.id)} // Pass the ID of the property to remove
                              className="md:w-10 md:h-10 w-6 h-6 flex justify-center items-center"
                            >
                              <svg
                                width="25"
                                height="25"
                                viewBox="0 0 25 25"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8.59375 11.7188H16.4062C16.6135 11.7188 16.8122 11.8011 16.9587 11.9476C17.1052 12.0941 17.1875 12.2928 17.1875 12.5C17.1875 12.7072 17.1052 12.9059 16.9587 13.0524C16.8122 13.1989 16.6135 13.2812 16.4062 13.2812H8.59375C8.38655 13.2812 8.18784 13.1989 8.04132 13.0524C7.89481 12.9059 7.8125 12.7072 7.8125 12.5C7.8125 12.2928 7.89481 12.0941 8.04132 11.9476C8.18784 11.8011 8.38655 11.7188 8.59375 11.7188Z"
                                  fill="#FF0000"
                                />
                                <path
                                  d="M12.5 21.875C13.7311 21.875 14.9502 21.6325 16.0877 21.1614C17.2251 20.6902 18.2586 19.9997 19.1291 19.1291C19.9997 18.2586 20.6902 17.2251 21.1614 16.0877C21.6325 14.9502 21.875 13.7311 21.875 12.5C21.875 11.2689 21.6325 10.0498 21.1614 8.91234C20.6902 7.77492 19.9997 6.74142 19.1291 5.87087C18.2586 5.00032 17.2251 4.30977 16.0877 3.83863C14.9502 3.36749 13.7311 3.125 12.5 3.125C10.0136 3.125 7.62903 4.11272 5.87087 5.87087C4.11272 7.62903 3.125 10.0136 3.125 12.5C3.125 14.9864 4.11272 17.371 5.87087 19.1291C7.62903 20.8873 10.0136 21.875 12.5 21.875ZM12.5 23.4375C9.59919 23.4375 6.8172 22.2852 4.76602 20.234C2.71484 18.1828 1.5625 15.4008 1.5625 12.5C1.5625 9.59919 2.71484 6.8172 4.76602 4.76602C6.8172 2.71484 9.59919 1.5625 12.5 1.5625C15.4008 1.5625 18.1828 2.71484 20.234 4.76602C22.2852 6.8172 23.4375 9.59919 23.4375 12.5C23.4375 15.4008 22.2852 18.1828 20.234 20.234C18.1828 22.2852 15.4008 23.4375 12.5 23.4375Z"
                                  fill="#FF0000"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              {/* House details */}
            </div>
          </AnimatePresence>
        </motion.div>
        <AnimatePresence>
          {propertyInfo && selectedListing && (
            <PropertyInfo
              selectedListing={selectedListing}
              handleClose={handleClose}
            />
          )}
        </AnimatePresence>
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

export default Dashboard;
