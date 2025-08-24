"use client"

// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Link as Link } from "react-router"

import { AppContext, ThemeContext } from "../contexts/AppContext"

// SCRIPTS
import handleThemeChange from "../scripts/utils/setTheme"

import {
    ArrowTurnDownRightIcon,
    ArrowDownRightIcon,
    Cog6ToothIcon,
    HomeIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    MoonIcon, SunIcon
} from "@heroicons/react/24/solid"

import { Knob } from "primereact/knob"
import Slider from '@mui/material/Slider';

// TYPE DECLARATION
type Props = {
    isHomepage: boolean
}

function TopNavBar ({ isHomepage }:Props ):React.JSX.Element {
    const { getWindowSize, params, setParams, isLoggedIn, setIsLoggedIn, setLoggedInUsername, setLoggedInUser, loggedInUser } = useContext(AppContext)
    const { theme, setTheme } = useContext(ThemeContext)

    const [sliderValue, setSliderValue] = useState(100)
    const [selectedTheme, setSelectedTheme] = useState(loggedInUser.theme)

    function handleLogout () {
        setIsLoggedIn(false)
        setLoggedInUsername("")
        setLoggedInUser(null)
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className={'flex flex-row gap-3 h-14 border-b-1 border-zinc-300 px-4 items-center ' +theme.base} >
            <a href="https://gmharper.netlify.app/" className='w-8 h-8 content-center rounded-xs' onClick={() => {  }}>
                <HomeIcon className={'p-1 h-full hover:scale-115' +theme.text} />
            </a>

            <div className='flex-1' />

            <div className='content-center px-4 translate-x-16'>
                <p className={'text-2xl text-left font-junigarden ' +theme.text}>Messenger Pigeon</p>
            </div>

            <div className='flex-1' />

            <div className='flex w-32 h-8'>
                <button 
                    className={'w-16 h-full bg-zinc-900 rounded-l-full outline-1 outline-zinc-300 place-items-center '}
                    onClick={() => { handleThemeChange( 'dark', setTheme, setLoggedInUser ) }}>
                    <MoonIcon className='h-6 text-white'/>
                </button>
                <button 
                    className={'w-16 h-full bg-white rounded-r-full outline-1 outline-zinc-500 place-items-center'}
                    onClick={() => { handleThemeChange( 'light', setTheme, setLoggedInUser ) }}>
                    <SunIcon className='h-6 text-black'/>
                </button>
            </div>

            { isLoggedIn ?
                <button className={'flex w-24 h-8 rounded-full px-2 justify-center items-center ' +theme.alt}
                onClick={() => { handleLogout() }}>
                    <p className={'font-bold text-sm ' +theme.text_alt}>LOGOUT</p>
                </button> :

                <button className={'flex w-24 h-8 rounded-full px-2 justify-center items-center ' +theme.alt}
                    onClick={() => { setParams({ display_type: 'login' }) }} >
                    <p className={'font-bold text-sm ' +theme.text_alt}>LOGIN</p>
                </button>
            }

            <button 
                className={'w-8 h-8 outline-1 outline-bg-zinc-300 rounded-full p-1 content-center' +theme.alt}
                onClick={() => {}}
            >
                <Cog6ToothIcon className={theme.text_alt} />    
            </button>
        </div>
    )
}

export default TopNavBar