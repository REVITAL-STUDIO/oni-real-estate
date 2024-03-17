"use client";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { useEdgeStore } from "@/lib/edgestore";
import { IoIosClose } from "react-icons/io";
import { motion, useAnimation } from "framer-motion";

interface Listing {
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

interface FileExtended extends File {
  url?: string;
}

const EditListing: React.FC<{ listingId: number }> = ({ listingId }) => {
  const { edgestore } = useEdgeStore();
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
  const [initialFiles, setInitialFiles] = useState<FileExtended[]>([]);
  const [initialUrls, setInitialUrls] = useState<string[]>([]);
  const [fetchedListingData, setFetchedListingData] = useState(false);
  const [listingData, setListingData] = useState({
    address: "",
    description: "",
    beds: 0,
    baths: 0,
    area: 0,
    price: 0,
    type: "",
    location: "",
    availability: "",
  });
  const [errorMsg, setErrorMsg] = useState(
    "A network issue occured. Please check your internet connection and try again."
  );
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const propertyTypes = ["House", "Apartment", "Duplex", "Townhouse"];
  const locations = ["Montrose", "Heights", "Katy", "Fort Bend", "Missouri City", "Pearland", "Cinco Ranch"];
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchListingData();
  }, [listingId]);

  // Fetch listing data based on ID
  const fetchListingData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/${listingId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error retrieving listing infromation");
      }

      const listing: Listing = await response.json();
      //populating listing data from retrieved listing
      setListingData({
        address: listing.address,
        description: listing.description,
        beds: listing.beds,
        baths: listing.baths,
        area: listing.area,
        price: listing.price,
        type: listing.type,
        location: listing.location,
        availability: listing.availability,
      });

      let files = await Promise.all(
        listing.pictures.map(async (url) => {
          return await urlToFile(url);
        })
      );
      setInitialUrls(listing.pictures);
      setInitialFiles(files);
      setSelectedFiles(files);
      setFetchedListingData(true);
      console.log("###### listing Data: ", listing)
    } catch (error) {
      console.log("Error Fetching Listing Data: ", error);
    }
  };

  //function to upload listing images to cloud storage
  // returns an array of newly uploaded files urls
  const uploadFiles = async (files: FileExtended[]) => {
    let fileUrls = [];
    for (const file of files) {
      const res = await edgestore.publicFiles.upload({
        file,
      });

      fileUrls.push(res.url);
    }

    return fileUrls;
  };

  //function to delete listing images from cloud storage
  const deleteFiles = async (urls: string[]) => {
    for (const url of urls) {
      try {
        await edgestore.publicFiles.delete({
          url: url,
        });
      } catch (error) {
        console.error(error, " Error deleting image: ", url);
      }
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  const urlToFile = async (url: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const filename = url.substring(url.lastIndexOf("/") + 1);
    let file: FileExtended = new File([blob], filename, { type: blob.type });
    file.url = url;
    return file;
  };

  const getFilesToDelete = () => {
    let urlsInSelected = selectedFiles.map((file) => {
      if (file.url) {
        return file.url;
      }
    });
    let filesToDelete = initialFiles.filter(
      (file) => !urlsInSelected.includes(file.url)
    );
    return filesToDelete;
  };

  const saveListing: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    // Validation: Check if any required fields are empty
    if (
      listingData.address === "" ||
      listingData.description === "" ||
      listingData.type === "" ||
      listingData.location === "" ||
      listingData.availability === "" ||
      listingData.beds === 0 || !listingData.beds ||
      listingData.baths === 0 || !listingData.baths ||
      listingData.area === 0 || !listingData.area ||
      listingData.price === 0 || !listingData.price 
    ) {
      setErrorMsg("Please fill out all required fields.");
      setIsError(true);
      setIsLoading(false);
      return; // Stop further execution if validation fails
    }

    //added files don't have a url yet
    let filesToUpload = selectedFiles.filter((file) => !file.url);
    let newUrls: string[] = [];
    let filesToDelete = getFilesToDelete();
    let urlsToDelete: any[] = filesToDelete.map((file) => file.url);
    let urlsToStore: any[] = initialUrls;

    try {
      if (filesToUpload.length > 0) {
        //uploading the newly added files and adding there urls to urlsToStore
        newUrls = await uploadFiles(filesToUpload);
        newUrls.forEach((url) => urlsToStore.push(url));
      }

      if (filesToDelete.length > 0) {
        //removing the urls of the deleted files from urlsToStore
        urlsToStore = urlsToStore.filter((url) => !urlsToDelete.includes(url));
        await deleteFiles(urlsToDelete);
      }

      //storing cloud stored image urls to listingdata
      //creating listingdata to be sent to server to edit listing
      let data = { ...listingData, pictures: urlsToStore };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/${listingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        setErrorMsg("Error in saving listing Changes... please try again");
        //revert changes made in cloud storage if saving fails
        if (filesToUpload.length > 0) {
          await deleteFiles(newUrls);
        }
        if (filesToDelete.length > 0) {
          await uploadFiles(filesToDelete);
        }
        throw new Error(
          `HTTP ERROR - Error editing Listing. Status: ${response.status}`
        );
      }
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error(
        "NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created"
      );
      setIsLoading(false);
    }
  };

  if (!fetchedListingData) {
    // Data is still loading, you can show a loading indicator or return null
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div className="h-8 w-8 border-4 border-white rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="font-agrandir">
      <div className="flex flex-col  justify-center md:justify-center items-center min-h-screen">
        <div className=" relative flex flex-col justify-center items-center  md:mt-[0rem]  w-full md:w-[90%] md:py-[1rem] rounded-md ">
          {isSuccess && (
            <div className="absolute top-[5%] p-[1rem] bg-green-100 flex gap-3 items-center rounded-lg mb-[2rem] z-[1000]">
              <p className="text-green-700">Saved Listing changes.</p>
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
            className="relative overflow-y-scroll flex flex-col gap-12 bg-white/75 w-[90%] md:w-[100%] items-center md:justify-center md:flex-row md:py-[3rem] rounded-3xl shadow-md max-h-[800px]"
          >
            <div className="w-full h-fit md:hidden flex items-center">
              <h1 className="  block md:hidden p-4 relative left-4 text-4xl text-white ">
                Edit Listing
              </h1>
            </div>
            <h1 className="absolute top-[10%] hidden md:block right-[10%] text-4xl text-white ">
              Edit Listing
            </h1>
            <form className="w-[85%] md:w-[40%] flex flex-col gap-4">
              <div>
                <label className="py-2 text-white">Address</label>
                <input
                  name="address"
                  type="text"
                  required
                  value={listingData.address}
                  onChange={(e) =>
                    setListingData({ ...listingData, address: e.target.value })
                  }
                  className="block w-full  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white  focus:outline-none sm:text-sm "
                />
              </div>
              <div>
                <label className="py-2 text-white">Description</label>
                <input
                  name="description"
                  type="text"
                  required
                  value={listingData.description}
                  onChange={(e) =>
                    setListingData({
                      ...listingData,
                      description: e.target.value,
                    })
                  }
                  className="block w-full  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                />
              </div>
              <div>
                <label className="py-2 text-white"># Beds</label>
                <input
                  name="description"
                  type="number"
                  required
                  value={listingData.beds}
                  onChange={(e) =>
                    setListingData({
                      ...listingData,
                      beds: parseInt(e.target.value, 10),
                    })
                  }
                  className="block w-[60%]  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                />
              </div>
              <div className="flex justify-between">
                <div>
                  <label className="py-2 text-white"># Baths</label>
                  <input
                    name="baths"
                    type="number"
                    required
                    value={listingData.baths}
                    onChange={(e) =>
                      setListingData({
                        ...listingData,
                        baths: parseInt(e.target.value, 10),
                      })
                    }
                    className="block w-full  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                  />
                </div>
                <div className="w-[35%]">
                  <label className="py-2 text-white">Property Type</label>
                  <select
                    required
                    value={listingData.type}
                    onChange={(e) =>
                      setListingData({ ...listingData, type: e.target.value })
                    } className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
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
                    value={listingData.area}
                    onChange={(e) =>
                      setListingData({
                        ...listingData,
                        area: parseInt(e.target.value, 10),
                      })
                    }
                    className="block w-full  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                  />
                </div>
                <div className="w-[35%]">
                  <label className="py-2 text-white">Location</label>
                  <select
                    required
                    value={listingData.location}
                    onChange={(e) =>
                      setListingData({ ...listingData, location: e.target.value })
                    } className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
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
                    value={listingData.price}
                    onChange={(e) =>
                      setListingData({
                        ...listingData,
                        price: parseInt(e.target.value, 10),
                      })
                    }
                    className="block w-full  py-3 px-3 text-gray-900 shadow-sm rounded-full placeholder:text-gray-400 border border-white focus:outline-none sm:text-sm "
                  />
                </div>
                <div className="w-[35%]">
                  <label className="py-2 text-white">Availability</label>
                  <select
                    required
                    value={listingData.availability}
                    onChange={(e) =>
                      setListingData({ ...listingData, availability: e.target.value })
                    } className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm hover:cursor-pointer"
                  >
                    <option value="">Select Availability</option>
                    <option value="Sale">
                      For Sale
                    </option>
                    <option value="Rent">
                      For Rent
                    </option>
                  </select>

                </div>
              </div>
              <button
                onClick={saveListing}
                className="p-4 text-white text-sm tracking-wider font-montserrat mt-4 bg-forest w-fit rounded-xl hover:opacity-80 hover:shadow-lg active:opacity-100"
              >
                {isLoading ? (
                  <div className="h-6 w-6 border-4 border-black rounded-full border-solid border-t-0 border-r-0 border-b-4 border-l-4 animate-spin"></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </form>
            <div className="w-[85%] md:w-[45%] md:mt-[12%]">
              <p className="text-white">Photos</p>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                initialFiles={initialFiles}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
