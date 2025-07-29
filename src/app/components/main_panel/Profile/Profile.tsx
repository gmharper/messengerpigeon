
// IMPORTS
import { AppContext } from "@/app/page"
import { useContext, useEffect, useReducer, useState } from "react"

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

function Profile ():React.JSX.Element {
    const { loggedInUser, setLoggedInUser } = useContext(AppContext)

    const profileReducer = (state:user, action:userAction):user => {
        return state
    }

    const [storedUser, setStoredUser] = useReducer(profileReducer, loggedInUser)

    function handleSave () {
        // make call to db
        // replace user with storedUser
    }

    function handleExit () {
        // setStoredUser(activeUser)
    }

    return (
        <div className='w-32 h-32 bg-stone-100'>

        </div>
    )
}

export default Profile