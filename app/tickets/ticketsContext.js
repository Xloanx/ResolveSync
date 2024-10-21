'use client';

import React, { createContext, useContext, useState } from 'react';

const TicketsContext = createContext(null);

export const useTickets = () => useContext(TicketsContext);

export const TicketsProvider = ({ children, initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets);

  const updateTicket = (updatedTicket) => {
    console.log("inside updateTicket", updatedTicket);
    // setTickets(currentTickets => 
    //   currentTickets.map(ticket => 
    //     ticket.id === updatedTicket.id ? updatedTicket : ticket
    //   )
    // );
    setTickets(currentTickets => {
        const existingTicketIndex = currentTickets.findIndex(ticket => ticket.id === updatedTicket.id);
        if (existingTicketIndex !== -1) {
          // Update existing ticket
          return currentTickets.map(ticket => 
            ticket.id === updatedTicket.id ? updatedTicket : ticket
          );
        } else {
          // Add new ticket
          return [...currentTickets, updatedTicket];
        }
      });
  };

  return (
    <TicketsContext.Provider value={{ tickets, setTickets, updateTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};
