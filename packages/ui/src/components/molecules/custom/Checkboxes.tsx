"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import { Button } from "../shadcn/Button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/Dropdown"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function Checkboxes({placeholder,options, values, onChange}:any) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-start w-[300px] px-3 py-2 border rounded-md gap-2">
          {values.length === 0 ? 
            <div>{placeholder}</div> : 
            values.slice(0,3).map((value:any) => (
              <div key={value} className="text-xs border-2 border-border">{value}</div>
            ))
          }
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((option:any) => (
          <DropdownMenuCheckboxItem
            key={option}
            checked={values?.includes(option)}
            onCheckedChange={(checked: Checked) => {
              onChange((prev:any) =>
                checked
                  ? [...prev, option]
                  : prev.filter((selectedOption:any) => selectedOption !== option)
              )
            }}>
              {option}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
