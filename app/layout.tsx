// "use client"
import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import tosteer from "@/components/tosteer"
import Tosteer from "@/components/tosteer"
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
const queryClient = new QueryClient()

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
    {/* <QueryClientProvider client={queryClient}> */}
        
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex">
                 <div  >{children}</div></div>

                <Tosteer/>
            </div>

            <TailwindIndicator />
          </ThemeProvider>

        </body>
      {/* </QueryClientProvider> */}

      </html>

    </>
  )
}
