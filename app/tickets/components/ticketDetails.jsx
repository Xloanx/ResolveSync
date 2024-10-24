'use client'

import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Button,Dialog,Flex, Text, TextField, Callout, Spinner } from '@radix-ui/themes'
import ErrorMessage from '../../components/errorMessage'
import { updateTicketSchema } from '../../utils/validationSchemas'

import AssigneeSelect from './assigneeSelect'
import TicketStatusSelect from './ticketStatusSelect'
import TicketPriority from './ticketPriority'
import DeleteButton from './deleteButton'



import {z} from 'zod';
import EditButton from './editButton';


const TicketDetails = ({ticket}) => {

    const router = useRouter()
    const ticketId = ticket.id

    const [assignee, setAssignee] = useState("Assignee");
    const [ticketStatus, setTicketStatus] = useState("Ticket Status");
    const [ticketPriority, setTicketPriority] = useState("Ticket Priority");
    // const [ticket, setTicket] = useState({});
    const [title, setTitle] = useState("")
    const [mdeValue, setMdeValue] = useState("");

    const [error, setError] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [isSubmitting, setSubmitting] = useState(false)
    
    const { register, control, handleSubmit, formState:{errors}, reset } = useForm({
        resolver: zodResolver(updateTicketSchema)
    })

    const handleAssigneeChange = (e) =>{
        setAssignee(e);
    }

    const handleStatusChange = (e) =>{
        setTicketStatus(e);
    }

    const handlePriorityChange = (e) =>{
        setTicketPriority(e);
    }

    const handleTitleChange = (e) =>{
        setTitle(e)
    }

    const handleMdeValueChange = (value) => {
        setMdeValue(value);
      };

    const handleDeleteSuccess = () => {
        setDialogOpen(false); // Close the dialog
        router.refresh(); // Refresh the page or update the UI
    }
   

    useEffect(() => {
        if (ticket) {
            setAssignee(ticket.assignee || "Assignee");
            setTicketStatus(ticket.status || "Ticket Status");
            setTicketPriority(ticket.priority || "Ticket Priority");
            setTitle(ticket.title || "");
            setMdeValue(ticket.description || "");
        }
    }, [ticket]);
    





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
      onTicketAdded(newTicket)  // Call this after successful submission to update UI table
      toast.success("Issue submitted successfully")

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
            <span 
                className="cursor-pointer"
                onClick={() => setDialogOpen(true)}>
                {ticket.title}
            </span>
          {/* <Button onClick={() => setDialogOpen(true)}>Create New Ticket</Button> */}
        </Dialog.Trigger>
  
        <Dialog.Content style={{ maxWidth: '40%', maxHeight: '80vh', overflow: 'auto' }}>
          <Dialog.Title>Ticket Details</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            <Text>  Ticket ID: {ticket.id} </Text> 
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

            <AssigneeSelect ticketId={ticket.id} />
            <ErrorMessage> {errors.assignee?.message} </ErrorMessage>

            <div className="flex justify-between items-center">
                <div className="text-left">
                    <TicketStatusSelect onSendStatus={handleStatusChange}  
                                        selectedStatus={ticketStatus} />
                </div>
                <div className="text-right">
                <TicketPriority onSendPriority={handlePriorityChange}  
                                selectedPriority={ticketPriority} />
                </div>
            </div>
         
  
          
          <TextField.Root placeholder="Title" 
                        value={title}
                        onChange={handleTitleChange}
                        {...register('title', { minLength: 1 })} />
  
          <ErrorMessage> {errors.title?.message} </ErrorMessage>
  
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
                <SimpleMDE placeholder="Description of Issue…"
                                onChange={handleMdeValueChange}
                                value={mdeValue} 
                                field = {...field}/>
            )}
          />
          <ErrorMessage> {errors.description?.message} </ErrorMessage>
          </Flex>
  
          

          {/* <Flex gap="3" className='justify-between' > */}
        <div className="flex justify-between items-center">
          <div className="text-left">
            <DeleteButton ticketId={ticket.id} onDeleteSuccess={handleDeleteSuccess}/>
          </div>

          <div className="text-right">
            <Dialog.Close>
                <Button variant="soft" color="gray">
                    Cancel
                </Button>
            </Dialog.Close>

            
    
            <Button type="submit"  radius="small" size='2' disabled={isSubmitting}>
                {
                    isSubmitting ? 
                    <Spinner loading /> : 
                    "Edit Ticket"
                }
            </Button>
            
          </div>
        </div>
            
  
          {/* </Flex> */}
          </form>
        </Dialog.Content>
      </Dialog.Root>
     );
}
 
export default TicketDetails;