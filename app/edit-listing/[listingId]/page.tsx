'use client'
import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";
import { useEdgeStore } from "@/lib/edgestore";
import toast from "react-hot-toast";

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
    const [fetchedListingData, setFetchedListingData ] = useState(false)
    const [listingData, setListingData] = useState({
        address: '',
        description: '',
        beds: 0,
        baths: 0,
        area: 0,
        price: 0
    })

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
        console.log("########## HANDLE SUBMIT FUNCTION CALLED AND IN FUNCITON SCOPE")
        try {
            await uploadFiles()

            try {
                //storing cloud stored image urls to listingdata 
                console.log("###################### IMAGE URLS ARRAY: ", imageUrls)
                //creating listingdata to be sent to server to create listing 
                let data = { ...listingData, pictures: imageUrls }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing/${parseInt(params.listingId,10)}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) {
                    toast.error('Error in creating Listing... please try again')
                    await deleteFiles(imageUrls)
                    throw new Error(`HTTP ERROR - Error creating Listing. Status: ${response.status}`)
                }

                //deleting the images that were once used for the listing in the cloud
                const urlsToDelete = initialUrls.filter(url => !imageUrls.includes(url));
                deleteFiles(urlsToDelete)


            } catch (error) {
                toast.error('There was an error creating the Listing. Please try again.')
                console.error('NETWORK ERROR - Unable to reach the server or network issue. Error Message: ', error)
                await deleteFiles(imageUrls)
            }
            toast.success('Listing successfully saved!')

        }
        catch (error) {
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

        <div className="min-h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="w-[50%]">
                <div>
                    <label>Address</label>
                    <input
                        name="address"
                        type="text"
                        required
                        value={listingData.address}
                        onChange={e => setListingData({ ...listingData, address: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className=" mx-auto my-auto">
                    <FileUpload onFilesSelected={handleFilesSelected} initialFiles={initialFiles} />
                </div>
                <button type="submit" className="bg-green-300 rounded p-2">Save Listing</button>
            </form>


        </div>
    )
}

export default EditListing;