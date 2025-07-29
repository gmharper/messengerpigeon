
"use client"

// IMPORTS
import { useEffect, useState } from "react"
import { getUsers } from "../../../scripts/fetch/index"

// COMPONENTS
import { UserCard } from "./index"
import { GridPanel } from "../Main"

// TYPE DECLARATIONS
type AppProps = {
    cardShape: string,
    sort: string,
    order: string,
    page: number,
    filters: any
}

type user = {
    type:string, username: string, name: string, avatar_url: string
}

function UsersPanel ({ cardShape, sort, order, page, filters }:AppProps ):React.JSX.Element {
    const [users, setUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [usersError, setUsersError] = useState(null)

    useEffect(() => {
        getUsers(setUsers, setUsersLoading, setUsersError, sort, order, page, 20)
    }, [])

    return (
        <GridPanel 
            cardShape={cardShape}
            isLoading={usersLoading}
            error={usersError}
            children={
                users.map((user:user):React.JSX.Element => {
                    return (
                        <UserCard cardShape={cardShape} user={user} />
                    )
                })
            }
        />
    )
}

export default UsersPanel