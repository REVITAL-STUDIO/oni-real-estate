import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";


interface putRequestBody {
    email: string,
    listingId: number
}

// api route for adding a listing to user's favorites list
export async function PUT(request: Request) {
    try {
        const body: putRequestBody = await request.json();
        console.log("############# Favorites PUT request Body: ", body);

        // Check if the listingId already exists in user's favoriteListingsIds array
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
            select: {
                favoriteListingsIds: true,
            },
        });

        if (user && !user.favoriteListingsIds.includes(body.listingId)) {
            // Update the user's favorite listings only if the listingId is not already present
            const updatedUser = await prisma.user.update({
                where: {
                    email: body.email,
                },
                data: {
                    favoriteListingsIds: {
                        push: body.listingId,
                    },
                },
            });

            return NextResponse.json(null, { status: 200 });
        } else {
            // Listing is already in the user's favorites, so no need to update
            return NextResponse.json(null, { status: 200 });
        }
    } catch (error) {
        // Handle errors
        console.error("Error adding listing to user's favorites:", error);
        return NextResponse.json({ error: "failed to favorite a listing" }, { status: 500 });
    }
}

// api route for removing a listing from user's favorites list
export async function DELETE(request: Request) {
    try {
        const body: putRequestBody = await request.json();
        console.log("############# Favorites DELETE request Body: ", body);

        // Check if the listingId already exists in user's favoriteListingsIds array
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
            select: {
                favoriteListingsIds: true,
            },
        });

        if (user && user.favoriteListingsIds.includes(body.listingId)) {
            user.favoriteListingsIds = user.favoriteListingsIds.filter(id => id !== body.listingId);


        }

        return NextResponse.json(null, { status: 200 });

    } catch (error) {
        // Handle errors
        console.error("Error removing listing from user's favorites:", error);
        return NextResponse.json({ error: "failed to remove listing from favorites" }, { status: 500 });
    }
}


interface postRequestBody {
    email: string,
}

// api route for retrieving users favorite listings
export async function POST(request: Request) {

    const body: postRequestBody = await request.json()
    console.log("Body: ", body)
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        const favoriteListings = await Promise.all(user.favoriteListingsIds.map(async (listingId) => {
            return await prisma.listing.findUnique({
                where: {
                    id: listingId
                }
            });
        }));

        console.log("######################### listings: ", favoriteListings)
        return NextResponse.json(favoriteListings);
    } catch (error) {
        console.error("Error retrieving user's favorite listings", error);
        return NextResponse.json({ error: "failed to retrieve favorite listings" }, { status: 500 });
    }

}

