const bcrypt = require('bcrypt');
import { prisma } from "@/lib/database/client";
import { NextResponse } from "next/server";



interface User {
    id: string;
    name: string;
    email: string;
    number: string;
    password: string;
    favoriteListingsId: number[];
}

// api handler for updating a users information
export async function PUT(request: Request) {
    const body: User = await request.json();
    let updatedUser;
    console.log("############# In update user endpoint body: ", body)
    try {
        //user changed password
        if (body.password != "") {
            const hashedPassword = await bcrypt.hash(body.password, 10);
             updatedUser = await prisma.user.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    email: body.email,
                    number: body.number,
                    passwordHash: hashedPassword,
                    updatedAt: new Date()
                }
            })
        } else {
            //user did not change password
             updatedUser = await prisma.user.update({
                where: {
                    id: body.id
                },
                data: {
                    name: body.name,
                    email: body.email,
                    number: body.number,
                    updatedAt: new Date()
                }
            })
        }
        return NextResponse.json(updatedUser, { status: 200 })

    } catch (error) {
        console.error("Error updating User on database:", error);
        return NextResponse.json({ error: "failed to Update User" }, { status: 500 });
    }

}