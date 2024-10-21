'use client'
import React from 'react'
import { Select } from '@radix-ui/themes';

const RecordSizeSelect = ({ onSendRecordSize, selectedRecordSize }) => {
  return (
    <Select.Root value={selectedRecordSize} onValueChange={onSendRecordSize}>
        <Select.Trigger variant="ghost" >
            {selectedRecordSize === 'Record Size' ? 'Record Size' : `Records Per Page: ${selectedRecordSize}`}
        </Select.Trigger>
          <Select.Content>
            <Select.Item value="Record Size">Select Record Size</Select.Item>
            <Select.Item value={10}>10 records per page</Select.Item>
            <Select.Item value={25}>25 records per page</Select.Item>
            <Select.Item value={50}>50 records per page</Select.Item>
          </Select.Content>
        </Select.Root>
  )
}

export default RecordSizeSelect
