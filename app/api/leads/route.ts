import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/client";

const getRandomColor = () => {
    // Array of Tailwind CSS color classes
    const colors = [
      'bg-red-400',
      'bg-red-100',
      'bg-blue-400',
      'bg-blue-100',
      'bg-green-400',
      'bg-green-100',
      'bg-green-400',
      'bg-emerald-300',
      'bg-teal-400',
      'bg-cyan-300',
      'bg-fuchsia-400',
      'bg-indigo-600',
      'bg-yellow-400',
      'bg-purple-400',
      'bg-orange-300',
      'bg-lime-300',

      // Add more colors as needed
    ];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * colors.length);

    // Return the randomly selected color class
    return colors[randomIndex];
  };

interface postRequestBody {
    name: string,
    number: string,
    email: string,
    message: string,
    source: string
}

// api handler for creating a new lead
export async function POST(request: Request) {
    const body: postRequestBody = await request.json();
    console.log("############ IN create lead endpoint body: ", body)

    try {

        const newLead = await prisma.lead.create({
            data: {
                name: body.name,
                number: body.number,
                email: body.email,
                message: body.message,
                source: body.source,
                color: getRandomColor()
            }
        })
        console.log("############ IN create lead endpoint newLead: ", newLead)
        return NextResponse.json(newLead, { status: 200 });

    } catch (error) {
        console.error("Error creating Lead on database:", error);
        return NextResponse.json({ error: "failed to Create Lead" }, { status: 500 });
    }
}


//api route for retrieving all leads
export async function GET() {
    try {
        const leads = await prisma.lead.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                message: true,
                status: true,
                source: true,
                color: true
            },
        });

        // Return JSON response with leads
        return NextResponse.json(leads);
    } catch (error) {
        // Handle errors
        console.error("Error fetching leads:", error);
        return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
    }
}


// api handler for deleting a lead
export async function DELETE(request: Request) {
    const leadId = await request.json();

    try {
        const deleteLead = await prisma.lead.delete({
            where: {
                id: leadId
            }
        });
        return NextResponse.json({ message: "Lead deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error("Error deleting Lead from database:", error);
        return NextResponse.json({ error: "failed to Delete Lead" }, { status: 500 });
    }
}