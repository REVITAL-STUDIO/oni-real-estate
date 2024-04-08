"use client";

import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { IoIosClose } from "react-icons/io";
import { motion } from "framer-motion";

interface FileExtended extends File {
  url?: string;
}

const CreateListing: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { edgestore } = useEdgeStore();
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const imageUrls: string[] = [];
  const [propertyType, setPropertyType] = useState("");
  const propertyTypes = ["House", "Apartment", "Duplex", "Townhouse"];
  const [location, setLocation] = useState("");
  const locations = [
    "Montrose",
    "Heights",
    "Katy",
    "Fort Bend",
    "Missouri City",
    "Pearland",
    "Cinco Ranch",
  ];
  const [availability, setAvailability] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    address: "",
    description: "",
    beds: 0,
    baths: 0,
    area: 0,
    price: 0,
  });
  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const [errorMsg, setErrorMsg] = useState(
    "A network issue occured. Please check your internet connection and try again."
  );
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //function to upload listing images to cloud storage
  const uploadFiles = async () => {
    for (const file of selectedFiles) {
      const res = await edgestore.publicFiles.upload({
        file,
      });

      //storing url to picture file stored in cloud
      imageUrls.push(res.url);
    }
  };

  //function to delete listing images from cloud storage
  // function does not work need to reimplement and test
  const deleteFiles = async () => {
    imageUrls.forEach(async (imageUrl) => {
      await edgestore.publicFiles.delete({
        url: imageUrl,
      });
    });
  };
  const createListing: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    // Validation: Check if any required fields are empty
    if (
      formData.address === "" ||
      formData.description === "" ||
      propertyType === "" ||
      location === "" ||
      availability === "" ||
      formData.beds === 0 ||
      !formData.beds ||
      formData.baths === 0 ||
      !formData.baths ||
      formData.area === 0 ||
      !formData.area ||
      formData.price === 0 ||
      !formData.price
    ) {
      setErrorMsg("Please fill out all required fields.");
      setIsError(true);
      setIsLoading(false);
      return; // Stop further execution if validation fails
    }

    try {
      await uploadFiles();

      try {
        //storing cloud stored image urls to listingdata
        //creating listingdata to be sent to server to create listing
        const listingData = {
          ...formData,
          pictures: imageUrls,
          type: propertyType,
          location: location,
          availability: availability,
        };
        const response = await fetch(`/api/listing`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listingData),
        });
        if (!response.ok) {
          if (response.status == 400) {
            setErrorMsg("A listing with the given address already exits.");
          } else {
            setErrorMsg("Error in creating Listing... please try again");
          }
          await deleteFiles();

          throw new Error(
            `HTTP ERROR - Error creating Listing. Status: ${response.status}`
          );
        } else {
          setIsSuccess(true);
          setIsLoading(false);
        }
      } catch (error) {
        setIsError(true);
        console.error(
          "NETWORK ERROR - Unable to reach the server or network issue. Error Message: ",
          error
        );
        await deleteFiles();
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      console.error(
        "NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created"
      );
      await deleteFiles();
      setIsLoading(false);
    }
  };

  return (
    <div className="font-agrandir  ">
      <div className="flex flex-col  justify-center items-center min-h-screen ">
        <div className="relative flex flex-col justify-center items-center   w-full md:w-[90%] md:py-[1rem] rounded-md ">
          {isSuccess && (
            <div className="absolute top-[5%] p-[1rem] bg-green-100 flex gap-3 items-center rounded-lg mb-[2rem] z-[1000]">
              <p className="text-green-700">Listing successfully created.</p>
              <IoIosClose
                className=" text-green-500 h-[2rem] w-[2rem] hover:cursor-pointer"
                onClick={() => setIsSuccess(false)}
              />
            </div>
          )}
          {isError && (
            <div className="absolute top-[5%] p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] z-[1000]">
              <p className="text-red-400">{errorMsg}</p>
              <IoIosClose
                className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer"
                onClick={() => setIsError(false)}
              />
            </div>
          )}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{ delay: 0.5 }} // Adding a delay of 0.8 seconds
            className="flex  p-4 md:p-8 relative flex-col bg-white/75 w-[95%] xl:w-[100%] items-center justify-center xl:justify-center  rounded-3xl shadow-md max-h-[650px] md:max-h-[800px] "
          >
            <div className="w-full  ">
              <button
                onClick={onClose}
                className="absolute right-6 top-6 p-4 flex justify-center items-center z-50"
              >
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white rotate-45 transition-transform `}
                ></span>
                <span
                  className={`block w-3/4 my-0.5 border absolute border-white -rotate-45 transition-transform `}
                ></span>
              </button>
              <h1 className=" p-4 w-full text-left text-xl md:text-3xl relative md:left-7 xl:left-10 text-white">
                {" "}
                Create a Listing
              </h1>
            </div>

            <div className="flex flex-col xl:flex-row w-full max-h-[750px] xl:h-auto items-center justify-evenly overflow-y-scroll xl:overflow-y-hidden">
              <form className="w-[90%] xl:w-[40%]  flex flex-col gap-4">
                <div>
                  <label className="py-2 text-white">Address</label>
                  <input
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC]  focus:outline-none sm:text-sm "
                  />
                </div>
                <div>
                  <label className="py-2 text-white">Description</label>
                  <input
                    name="description"
                    type="text"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                  />
                </div>
                <div>
                  <label className="py-2 text-white"># Beds</label>
                  <input
                    name="description"
                    type="number"
                    required
                    value={formData.beds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beds: parseInt(e.target.value, 10),
                      })
                    }
                    className="block w-[60%] border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="py-2 text-white"># Baths</label>
                    <input
                      name="baths"
                      type="number"
                      required
                      value={formData.baths}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          baths: parseInt(e.target.value, 10),
                        })
                      }
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                    />
                  </div>
                  <div className="w-[35%]">
                    <label className="py-2 text-white">Property Type</label>
                    <select
                      required
                      value={propertyType}
                      onChange={(e) => {
                        setPropertyType(e.target.value);
                      }}
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
                    >
                      <option value="">Select Type</option>
                      {propertyTypes.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="py-2 text-white">Area</label>
                    <input
                      name="description"
                      type="number"
                      required
                      value={formData.area}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          area: parseInt(e.target.value, 10),
                        })
                      }
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                    />
                  </div>
                  <div className="w-[35%]">
                    <label className="py-2 text-white">Location</label>
                    <select
                      required
                      value={location}
                      onChange={(e) => {
                        setLocation(e.target.value);
                      }}
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
                    >
                      <option value="">Select Location</option>
                      {locations.map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <label className="py-2 text-white">Price</label>
                    <input
                      name="description"
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: parseInt(e.target.value, 10),
                        })
                      }
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                    />
                  </div>
                  <div className="w-[35%]">
                    <label className="py-2 text-white">Availability</label>
                    <select
                      required
                      value={availability}
                      onChange={(e) => {
                        setAvailability(e.target.value);
                      }}
                      className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
                    >
                      <option value="">Select Availability</option>
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={createListing}
                  className="hidden md:block p-4 text-white text-sm tracking-wider font-montserrat transition ease-in-out duration-150 bg-forest/90 hover:bg-forest w-fit rounded-xl  hover:shadow-lg active:opacity-100"
                >
                  {isLoading ? (
                    <div className="h-6 w-6 border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                  ) : (
                    "Create Listing"
                  )}
                </button>
              </form>
              <div className="w-[85%] md:w-[45%] xl:w-1/2 mt-4 xl:mt-0">
                <p className="text-white">Photos</p>
                <FileUpload onFilesSelected={handleFilesSelected} />
              </div>
              <button
                onClick={createListing}
                className="md:hidden p-4 text-white text-sm tracking-wider font-montserrat transition ease-in-out duration-150 bg-forest/90 hover:bg-forest w-fit rounded-xl  hover:shadow-lg active:opacity-100 mb-[6rem]"
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                ) : (
                  "Create Listing"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
