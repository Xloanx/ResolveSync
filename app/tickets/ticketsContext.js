'use client';

import React, { createContext, useContext, useState } from 'react';

const TicketsContext = createContext(null);

export const useTickets = () => useContext(TicketsContext);

export const TicketsProvider = ({ children, initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets);

  const updateTicket = (updatedTicket) => {
    setTickets(currentTickets => 
      currentTickets.map(ticket => 
        ticket.id === updatedTicket.id ? updatedTicket : ticket
      )
    );
  };

  return (
    <TicketsContext.Provider value={{ tickets, setTickets, updateTicket }}>
      {children}
    </TicketsContext.Provider>
  );
};
