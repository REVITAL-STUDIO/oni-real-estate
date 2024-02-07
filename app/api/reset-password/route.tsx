import crypto from "crypto"
import { prisma } from "@/lib/database/client";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

interface putRequestBody {
    newPassword: string,
    resetToken: string
}

// route handler for creating new password for user
export async function PUT(request: Request){
    const body: putRequestBody = await request.json()

    const hashedResetToken = crypto
    .createHash('sha256')
    .update(body.resetToken)
    .digest('hex');
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                hashedResetToken: hashedResetToken
            }
        })

        if (!existingUser){
            return NextResponse.json("Invalid token", { status: 400 })
        }

        const newHashedPassword = await bcrypt.hash(body.newPassword, 10);

        const resonse = await prisma.user.update({
            where: {
                hashedResetToken: hashedResetToken
            },
            data: {
                passwordHash: newHashedPassword
            }
        })

        return NextResponse.json("Updated user password",{ status: 200 });


    } catch (error) {
        console.error("Error updating Listing on database:", error);
        return NextResponse.json({ error: "failed to Update Listing" }, { status: 500 });
    }

}