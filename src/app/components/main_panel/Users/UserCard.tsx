
// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext } from "@/app/page"

// COMPONENTS
import { HeartIcon, UserIcon } from "@heroicons/react/24/solid"
import { RowCard, SquareCard } from "../../style/index"

// TYPE DECLARATIONS
type AppProps = {
    cardShape: string,
    user: user
}

type user = {
    type:string, username: string, name: string, avatar_url: string
} | null

// STYLING
const card_styling = 'bg-zinc-200 rounded-sm p-2 hover:outline-2 outline-violet-600 cursor-pointer'

function UserCard ( { cardShape, user }:AppProps ):React.JSX.Element {
    const { loggedInUser, getWindowSize } = useContext(AppContext)
    
    const [storedUser, setStoredUser] = useReducer(userReducer, user)

    const [isLiked, setIsLiked] = useState(false)
    const [isFollowed, setIsFollowed] = useState(false)

    function userReducer (state:user, action:any):user {
        if (state && action) {
            if (state.username === action.username) return state
        }
        return state
    }

    useEffect(() => {
        if (user) setStoredUser(user)

        // get following users to show follow/following state
    }, [loggedInUser, user])

    return (
        <>
            { user && cardShape==='row' ? 
            <RowCard styling={'flex flex-row gap-2 w-full min-h-24 h-24 ' +card_styling} children={
                <>
                    <div className='h-full min-w-24 aspect-square overflow-hidden rounded-sm'>
                        { user ? user.avatar_url ?
                        <img src={user ? user.avatar_url : undefined} className='h-full w-24 aspect-square' />
                        : <UserIcon className='h-full w-full'/> : <UserIcon className='h-full w-full' />
                        }
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row w-full h-8'>
                            <div className='w-64 h-full bg-white rounded-sm content-center px-2'>
                                <p className='font-bold text-black'>{ user ? user.name ? user.name : '' : '' }</p>
                            </div>
                        </div>

                        <div className='flex-1' />
                        
                        <div className='flex flex-row h-8 rounded-lg overflow-hidden'>
                            <div className='w-16 bg-zinc-300 content-center px-2'>
                                <p className='text-black'>10k</p>
                            </div>
                            
                        {isFollowed ? 
                            <button 
                                className='w-32 h-8 bg-sky-500 px-2 rounded-r-lg'
                                onClick={() => {setIsFollowed(!isFollowed)}}>
                                <p className='font-bold text-white'>FOLLOWING</p>
                            </button>
                            :
                            <button 
                                className='w-24 h-8 bg-white px-2 rounded-r-lg'
                                onClick={() => {setIsFollowed(!isFollowed)}}>
                                <p className='font-bold text-black'>FOLLOW</p>
                            </button>
                        }
                        </div> 
                    </div>
                    
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-row w-24 outline-1 outline-zinc-400 rounded-sm overflow-hidden'>
                            <p className='text-center text-black bg-zinc-300'>ARTICLES</p>
                            <p className='text-center text-black bg-white'>100</p>
                        </div>

                        <div className='flex flex-row w-24 outline-1 outline-zinc-400 rounded-sm overflow-hidden'>
                            <p className='text-center text-black bg-zinc-300'>COMMENTS</p>
                            <p className='text-center text-black bg-white'>100</p>
                        </div>
                    </div>

                    <div className='flex-1' />

                    <div className='flex flex-col gap-2 items-end'>
                        

                        <button className='w-8 h-8 bg-zinc-500 rounded-sm p-1'
                        onClick={() => {setIsLiked(!isLiked)}}>
                            <HeartIcon className={'' +(isLiked ? ' text-red-400' : ' text-white')}/>
                        </button>
                    </div>
                </>
            } />

            : cardShape==='square' ?
                <SquareCard styling={''} inputObject={{ title: '', img: ''}} />
            : <></>
            }
        </>
    )
}

export default UserCard