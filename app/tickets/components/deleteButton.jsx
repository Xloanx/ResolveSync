'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AlertDialog, Flex, Button, Spinner, Callout, Text } from "@radix-ui/themes"
import { useTickets } from '../ticketsContext'

const DeleteButton = ({ ticketId, onDeleteSuccess }) => {
  const { tickets, updateTicket } = useTickets();
  const [error, setError] = useState("");
  const [isDeleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false)

  const router = useRouter();

    const handleTicketDelete = (deletedTicket) => {
    updateTicket(deletedTicket); 
  };

  const handleDeleteTicket = async () =>{
    try {
      setDeleting(true)
      setError("")

      const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Ticket deleted successfully")
      handleTicketDelete(ticketId) //update the UI after successful deletion
      onDeleteSuccess();
      //setDialogOpen(false)
      router.refresh();
    } catch (error) {
      setError(error.message || "An unexpected error occurred")
      toast.error("Failed to delete ticket: " + error.message)
    } finally {
      setDeleting(false)
    }
  }




  return (
    <>

        {/* Button to open the delete dialog */}
      <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialog.Trigger asChild>
            <Button color="red" disabled={isDeleting}>
              Delete Ticket
              {isDeleting && <Spinner loading />}
            </Button>
          </AlertDialog.Trigger>

        {/* delete Confirmation dialog */}
        <AlertDialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialog.Content style={{maxWidth:"450px"}}>
            <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure you want to delete this issue? This action cannot be reversed.
            </AlertDialog.Description>

            {/* Error message display */}
            {error && (
              <Callout.Root color="red" className="mb-5">
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            )}

            {/* Buttons for confirm and cancel */}
            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel asChild>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button variant="solid" color="red" onClick={handleDeleteTicket} disabled={isDeleting}>
                {isDeleting ? <Spinner loading /> : "Confirm Delete"}
                </Button>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>

        {/* Error alert if deletion fails */}
        {error && (
          <AlertDialog.Root open={error}>
            <AlertDialog.Content>
              <AlertDialog.Title>Error</AlertDialog.Title>
              <AlertDialog.Description>
                There was an issue deleting this ticket. Please try again.
              </AlertDialog.Description>
              <Button
                color="gray"
                variant="soft"
                mt="2"
                onClick={() => setError(false)}
              >
                OK
              </Button>
            </AlertDialog.Content>
          </AlertDialog.Root>
        )}

      </AlertDialog.Root>
    </>
)
}
export default DeleteButton