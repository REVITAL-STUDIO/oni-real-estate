import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";

//api route for retrieving all listings
export async function GET() {
    try {
        const listings = await prisma.listing.findMany({
            select: {
                id: true,
                address: true,
                description: true,
                pictures: true,
                beds: true,
                baths: true,
                area: true,
                price: true,
            },
        });

        // Return JSON response with listings
        return NextResponse.json(listings);
    } catch (error) {
        // Handle errors
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
}



//api handler for deleting a listing
export async function DELETE(request: Request) {
    const listingId = await request.json();

    try {
        const deleteListing = await prisma.listing.delete({
            where: {
                id: listingId
            }
        });
        return NextResponse.json({ message: "Listing deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting Listing from database:", error);
        return NextResponse.json({ error: "failed to Delete Listing" }, { status: 500 });
    }
}

interface postRequestBody {
    id: number,
    address: string,
    description: string,
    pictures: string[],
    beds: number,
    baths: number,
    area: number,
    price: number,
}

// api handler for creating a new listing
export async function POST(request: Request) {
    const body: postRequestBody = await request.json();
    try {

        //checking if a listing with address exists in db
        const listingExist = await prisma.listing.findMany({
            where: {
                address: body.address
            }
        })
        if (listingExist.length > 0) {
            return NextResponse.json({ error: "A listing with given address already exists" }, { status: 400 });
        }

        const newListing = await prisma.listing.create({
            data: {
                id: body.id,
                address: body.address,
                description: body.description,
                pictures: body.pictures,
                beds: body.beds,
                baths: body.baths,
                area: body.area,
                price: body.price
            }
        })

        return NextResponse.json(newListing, { status: 200 });

    } catch (error) {
        console.error("Error creating Listing on database:", error);
        return NextResponse.json({ error: "failed to Create Listing" }, { status: 500 });
    }
}



