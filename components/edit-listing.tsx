"use client";
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { useEdgeStore } from "@/lib/edgestore";
import Nav from "@/components/navbar";
import { IoIosClose } from "react-icons/io";

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
  });
  const [errorMsg, setErrorMsg] = useState(
    "A network issue occured. Please check your internet connection and try again."
  );
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      //creating listingdata to be sent to server to create listing
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

      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error(
        "NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created"
      );
    }
  };

  if (!fetchedListingData) {
    // Data is still loading, you can show a loading indicator or return null
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="font-agrandir ">
      <div className="flex flex-col  justify-end md:justify-center items-center min-h-screen">
        <div className=" flex flex-col justify-center items-center mt-[8rem] md:mt-[0rem]  w-full md:w-[90%] md:py-[1rem] rounded-md ">
          {isSuccess && (
            <div className="p-[1rem] bg-green-100 flex gap-3 items-center rounded-lg mb-[2rem]">
              <p className="text-green-700">Saved Listing changes.</p>
              <IoIosClose
                className=" text-green-500 h-[2rem] w-[2rem] hover:cursor-pointer"
                onClick={() => setIsSuccess(false)}
              />
            </div>
          )}
          {isError && (
            <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] ">
              <p className="text-red-400">{errorMsg}</p>
              <IoIosClose
                className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer"
                onClick={() => setIsError(false)}
              />
            </div>
          )}
          <div className="relative flex flex-col gap-12 bg-white/50 w-[90%] md:w-[70%] items-center justify-center md:flex-row md:py-[3rem] rounded-3xl shadow-md max-h-[680px]">
            <h1 className="absolute top-[10%] right-[10%] text-4xl text-white ">
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
                  className="block w-[60%]  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                />
              </div>
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
                  className="block w-[60%]  py-3 px-3 text-gray-900 shadow-sm rounded-full  border border-white focus:outline-none sm:text-sm "
                />
              </div>
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
                  className="block w-[60%]  py-3 px-3 text-gray-900 shadow-sm rounded-full placeholder:text-gray-400 border border-white focus:outline-none sm:text-sm "
                />
              </div>
              <button
                onClick={saveListing}
                className="p-4 text-white text-sm tracking-wider font-montserrat mt-4 bg-forest w-fit rounded-xl hover:opacity-80 hover:shadow-lg active:opacity-100"
              >
                Save changes
              </button>
            </form>
            <div className="md:w-[45%] md:mt-[12%]">
              <p className="text-white">Photos</p>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                initialFiles={initialFiles}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditListing;
