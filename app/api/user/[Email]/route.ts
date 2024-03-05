import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";

//api route for retrieving user info by email
export async function GET(request: Request, { params }: { params: { Email: string } }) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: params.Email
            }
        });

        // Return JSON response with listings
        return NextResponse.json(user);
    } catch (error) {
        // Handle errors
        console.error("Error fetching user information", error);
        return NextResponse.json({ error: "Failed to fetch user information" }, { status: 500 });
    }

}