import React from 'react'
import { Text, Strong } from '@radix-ui/themes'
import 'react-toastify/dist/ReactToastify.css'
import TicketListingWrapper from './components/ticketListingWrapper'
import { TicketsProvider } from './ticketsContext'


const Tickets = async () => {

    // Fetch tickets server-side
    let tickets = []
    try {
        const response = await fetch(`${process.env.API_URL}/api/tickets`, { cache: 'no-store' })
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        tickets = await response.json();
    } catch (error) {
    return (
        <Text as="p">
            <Strong>This request returned server errors. 
                    Please contact the administrator.</Strong>
        </Text>
    )
    }

    return (
        <TicketsProvider initialTickets={tickets}>
          <TicketsContent />
        </TicketsProvider>
      )
    }


    const TicketsContent = () => {
        return (
          <>
            <h2 className="font-mono text-2xl font-bold px-4 my-5">
              Ticket Listing
            </h2>
            <TicketListingWrapper />
          </>
        )
      }

 
export default Tickets