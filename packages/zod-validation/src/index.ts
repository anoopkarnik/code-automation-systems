import * as z from 'zod';

export const ResetPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Password must be at least 6 characters long"
    })
})


export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1,{
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    name: z.string().min(1,{
        message: "Name is required"
    }),
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6,{
        message: "Password must be at least 6 characters long"
    })
})

export const ResetPasswordSettingsSchema = z.object({
    currentPassword: z.string().min(1,{
        message: "Old Password is required"
    }),
    newPassword: z.string().min(6,{
        message: "New Password must be at least 6 characters long"
    }),
})