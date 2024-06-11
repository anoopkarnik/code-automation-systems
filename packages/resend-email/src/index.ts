import {Resend} from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token:string) => {
    const confirmLink = `http://localhost:4000/auth/new-verification?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Please confirm your email",
        html: `<p>
            Click <a href="${confirmLink}">here</a> to confirm your email
        </p>`
    })
}


export const sendResetEmail = async (email: string, token:string) => {
    const confirmLink = `http://localhost:4000/auth/reset-password?token=${token}`

    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `<p>
            Click <a href="${confirmLink}">here</a> to modify your password
        </p>`
    })
}
