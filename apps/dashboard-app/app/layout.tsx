import type { Metadata } from "next";
import { Inter,DM_Sans,Roboto_Mono} from "next/font/google";
import "@repo/ui/styles/shadcn-rose"
import { ThemeProvider } from "../providers/theme-provider"
import { SessionProviders } from "../providers/session-provider";
import { ConnectionsProvider } from "../providers/connections-provider";
import useConnection from "../hooks/useConnection";
import { Toaster } from "../components/Toaster";


const font = Roboto_Mono({
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
              <main>{children}</main>
              <Toaster/>
            </ConnectionsProvider>
          </ThemeProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
