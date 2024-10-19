import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../prisma/client"
import { createTicketSchema} from "../../validationSchemas"

//create POST request function
export async function POST(NextRequest){
    const body = await NextRequest.json()
    console.log(body);
    const validation = createTicketSchema.safeParse(body)

    //check for validation success
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400})

    const newIssue = await prisma.ticket.create({
        data: {title: body.title, description: body.description}
    })

   return NextResponse.json(newIssue, { status:201 })
}


//create GET request function to fecth all data
export async function GET(){

    try {
        const data = await prisma.ticket.findMany()
        //if no data in db
        if (!data || data.length === 0){
            return NextResponse.json({message: "No data in database"}, {status: 404})
        }
        return NextResponse.json(data, { status:200 })
    } catch (error) {
        console.error("Error fetching tickets:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });

    }
}
