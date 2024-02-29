import { NextResponse } from "next/server";

import { prisma } from "@/lib/database/client";

interface putRequestBody {
    status: string
}

// api handler for updating a lead
export async function PUT(request: Request, { params }: { params: { Id: string } }) {
    const body: putRequestBody = await request.json();

    try {
        const updatedLead = await prisma.lead.update({
            where: {
                id: parseInt(params.Id, 10)
            },
            data: {
                status: body.status

            }
        })
        return NextResponse.json(updatedLead, { status: 200 })

    } catch (error) {
        console.error("Error updating Lead on database:", error);
        return NextResponse.json({ error: "failed to Update Lead" }, { status: 500 });
    }
}
