import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../prisma/client"
import { UserRole } from "@prisma/client"

// //create POST request function
// export async function POST(NextRequest){
//     const body = await NextRequest.json()
//     console.log(body);
//     const validation = createTicketSchema.safeParse(body)

//     //check for validation success
//     if(!validation.success)
//         return NextResponse.json(validation.error.errors, {status: 400})

//     const newIssue = await prisma.ticket.create({
//         data: {title: body.title, description: body.description}
//     })

//    return NextResponse.json(newIssue, { status:201 })
// }


//create GET request function to fecth all agents
export async function GET() {
    try {
        const agents = await prisma.user.findMany({
            where: { 
                role: UserRole.AGENT  // Use enum from Prisma client
            },
            select: {
                id: true,
                name: true,
                // email: true,  // Including email in case it's needed
                teams: {
                    select: {
                        // id: true,
                        name: true,
                        // description: true
                    }
                }
            },
            orderBy: {
                name: 'asc'  // Optional: sort by name
            }
        });

        if (!agents || agents.length === 0) {
            return NextResponse.json(
                { message: "No agents found" }, 
                { status: 404 }
            );
        }

        // Format the response to be more structured
        const formattedAgents = agents.map(agent => ({
            id: agent.id,
            name: agent.name || 'Unnamed Agent',
            // email: agent.email,
            teams: agent.teams.map(team => ({
                // id: team.id,
                name: team.name,
                // description: team.description
            }))
        }));

        return NextResponse.json(
            { 
                count: agents.length,
                agents: formattedAgents 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching agents:", error);
        return NextResponse.json(
            { 
                message: "Failed to fetch agents",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            }, 
            { status: 500 }
        );
    }
}