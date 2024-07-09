import type { Metadata } from "next";
import { Inter,DM_Sans } from "next/font/google";
import "@repo/ui/styles/shadcn-rose"
import { ThemeProvider } from "../providers/theme-provider"
import { SessionProviders } from "../providers/session-provider";
import { ConnectionsProvider } from "../providers/connections-provider";


const font = DM_Sans({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Personal Automation Dashboard",
  description: "Personal Automation Dashboard for all your personal and professional automation needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <SessionProviders>
          <ThemeProvider attribute="class"  defaultTheme="dark" enableSystem disableTransitionOnChange>
            <ConnectionsProvider>
              {children}
            </ConnectionsProvider>
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
