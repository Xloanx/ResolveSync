'use client'
import React, {useState} from 'react';
// import { useIssues } from '@/context/IssuesContext';
import { Select, Button, Badge } from '@radix-ui/themes';

const TicketStatusSelect = () => {

  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedPage, setSelectedPage] = useState(1);
  // const {issues, selectedStatus, setSelectedStatus, setSelectedPage, setFilteredIssuesByStatus } = useIssues("status");
  // const {selectedStatus, setSelectedStatus, setSelectedPage } = useIssues("status");

  // setFilteredIssuesByStatus(selectedStatus === 'ALL'? 
  //                                               issues : 
  //                                               issues.filter(d => d.status === selectedStatus));  // filter issues based on status

  // console.log(selectedStatus);
  const handleIssuesStatusSelection = (event) =>{
    setSelectedStatus(event);

    setSelectedPage(1); //To reset selectedPage upon status click
 }

  return (
    <Select.Root 
        defaultValue={selectedStatus} 
        value={selectedStatus} 
        onValueChange={handleIssuesStatusSelection}
        >
        <Select.Trigger variant="ghost" > 
            {/* {selectedStatus ? `Status Selected: ${selectedStatus}` : 'All selected'}  */}
        </Select.Trigger>
            <Select.Content>
                <Select.Item value="ALL">ALL</Select.Item>
                <Select.Item value="OPEN">OPEN</Select.Item>
                <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
                <Select.Item value="RESOLVED">RESOLVED</Select.Item>
                <Select.Item value="CLOSED">CLOSED</Select.Item>
            </Select.Content>
          </Select.Root>
  )
}

export default TicketStatusSelect