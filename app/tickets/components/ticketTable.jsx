'use client'
import React, { useState, useEffect } from 'react';
import { Badge } from '@radix-ui/themes'
import TicketDetails from './ticketDetails';
import SideDrawer from '../../components/sideDrawer'
import { Paginate } from '../../utils/paginate'

const TicketTable = ({ filteredTickets,selectedPage, selectedRecordSize }) => {
    
    const filteredAndReversedArray = filteredTickets.slice().reverse()
    if (selectedRecordSize === "Record Size") selectedRecordSize = 10 //needs a number for computation purpose

    console.log(selectedRecordSize)
      const paginatedData = Paginate(
        filteredAndReversedArray,
        selectedPage,
        selectedRecordSize
    );


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
                                <SideDrawer caller={ticket.title} 
                                            header = "Ticket Details"
                                            content = {< TicketDetails ticket={ticket}/>}
                                />
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
        </div>
     );
}
 
export default TicketTable;