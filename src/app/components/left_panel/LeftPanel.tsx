"use client"

//IMPORTS
import { ActionDispatch, Dispatch, SetStateAction, useCallback, useContext, useReducer, useState } from "react"
import { AppContext } from "../../page"

// COMPONENTS
import { BoxLabel } from "../style/index.jsx"
import { LeftPanelButton, ProfileMini } from "./index"

import {
    TagIcon, 
    UserIcon, UsersIcon,
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

// TYPE DECLARATIONS
type AppProps = {
    displayType: string,
    setDisplayType: Dispatch<SetStateAction<string>>,
    filters: filters,
    setFilters: ActionDispatch<any>
}

type labelAction = {
    id: string,
    type: string,
    set: boolean
}

type filters = { [key:string]: Array<filter> }
type filter = {
    id: string,
    name: string,
    isEnabled: boolean,
    only: boolean
}

// STYLING
const button_styling = 'h-full text-black aspect-1/1'

function LeftPanel ({ displayType='users', setDisplayType, filters, setFilters }:AppProps ):React.JSX.Element {
    const { isLoggedIn, loggedInUser, getWindowSize } = useContext(AppContext)

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
        return state
    }

    const [selectedLabel, setSelectedLabel] = useState(displayType)
    const [labels, setLabels] = useReducer(labelsReducer, left_panel_labels)

    // HANDLER FUNCTIONS
    function handleLogout () {
        return
    }

    return (
        <div className='flex flex-col gap-y-2 max-w-60'>
            <div className='' />

            { getWindowSize()[0] >= 1024 ? 
                <ProfileMini /> : <ArrowLeftStartOnRectangleIcon className='w-8 h-8 mr-2' />
            }

            <LeftPanelButton 
                id={'feed'} 
                text={'YOUR FEED'} 
                icon={<UserIcon className='h-full text-black aspect-1/1'/>} 
                styling={((displayType==='feed') ? 'bg-violet-500 rounded-l-sm ' : 'bg-white rounded-sm mr-4 ') +'mb-4 hover:scale-105 '} 
                onPress={(input:string) => {setDisplayType(input)}}
            />

            <LeftPanelButton 
                id={'topics'} 
                text={'TOPICS'} 
                icon={<TagIcon className='h-full text-black aspect-1/1'/>} 
                styling={((displayType==='topics' || displayType==='topic_page') ? 'bg-violet-500 rounded-l-sm ' : 'bg-white rounded-sm mr-4 ') +'hover:scale-105 '} 
                onPress={(input:string) => {setDisplayType(input)}} 
            />

            <LeftPanelButton 
                id={'users'} 
                text={'USERS'} 
                icon={<UsersIcon className='h-full text-black aspect-1/1'/>} 
                styling={((displayType==='users' || displayType==='user_page') ? 'bg-violet-500 rounded-l-sm ' : 'bg-white rounded-sm mr-4 ') +'hover:scale-105 '} 
                onPress={(input:string) => {setDisplayType(input)}} 
            />

            <LeftPanelButton 
                id={'articles'} 
                text={'ARTICLES'} 
                icon={<NewspaperIcon className='h-full text-black aspect-1/1'/>} 
                styling={((displayType==='articles' || displayType==='article_page') ? 'bg-violet-500 rounded-l-sm ' : 'bg-white rounded-sm mr-4 ') +'hover:scale-105 '}
                onPress={(input:string) => {setDisplayType(input)}} 
            />

            <LeftPanelButton 
                id={'games'} 
                text={'GAMES'} 
                icon={<PuzzlePieceIcon className='h-full text-black aspect-1/1'/>} 
                styling={((displayType==='games' || displayType==='game_page') ? 'bg-violet-500 rounded-l-sm ' : 'bg-white rounded-sm mr-4 ') +'mb-4 hover:scale-105 '}
                onPress={(input:string) => {setDisplayType(input)}}
            />

            <div className='h-10'/>

        { getWindowSize()[0] >= 1024 ?
            <div className='flex flex-col bg-zinc-700 rounded-sm mr-4'>
                <button 
                    className='flex flex-row mb-1 h-8 bg-white rounded-sm items-center px-2 hover:outline-1 outline-zinc-300'
                    onClick={() => {setShowFilter(!showFilter)}}>
                        <p className='font-bold text-black'>FILTERS</p>
                        <div className='flex-1'/>
                        {   showFilter ?
                            <ChevronDownIcon className='text-black h-6'/> :
                            <ChevronRightIcon className='text-black h-6'/>
                        }
                </button>

                <div className='flex flex-col p-2' >
                    { showFilter &&
                    <>
                        <div className='flex flex-row mb-1 bg-white rounded-sm px-2'>
                            <div className='flex-1'/>
                            <p className='text-sm text-black mr-1'>Show</p>
                            <p className='text-sm text-black'>Only</p>
                        </div>

                        { filters[displayType]?.map((filter:filter, index:number) => {
                            return (
                                <div key={displayType} className='flex flex-row bg-white rounded-sm px-2 mb-1'>
                                    <label className='text-sm text-black min-w-32'>{filter.name}</label>

                                    <input type='checkbox' 
                                        checked={filter.isEnabled} 
                                        onChange={() => {
                                            setFilters({ 'type':displayType, 'index':index, 'isEnabled': !filter.isEnabled})}} />
                                    
                                    <div className='w-6' />

                                    <input type='checkbox' 
                                        checked={filter.only} 
                                        onChange={() => {
                                            setFilters({ 'type': displayType, 'index':index, 'only': !filter.only})}} />
                                </div>
                            )
                        }) }
                    </>
                    }
                </div> 
            </div> : <></>
        }
            
        </div>
    )
}

export default LeftPanel