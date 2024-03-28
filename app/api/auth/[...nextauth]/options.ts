import type { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from "@/lib/database/client";
import bcrypt from 'bcrypt';

interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    passwordHash: string;
    number: string | null;
    role: 'admin' | 'user'; // Assuming role can be either 'admin' or 'user'
    favoriteListingsIds: string[];
    hashedResetToken: string | null;
    resetTokenExpiry: string | null;
    createdAt: string;
    updatedAt: string;
}

// options object for nextauth configuration
export const options: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
            // profile(profile) {
            //     return {
            //         id: "",
            //         name: profile.name,
            //         email: profile.email,
            //         role: 'user'
            //     }
            // }
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "Email"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "Passowrd"
                }
            },
            async authorize(credentials): Promise<User> {
                try {

                    if (!credentials?.email || !credentials.password) {
                        throw new Error('Please enter an email and password');
                    }

                    //fetching user by db query from api route
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
                        method: 'POST',
                        body: JSON.stringify({ email: credentials?.email }),
                    })
                    if (response.ok) {
                        // Check if user exists
                        const user = await response.json();
                        if (!user || !user.passwordHash) {
                            throw new Error('No user found with the given email address');
                        }
                        //  and if credentials match
                        const passwordMatch = await bcrypt.compare(credentials?.password, user.passwordHash);
                        if (!passwordMatch) {
                            throw new Error('Incorrect Password');
                        }
                        return user;

                    }
                    else {
                        throw new Error('Failed to authenticate user');

                    }
                } catch (error) {
                    console.error(error);
                    throw error;

                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: user.role
                }
            }
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    role: token.role
                }
            }
        },

    },
    debug: process.env.NODE_ENV == "development",
    session: {
        // Set to jwt in order for CredentialsProvider to work properly
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
}