"use client"

// IMPORTS
import { Dispatch, SetStateAction, ChangeEventHandler, InputHTMLAttributes, useState, useContext } from "react"
import { AppContext } from "@/app/page"

// TYPE DECLARATION
type Props = {
    styling?: string
}

function SearchBar ({ styling }:Props ):React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    return (
        <input 
            className={'min-w-78 min-h-6 rounded-full bg-white text-black text-xs px-2 outline-1 outline-zinc-300 '+styling} 
            type='text' 
            onChange={ (e) => { setParams({ search: e.target.value}) } }
            value={params.search}
            placeholder={`Search ${params.display_type}`}
        />
    )
}

export default SearchBar