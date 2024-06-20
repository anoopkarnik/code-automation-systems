import * as z from 'zod';

export const NotionDatabaseSchema = z.object({
    object: z.string(),
    id: z.string(),
    created_time: z.string().date(),
    last_edited_time: z.string().date(),
    created_by: z.object({
        object: z.string(),
        id: z.string(),
    }),
    last_edited_by: z.object({
        object: z.string(),
        id: z.string(),
    }),
    cover: z.string().nullable(),
    


})