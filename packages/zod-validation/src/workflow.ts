import * as z from 'zod';

export const CreateWorkflowSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional()
  })
  