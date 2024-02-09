'use client'
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { useEdgeStore } from "@/lib/edgestore";
import toast from "react-hot-toast";
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


const EditListing = ({ params }: { params: { listingId: string } }) => {
    const { edgestore } = useEdgeStore();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [initialFiles, setInitialFiles] = useState<File[]>([]);
    let initialUrls: string[] = []
    let imageUrls: string[] = []
    const [fetchedListingData, setFetchedListingData] = useState(false)
    const [listingData, setListingData] = useState({
        address: '',
        description: '',
        beds: 0,
        baths: 0,
        area: 0,
        price: 0
    })
    const [errorMsg, setErrorMsg] = useState("A network issue occured. Please check your internet connection and try again.")
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        fetchListingData();
    }, [params.listingId]);


    // Fetch listing data based on ID
    const fetchListingData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/${parseInt(params.listingId, 10)}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response) {
                throw new Error("Error retrieving listing infromation")
            }


            const listing: Listing = await response.json()
            //populating listing data from retrieved listing
            setListingData({ address: listing.address, description: listing.description, beds: listing.beds, baths: listing.baths, area: listing.area, price: listing.price })
            let files = await Promise.all(listing.pictures.map(async (url) => {
                return await urlToFile(url);
            }));
            initialUrls = listing.pictures
            setInitialFiles(files)
            setFetchedListingData(true)
        } catch (error) {
            console.log(error)
        }
    };

    //function to upload listing images to cloud storage
    const uploadFiles = async () => {

        for (const file of selectedFiles) {
            const res = await edgestore.publicFiles.upload({
                file
            });
            console.log("##### upload image object: ", res);
            console.log("##### upload image object URL: ", res.url);


            //storing url to picture file stored in cloud
            imageUrls.push(res.url);
        }
    }

    //function to delete listing images from cloud storage
    const deleteFiles = async (urls: string[]) => {
        urls.forEach(async (imageUrl) => {
            await edgestore.publicFiles.delete({
                url: imageUrl,
            });
        })
    }

    const handleFilesSelected = (files: File[]) => {
        setSelectedFiles(files);
        console.log("File array: ", files)
    };

    const urlToFile = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf('/') + 1);
        return new File([blob], filename, { type: blob.type });
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setIsError(false)
        console.log("########## HANDLE SUBMIT FUNCTION CALLED AND IN FUNCITON SCOPE")
        try {
            await uploadFiles()

            try {
                //storing cloud stored image urls to listingdata 
                console.log("###################### IMAGE URLS ARRAY: ", imageUrls)
                //creating listingdata to be sent to server to create listing 
                let data = { ...listingData, pictures: imageUrls }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/${parseInt(params.listingId, 10)}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) {
                    setErrorMsg('Error in saving listing Changes... please try again')
                    await deleteFiles(imageUrls)
                    throw new Error(`HTTP ERROR - Error editing Listing. Status: ${response.status}`)
                }

                //deleting the images that were once used for the listing in the cloud
                const urlsToDelete = initialUrls.filter(url => !imageUrls.includes(url));
                deleteFiles(urlsToDelete)


            } catch (error) {
                setIsError(true)
                console.error('NETWORK ERROR - Unable to reach the server or network issue. Error Message: ', error)
                await deleteFiles(imageUrls)
            }
            setIsSuccess(true)
        }
        catch (error) {
            setIsError(true)
            toast.error('There was an error updating the Listing. Please try again.')
            console.error('NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created')
            await deleteFiles(imageUrls)
        }

    }

    if (!fetchedListingData) {
        // Data is still loading, you can show a loading indicator or return null
        return <div>Loading...</div>;
    }

    return (
        <div className="font-agrandir">
            <Nav />
            <div className="flex flex-col  justify-end md:justify-center items-center min-h-screen">
                <div className="bg-[#F7F7F7] flex justify-center items-center mt-[8rem] md:mt-[1rem]  w-full md:w-[90%] md:py-[6rem] rounded-md">
                    {isSuccess && <div className="p-[1rem] bg-green-100 flex gap-3 items-center rounded-lg mb-[2rem]"><p className="text-green-700">Saved Listing changes.</p><IoIosClose className=" text-green-500 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={() => setIsSuccess(false)} /></div>}
                    {isError && <div className="p-[1rem] bg-red-100 flex gap-3 items-center rounded-lg mb-[2rem] "><p className="text-red-400">{errorMsg}</p><IoIosClose className=" text-red-300 h-[2rem] w-[2rem] hover:cursor-pointer" onClick={() => setIsError(false)} /></div>}
                    <div className="relative flex flex-col gap-12 bg-white w-[90%] md:w-[70%] items-center justify-center md:flex-row md:py-[3rem] rounded-3xl shadow-md">
                        <h1 className="absolute top-[10%] right-[10%] text-4xl "> Create a Listing</h1>
                        <form onSubmit={handleSubmit} className="w-[85%] md:w-[40%] flex flex-col gap-4">
                            <div>
                                <label>Address</label>
                                <input
                                    name="address"
                                    type="text"
                                    required
                                    value={listingData.address}
                                    onChange={e => setListingData({ ...listingData, address: e.target.value })}
                                    className="block w-full border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC]  focus:outline-none sm:text-sm "
                                />
                            </div>
                            <div>
                                <label>Description</label>
                                <input
                                    name="description"
                                    type="text"
                                    required
                                    value={listingData.description}
                                    onChange={e => setListingData({ ...listingData, description: e.target.value })}
                                    className="block w-full border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                                />
                            </div>
                            <div>
                                <label># Beds</label>
                                <input
                                    name="description"
                                    type="number"
                                    required
                                    value={listingData.beds}
                                    onChange={e => setListingData({ ...listingData, beds: parseInt(e.target.value, 10) })}
                                    className="block w-[60%] border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                                />
                            </div>
                            <div>
                                <label># Baths</label>
                                <input
                                    name="baths"
                                    type="number"
                                    required
                                    value={listingData.baths}
                                    onChange={e => setListingData({ ...listingData, baths: parseInt(e.target.value, 10) })}
                                    className="block w-[60%] border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                                />
                            </div>
                            <div>
                                <label>Area</label>
                                <input
                                    name="description"
                                    type="number"
                                    required
                                    value={listingData.area}
                                    onChange={e => setListingData({ ...listingData, area: parseInt(e.target.value, 10) })}
                                    className="block w-[60%] border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                                />
                            </div>
                            <div>
                                <label>Price</label>
                                <input
                                    name="description"
                                    type="number"
                                    required
                                    value={listingData.price}
                                    onChange={e => setListingData({ ...listingData, price: parseInt(e.target.value, 10) })}
                                    className="block w-[60%] border-0 py-3 px-3 text-gray-900 shadow-sm  placeholder:text-gray-400 bg-[#ECECEC] focus:outline-none sm:text-sm "
                                />
                            </div>
                        </form>
                        <div className="md:w-[45%] md:mt-[12%]">
                            <p>photos</p>
                            <FileUpload onFilesSelected={handleFilesSelected} />
                        </div>
                    </div>
                    <a href="" className="absolute top-[15%] right-[8%] hover:text-xl active:text-[#999999] ">Cancel</a>
                    <button className="absolute bottom-[6%] right-[8%] text-xl hover:text-2xl active:text-[#999999] ">Create</button>
                </div>
            </div>
            {/* <button type="submit" className="bg-green-300 rounded p-2">Create Listing</button> */}
        </div>

    )
}

export default EditListing;