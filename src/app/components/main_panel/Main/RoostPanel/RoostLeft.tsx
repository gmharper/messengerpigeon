// IMPORTS
import { useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// COMPONENTS
import { Tooltip } from "react-tooltip"
import { BoxLabel } from "@/app/components/style/index"
import { UserIcon, TagIcon, NewspaperIcon, ChatBubbleBottomCenterTextIcon, ShieldCheckIcon } from "@heroicons/react/24/solid"

// TYPE DECLARATIONS
type Props ={
    user:user
}

type user = {
    username:string, name:string, email:string, password:string, verified:boolean, description:string, theme:string,
    avatar_img_url:string, banner_img_url:string,
    profile_colour:string, banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>, subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

// STYLING
let icon_styling = 'h-8 bg-white rounded-sm p-2 text-black'

function RoostLeft ({ user }:Props):React.JSX.Element {
    const { loggedInUsername, loggedInUser, setLoggedInUser } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    function openTopics () {
        const topicState = {
            display_type: "topics",
            topics: [user.subscribed_topics]
        }
        setCurrentState(topicState)
    }

    function openArticles () {
        const articleState = {
            display_type: "articles",
            author: user.username
        }
        setCurrentState(articleState)
    }

    function openComments () {
        const commentState = {
            display_type: "comments",
            author: user.username
        }
        setCurrentState(commentState)
    }

    useEffect(() => {

    }, [user])

    return (
            <div className='flex flex-row max-h-full gap-2'>
                <div className='w-28 h-28 bg-white rounded-sm overflow-hidden p-1'>
                    { 
                        user ? user.avatar_img_url ? 
                        <img src={user ? user.avatar_img_url ? user.avatar_img_url : null : null} /> :
                        <UserIcon className='text-black'/> : <UserIcon className='text-black'/>
                    }
                </div>

                <div className='flex flex-col gap-1'>
                    <div className='flex flex-row gap-1'>
                        <BoxLabel text={`${user ? user.name : "name"}'s Roost`} styling={' w-100 outline-1 outline-zinc-300'} children={
                            <>
                            { user? user.verified?
                            <>
                                <ShieldCheckIcon 
                                    className='w-6 h-6 text-sky-500' 
                                    data-tooltip-id='verified' 
                                    data-tooltip-content='This User has been Verified'
                                />
                                <Tooltip id='verified' />
                            </>
                                : <></> : <></>
                            }
                                <div className=' ml-2 bg-zinc-200 px-2 rounded-sm'>
                                    <p className='text-black'>{`@${user ? user.username : "username"}`}</p>
                                </div>
                            </>
                        }/>
                        
                    </div>

                    <textarea 
                        className='flex-1 bg-zinc-800/90 text-white text-xs p-1 rounded-sm p-1'
                        value={user? user.description : ''}
                        contentEditable={'false'}
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <button 
                        className='flex flex-row gap-1'
                        onClick={() => { openTopics() }}
                        data-tooltip-id='topics'
                        data-tooltip-content='Subscribed Topics'
                    >
                        <TagIcon className={icon_styling}/>
                        <div className='w-16 bg-zinc-200 rounded-sm px-1 content-center'>
                            <p className='text-black'>{`${user ? user.subscribed_topics ? user.subscribed_topics.length : 0 : 0}`}</p>
                        </div>
                    </button>
                    <Tooltip id='topics' />

                    <button 
                        className='flex flex-row gap-1'
                        onClick={() => { openArticles() }}
                        data-tooltip-id='articles'
                        data-tooltip-content='Created Articles'
                    >
                        <NewspaperIcon className={icon_styling}/>
                        <div className='w-16 bg-zinc-200 rounded-sm px-1 content-center'>
                            <p className='text-black'>{`${user ? user.articles ? user.articles.length : 0 : 0}`}</p>
                        </div>
                    </button>
                    <Tooltip id='articles' />

                    <button 
                        className='flex flex-row gap-1'
                        onClick={() => { openComments()} }
                        data-tooltip-id='comments'
                        data-tooltip-content='Comments'
                    >
                        <ChatBubbleBottomCenterTextIcon className={icon_styling}/>
                        <div className='w-16 bg-zinc-200 rounded-sm px-1 content-center'>
                            <p className='text-black'>{`${user ? user.comments ? user.comments.length : 0 : 0}`}</p>
                        </div>
                    </button>
                    <Tooltip id='comments' />
                </div>
            </div>
    )
}

export default RoostLeft