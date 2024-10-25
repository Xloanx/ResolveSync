'use client'

import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Button,Flex, Text, TextField, Callout, Spinner } from '@radix-ui/themes'
import ErrorMessage from '../../components/errorMessage'
import { updateTicketSchema } from '../../utils/validationSchemas'
// import MultiSelect  from '../../components/multiSelect'
import AssigneeSelect from './assigneeSelect'
import TicketStatusSelect from './ticketStatusSelect'
import TicketPriority from './ticketPriority'
import DeleteButton from './deleteButton'

const TicketDetails = ({ ticket }) => {
  

  const router = useRouter()
  const ticketId = ticket.id

  const [assignee, setAssignee] = useState(ticket?.assignee || "Assignee");
  const [ticketStatus, setTicketStatus] = useState(ticket?.status || "Ticket Status");
  const [ticketPriority, setTicketPriority] = useState(ticket?.priority || "Ticket Priority");
  const [title, setTitle] = useState(ticket?.title || "");
  const [mdeValue, setMdeValue] = useState(ticket?.description || "");
  const [error, setError] = useState("")
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
          setAssignee(ticket.assignee);
          setTicketStatus(ticket.status);
          setTicketPriority(ticket.priority);
          setTitle(ticket.title);
          setMdeValue(ticket.description);
      }
  }, [ticket]);

console.log(ticketStatus)
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
    <div className="px-4">

        <div className='pb-4'>
            <Text>  Ticket ID: {ticket.id} </Text>
        </div>

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
        {/* <MultiSelect /> */}
        <AssigneeSelect />
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
                      style={{ maxHeight: "250px", overflow: "auto" }}
                            onChange={handleMdeValueChange}
                            value={mdeValue} 
                            field = {...field}/>
        )}
        />
        <ErrorMessage> {errors.description?.message} </ErrorMessage>
        </Flex>

        <div className="flex justify-between items-center">
        <div className="text-left">
            <DeleteButton ticketId={ticket.id} onDeleteSuccess={handleDeleteSuccess}/>
        </div>

        <div className="text-right">
            <Button type="submit"  radius="small" size='2' disabled={isSubmitting}>
                {
                    isSubmitting ? 
                    <Spinner loading /> : 
                    "Edit Ticket"
                }
            </Button>
            
        </div>
        </div>
        
        </form>
    </div>
    );
          
    
};

export default TicketDetails;