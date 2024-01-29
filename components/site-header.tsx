import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  return (
    <header className=" bg-background sticky top-0  z-40 w-full border-b align-middle ">
      <div className="grid grid-flow-col justify-stretch
      mb-{6} h-16 sm:justify-between sm:space-x-0  ">
<div className="mt-7 ml-6">
        <MainNav items={siteConfig.mainNav}  />
</div>
        {/* <div></div> */}

        <div className="flex flex-1 items-center justify-center space-x-2 align-top " >
          {/* <div></div> */}
          {/* <nav className="flex items-center space-x-1"> */}

            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
            <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",

                })}
              >
                <Icons.gitHub className="h-5 w-5 fill-current" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.leetcode}
              target="_blank"
              rel="noreferrer"
            >
            <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",

                })}
              >
                <Icons.leetcode className="h-5 w-5 fill-current" />
                <span className="sr-only">Leetcode</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",

                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
        {/* </div> */}
{/* <div></div> */}
<div className=" right-0 mr-9"><ThemeToggle /></div>
</div>
          {/* </nav> */}
      </div>
    </header>
  )
}
