'use client'

import { useState } from 'react'

import useUsers from "@/hooks/use-users"
   
  import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { CommandLoading } from "cmdk"

export default function Searchbar() {
  const { data, isLoading } = useUsers()
  const [query, setQuery] = useState("")

  return (
    <Command className="w-60 command rounded-full py-0 border relative overflow-visible">
      <CommandInput
        placeholder="Search" 
        className="command-input py-0"
        onFocus={(e) => e.target.classList.add("active")}
        onBlur={(e) => e.target.classList.remove("active")}
        onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
      />
      <CommandList className="w-60 commandlist absolute top-12 bg-white shadow-md rounded-lg">
        {isLoading && <CommandLoading>Hang on...</CommandLoading>}
        <CommandGroup heading="Users" className="max-h-[250px] overflow-y-auto overflow-x-hidden">
            {data?.map((user:any, index:any) => (
                <CommandItem key={index}>
                    <div className="flex items-center gap-2">
                        <div className="rounded-full w-8 h-8 grid place-content-center relative overflow-hidden">
                            <Avatar>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                <AvatarImage src={user.profile_pic} alt={user.name} />
                            </Avatar>
                        </div>
                        <span className="font-medium text-sm">
                            {user.name}
                        </span>
                    </div>
                </CommandItem>
            ))}
        </CommandGroup>
        {
          query.length > 2 && (
            <>
            <CommandSeparator />
              <button className="font-medium text-left w-[calc(100%-12px)] text-sm m-2 p-2 hover:bg-blue-50 rounded-sm">
                  See all results for <span className="text-blue-500">{query}</span>
              </button>
            </>
        )}
      </CommandList>
    </Command>
  )
}
