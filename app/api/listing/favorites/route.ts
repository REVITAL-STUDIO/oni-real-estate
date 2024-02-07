import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";


interface putRequestBody {
    email: string,
    listingId: number
}

// api route for adding a listing to user's favorites list
export async function PUT(request: Request) {
    try {
        const body: putRequestBody = await request.json()
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        user?.favoriteListingsIds.push(body.listingId);
        return NextResponse.json(null, { status: 204 });

    } catch (error) {
        // Handle errors
        console.error("Error adding listing to user's favorites:", error);
        return NextResponse.json({ error: "failed to favorite a listing" }, { status: 500 });
    }
}




interface postRequestBody {
    email: string,
}

// api route for retrieving users favorite listings
export async function POST(request: Request) {

    const body: postRequestBody = await request.json()

    try {
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
        },
    });

    const favoriteListings = user?.favoriteListingsIds.map((listingId) => {
        prisma.listing.findUnique({
            where: {
                id: listingId
            }
        })
    })
    return NextResponse.json(favoriteListings);
    } catch(error){
        console.error("Error retrieving user's favorite listings", error);
        return NextResponse.json({ error: "failed to retrieve favorite listings" }, { status: 500 });
    }

}