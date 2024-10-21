'use client'

import React, { useState, useEffect } from 'react'
import { Flex, Text, Strong } from '@radix-ui/themes'
import { useTickets } from '../tickets/ticketsContext'
import { Paginate } from '../utils/paginate'
import TicketStatusSelect from './ticketStatusSelect'
import RecordSizeSelect from './recordSizeSelect'
import NewTicketButton from './newTicketButton'
import TicketTable from './ticketTable'
import Pagination from './pagination'


const TicketListingWrapper = () => {
  const { tickets, updateTicket } = useTickets();
  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  let [selectedRecordSize, setSelectedRecordSize] = useState("Record Size");
  const [selectedPage, setSelectedPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([])

  useEffect(() => {
    if (selectedStatus === 'ALL') {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter(ticket => ticket.status === selectedStatus));
    }
  }, [selectedStatus, tickets]);


  
useEffect(() => {
  if (selectedRecordSize === "Record Size") selectedRecordSize = 10 //needs a number for computation purpose
  setPaginatedData(Paginate(filteredTickets, selectedPage, selectedRecordSize))
}, [filteredTickets, selectedPage, selectedRecordSize])

  // const handleStatusChange = (ticketId, newStatus) => {
  //   const updatedTicket = tickets.find(ticket => ticket.id === ticketId);
  //   if (updatedTicket) {
  //     updateTicket({ ...updatedTicket, status: newStatus });
  //   }
  // };

  const handleRecordSizeChange = (newRecordSize) => {
    setSelectedRecordSize(newRecordSize);
  }

  const handleSelectedStatus = (status) => {
    setSelectedStatus(status);
    setSelectedPage(1); //necessary to reset page to 1 when a new status is selected
  };

  const handleAddTicket = (newTicket) => {
    updateTicket(newTicket); 
  };

  return (
    <>
    {/*** If there are no tickets, display a message */}
      {filteredTickets.length === 0 ? (
        <div>
          <div className="flex justify-between items-center p-10">
            <div className="text-left">
              <TicketStatusSelect 
                onSendStatus={handleSelectedStatus}
                selectedStatus={selectedStatus}
              />
            </div>
            <div className="text-right">
              <NewTicketButton onTicketAdded={handleAddTicket} />
            </div>
          </div>
          <Text as="p" className="p-10">
            <Strong>No tickets found for this selection on the database.</Strong>
          </Text>
        </div>
      ) : (
        <div>
          {/**If there are tickets, display them */}
          <div className="flex justify-between items-center p-10">
            <div className="text-left">
              <TicketStatusSelect 
                onSendStatus={handleSelectedStatus}
                selectedStatus={selectedStatus}
              />
            </div>
            <div className="text-right">
              <NewTicketButton onTicketAdded={handleAddTicket} />
            </div>
          </div>
          <div className="flex justify-between items-center px-10">
            <div className="text-left">
              <Text as="p">
                <Strong>Showing a total of {filteredTickets.length} records </Strong>
              </Text>
            </div>
            <div className="text-right">
              <RecordSizeSelect onSendRecordSize={handleRecordSizeChange} 
                                selectedRecordSize={selectedRecordSize} />  
            </div>
          </div>
          
          <TicketTable 
            paginatedAndFilteredTickets={paginatedData}
            selectedPage={selectedPage}
            selectedRecordSize={selectedRecordSize}
            // handleStatusChange={handleStatusChange}
          />
          <Flex justify="end">
            <Pagination 
              tickets={filteredTickets} 
              selectedRecordSize={selectedRecordSize}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </Flex>
        </div>
      )}
    </>
  )
}

export default TicketListingWrapper