import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../../prisma/client"
import { updateTicketSchema } from "../../../utils/validationSchemas"



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
export async function PUT(NextRequest, { params }) {
    try{
        const ticketId = parseInt(params.id);
        const body = await NextRequest.json();

    const validation = updateTicketSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(
            {error: validation.error.errors}, 
            { status: 400 }
        );
    }

    // First, get existing documents
    const existingTicket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: { documents: true }
      });
  
      if (!existingTicket) {
        return NextResponse.json(
          { error: 'Ticket not found' },
          { status: 404 }
        );
      }

      // Update ticket with new documents
    const updatedTicket = await prisma.ticket.update({
        where: { id: ticketId },
        data: {
          title: body.title,
          description: body.description,
          assignee: body.assignee,
          status: body.status,
          priority: body.priority,
          documents: {
            deleteMany: {}, // Remove all existing documents
            create: body.documents?.map(url => ({ url })) || [] // Create new ones
          }
        },
        include: {
          documents: true
        }
      });

      return NextResponse.json(updatedTicket);

  } catch (error) {
    console.error('Failed to update ticket:', error);
    return NextResponse.json(
      { error: 'Failed to update ticket' },
      { status: 500 }
    );

  }
}
