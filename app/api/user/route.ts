import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";
const bcrypt = require('bcrypt');

interface postRequestBody {
    name: string,
    email: string,
    password: string,
}

  //api route creating a user on a database
export async function POST(request: Request) {
    const body: postRequestBody = await request.json()

    try {
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                passwordHash: await bcrypt.hash(body.password, 10),
            }
        })
        return NextResponse.json(newUser, { status: 200 });
    } catch (error) {
        // Handle errors
        console.error("Error creating user on database:", error);
        return NextResponse.json({ error: "failed to create user" }, { status: 500 });
    }
}

