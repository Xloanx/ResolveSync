'use client'

import React, {useState, useEffect} from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import "easymde/dist/easymde.min.css"
import { Button,Flex, Text, TextField, Callout, Spinner, TextArea } from '@radix-ui/themes'
import ErrorMessage from '../../components/errorMessage'
import { updateTicketSchema } from '../../utils/validationSchemas'
import AssigneeSelect from './assigneeSelect'
import TicketStatusSelect from './ticketStatusSelect'
import TicketPriority from './ticketPriority'
import DeleteButton from './deleteButton'
import { FILE_CONFIG } from '../../utils/constants'

const TicketDetails = ({ ticket, onDrawerClose }) => {
  const router = useRouter()
  const ticketId = ticket.id

  // State management
  const [ticketStatus, setTicketStatus] = useState(ticket?.status || "Ticket Status");
  const [ticketPriority, setTicketPriority] = useState(ticket?.priority || "Ticket Priority");
  const [title, setTitle] = useState(ticket?.title || "");
  const [mdeValue, setMdeValue] = useState(ticket?.description || "");
  const [error, setError] = useState("")
  const [isSubmitting, setSubmitting] = useState(false)
  const [isUploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState(ticket?.documents || []);
  const [selectedAssignees, setSelectedAssignees] = useState(
    ticket?.assignees ? ticket.assignees.map(assignee => ({
      id: assignee.id,
      name: assignee.name
    })) : []
  );

  const { register, control, handleSubmit, formState:{errors}, reset, trigger } = useForm({
      resolver: zodResolver(updateTicketSchema),

      defaultValues: {
        title: ticket?.title || "",
        description: ticket?.description || "",
        assignee: ticket?.assignee || "Assignee",
        status: ticket?.status || "Ticket Status",
        priority: ticket?.priority || "Ticket Priority",
      },
  })

   // Handlers
  const handleStatusChange = (e) => setTicketStatus(e); 
  const handlePriorityChange = (e) => setTicketPriority(e);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleMdeValueChange = (e) => setMdeValue(e.target.value);
  const handleAssigneesChange = (newAssignees) => {
    setSelectedAssignees(newAssignees);
  };


  const handleFileChange = (event) => {
    try {
      const selectedFiles = Array.from(event.target.files);
      
      // Check if total files (existing + new) exceed limit
      if (selectedFiles.length + existingDocuments.length > FILE_CONFIG.MAX_FILES) {
        throw new Error(`Maximum ${FILE_CONFIG.MAX_FILES} files allowed in total`);
      }

      // Validate file sizes and types
      selectedFiles.forEach(file => {
        if (file.size > FILE_CONFIG.MAX_SIZE) {
          throw new Error(`File ${file.name} exceeds ${FILE_CONFIG.MAX_SIZE / (1024 * 1024)}MB limit`);
        }
        if (!FILE_CONFIG.ALLOWED_TYPES.includes(file.type)) {
          throw new Error(`File type not supported for ${file.name}`);
        }
      });

      setFiles(selectedFiles);
      setError("");
    } catch (validationError) {
      setError(validationError.message);
      event.target.value = '';
      setFiles([]);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      const response = await fetch(`/api/tickets/${ticketId}/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete document');

      setExistingDocuments(prev => prev.filter(doc => doc.id !== documentId));
      toast.success('Document deleted successfully');
    } catch (error) {
      toast.error('Failed to delete document');
      console.error('Error deleting document:', error);
    }
  };

  const handleDeleteSuccess = () => {
    if (onDrawerClose) onDrawerClose(); // Close the drawer
    router.refresh(); // Refresh the page
  };

  // File upload handler
  const uploadFiles = async (files) => {
    if (!files.length) return [];

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    const { fileUrls } = await response.json();
    return fileUrls;
  };
  


  const onSubmit = async (formData) => {
    try {
      setSubmitting(true)
      setError("")

      // Handle new file uploads if any
      let newDocumentUrls = [];
      if (files.length) {
        setUploading(true);
        newDocumentUrls = await uploadFiles(files);
      }

      // Combine existing and new document URLs
      const allDocuments = [
        ...existingDocuments.map(doc => doc.url),
        ...newDocumentUrls
      ];

      //prepare the request body with all form data
      const requestBody = {
        selectedAssignees,
        status: ticketStatus,
        priority: ticketPriority,
        documents: allDocuments
      };

      console.log(requestBody)

      const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
        method: 'PUT', // Specify the method as PUT
        headers: {
          'Content-Type': 'application/json', // Specify content type
        },
        body: JSON.stringify(requestBody), 
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update ticket'); 
        // throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success("Ticket updated successfully");
      if (onDrawerClose) onDrawerClose();
      router.refresh();

    } catch (error) {
      console.error("Error updating ticket:", error);
      setError(error.message || "An unexpected error occurred");
      toast.error("Failed to update ticket: " + error.message);
    } finally {
      setSubmitting(false);
      setUploading(false);
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
        <AssigneeSelect
          selectedAssignees={selectedAssignees}
          onChange={handleAssigneesChange}
        />

        <ErrorMessage> {errors.assignee?.message} </ErrorMessage>

        <div className="flex justify-between items-center">
            <div className="text-left">
                <TicketStatusSelect 
                  onSendStatus={handleStatusChange}  
                  selectedStatus={ticketStatus} />
            </div>
            <div className="text-right">
              <TicketPriority 
                onSendPriority={handlePriorityChange}  
                selectedPriority={ticketPriority} />
            </div>
        </div>



        <TextField.Root 
          placeholder="Title" 
          value={title}
          disabled
          onChange={(e)=>handleTitleChange(e)}
          {...register('title', { minLength: 1 })} />

        <ErrorMessage> {errors.title?.message} </ErrorMessage>


        <textarea
          disabled
          className="w-full max-w-lg p-3 text-base leading-relaxed font-sans text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y" 
          placeholder="Description of Issue…"
          rows="8"
          value={mdeValue}
          onChange={(e) => handleMdeValueChange(e)}
          {...register('description', { minLength: 1 })}
        ></textarea>
        <ErrorMessage> {errors.description?.message} </ErrorMessage>

        {/* Existing Documents Section */}
        {existingDocuments.length > 0 && (
            <div className="space-y-2">
              <Text size="2" weight="medium">Existing Documents</Text>
              <ul className="space-y-2">
                {existingDocuments.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {doc.url.split('/').pop()}
                    </a>
                    <Button
                      variant="soft"
                      color="red"
                      size="1"
                      onClick={() => handleDeleteDocument(doc.id)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* New Documents Section */}
          <div className="space-y-2">
            <Text size="2" weight="medium">Add New Documents</Text>
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              accept={FILE_CONFIG.ALLOWED_TYPES.join(',')}
              className="w-full"
            />
            <Text size="1" color="gray">
              {`${FILE_CONFIG.MAX_FILES - existingDocuments.length} more files can be added`}
            </Text>
            <Text as='p' size="2" weight="medium">Newly Added Documents</Text>
            {files.length > 0 && (
              <ul className="list-disc pl-4">
                {Array.from(files).map((file, index) => (
                  <li key={index} className="text-sm">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Flex>

        <div className="flex justify-between items-center">
          <div className="text-left">
              <DeleteButton ticketId={ticket.id} 
              onDeleteSuccess={handleDeleteSuccess}/>
          </div>

          <div className="text-right">
              <Button type="submit"  
                radius="small" 
                size='2' 
                disabled={isSubmitting || isUploading}>

                  { isSubmitting || isUploading ? (
                <Flex gap="2" align="center">
                  <Spinner />
                  {isUploading ? 'Uploading Files...' : 'Updating Ticket...'}
                </Flex>
              ) : (
                "Update Ticket"
              )}
              </Button>
          </div>
        </div>
      </form>
    </div>
    );
          
    
};

export default TicketDetails;