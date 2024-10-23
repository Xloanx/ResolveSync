'use client'
import React from 'react';
import { Select } from '@radix-ui/themes';

const TicketStatusSelect = ({ onSendStatus, selectedStatus }) => {
  return (
    <Select.Root onValueChange={onSendStatus} value={selectedStatus}>
      <Select.Trigger variant="ghost">
        {selectedStatus === 'ALL' ? 'All Tickets' : `Status: ${selectedStatus}`}
      </Select.Trigger>
      <Select.Content>
        <Select.Item value="ALL">All Tickets</Select.Item>
        <Select.Item value="OPEN">OPEN</Select.Item>
        <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
        <Select.Item value="RESOLVED">RESOLVED</Select.Item>
        <Select.Item value="CLOSED">CLOSED</Select.Item>
      </Select.Content>
    </Select.Root>
  )
}

export default TicketStatusSelect