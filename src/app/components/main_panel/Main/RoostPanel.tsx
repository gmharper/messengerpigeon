"use-client"

// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// SCRIPTS
import { getTopicBySlug, getUserByUsername } from "@/app/scripts/fetch/index"

//import roost_background_image from "../../../assets/img/roost.jpg"

// COMPONENTS
import { RoostLeft, RoostFeed, RoostRight, TopicRoostLeft, TopicRoostFeed, TopicRoostRight } from "./RoostPanel/index"

import {
    ChevronUpIcon, ChevronDownIcon,
    ChatBubbleBottomCenterTextIcon, TagIcon, NewspaperIcon,
    UserIcon, UsersIcon,
    PuzzlePieceIcon 
} from "@heroicons/react/24/solid" 

import { BoxLabel } from "../../style/index"

// TYPE DECLARATIONS
type Props = {
    type:string,
    dummyProfile?:user,
    setDummyProfile?:Dispatch<SetStateAction<user>>
}

type user = {
    username:string, name:string, password:string, email:string, verified:boolean, description:string, theme:string,
    avatar_img_url:string, banner_img_url:string, profile_colour:string,
    banner_blend:string, banner_position:string,
    articles:Array<number>, comments:Array<number>, subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>,
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

type topic = {
    type:string, slug:string, description:string, created_by:string,
    topic_colour:string, img_url:string,
    subscribers:Array<string>,
    created_at:string
}

function RoostPanel ({ type='user', dummyProfile, setDummyProfile }:Props):React.JSX.Element {
    const { loggedInUsername, loggedInUser, dummyUser, dummyTopic, params, setParams } = useContext(AppContext)
    const { theme } = useContext(ThemeContext)
    const { setCurrentState } = useContext(StateContext)

    // STORED USER (if user roost)
    const userReducer = (state:any, action:any) => {
        const userCopy = {...state}

        for (const key in action) {
            if (userCopy.hasOwnProperty(key)) userCopy[key] = action[key]
        } return userCopy
    }

    const [storedUser, setStoredUser] = useReducer(userReducer, {...dummyUser})
    const [userLoading, setUserLoading] = useState(false)
    const [userError, setUserError] = useState(null)

    // STORED TOPIC (if topic roost)
    const topicReducer = (state:any, action:any) => {
        const topicCopy = {...state}

        for (const key in action) {
            if (topicCopy.hasOwnProperty(key)) topicCopy[key] = action[key]
        } return topicCopy
    }

    const [storedTopic, setStoredTopic] = useReducer(topicReducer, {...dummyTopic})
    const [topicLoading, setTopicLoading] = useState(false)
    const [topicError, setTopicError] = useState(null)

    // STYLING
    const styleReducer = (state:any, action:any) => {
        const styleCopy = {...state}

        for (const key in action) {
            if (styleCopy.hasOwnProperty(key)) styleCopy[key] = action[key]
        } return styleCopy
    }

    const [loggedoutStyling, setLoggedoutStyling] = useReducer(styleReducer, {
        backgroundColor: 'white',
        backgroundPosition: 'center',
        backgroundBlendMode: 'normal'
    })

    const [profileStyling, setProfileStyling] = useReducer(styleReducer, {
        backgroundImage: (loggedInUser? loggedInUser.banner_img_url? `url("${loggedInUser.banner_img_url}")` : '' : ''),
        backgroundColor: (loggedInUser? loggedInUser.profile_colour? loggedInUser.profile_colour : 'white' : 'white'),
        backgroundPosition: (loggedInUser? loggedInUser.banner_position? loggedInUser.banner_position : 'center' : 'center'),
        backgroundBlendMode: (loggedInUser? loggedInUser.banner_blend? loggedInUser.banner_blend : 'normal' : 'normal')
    })

    const [userpageStyling, setUserpageStyling] = useReducer(styleReducer, {
        backgroundImage: '',
        backgroundColor: ('white'),
        backgroundPosition: ('center'),
        backgroundBlendMode: ('normal'),
        outlineStyle: 'solid',
        outlineWidth: '0px',
        outlineColor: 'cyan'
    })

    const [topicStyling, setTopicStyling] = useReducer(styleReducer, {
        backgroundSize: 'cover',
        backgroundImage: (storedTopic? storedTopic.img_url? `url("${storedTopic.img_url}")` : '' : ''),
        backgroundColor: (storedTopic? storedTopic.topic_colour? storedTopic.topic_colour : 'white' : 'white'),
        backgroundPosition: 'center',
        backgroundBlendMode: 'normal',
        outlineStyle: 'solid',
        outlineWidth: '0px',
        outlineColor: 'cyan'
    })

    // USE EFFECTS
    useEffect(() => {
        if (type==='user_page' && params.id) {
            getUserByUsername(params.id, setStoredUser, setUserLoading, setUserError)
            .then((user) => {
                setUserpageStyling({ 
                    backgroundImage: user? user.banner_img_url? `url("${user.banner_img_url}")` : '' : '',
                    backgroundColor: user? user.profile_colour? user.profile_colour : 'white' : 'white',
                    backgroundPosition: user? user.banner_position? user.banner_position : 'center' : 'center',
                    backgroundBlendMode: user? user.banner_blend? user.banner_blend : 'normal' : 'normal'
                })
            })
        }
        if (type==='topic' && params.id) {
            getTopicBySlug(params.id, setStoredTopic, setTopicLoading, setTopicError)
            .then((topic) => {
                setTopicStyling({
                    backgroundImage: topic? topic.img_url? `url("${topic.img_url}")` : '' : '',
                    backgroundColor: topic? topic.topic_colour? topic.topic_colour : 'white' : 'white'
                })
                //console.log(res, "<-- roost topic")
            })
        }
    }, [type])

    
    return (
        <div className='relative flex w-full justify-center'>
            <button 
                className={'absolute z-100 flex w-24 h-6 bg-white border-b-2 border-x-1 border-zinc-300 rounded-b-xl justify-center items-center ' +(params.show_roost ? '-bottom-6' : '-bottom-4')}
                onClick={ () => { setParams({ show_roost: !params.show_roost }) }}>
                    { params.show_roost ? <ChevronUpIcon className={'h-8 text-black'}/> : <ChevronDownIcon className={'h-8 text-black'}/>}
            </button>

            { params.show_roost ? 
                <div style={
                    type==='logged_out'? loggedoutStyling : 
                    type==='user_page'? userpageStyling : 
                    type==='topic'? topicStyling : 
                    profileStyling
                } 
                className={'relative flex flex-row gap-2 w-full rounded-xl overflow-hidden ' +(type==='topic' ? 'h-32' : 'h-32')}>
                { 
                    type==='user'? 
                    <>
                    { loggedInUser? loggedInUser.banner_img_url? 
                        <img src={loggedInUser.banner_img_url} className='absolute flex w-full'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                    }

                        <div className='z-20 min-w-100 flex px-2 py-1'>
                            <RoostLeft user={loggedInUser? loggedInUser : dummyUser} />
                        </div>

                        <div className='z-20 min-w-32 px-2 py-1'>
                            <RoostFeed user={loggedInUser? loggedInUser : dummyUser}/>
                        </div>

                        <div className='flex-1'/>

                        <div className='z-20 px-2 py-1'>
                            <RoostRight user={loggedInUser? loggedInUser : dummyUser} setUser={setStoredUser}/>
                        </div>
                    </>
                    : type==='profile'?
                    <>
                    { dummyProfile? dummyProfile.banner_img_url? 
                        <img src={dummyProfile.banner_img_url} className='absolute flex w-full'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                    }

                        <div className='z-20 min-w-100 flex px-2 py-1'>
                            <RoostLeft user={dummyProfile? dummyProfile : dummyUser} />
                        </div>

                        <div className='z-20 min-w-32 px-2 py-1'>
                            <RoostFeed user={dummyProfile? dummyProfile : dummyUser}/>
                        </div>

                        <div className='flex-1'/>

                        <div className='z-20 px-2 py-1'>
                            <RoostRight user={dummyProfile? dummyProfile : dummyUser} setUser={setStoredUser}/>
                        </div>
                    </>
                    : type==='user_page'?
                    <>
                    { storedUser? storedUser.banner_img_url? 
                        <img src={storedUser.banner_img_url} className='absolute flex w-full'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                        :
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                    }

                        <div className='z-20 min-w-100 flex px-2 py-1'>
                            <RoostLeft user={storedUser? storedUser : dummyUser} />
                        </div>

                        <div className='z-20 min-w-32 px-2 py-1'>
                            <RoostFeed user={storedUser? storedUser : dummyUser} />
                        </div>

                        <div className='flex-1'/>

                        <div className='z-20 px-2 py-1'>
                            <RoostRight user={storedUser? storedUser : dummyUser} setUser={setStoredUser} setUserStyling={setUserpageStyling}/>
                        </div>
                    </>
                    : type==='logged_out'?
                    <>
                        <video src={"/assets/roost.mp4"} autoPlay={true} muted={true} loop={true} className='absolute flex w-full saturate-200'/>
                    </>
                    : type==='topic'?
                    <>
                    { storedTopic? storedTopic.banner_img_url? 
                        <img src={storedTopic.img_url} className='absolute flex w-full'/>
                        :
                        <></>
                        :
                        <></>
                    }

                        <div className='z-20 flex h-full px-2 py-1'>
                            <TopicRoostLeft topic={storedTopic? storedTopic : dummyTopic} />
                        </div>

                        <div className='z-20 flex h-full px-2 py-1'>
                            <TopicRoostFeed topic={storedTopic? storedTopic : dummyTopic} />
                        </div>

                        <div className='flex-1' />

                        <div className='z-20 flex h-full px-2 py-1'>
                            <TopicRoostRight topic={storedTopic? storedTopic : dummyTopic} setTopic={setStoredTopic} setTopicStyling={setTopicStyling}/>
                        </div>
                    </> 
                    : <></>
                }
                </div> : <></>
            }
        </div>
    )
}

export default RoostPanel