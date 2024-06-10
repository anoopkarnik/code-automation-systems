import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import LinkedInProvider from "next-auth/providers/linkedin";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import db from "@repo/prisma-db/client"
import { SessionStrategy } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

interface ProviderProps {
    GoogleProviderPresent: String,
    GitHubProviderPresent: String,
    LinkedinProviderPresent: String,
    CredentialsProviderPresent: String
}

export function getNextAuthConfig ({GoogleProviderPresent,GitHubProviderPresent,LinkedinProviderPresent,
    CredentialsProviderPresent}:ProviderProps){
    return {
        session: {
            strategy: "jwt" as SessionStrategy,
        },
        adapter: PrismaAdapter(db),
        providers:[   
            GoogleProviderPresent ==="true" && GoogleProvider({
                clientId: process.env.GOOGLE_PROVIDER_CLIENT_ID || "",
                clientSecret: process.env.GOOGLE_PROVIDER_CLIENT_SECRET || "",
                profile(profile) {
                    return({
                        id: profile.sub,
                        name: `${profile.given_name} ${profile.family_name}`,
                        email: profile.email,
                        image: profile.picture,
                        role: profile.role? profile.role : "user"
                    })
                }
            }),
            GitHubProviderPresent ==="true"  && GitHubProvider({
                clientId: process.env.GITHUB_PROVIDER_CLIENT_ID || "",
                clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET || "",
                profile(profile) {
                    return({
                        id: profile.id.toString(),
                        name: profile.name ?? profile.login,
                        email: profile.email,
                        image: profile.avatar_url,
                        role: profile.role? profile.role : "user"
                    })
                }
            
            }),
            CredentialsProviderPresent ==="true"  && CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: { label: "Email", type: "text" },
                    password: { label: "Password", type: "password" }
                },
                async authorize(credentials:any) {
                    if (!credentials) return null;
                    const hashedPassword = await bcrypt.hash(credentials.password, 10);
                    const existingUser = await db.user.findFirst({
                        where: {
                            email: credentials.email
                        }
                    });
                    if (existingUser){
                        const passwordValidation =  await bcrypt.compare(credentials.password, existingUser.password || "");
                        if (!passwordValidation) return null;
                        // Assuming the user object has id, name, and number fields
                        return { id: existingUser.id, name: existingUser.name, email: existingUser.email };
                    }
                    try{
                        const user = await db.user.create({
                            data:{
                                email: credentials.email,
                                password: hashedPassword
                            }
                        });
                        return { id: user.id, name: user.name, email: user.email };
                    } catch (e){
                        console.log(e);
                    }
                    return null;
                }
            }),
            LinkedinProviderPresent ==="true"  && LinkedInProvider({
                clientId: process.env.LINKEDIN_PROVIDER_CLIENT_ID || "",
                clientSecret: process.env.LINKEDIN_PROVIDER_CLIENT_SECRET ||  "",
            })
        ],
        secret: process.env.NEXTAUTH_SECRET || "secret",
        callbacks:{
            async jwt({token,user}:any){
                return {...token, ...user}
            },
            async session({session, token}:any){
                session.user.role = token.role;
                session.user.id = token.sub
                return session
            }
        },
        pages:{
            signIn: '/login'
        }
    }

}