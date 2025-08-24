// IMPORTS
import { useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getUsers } from "../../../scripts/fetch/index"

// COMPONENTS
import { UserCard } from "./index"
import { GridPanel } from "../Main/index"
import { SyncLoader } from "react-spinners"
import { LoadingCard } from "../../style"

// TYPE DECLARATIONS
type AppProps = {
    cardShape: string,
    setHeading: Function
}

type user = {
    type:string, username: string, name: string, email:string, verified:boolean, description:string,
    avatar_img_url: string, banner_img_url:string, profile_colour:string,
    banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>, subscribed_topics:Array<string>, subscribed_games:Array<string>
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

function UsersPanel ():React.JSX.Element {
    const { loggedInUsername, params, setParams } = useContext(AppContext)

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const [usersLoading, setUsersLoading] = useState(false)
    const [usersError, setUsersError] = useState(null)


    // UTILITY FUNCTIONS
    async function filterUsers (usersToFilter:any) {
        const usersFiltered = usersToFilter.filter((user:any) => {
            if (loggedInUsername && (user.username !== loggedInUsername)) {
                if ((user.username && user.username.includes(params.search)) || (user.name && user.name.includes(params.search))) return user //user
            }
        })
        setFilteredUsers(usersFiltered)

        return usersFiltered
    }

    function setHeading (filtered:any) {
        setParams({ location: 'users_panel', heading: `USERS (${params.page*params.per_page}/${filtered.length})` })
    }


    // USE EFFECTS
    useEffect(() => {
        setParams({ heading: 'USERS' })
        getUsers(setUsers, setUsersLoading, setUsersError, params.sort, params.order, params.page, params.per_page)
        .then((res:any) => {
            return filterUsers(res)
        })
        .then((filtered:any) => {
            setHeading(filtered)
        })
        .finally(() => {
            setParams({ loading_page: false })
        })
    }, [params.sort, params.order, params.page, params.per_page])

    useEffect(() => {
        filterUsers(users)
        .then((filtered:any) => {
            setHeading(filtered)
        })
    }, [params.search])


    return (
        <div className='p-8'>
        {
            usersError ? 
            <LoadingCard type={'error'} display_type="Users" err_msg={usersError? usersError : ''} styling='my-16' />
            : 
            usersLoading ? 
            <LoadingCard type={'loading'} display_type="Users" styling='my-16' />
            :
            (users.length===0 || filteredUsers.length===0)?
            <LoadingCard type={'empty'} message={"Looks like there are no users to show..."} styling='my-16' />
            :
            <GridPanel 
                cardShape={params.card_shape || 'row'}
                isLoading={usersLoading}
                error={usersError}
                children={
                    filteredUsers.map((user:user):React.JSX.Element => {
                        return (
                            <UserCard key={user.username} username={user.username} user={user} cardShape={params.card_shape || 'row'} />
                        )
                    })
                }
            />
        }
        </div>
    )
}

export default UsersPanel