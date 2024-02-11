import * as React from "react"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })
import { Icons } from "@/components/icons"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
       <div className="flex gap-7 md:gap-10 pb-8">
      <Link href="/" className="flex  space-x-2">
        {/* <Icons.logo className="h-6 w-6" /> */}
        {/* <span className="inline-block font-bold"> */}
        
          <h1 className="inline-flex font-extrabold lg:text-3xl md:text-3xl sm:text-3xl items-center">{siteConfig.name}</h1>
          
        {/* </span> */}
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
