import { NextResponse } from "next/server";

import { prisma } from "@/lib/database/client";



// api handler for updating a lead
export async function PUT(request: Request, { params }: { params: { Id: string } }) {
    const status = await request.json();

    try {
        const updatedLead = await prisma.lead.update({
            where: {
                id: parseInt(params.Id, 10)
            },
            data: {
                status: status

            }
        })
        return NextResponse.json(updatedLead.status, { status: 200 })

    } catch (error) {
        console.error("Error updating Lead on database:", error);
        return NextResponse.json({ error: "failed to Update Lead" }, { status: 500 });
    }
}
