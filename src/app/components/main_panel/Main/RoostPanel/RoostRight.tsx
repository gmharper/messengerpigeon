// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/page"
import { StateContext } from "@/app/state"

// COMPONENTS
import { Tooltip } from "react-tooltip"
import { UserIcon } from "@heroicons/react/24/solid"
import { StarButton } from "@/app/components/style"

// TYPE DECLARATIONS
type Props = {
    user:user,
    setUser:any,
    setUserStyling?:any
}

type user = {
    username:string, name:string, email:string, password:string, verified:boolean, description:string, theme:string,
    avatar_img_url:string, banner_img_url:string,
    profile_colour:string, banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>, subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

function RoostRight ({ user, setUser, setUserStyling }:Props) {
    const { setCurrentState } = useContext(StateContext)
    const { loggedInUsername, loggedInUser, setLoggedInUser, params } = useContext(AppContext)
    const { theme } = useContext(ThemeContext)

    const [following, setFollowing] = useState(user ? loggedInUser.following.includes(user.username) : false)

    const [followLoading, setFollowLoading] = useState(false)
    const [followError, setFollowError] = useState(null)

    function openProfilePage () {
        const profileState = {
            location: 'profile_page',
            display_type: 'profile',
            show_function_bar: false,
            show_heading: true,
            heading: 'PROFILE'
        }
        setCurrentState(profileState)
    }


    function handleFollow () {
        setFollowing(true) // optimistic rendering

        const userFollowers = [...user.followers]
        userFollowers.push(loggedInUsername)
    
        setUser({ followers: userFollowers })
        setUserStyling({ outlineWidth: '2px' })

        // then make call to database
    }

    function handleUnfollow () {
        setFollowing(false) // optimistic rendering

        const userFollowers = [...user.followers]
        userFollowers.splice(userFollowers.indexOf(loggedInUsername))

        setUser({ followers: userFollowers })
        setUserStyling({ outlineWidth: '0px' })

        // the make call to database
    }

    useEffect(() => {

    }, [user])

    return (
        <div className='flex flex-row gap-1'>
            <div className='flex flex-row rounded-sm overflow-hidden'>
                <div className='flex w-32 h-8 bg-zinc-300 items-center px-2'>
                    <p className='text-black'>{`${user? user.followers? user.followers.length : 0 : 0} followers`}</p>
                </div>
            </div>

            { (params.roost_type==='user' || params.roost_type==='profile')?
            <>
                <button 
                    className={'flex w-8 h-8 outline-1 outline-zinc-600 rounded-full p-1 ' +(params.display_type==='profile'? 'bg-violet-500' : 'bg-white')}
                    onClick={() => { openProfilePage() }}
                    data-tooltip-id='profile'
                    data-tooltip-content='Open Profile'
                >
                    <UserIcon className='text-black' />    
                </button> 
                <Tooltip id={'profile'} />
            </> : 
            params.roost_type==='user_page'?
            <>
                <StarButton isStarred={following} setFn={handleFollow} unsetFn={handleUnfollow} 
                    data-tooltip-id='follow' 
                    data-tooltip-content={following? 'Unfollow User' : 'Follow User'}/>
                <Tooltip id={'follow'} />
            </> :
            <></>
            }

        </div>
    )
}

export default RoostRight