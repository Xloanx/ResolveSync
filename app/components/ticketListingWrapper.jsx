// TicketListingWrapper.jsx (New Client Component)
'use client'

import React, { useState, useMemo } from 'react'
import TicketStatusSelect from './ticketStatusSelect'
import NewTicketButton from './newTicketButton'
import TicketTable from './ticketTable'
import Pagination from './pagination'
import { Flex } from '@radix-ui/themes'

const TicketListingWrapper = ({ initialTickets }) => {
  const [tickets, setTickets] = useState(initialTickets)
  const [selectedStatus, setSelectedStatus] = useState('ALL')

  // Memoized filtered tickets
  const filteredTickets = useMemo(() => {
    if (selectedStatus === 'ALL') {
      return tickets
    }
    return tickets.filter(ticket => ticket.status === selectedStatus)
  }, [tickets, selectedStatus])

  const handleSelectedStatus = (status) => {
    setSelectedStatus(status)
    console.log('Selected status:', status)
  }

  const handleAddTicket = (newTicket) => {
    setTickets(prevTickets => [...prevTickets, newTicket])
  }

  return (
    <div>
      <div className="flex justify-between items-center p-10">
        <div className="text-left">
          <TicketStatusSelect onSendStatus={handleSelectedStatus} selectedStatus={selectedStatus}/>
        </div>
        <div className="text-right">
          <NewTicketButton onTicketAdded={handleAddTicket} /> </div>
      </div>

      <TicketTable tickets={filteredTickets} />

      <Flex justify="end">
        <Pagination tickets={filteredTickets} />
      </Flex>
    </div>
  )
}

export default TicketListingWrapper