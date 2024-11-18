import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../prisma/client"
import { createTicketSchema} from "../../utils/validationSchemas"

//create POST request function
export async function POST(NextRequest){
    try{
        const body = await NextRequest.json()
        const validation = createTicketSchema.safeParse(body)

        //check for validation success
        if(!validation.success){
            return NextResponse.json(
                {error: validation.error.errors}, 
                {status: 400}
            );
        }

        // Create ticket with attachments
        const newTicket = await prisma.ticket.create({
            data: {
            title: body.title,
            description: body.description,
            documents: {
                create: body.documents?.map(url => ({ url })) || []
            }
            },
            include: {
            documents: true
            }
        });

        return NextResponse.json(newTicket, { status:201 })
    } catch (error) {
        console.error('Failed to create ticket:', error);
        return NextResponse.json(
          { error: 'Failed to create ticket' },
          { status: 500 }
        );
      }
    }


//create GET request function to fecth all data
// export async function GET(){

//     try {
//         const data = await prisma.ticket.findMany()
//         //if no data in db
//         if (!data || data.length === 0){
//             return NextResponse.json({message: "No data in database"}, {status: 404})
//         }
//         return NextResponse.json(data, { status:200 })
//     } catch (error) {
//         console.error("Error fetching tickets:", error);
//         return NextResponse.json({ message: "Server Error" }, { status: 500 });

//     }
// }


export async function GET() {
    try {
      const tickets = await prisma.ticket.findMany({
        include: {
          documents: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });
  
      if (!tickets.length) {
        return NextResponse.json(
          { message: 'No tickets found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json(tickets);
  
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      return NextResponse.json(
        { error: 'Failed to fetch tickets' },
        { status: 500 }
      );
    }
  }