'use client'

import React, {useState} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
// import {z} from 'zod'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Button,Dialog,Flex, Text, TextField, Callout, Spinner } from '@radix-ui/themes'
import ErrorMessage from './errorMessage'
import { createTicketSchema } from '../validationSchemas'

const NewTicketButton = ({onTicketAdded}) => {

  const router = useRouter()

  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  
  const { register, control, handleSubmit, formState:{errors}, reset } = useForm({
    resolver: zodResolver(createTicketSchema)
  })



  const onSubmit = async (ticketData) => {
    try {
      setSubmitting(true)
      setError("")
      const response = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST', // Specify the method as POST
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify(ticketData), // Convert JavaScript object to JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTicket = await response.json();
      onTicketAdded(newTicket)  // Call this after successful submission
      toast.success("Issue submitted successfully")
      console.log("Ticket created successfully:", newTicket);

      // Reset form and close dialog
      reset()
      setDialogOpen(false)
      
      router.refresh()
    } catch (error) {
      console.error("Error creating ticket:", error);
      setError(error.response?.data?.message || "An unexpected Error Occured")
      toast.error("Something went wrong: " + error.message)
    } finally {
      setSubmitting(false)
  }
}


return ( 
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
      <Dialog.Trigger>
        <Button onClick={() => setDialogOpen(true)}>Create New Ticket</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: '40%', maxHeight: '80vh', overflow: 'auto' }}>
        <Dialog.Title>Create a New Ticket</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Provide the following information to Create a New Ticket.
        </Dialog.Description>

        <form 
        onSubmit={handleSubmit(onSubmit)} 
        className='space-y-4'>
        { error && (
            <Callout.Root color="red" className="mb-5">
              <Callout.Text>
                {error}
              </Callout.Text>
            </Callout.Root>
          )}

        <Flex direction="column" gap="3">
        <TextField.Root placeholder="Title" {...register('title', { minLength: 1 })} />

        <ErrorMessage> {errors.title?.message} </ErrorMessage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              {...field}
              placeholder="Description of Issue…"
              style={{ maxHeight: "150px", overflow: "auto" }} // Inline styling for maxHeight
            />
          )}
        />
        <ErrorMessage> {errors.description?.message} </ErrorMessage>
        </Flex>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>

          <Button type="submit" radius="small" size='2' disabled={isSubmitting}>
            {
              isSubmitting ? 
              <Spinner loading /> : 
              "Submit New Ticket"
            }
          </Button>

        </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>

  )
}


export default NewTicketButton