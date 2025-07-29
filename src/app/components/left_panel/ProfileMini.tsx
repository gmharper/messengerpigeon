
// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext } from "@/app/page"

import { UserIcon, ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"

// TYPE DECLARATIONS
type AppProps = {
    activeUser: user
}

type user = {
    type:string, username: string, name: string, avatar_url: string
}

type userAction = {
    username: string,
    type: string,
    set: boolean
}

function ProfileMini ():React.JSX.Element {
    const { getWindowSize, isLoggedIn, loggedInUser, setLoggedInUser } = useContext(AppContext)

    const profileReducer = (state:user, action:userAction):user => {
        return state
    }

    const [storedUser, setStoredUser] = useReducer(profileReducer, loggedInUser)

    return (
        <div className='flex h-32 bg-stone-100 rounded-sm mr-4'>
            <div className='flex flex-col'>
                <div className='relative w-full justify-center overflow-hidden'>
                { loggedInUser ? loggedInUser.avatar_url ? 
                    <img src={loggedInUser.avatar_url} className='w-full'/> :
                    <UserIcon /> :
                    <UserIcon />
                }
                    <button className='z-10 absolute top-2 right-2 w-8 h-8 bg-white rounded-sm p-1'>
                        <UserIcon className='text-black'/>
                    </button>
                </div>

                <button
                    className='flex flex-row h-8 bg-white rounded-sm items-center'
                    onClick={() => {}}>
                { isLoggedIn ?
                    <>
                        <p className='font-bold text-black'>LOGOUT</p>
                        <ArrowLeftStartOnRectangleIcon className='text-black max-h-full aspect-square'/>
                    </> :
                    <>
                        <p className='font-bold text-black'>LOGIN</p>
                    </> 
                }
                </button>
            </div> : <></> 
        </div>
    )
}

export default ProfileMini