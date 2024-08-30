"use client"

import { BellIcon, Moon, Sun } from "lucide-react"

import { Button } from "../../atoms/shadcn/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../molecules/shadcn/Dropdown"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"

export function Notification({notifications}:any) {


  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild>
        <Button variant="outline"  className="w-9 h-9 dark:w-10 dark:h-10 rounded-full">
          <BellIcon className="absolute h-[1.2rem] w-[1.2rem]"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="z-[9999999] px-6 py-2">
       <DropdownMenuLabel className="text-sm">No New Notifications</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
