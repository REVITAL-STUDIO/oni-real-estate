import { prisma } from "@/lib/database/client";
import { NextResponse } from "next/server";
import crypto from "crypto"
import sgMail from "@sendgrid/mail"

// route handler for sending reset password link
export async function POST(request: Request) {
    console.log("in api endpoint #######")
    const userEmail = await request.json();


    // check db if a user exists with that email
    const existingUser = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    })

    //throw error for email already in use
    if (!existingUser) {
        return new NextResponse("User with email does not exist", { status: 401 })

    }

    //creating a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing the reset token to be stored on the db
    const passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    //setting expiration of reset token to an hr
    const passwordResetExpires = Date.now() + 3600000;

    existingUser.hashedResetToken = passwordResetToken;
    existingUser.resetTokenExpiry = new Date(passwordResetExpires);

    //constructing password reset url to be emailed
    const resetUrl = `/reset-password/?resetToken=${resetToken}&resetExpiry=${encodeURIComponent(new Date(passwordResetExpires).toISOString())}`;
    const emailBody = "Click the following to reset your Password: " + resetUrl;

    const msg = {
        to: userEmail,
        from: "dishonmmanyi@outlook.com",
        subject: "Password Reset",
        text: emailBody
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    await sgMail.send(msg).then(() => {
        console.log("###########   PASSWORD RESET EMAIL SENT ###############3")
    }).catch(async () => {
        existingUser.hashedResetToken = "";
        existingUser.resetTokenExpiry = null;

        return new NextResponse("Failed sending email. Try again", { status: 400 })
    })

    // update the user tokens in the database if the email was successfully sent
    await prisma.user.update({
        where: {
            email: userEmail,
        },
        data: {
            hashedResetToken: passwordResetToken,
            resetTokenExpiry: new Date(passwordResetExpires),
        },
    });
    return new NextResponse("Reset password email has been sent", { status: 200 });

}