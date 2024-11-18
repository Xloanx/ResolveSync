import { z } from "zod";
import { FILE_CONFIG } from './constants';

//validate entry with zod
export const createTicketSchema = z.object({
    title: z.string().min(1, 'Title is required').max(255),
    description: z.string().min(1, 'Description is required').max(65535),
    attachments: z.array(z.string().url()).optional()
});

export const fileValidationSchema = z.object({
    files: z.array(z.any())
      .refine(files => files.length <= FILE_CONFIG.MAX_FILES, 
        `You can upload maximum ${FILE_CONFIG.MAX_FILES} files`)
      .refine(files => 
        files.every(file => file.size <= FILE_CONFIG.MAX_SIZE),
        'Each file must be less than 5MB')
      .refine(files => 
        files.every(file => FILE_CONFIG.ALLOWED_TYPES.includes(file.type)),
        'Invalid file type')
  });


export const fetchTicketSchema = z.object({
    id: z.number().min(1, 'ID is required')
});

export const updateTicketSchema = z.object({
    // title: z.string().min(1, 'Title is required').max(255),
    // description: z.string().trim().min(1, 'Description is required'),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required")
});





