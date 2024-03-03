"use client";
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";
import Nav from "@/components/navbar";
import { IoIosClose } from "react-icons/io";

interface FileExtended extends File {
  url?: string;
}

const CreateListing = () => {
  const { edgestore } = useEdgeStore();
  const [selectedFiles, setSelectedFiles] = useState<FileExtended[]>([]);
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
    try {
      await uploadFiles();

      try {
        //storing cloud stored image urls to listingdata
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
        }
      } catch (error) {
        setIsError(true);
        console.error(
          "NETWORK ERROR - Unable to reach the server or network issue. Error Message: ",
          error
        );
        await deleteFiles();
      }
    } catch (error) {
      setIsError(true);
      console.error(
        "NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created"
      );
      await deleteFiles();
    }
  };

  return (
    <div className="font-agrandir  ">
      <div className="flex flex-col  justify-center items-center min-h-screen ">
        <div className=" flex flex-col justify-center items-center   w-full md:w-[90%] md:py-[1rem] rounded-md ">
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
          <div className="flex overflow-y-scroll xl:overflow-y-hidden relative flex-col bg-white w-[90%]  items-center justify-start xl:justify-center md:py-[3rem] rounded-3xl shadow-md max-h-[600px] ">
            <h1 className=" p-4 w-full text-center text-2xl xl:text-4xl  ">
              {" "}
              Create a Listing
            </h1>

            <div className="flex flex-col xl:flex-row w-full h-auto items-center justify-evenly">
              <form className="md:w-[85%] xl:w-[40%]  flex flex-col gap-4 p-4">
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
                    className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC]  focus:outline-none sm:text-sm "
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
                    className="block w-full border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                  />
                </div>
                <div>
                  <label className="py-2"># Beds</label>
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
                <div>
                  <label className="py-2"># Baths</label>
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
                    className="block w-[60%] border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
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
                    className="block w-[60%] border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
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
                    className="block w-[60%] border-0 p-2 text-gray-900 shadow-sm rounded-2xl placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                  />
                </div>
                <button
                  onClick={createListing}
                  className="p-4 text-white text-sm tracking-wider font-montserrat transition ease-in-out duration-150 bg-forest/90 hover:bg-forest w-fit rounded-xl  hover:shadow-lg active:opacity-100"
                >
                  Create Listing
                </button>
              </form>

              <div className="md:w-[45%]  ">
                <p>Photos</p>
                <FileUpload onFilesSelected={handleFilesSelected} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
