import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";

interface RequestBody {
    email: string;
  }

  //api route for retrieving user from database
export async function POST(request: Request) {
    const body: RequestBody = await request.json()

    try {
    const user = await prisma.user.findUnique({
        where: {
          email: body.email, 
        },
      });

      return NextResponse.json(user);
    } catch (error) {
        // Handle errors
        console.error("Error fetching user from database:", error);
        return NextResponse.json({ error: "failed to fetch user" }, { status: 500 });
    }
}