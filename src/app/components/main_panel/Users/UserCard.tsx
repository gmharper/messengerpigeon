
// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// SCRIPTS
import { getUserData } from "@/app/scripts/fetch/index"
import { patchUserData } from "@/app/scripts/patch/index"
import { deleteUser } from "@/app/scripts/delete/index"

// COMPONENTS
import { Tooltip } from 'react-tooltip'
import { NewspaperIcon, ChatBubbleBottomCenterTextIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ArrowRightCircleIcon, ChevronDoubleRightIcon, HeartIcon, UserIcon } from "@heroicons/react/24/solid"
import { BoxLabel, RowCard, SquareCard, ReadButton, StarButton } from "../../style/index"

// TYPE DECLARATIONS
type AppProps = {
    username: string,
    user: user,
    cardShape: string
}

type user = {
    type:string, username: string, name: string, email:string, verified:boolean, description:string,
    avatar_img_url: string, banner_img_url:string, profile_colour:string,
    banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>,
    subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

// STYLING
const card_styling = ''

function UserCard ( { username, user, cardShape }:AppProps ):React.JSX.Element {
    const { loggedInUsername, loggedInUser, getWindowSize } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    const userReducer = (state:any, action:any) => {
        const userCopy = {...state}

        for (const key in action) {
            if (userCopy.hasOwnProperty(key)) userCopy[key] = action[key]
        } return userCopy
    }
    
    const [storedUser, setStoredUser] = useReducer(userReducer, user)

    const [following, setFollowing] = useState(loggedInUser.following.includes(username))

    const [followLoading, setFollowLoading] = useState(false)
    const [followError, setFollowError] = useState(null)

    function openUserPage () {
        if (user && user.username) {
            const userState = {
                id: username,
                loading_page: true,
                display_type: "user_page",
                roost_type: "user_page",
                heading: user.name,
            }
            setCurrentState(userState)
        }
    }

    function openSortedArticles () {
        if (user && user.username) {
            const articleState = {
                id: username,
                loading_page: true,
                display_type: "articles",
                heading: `Articles by ${user.username}`,
                author: user.username,
                sort: "created_at",
                order: "DESC"
            }
            setCurrentState(articleState)
        }
    }

    function openSortedComments () {
        if (user && user.username) {
            const commentState = {
                id: username,
                loading_page: true,
                display_type: "comments",
                heading: `Comments by ${user.username}`,
                author: username,
                sort: "created_at",
                order: "DESC"
            }
            setCurrentState(commentState)
        }
    }

    function handleFollow () {
        setFollowing(true) // optimistic rendering

        const userFollowers = [...storedUser.followers]
        userFollowers.push(loggedInUsername)

        setStoredUser({ followers: userFollowers })

        // make call to database
    }

    function handleUnfollow () {
        setFollowing(false) // optimistic rendering

        const userFollowers = [...storedUser.followers]
        userFollowers.splice(userFollowers.indexOf(loggedInUsername))

        setStoredUser({ followers: userFollowers })

        // make call to database
    }

    useEffect(() => {
        if (user) setStoredUser(user)
    }, [loggedInUser, user])

    return (
        <>
            { user && cardShape==='row' ? 
            <RowCard type={'user'} height={'h-32 '} styling={following ? "outline-3 outline-sky-500 shadow-lg shadow-sky-500 " : "outline-1 outline-zinc-300 "} children={
                <div className='relative w-full h-full overflow-hidden'>
                    <img className='absolute w-full' src={storedUser ? storedUser.banner_img_url ? storedUser.banner_img_url : null : null} />

                    <div className='flex flex-row w-full h-full gap-2 p-2'>
                        <div className='flex h-28 min-w-28 max-w-28 rounded-sm overflow-hidden'>
                            { storedUser ? storedUser.avatar_img_url ?
                            <img src={storedUser ? storedUser.avatar_img_url : undefined} className='h-full aspect-square rounded-xs ' />
                            : <UserIcon className='h-full w-full'/> : <UserIcon className='h-full w-full' />
                            }
                        </div>

                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row'>
                                <BoxLabel text={`${storedUser ? storedUser.name : "name"}`} text_size={'text-sm '} styling={' w-60 outline-1 outline-zinc-300 '} children={
                                    <div className=' ml-2 bg-zinc-200 px-2 rounded-sm'>
                                        <p className='text-black text-xs'>{`@${storedUser ? storedUser.username : "username"}`}</p>
                                    </div>
                                }/>

                                <div className='flex-1' />

                                <div className='flex flex-row gap-1'>
                                    <div 
                                        className='w-12 bg-zinc-300 content-center px-2 rounded-sm'
                                        data-tooltip-id={username +'_followers'}
                                        data-tooltip-content='Number of Followers'
                                        data-tooltip-place='bottom'
                                    >
                                        <p className='text-sm text-black text-center'>{storedUser? storedUser.followers.length : 0}</p>
                                    </div>
                                    <Tooltip id={username +'_followers'} />

                                    <div className='w-8'>
                                        <StarButton isStarred={following} setFn={handleFollow} unsetFn={handleUnfollow}/>
                                    </div>
                                </div>
                            </div>

                            <div className='flex-1' />
                            
                            <div className='flex flex-row w-full rounded-lg'>
                                <button 
                                    className='z-20 flex flex-row h-6 bg-white place-items-center rounded-sm mr-2'
                                    onClick={() => { openSortedArticles() }}
                                    data-tooltip-id={username +'_articles'}
                                    data-tooltip-content='Articles'
                                    data-tooltip-place="top"
                                >
                                    <NewspaperIcon className='h-full text-black' />
                                    <p className='w-10 text-center text-sm text-black bg-white'>{storedUser? storedUser.articles.length : 0}</p>
                                </button>
                                <Tooltip id={username +'_articles'} />

                                <button 
                                    className='z-20 flex flex-row h-6 bg-white place-items-center rounded-sm'
                                    onClick={() => { openSortedComments() }}
                                    data-tooltip-id={username +'_comments'}
                                    data-tooltip-content='Comments'
                                >
                                    <ChatBubbleBottomCenterTextIcon className='h-full text-black' />
                                    <p className='w-10 text-center text-sm text-black bg-white place-items-center'>{storedUser? storedUser.comments.length : 0}</p>
                                </button>
                                <Tooltip id={username +'_comments'} />

                                <div className='flex-1' />

                                <ReadButton text={''} Fn={ openUserPage }/>
                            </div> 
                        </div>
                    </div>
                </div>
            } />

            : cardShape==='square' ?
                <SquareCard styling={''} inputObject={{ title: '', img: ''}} />
            : <></>
            }
        </>
    )
}

export default UserCard