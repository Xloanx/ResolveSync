import React from 'react';
import { Badge } from '@radix-ui/themes'
import RecordSizeSelect from './recordSizeSelect';

const TicketTable = ({ tickets }) => {
    return ( 
        <div className='px-10'>
        <div className="text-right">
          <RecordSizeSelect dataSize={tickets.length}
                            />  
        </div>
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
                tickets.map((ticket, index) => (
                <tr className="hover font-sans text-base" 
                    key={index}>
                    <th>{index+1}</th>
                    <td>
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