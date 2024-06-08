import { getNextAuthConfig } from "@repo/next-auth/auth";

export const NEXT_AUTH_CONFIG = getNextAuthConfig({
    GoogleProviderPresent: process.env.GOOGLE_PROVIDER_PRESENT || "false",
    GitHubProviderPresent: process.env.GITHUB_PROVIDER_PRESENT || "false",
    CredentialsProviderPresent: process.env.CREDENTIALS_PROVIDER_PRESENT || "false",
});