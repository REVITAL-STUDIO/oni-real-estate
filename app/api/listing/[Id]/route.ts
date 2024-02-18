import { NextResponse } from "next/server";

import { prisma } from "@/lib/database/client";

//api route for retrieving a listing by id
export async function GET(request: Request, { params }: { params: { Id: string } }) {
    try {
        const listing = await prisma.listing.findUnique({
            where: {
                id: parseInt(params.Id,10)
            }
        });

        // Return JSON response with listings
        return NextResponse.json(listing);
    } catch (error) {
        // Handle errors
        console.error("Error fetching listing", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }

}

interface putRequestBody {
    address: string,
    description: string,
    pictures: string[],
    beds: number,
    baths: number,
    area: number,
    price: number,
}

// api handler for updating a listing
export async function PUT(request: Request, { params }: { params: { Id: string } }) {
    const body: putRequestBody = await request.json();

    try {
        const updatedListing = await prisma.listing.update({
            where: {
                id: parseInt(params.Id,10)
            },
            data: {
                address: body.address,
                description: body.description,
                pictures: body.pictures,
                beds: body.beds,
                baths: body.baths,
                area: body.area,
                price: body.price
            }
        })
        return NextResponse.json({ status: 200 })

    } catch (error) {
        console.error("Error updating Listing on database:", error);
        return NextResponse.json({ error: "failed to Update Listing" }, { status: 500 });
    }


}