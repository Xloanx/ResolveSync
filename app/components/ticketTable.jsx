import React from 'react';
import { Badge } from '@radix-ui/themes'

const TicketTable = ({ paginatedAndFilteredTickets,selectedPage, selectedRecordSize }) => {
    const filteredPaginatedAndReversedArray = paginatedAndFilteredTickets.slice().reverse()
    if (selectedRecordSize === "Record Size") selectedRecordSize = 10 //needs a number for computation purpose

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
                        filteredPaginatedAndReversedArray.map((ticket, index) => (
                        <tr className="hover font-sans text-base" 
                            key={index}>
                            <th> {(selectedPage - 1) * selectedRecordSize + (index + 1)}</th>
                            <td>
                                {/* Ticket Details Drawer */}
                                {/* <Ticket Drawer ticketTitle = {ticket.title}/> */}
                                <div className="drawer drawer-end">
                                    <input id="my-drawer-4" 
                                            type="checkbox" 
                                            className="drawer-toggle" />
                                    <div className="drawer-content">
                                        {/* Page content here */}
                                        <label htmlFor="my-drawer-4" 
                                                style={{ cursor: 'pointer' }}>
                                                    {ticket.title}
                                        </label>
                                    </div>
                                    <div className="drawer-side">
                                        <label htmlFor="my-drawer-4" 
                                                aria-label="close sidebar" 
                                                className="drawer-overlay">
                                        </label>
                                        <ul className="menu bg-base-200 
                                                        text-base-content 
                                                        min-h-full 
                                                        w-80 p-4">
                                        {/* Sidebar content here */}
                                        <li><a>Sidebar Item 1</a></li>
                                        <li><a>Sidebar Item 2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <Badge 
                                    color={ ticket.status === "OPEN"         ? ("red")  : 
                                            ticket.status === "IN_PROGRESS"  ?  ("yellow") :
                                            ticket.status === "IN_PROGRESS"  ?  ("green") :  
                                            ticket.status === "CLOSED"       ? ("blue") :""
                                            }>
                                    {ticket.status}
                                </Badge>
                            </td>
                            <td>{ticket.createdAt}</td>
                        </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default TicketTable;