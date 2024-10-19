import React from 'react'
import axios from 'axios'
import { Flex, Badge, Text, Strong } from '@radix-ui/themes'
import LoadingRings from '../components/loadingRings'
import TicketStatusSelect from '../ticketStatusSelect'
import NewTicketButton from '../components/newTicketButton'
import TicketTable from '../components/ticketTable'
import Pagination from './pagination'


const Tickets = async () => {

    // Fetch issues server-side
    let tickets = []
    try {
    const response = await fetch('http://localhost:3000/api/tickets')
    // const response = await axios.get('/api/tickets')
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

    // if (isLoading) {
    // return (
    //     <div className="flex items-center justify-center min-h-screen">
    //     <LoadingRings />
    //     </div>
    // )
    // }



    return ( 
        <>
        {
            console.log(tickets)
        }
            <h2 className="font-mono text-2xl font-bold my-10">
                Ticket Listing
            </h2>

             {/* If there are no tickets to display */}
            {tickets.length === 0 ? 
                (
                    <div>
                    <Text as="p"> 
                        <Strong>No data available on the database.</Strong> 
                    </Text>
                    <div className="text-right">
                        <NewTicketButton />
                    </div>
                    </div>
                ) : 

                        /* If there are tickets to display */
                (
                <div>
                    {/* Display filters and new issue button */}
                    <div className="flex justify-between items-center p-10">
                        <div className="text-left">
                            <TicketStatusSelect />
                        </div>
                        <div className="text-right">
                           <NewTicketButton />
                        </div>
                    </div>

                    
                    {/* Display issues table */}
                    <TicketTable tickets={tickets} />
    
                    {/* Display pagination*/}
                    <Flex justify="end">
                        <Pagination />
                    </Flex>
                </div>
                )}
        </>
    )}

 
export default Tickets