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
import { AnimatePresence, motion } from "framer-motion";
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
      const res = await fetch(`/api/listing/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user.email,
        }),
      });
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
      const res = await fetch(`/api/listing/favorites`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session?.user.email,
          listingId: id,
        }),
      });
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
          className="w-[90%] h-[75%] md:h-90% bg-gray-200  shadow-2xl rounded-2xl flex flex-col xl:flex-row"
        >
          {/* Profile */}
          <AnimatePresence>
            <div
              key="profile"
              className="xl:w-1/3 w-full  h-full md:h-1/2 xl:h-full flex justify-center items-center "
            >
              {/* Profile Circle */}
              <div className="w-full md:h-full flex justify-center items-center">
                <div className="w-3/4 md:w-5/6 h-5/6 md:h-4/6  xl:w-3/5 xl:h-3/6 rounded-2xl bg-white shadow-md  flex flex-col  items-center xl:py-2">
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
                      <div className="w-28 h-28 bg-gray-300/20 inset-0 rounded-2xl shadow-md flex justify-center items-center">
                        <h2 className="text-3xl text-black font-montserrat">
                          {userData &&
                            userData.name &&
                            userData.name.charAt(0).toUpperCase()}
                        </h2>
                      </div>
                      <div className="absolute w-7 h-7 bg-blue-500 shadow-sm left-3 bottom-2 rounded-full flex justify-center items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          size="sm"
                          className="w-4  h-4 text-white"
                        />
                      </div>
                    </div>
                  </div>
                  {/* User info */}
                  <div className=" h-1/6 flex flex-col justify-center items-center gap-2 py-2">
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
            <div className="xl:w-2/3 w-full h-full md:h-1/2 xl:h-full flex justify-center items-center">
              <div className="xl:w-[95%] xl:h-[90%] w-3/4 h-5/6 rounded-2xl bg-white shadow-md">
                <div className="w-1/4 h-1/6 xl:w-[10%] flex justify-center">
                  <FontAwesomeIcon
                    className="text-mint p-4 w-6 h-6"
                    icon={faHouse}
                  />
                </div>
                {homes.length === 0 ? (
                  <div className="w-full h-5/6 flex flex-col justify-evenly items-center">
                    <Link
                      className="w-28 h-28 bg-gray-300/20 shadow-lg rounded-2xl flex justify-center items-center hover:shadow-2xl transition duration-300 ease-in-out"
                      href="/listings"
                    >
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="w-8 h-8 text-black"
                        size="lg"
                      />
                    </Link>
                    <p className="bg-black/75 p-4 text-white rounded-full text-xs md:text-sm">
                      List is currently empty.
                    </p>
                  </div>
                ) : (
                  <ul className="w-full h-[75%] flex flex-col items-center overflow-y-scroll">
                    {homes.map((home) => (
                      <li
                        key={home.id}
                        className="md:w-5/6 w-[90%] relative h-[50%] rounded-2xl my-4 bg-to-gradient-l from-black via-white/30 to-transparent shadow-md transition duration-150 ease-in-out"
                      >
                        <Image
                          src={home.pictures[0]}
                          alt="homes"
                          layout="fill"
                          className="w-[100%] object-cover brightness-50 object-center contrast-125 rounded-2xl"
                        />
                        <div className="absolute top-1/4 md:top-1/2 w-full flex justify-between">
                          <h2 className="font-montserrat w-3/4 md:w-1/3 text-sm md:text-base text-white px-4">
                            {home.address}
                          </h2>
                          <div className="md:w-1/6 w-1/3 flex justify-evenly">
                            <button
                              onClick={() => handlePropertyInfo(home)}
                              className="md:w-10 md:h-10 w-6 h-6 flex justify-center items-center"
                            >
                              {/* Your SVG code for property info */}
                            </button>

                            <button
                              onClick={() => removeProperty(home.id)} // Pass the ID of the property to remove
                              className="md:w-10 md:h-10 w-6 h-6 flex justify-center items-center"
                            >
                              {/* Your SVG code for removing property */}
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
