import React from 'react';
import { Tooltip, IconButton, Button } from "@radix-ui/themes";
import { MdEdit } from "react-icons/md";
import Link from 'next/link';


const EditButton = ({ticketId}) => {
  return (
    <Tooltip content="Edit">
    <Link href={`/issues/edit/${issueId}`}>
      <Button 
          color="blue" 
          radius="small" 
          size="2">
            < MdEdit/> Edit Isue
      </Button>
    </Link>
  </Tooltip>
  )
}

export default EditButton