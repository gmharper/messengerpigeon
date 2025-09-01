"use client"

//IMPORTS
import { ActionDispatch, Dispatch, SetStateAction, useCallback, useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext"
import { StateContext } from "@/app/state"

// SCRIPTS
import { getArticleData } from "@/app/scripts/fetch"

// COMPONENTS
import { BoxLabel } from "../style/index.jsx"
import { LeftPanelButton } from "./index"

import {
    ArrowTurnDownRightIcon,
    HomeIcon,
    TagIcon, 
    UserIcon, UsersIcon,
    ChatBubbleBottomCenterTextIcon,
    NewspaperIcon,
    PuzzlePieceIcon 
} from "@heroicons/react/24/solid" 
    
import { 
    ArrowLeftStartOnRectangleIcon, 
    ChevronDownIcon, 
    ChevronRightIcon 
} from "@heroicons/react/24/outline"


type leftPanelLabel = { id: string, name: string, hoverOver: boolean }
const left_panel_labels = [
    { id: 'categories', name: 'CATEGORIES', hoverOver: false, selected: false },
    { id: 'users', name: 'USERS', hoverOver: false, selected: false },
    { id: 'articles', name: 'ARTICLES', hoverOver: false},
    { id: 'settings', name: 'SETTINGS', hoverOver: false},
    { id: 'profile', name: 'PROFILE', hoverOver: false},
]

const filters = {
    'feed': [],
    'users': [
        { id: 'following', name: 'Following', isEnabled: true },
        { id: 'blocked', name: 'Blocked', isEnabled: false }
    ],
    'articles': [
        { id: 'liked', name: 'Liked', isEnabled: true },
        { id: 'read', name: 'Read', isEnabled: true }
    ],
    'topics': [
        { id: 'subscribed', name: 'Subscribed', isEnabled: true }
    ],
    'comments': [
        { id: 'liked', name: 'Liked', isEnabled: true }
    ],
    'games': [
        { id: 'subscribed', name: 'Subscribed', isEnabled: true }
    ]

}

// TYPE DECLARATIONS
type AppProps = {
    displayType: string,
}

type labelAction = {
    id: string,
    type: string,
    set: boolean
}

type filter = {
    id: string,
    name: string,
    isEnabled: boolean,
}

// STYLING
const button_styling = 'h-full text-black aspect-1/1'

function LeftPanel ():React.JSX.Element {
    const { getWindowSize, isLoggedIn, loggedInUser, params, setParams } = useContext(AppContext)
    const { theme, setTheme } = useContext(ThemeContext)
    const { setCurrentState } = useContext(StateContext)

    const [showFilter, setShowFilter] = useState(true)

    const labelsReducer = (state:Array<leftPanelLabel>, action:labelAction ):Array<leftPanelLabel> => {
        switch (action.type) {
            case 'hoverOver':
                return state.map((label) => {
                    if (label.id === action.id) return { ...label, hoverOver: action.set}
                    else return { ...label }
                })
            default:
                return state
        }
    }

    const [labels, setLabels] = useReducer(labelsReducer, left_panel_labels)

    // HANDLER FUNCTIONS
    function handlePress (displayType:string, heading:string) {
        const newState = {
            display_type: displayType,
            heading: heading
        }
        setCurrentState(newState)
    }

    function setFilterEnabled (filter_id:string) {
        const paramsFiltersCopy = [...params.filters]

        paramsFiltersCopy.map((filter:any) => {
            const filterCopy = {...filter}

            if (filter.id === filter_id) filterCopy.isEnabled
            return filterCopy
        })
        setParams({ filters: paramsFiltersCopy })
    }

    function setFilterOnly (filter_id:string) {
        const paramsFiltersCopy = [...params.filters]

        paramsFiltersCopy.map((filter:any) => {
            const filterCopy = {...filter}
            if (filterCopy.id === filter_id) filterCopy.isEnabled = true
            else filterCopy.isEnabled = false
            return filterCopy
        })
        setParams({ filters: paramsFiltersCopy })
    }


    useEffect(() => {
    }, [ params.display_type, params.filters])

    return (
        <div className='flex flex-col'>
            {/* <div className='mb-4 w-full h-16 bg-white rounded-sm items-center content-center'>
                <p className='font-bold text-black text-xl text-center'>MESSENGER PIGEON</p>
            </div> */}
            
            <div className={'flex flex-col gap-[3px] min-h-200 w-16 lg:w-60 rounded-sm p-3 outline-1 outline-zinc-600 ' +theme.base +theme.lines}>
                <LeftPanelButton 
                    id={'feed'} 
                    text={'YOUR FEED'} 
                    icon={<UserIcon className={'h-full aspect-1/1 ' +(params.display_type==='feed'? 'text-white' : 'text-black')}/>} 
                    styling={'hover:scale-105 '} 
                    selected={(params.display_type==='feed')}
                    button_params={{ 
                        display_type:'feed', sort:'created_at', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                        sorts: 'feed_sorts', filters: ['feed'],
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } }
                />

                <div className='flex w-50'>
                { (params.display_type==='profile')?
                    <LeftPanelButton 
                        id={'profile'} 
                        text={'Profile'} 
                        icon={<UserIcon className={'w-4 h-4 aspect-1/1 ' +(params.display_type==='profile'? 'text-white' : 'text-black')}/>} 
                        height={'h-6 '}
                        styling={'ml-2 mb-4 hover:scale-105 '} 
                        selected={(params.display_type==='profile')}
                        button_params={{ 
                            display_type:'profile', sort:'created_at', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                            sorts: 'user_sorts',
                            roost_type: 'profile'
                        }}
                        onPress={ (params_input:any) => { setParams(params_input) } }
                    /> : <></>
                }
                </div>


                <LeftPanelButton 
                    id={'topics'}
                    text={'TOPICS'} 
                    icon={<TagIcon className={'h-full text-black aspect-1/1 ' 
                        + ((params.display_type==='topics')? 'text-white' : 'text-black')
                    }/>} 
                    styling={'hover:scale-105 '} 
                    selected={(params.display_type==='topics')}
                    button_params={{ 
                        display_type:'topics', sort:'subscribers_count', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                        sorts: 'topic_sorts', filters: filters['topics'],
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } } 
                />

                <div className='flex max-w-50'>
                    { (params.display_type==='topic_page' && params.id)?
                        <LeftPanelButton 
                            id={'topic_page'}
                            text={params.id? params.id : ''} 
                            icon={<ArrowTurnDownRightIcon className={'w-4 h-4 aspect-1/1 ' +(params.display_type==='topic_page'? 'text-white' : 'text-black')}/>} 
                            height={'h-6 '}
                            styling={'hover:scale-105 ml-2 mb-2 '} 
                            selected={(params.display_type==='topic_page')}
                            button_params={{ 
                                display_type:'topic_page', sort:'subscribers_count', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                                sorts: 'topic_sorts', filters: filters['topics'],
                                roost_type: 'topic'
                            }}
                            onPress={ (params_input:any) => { setParams(params_input) } } 
                        /> : <></>
                    }
                </div>


                <LeftPanelButton 
                    id={'users'}
                    text={'USERS'} 
                    icon={<UsersIcon className={'h-full text-black aspect-1/1 '
                        + (params.display_type==='users'? 'text-white' : 'text-black')
                    }/>} 
                    styling={'hover:scale-105 '} 
                    selected={(params.display_type==='users')}
                    button_params={{ 
                        display_type:'users', sort:'followers_count', order:'DESC', page:0, per_page:12, search: '',
                        sorts: 'user_sorts', filters: filters['users'],
                        author:'', topic:'', article_id:0,
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } } 
                />

                <div className='flex max-w-50'>
                    { (params.display_type==='user_page' && params.id)?
                        <LeftPanelButton 
                            id={'user_page'}
                            text={params.id? params.id : ''} 
                            icon={<ArrowTurnDownRightIcon className={'w-4 h-4 aspect-1/1 ' +(params.display_type==='user_page'? 'text-white' : 'text-black')}/>} 
                            height={'h-6 '}
                            styling={'hover:scale-105 ml-2 mb-2 '} 
                            selected={(params.display_type==='user_page')}
                            button_params={{ 
                                display_type:'user_page', sort:'followers_count', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                                sorts: 'user_sorts', filters: filters['topics'],
                                roost_type: 'user_page'
                            }}
                            onPress={ (params_input:any) => { setParams(params_input) } } 
                        /> : <></>
                    }
                </div>


                <LeftPanelButton 
                    id={'articles'} 
                    text={'ARTICLES'} 
                    icon={<NewspaperIcon className={'h-full text-black aspect-1/1 '
                        + (params.display_type==='articles'? 'text-white' : 'text-black')
                    }/>} 
                    styling={'hover:scale-105 '}
                    selected={(params.display_type==='articles')}
                    button_params={{ 
                        display_type:'articles', sort:'created_at', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                        sorts: 'article_sorts', filters: filters['articles'], 
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } } 
                />

                <div className='flex max-w-50'>
                { (params.display_type==='article_page' && params.id)?
                    <LeftPanelButton 
                        id={'article_page'} 
                        text={params.id? params.id : 'ARTICLE PAGE'} 
                        icon={<ArrowTurnDownRightIcon className={'w-4 h-4 aspect-1/1 ' +(params.display_type==='article_page'? 'text-white' : 'text-black')}/>} 
                        height={'h-6 '}
                        styling={'hover:scale-105 ml-2 '}
                        selected={(params.display_type==='article_page')}
                        button_params={{ 
                            display_type:'article_page', sort:'created_at', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                            sorts: 'article_sorts', filters: filters['articles'], 
                            roost_type: 'user'
                        }}
                        onPress={ (params_input:any) => { setParams(params_input) } } 
                    /> : <></>
                }
                </div>


                <LeftPanelButton 
                    id={'comments'} 
                    text={'COMMENTS'} 
                    icon={<ChatBubbleBottomCenterTextIcon className={'h-full text-black aspect-1/1 '
                        + (params.display_type==='comments'? 'text-white' : 'text-black')
                    }/>} 
                    styling={'hover:scale-105 '}
                    selected={(params.display_type==='comments')}
                    button_params={{ 
                        display_type:'comments', sort:'created_at', order:'DESC', page:0, per_page:16, author:'', topic:'', article_id:0, search: '',
                        sorts: 'comment_sorts', filters: filters['comments'],
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } } 
                />

                <LeftPanelButton 
                    id={'games'} 
                    text={'GAMES'} 
                    icon={<PuzzlePieceIcon className={'h-full text-black aspect-1/1 '
                        + (params.display_type==='games'? 'text-white' : 'text-black')
                    }/>} 
                    styling={'hover:scale-105 '}
                    selected={(params.display_type==='games')}
                    button_params={{ 
                        display_type:'games', sort:'created_at', order:'DESC', page:0, per_page:12, author:'', topic:'', article_id:0, search: '',
                        sorts: 'game_sorts', filters: filters['games'],
                        roost_type: 'user'
                    }}
                    onPress={ (params_input:any) => { setParams(params_input) } }
                />

                <div className='h-10'/>


            { getWindowSize()[0] >= 1024 && params.show_filters ?
                <div className='flex flex-col bg-zinc-700 rounded-sm'>
                    <button 
                        className='flex flex-row mb-1 h-8 bg-white rounded-sm items-center px-2 hover:outline-1 outline-zinc-300'
                        onClick={() => { setShowFilter(!showFilter) }}>
                            <p className='font-bold text-black'>FILTERS</p>
                            <div className='flex-1'/>
                            {   showFilter ?
                                <ChevronDownIcon className='text-black h-6'/> :
                                <ChevronRightIcon className='text-black h-6'/>
                            }
                    </button>

                    <div className='flex flex-col gap-1 w-full' >
                        <>
                            <div className='flex flex-row bg-white rounded-sm px-2'>
                                <div className='flex-1'/>
                                <p className='text-sm text-black mr-1'>Show</p>
                                <p className='text-sm text-black'>Only</p>
                            </div>

                            { params.filters.map((filter:filter, index:number) => {
                                return (
                                    <>
                                    { filter.id ?
                                        <div key={params.display_type +index} className='flex flex-row bg-white rounded-sm px-2'>
                                            <label className='text-sm text-black min-w-32'>{filter.name}</label>

                                            <input type='checkbox' 
                                                checked={filter.isEnabled} 
                                                onChange={() => { setFilterEnabled(filter.id) }} 
                                            />
                                            
                                            <div className='w-6' />

                                            <button
                                                onChange={() => { setFilterOnly(filter.id) }} >
                                            </button>
                                        </div>
                                        : <></>
                                    }
                                    </>
                                )
                            }) }
                        </>
                    </div> 
                </div> : <></>
            }
            </div>
            
        </div>
    )
}

export default LeftPanel