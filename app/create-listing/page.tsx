'use client'
import FileUpload from "@/components/FileUpload";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEdgeStore } from "@/lib/edgestore";




const CreateListing = () => {
    const { edgestore } = useEdgeStore();
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const imageUrls: string[] = []
    const [formData, setFormData] = useState({
        address: '',
        description: '',
        beds: 0,
        baths: 0,
        area: 0,
        price: 0
    })
    const handleFilesSelected = (files: File[]) => {
        setSelectedFiles(files);
        console.log("File array: ", files)
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
    const deleteFiles = async () => {
        imageUrls.forEach(async (imageUrl) => {
            await edgestore.publicFiles.delete({
                url: imageUrl,
            });
        })
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log("########## HANDLE SUBMIT FUNCTION CALLED AND IN FUNCITON SCOPE")
        try {
            await uploadFiles()

            try {
                //storing cloud stored image urls to listingdata 
                console.log("###################### IMAGE URLS ARRAY: ", imageUrls)
                //creating listingdata to be sent to server to create listing 
                let listingData = { ...formData, pictures: imageUrls }
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/listing`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(listingData),
                })
                if (!response.ok) {
                    toast.error('Error in creating Listing... please try again')
                    await deleteFiles()
                    throw new Error(`HTTP ERROR - Error creating Listing. Status: ${response.status}`)
                }



            } catch (error) {
                toast.error('There was an error creating the Listing. Please try again.')
                console.error('NETWORK ERROR - Unable to reach the server or network issue. Error Message: ', error)
                await deleteFiles()
            }
            toast.success('Listing successfully created!')

        }
        catch (error) {
            toast.error('There was an error creating the Listing. Please try again.')
            console.error('NETWORK ERROR - Unable to upload listing files to the cloud, listing was not created')
            await deleteFiles()
        }

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
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        name="description"
                        type="text"
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label># Beds</label>
                    <input
                        name="description"
                        type="number"
                        required
                        value={formData.beds}
                        onChange={e => setFormData({ ...formData, beds: parseInt(e.target.value, 10) })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label># Baths</label>
                    <input
                        name="baths"
                        type="number"
                        required
                        value={formData.baths}
                        onChange={e => setFormData({ ...formData, baths: parseInt(e.target.value, 10) })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label>Area</label>
                    <input
                        name="description"
                        type="number"
                        required
                        value={formData.area}
                        onChange={e => setFormData({ ...formData, area: parseInt(e.target.value, 10) })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        name="description"
                        type="number"
                        required
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: parseInt(e.target.value, 10) })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className=" mx-auto my-auto">
                    <FileUpload onFilesSelected={handleFilesSelected} />
                </div>
                <button type="submit" className="bg-green-300 rounded p-2">Create Listing</button>
            </form>


        </div>
    )
}

export default CreateListing