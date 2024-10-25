import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"
import { createTicketSchema } from "../../../utils/validationSchemas"



//create GET request function to fecth single data
export async function GET(NextRequest, { params }) {
    console.log('Params received:', params)
    const { id } = params;
    // console.log('Ticket ID:', ticketId)
    try {
        const data = await prisma.ticket.findUnique({
            where: { id: Number(id) },
        });
        //if no data in db
        if (!data || data.length === 0){
            return NextResponse.json(
                {message: "Ticket not found"}, 
                {status: 404})
        }
        return NextResponse.json(data, { status:200 })
    } catch (error) {
        console.error("Error fetching ticket:", error);
        return NextResponse.json(
            { message: "Server Error" }, 
            { status: 500 }
        );
    }
}


// DELETE request function
export async function DELETE(NextRequest, { params }) {
    const { id } = params;

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(id) },
        });

        if (!ticket) {
            return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
        }

        await prisma.ticket.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({ message: "Ticket deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting ticket:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}




// PATCH request function for updating ticket
export async function PATCH(NextRequest, { params }) {
    const { ticketId } = params;
    const body = await NextRequest.json();

    const validation = createTicketSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 });
    }

    try {
        const ticket = await prisma.ticket.findUnique({
            where: { id: Number(ticketId) },
        });

        if (!ticket) {
            return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
        }

        const updatedTicket = await prisma.ticket.update({
            where: { id: Number(ticketId) },
            data: {
                title: body.title,
                description: body.description,
            },
        });

        return NextResponse.json(updatedTicket, { status: 200 });
    } catch (error) {
        console.error("Error updating ticket:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
