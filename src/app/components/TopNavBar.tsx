
"use client"

// IMPORTS
import { useContext, useEffect, useState } from "react"
import { Link as Link } from "react-router"

import { AppContext } from "../page"

import {
    ArrowTurnDownRightIcon,
    ArrowDownRightIcon, 
    HomeIcon,
    EnvelopeIcon,
    PhoneIcon
} from "@heroicons/react/24/solid"

// TYPE DECLARATION
type Props = {
    isHomepage: boolean
}

function TopNavBar ({ isHomepage }:Props ):React.JSX.Element {
    const { getWindowSize } = useContext(AppContext)

    return (
        <div className='relative flex h-12 mb-4 rounded-xs'>
            <div className='rounded-sm bg-stone-100 shadow-md shadow-sky-500/40 p-1'>
                <Link to="https://gmharper.netlify.app/" className='content-center' onClick={() => { if (isHomepage) window.location.reload() }}>
                    <HomeIcon className='p-1 text-black h-full hover:scale-115' />
                </Link>
            </div>

            <div className='w-52'/>

            <div className='w-100 bg-stone-100 rounded-sm content-center px-4'>
                <p className='font-bold text-xl text-black text-left'>MESSENGER PIGEON</p>
            </div>

            <div className='flex-1' />
                {/* <div className='absolute bg-linear-to-r from-violet-700 via-lime-300 to-violet-700 w-100 h-90 origin-center -top-35 -left-8 animate-border-rotate'/> */}
        </div>
    )
}

export default TopNavBar