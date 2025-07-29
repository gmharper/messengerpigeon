
// IMPORTS
import { useEffect, useState } from "react"

// TYPE DECLARATIONS
type user = {
    type:string, username: string, name: string, avatar_url: string
} | null

type AppProps = {
    user: user
}

function UserPage ({ user }:AppProps ):React.JSX.Element {
    const [storedUser, setStoredUser] = useState({})

    useEffect(() => {
        if (user) setStoredUser(user)
    }, [user])

    return (
        <div>

        </div>
    )
}

export default UserPage