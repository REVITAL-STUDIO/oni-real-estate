const bcrypt = require('bcrypt');
import { prisma } from "@/lib/database/client";
import { NextResponse } from "next/server";


interface requestBody {
    name: string,
    email: string,
    password: string,
}
// route handler for creating a user
export async function POST(request: Request){
    const body: requestBody = await request.json();


    // check db if a user exists with that email
    const exist = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    //throw error for email already in use
    if (exist) {
        return NextResponse.json("Email already in use", { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // creating user in db
    const user = await prisma.user.create({
        data: {
            name: body.name,

            email: body.email,
            passwordHash: hashedPassword
        }
    });

    return NextResponse.json("User registered successfully", { status: 200 });
}