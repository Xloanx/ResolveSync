'use client'

import React, {useState, useCallback} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"
import { Button,Dialog,Flex, Text, TextField, Callout, Spinner } from '@radix-ui/themes'
import ErrorMessage from '../../components/errorMessage'
import { createTicketSchema, fileValidationSchema  } from '../../utils/validationSchemas'
import { FILE_CONFIG } from '../../utils/constants'
import { RxTrash } from "react-icons/rx";


const NewTicketButton = ({onTicketAdded}) => {

  const router = useRouter()

  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isUploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  
  const { register, 
          control, 
          handleSubmit, 
          formState:{errors}, 
          reset 
        } = useForm({
    resolver: zodResolver(createTicketSchema)
  })

  const handleFileChange = useCallback((event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      fileValidationSchema.parse({ files: selectedFiles });
      setFiles(selectedFiles);
      setError("");
    } catch (validationError) {
      setError(validationError.errors[0]);
      event.target.value = ''; // Reset file input
      setFiles([]);
    }
  }, []);


  const handleRemoveFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const uploadFiles = async (files) => {
    if (!files.length) return [];

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const { fileUrls } = await response.json();
    return fileUrls;
  };

  const onSubmit = async (ticketData) => {
    try {
      setSubmitting(true)
      setError("")

       // Handle file upload first
       let documents = [];
       if (files.length) {
         setUploading(true);
         documents = await uploadFiles(files);
       }

      const response = await fetch('http://localhost:3000/api/tickets', {
        method: 'POST', // Specify the method as POST
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify({
          ...ticketData,
          documents
        }), // Convert JavaScript object to JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTicket = await response.json();
      onTicketAdded(newTicket)  // Call this after successful submission to update UI table
      toast.success("Ticket created successfully")

      // Reset form and close dialog
      reset()
      setFiles([])
      setDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error creating ticket:", error);
      setError(error.response?.data?.message || "An unexpected Error Occured")
      toast.error("Failed to create ticket: " + error.message)
    } finally {
      setSubmitting(false)
      setUploading(false)
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
          Provide the following information to create a new ticket.
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
        
        <div className="space-y-2">
          
          <input 
            type="file" 
            onChange={handleFileChange} 
            multiple 
            accept={FILE_CONFIG.ALLOWED_TYPES.join(',')}
            className="w-full"
          />
          <Text size="2">Attachments</Text>
        <Text size="1" color="gray">
                Max {FILE_CONFIG.MAX_FILES} files, {FILE_CONFIG.MAX_SIZE / (1024 * 1024)}MB each
              </Text>
              {files.length > 0 && (
                <ul className="list-disc pl-4">
                  {Array.from(files).map((file, index) => (
                    <li key={index} className="text-sm">
                      <div className="flex items-center">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                        <RxTrash className="ml-2 text-red-500 cursor-pointer" 
                                  onClick={() => handleRemoveFile(file.name)}  />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Flex>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>

          <Button 
            type="submit" 
            radius="small" 
            size='2' 
            disabled={isSubmitting || isUploading}>

            { isSubmitting || isUploading ? (
                <Flex gap="2" align="center">
                  <Spinner />
                  {isUploading ? 'Uploading Files...' : 'Creating Ticket...'}
                </Flex>
              ) : (
              "Submit New Ticket"
            )}
          </Button>

        </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>

  )
}


export default NewTicketButton