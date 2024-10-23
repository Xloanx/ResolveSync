'use client'
import React, { useState, useEffect } from 'react';
import { Badge } from '@radix-ui/themes'
import TicketDrawer  from './ticketDrawer';
import { Paginate } from '../../utils/paginate'

const TicketTable = ({ filteredTickets,selectedPage, selectedRecordSize, onTicketDeleted}) => {
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [paginatedData, setPaginatedData] = useState([])
    
    const filteredAndReversedArray = filteredTickets.slice().reverse()
    if (selectedRecordSize === "Record Size") selectedRecordSize = 10 //needs a number for computation purpose

    // const handleTicketClick = (ticket) => {
    //     console.log(ticket)
    //     setSelectedTicket(ticket);
    //     // document.getElementById('ticket-drawer').checked = true;
    //     return <TicketDrawer ticket={selectedTicket} 
    //                             onTicketDeleted={onTicketDeleted} />
    // };

    useEffect(() => {
        // if (selectedRecordSize === "Record Size") selectedRecordSize = 10 //needs a number for computation purpose
        setPaginatedData(Paginate(filteredAndReversedArray, selectedPage, selectedRecordSize))
      }, [filteredAndReversedArray, selectedPage, selectedRecordSize])


    return ( 
        <div className='px-10'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Ticket</th>
                        <th>Status</th>
                        <th>Created</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                        paginatedData.map((ticket, index) => (
                        <tr className="hover font-sans text-base" 
                            key={ticket.id}>
                            <th> {(selectedPage - 1) * selectedRecordSize + (index + 1)}</th>
                            <td>
                                {/* {ticket.title} */}
                                <span 
                                    className="cursor-pointer"
                                    onClick={() => setSelectedTicket(ticket)}>
                                    {ticket.title}
                                </span>
                                {/* <label 
                                    htmlFor="ticket-drawer" 
                                    className="cursor-pointer"
                                    onClick={() => handleTicketClick(ticket)}>
                                
                                    {ticket.title}
                                </label> */}
                                {/* { selectedTicket &&
                                <TicketDrawer ticket={ticket} onTicketDeleted={onTicketDeleted} />} */}

                               
                            </td>
                            <td>
                                <Badge 
                                    color={ ticket.status === "OPEN"         ? ("red")  : 
                                            ticket.status === "IN_PROGRESS"  ?  ("yellow") :
                                            ticket.status === "RESOLVED"      ?  ("green") :  
                                            ticket.status === "CLOSED"       ? ("blue") :""
                                            }>
                                    {ticket.status}
                                </Badge>
                            </td>
                            <td>{new Date(ticket.updatedAt).toDateString()}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedTicket &&
                <TicketDrawer 
                    ticket={selectedTicket}
                    onTicketDeleted={onTicketDeleted}
                />
                }

{selectedTicket && <TicketDrawer ticket={selectedTicket} />}
        </div>
     );
}
 
export default TicketTable;