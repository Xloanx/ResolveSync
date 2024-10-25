import React from 'react'
import { Select } from '@radix-ui/themes';




const TicketPriority = ({ onSendPriority, selectedPriority }) => {
    return ( 
        <Select.Root onValueChange={onSendPriority} value={selectedPriority}>
        <Select.Trigger variant="ghost">
          {/* {!selectedPriority ? 'Select Priority' : `Status: ${selectedPriority}`} */}
        </Select.Trigger>
        <Select.Content>
            {/* <Select.Item value="">Select Priority</Select.Item> */}
            <Select.Item value="LOW">LOW</Select.Item>
            <Select.Item value="MEDIUM">MEDIUM</Select.Item>
            <Select.Item value="HIGH">HIGH</Select.Item>
        </Select.Content>
      </Select.Root>
     );
}
 
export default TicketPriority;