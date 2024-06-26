import * as z from 'zod';

export const OpenAISchema = z.object({
    apiKey: z.string().min(6,{
        message: "openai api key must be at least 6 characters long"
    })
})
