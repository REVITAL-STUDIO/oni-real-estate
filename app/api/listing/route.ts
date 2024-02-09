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

interface deleteRequestBody {
    id: number
}

//api handler for deleting a listing
export async function DELETE(request: Request) {
    const body: deleteRequestBody = await request.json();

    try {
        const delteListing = await prisma.listing.delete({
            where: {
                id: body.id
            }
        });
        return NextResponse.json(null, { status: 204 });

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



