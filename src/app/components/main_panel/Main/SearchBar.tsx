
"use client"

// IMPORTS
import { Dispatch, SetStateAction, ChangeEventHandler, InputHTMLAttributes, useState } from "react"

// TYPE DECLARATION
type Props = {
    setSearchInput: Dispatch<SetStateAction<string>>,
    styling?: string
}

function SearchBar ({ setSearchInput, styling }:Props ):React.JSX.Element {

    function handleInput (e:any) {
        setSearchInput(e.target.value)
    }

    return (
        <input 
            className={'min-w-78 min-h-7 rounded-full bg-white outline-1 outline-black-100 '+styling} 
            type='text' 
            onChange={handleInput}>
        </input>
    )
}

export default SearchBar