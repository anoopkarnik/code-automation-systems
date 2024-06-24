import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@repo/ui/styles/shadcn-rose"
import { ThemeProvider } from "./theme-provider"
import { SessionProviders } from "./session-provider";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Personal Dashboard",
  description: "Personal Dashboard for all your personal and professional data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviders>
          <ThemeProvider attribute="class"  defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
