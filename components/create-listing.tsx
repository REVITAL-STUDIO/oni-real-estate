"use client";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { IoIosClose } from "react-icons/io";

const CreateListing = () => {
  const { edgestore } = useEdgeStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const imageUrls: string[] = [];
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
    console.log("File array: ", files);
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
      console.log("##### upload image object: ", res);
      console.log("##### upload image object URL: ", res.url);

      //storing url to picture file stored in cloud
      imageUrls.push(res.url);
    }
  };

  //function to delete listing images from cloud storage
  const deleteFiles = async () => {
    imageUrls.forEach(async (imageUrl) => {
      await edgestore.publicFiles.delete({
        url: imageUrl,
      });
    });
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsError(false);
    console.log(
      "########## HANDLE SUBMIT FUNCTION CALLED AND IN FUNCITON SCOPE"
    );
    try {
      await uploadFiles();

      try {
        //storing cloud stored image urls to listingdata
        console.log("###################### IMAGE URLS ARRAY: ", imageUrls);
        //creating listingdata to be sent to server to create listing
        let listingData = { ...formData, pictures: imageUrls };
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(listingData),
          }
        );
        if (!response.ok) {
          setErrorMsg("Error in creating Listing... please try again");
          await deleteFiles();
          throw new Error(
            `HTTP ERROR - Error creating Listing. Status: ${response.status}`
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(
          "NETWORK ERROR - Unable to reach the server or network issue. Error Message: ",
          error
        );
        await deleteFiles();
      }
      setIsSuccess(true);
    } catch (error) {
      setIsError(true);
      console.error(
        "NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created"
      );
      await deleteFiles();
    }
  };

  return (
    <div className="flex justify-center relative items-center min-h-screen ">
      <div className=" flex flex-col justify-center items-center w-[90%] h-auto rounded-md ">
        {isSuccess && (
          <div className="p-[1rem] bg-green-100 flex gap-3 items-center rounded-lg mb-[2rem]">
            <p className="text-green-700">Listing successfully created.</p>
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
        <div className=" flex flex-col gap-12 bg-white w-full items-center h-[700px] justify-center  md:flex-row  rounded-3xl shadow-md">
          <form
            onSubmit={handleSubmit}
            className="w-[85%] md:w-[40%] flex flex-col gap-4 p-4"
          >
            <div>
              <label className="py-2">Address</label>
              <input
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="block w-full border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC]  focus:outline-none sm:text-xs "
              />
            </div>
            <div>
              <label className="py-2">Description</label>
              <input
                name="description"
                type="text"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="block w-full border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-xs "
              />
            </div>
            <div>
              <label className="py-2">Beds</label>
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
                className="block w-[60%] border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-xs "
              />
            </div>
            <div>
              <label className="py-2">Baths</label>
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
                className="block w-[60%] border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-xs "
              />
            </div>
            <div>
              <label className="py-2">Area</label>
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
                className="block w-[60%] border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-xs "
              />
            </div>
            <div>
              <label className="py-2">Price</label>
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
                className="block w-[60%] border-0 p-4 text-gray-900 shadow-sm rounded-lg placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-xs "
              />
            </div>
            <button
              onClick={handleSubmit}
              className="p-4 text-white text-sm tracking-wider font-montserrat mt-4 bg-forest w-fit rounded-xl"
            >
              Create Listing
            </button>
          </form>
          <div className="w-[45%] p-4">
            <div>
              <p className="py-4">Import Photos</p>
              <FileUpload onFilesSelected={handleFilesSelected} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
