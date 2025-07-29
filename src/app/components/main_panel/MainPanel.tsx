
"use client"

// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { AppContext } from "@/app/page";

// COMPONENTS
import FeedPanel from "./Feed/FeedPanel"
import { UsersPanel, UserPage } from "./Users/index";
import { ArticlesPanel, ArticlePage } from "./Articles/index";
import { CommentsPanel, CommentPage } from "./Comments/index";
import { TopicsPanel, TopicPage } from "./Categories/index";

import { TopBar, FunctionBar, RoostPanel } from "./Main/index";

import { SwitchButton } from "../style/index";

// STYLING
const button_selected = ''
const button_unselected = ''

// TYPE DECLARATION


type AppProps = {
    displayType: string,
    setDisplayType: Dispatch<SetStateAction<string>>,
    filters: filters
}

type filters = { [key:string]: Array<filter> }
type filter = {
    id: string,
    name: string,
    isEnabled: boolean,
    only: boolean
}

type customState = {
    displayType: string,
    thingToShow: any,
    isLiked: boolean,
    isFavourited: boolean,
    isFollowed: boolean,
    draftedComment: string
}

function MainPanel ({ displayType, setDisplayType, filters }:AppProps ):React.JSX.Element {
    const { loggedInUser, setLoggedInUser } = useContext(AppContext)

    const [sortType, setSortType] = useState('users')

    const [showRoost, setShowRoost] = useState(true)
    const [showFunctionBar, setShowFunctionBar] = useState(true)

    const [searchInput, setSearchInput] = useState('')
    const [activeSort, setActiveSort] = useState('created_at')
    const [activeOrder, setActiveOrder] = useState('DESC')
    const [activePage, setActivePage] = useState(1)

    const [activeTopic, setActiveTopic] = useState(null)
    const [activeUser, setActiveUser] = useState(null)
    const [activeArticle, setActiveArticle] = useState(null)
    const [activeComment, setActiveComment] = useState(null)

    const [cardShape, setCardShape] = useState('row')

    const [previousState, setPreviousState] = useState({})
    const [nextState, setNextState] = useState({})



    // UTILITY FUNCTIONS
    function handleStateChange ( type:string ):void {
        switch (type) {
            case 'previous':
                setCurrentState(previousState)
                storeState('previous')
            case 'next':
                setCurrentState(nextState)
                storeState('next')
        }
    }   

    function storeState ( type:string ):void {
        const stateToStore = {}

        switch (type) {
            case 'next':
                setPreviousState(stateToStore)
            case 'previous':
                setNextState(stateToStore)
        }
    }

    // The General handler for setting the content of the main panel
    // it needs to know what the displayType is as well as the actual content eg. specific user, specific article etc.
    // There may also be additional states required such as whether an article has been liked etc.
    function setCurrentState ( state:any ):void { 

    }

    useEffect(() => {
        switch (displayType) {
            case 'feed':
                setShowFunctionBar(true)
                break;
            case 'topics':
                setShowFunctionBar(true)
                break;
            case 'users':
                setShowFunctionBar(true)
                break;
            case 'articles':
                setShowFunctionBar(true)
                break;
            case 'games':
                setShowFunctionBar(true)
                break;
            case 'profile':
                setShowFunctionBar(false)
                break;
            case 'topic_page':
                setShowFunctionBar(false)
                break;
            case 'user_page':
                setShowFunctionBar(false)
                break;
            case 'article_page':
                setShowFunctionBar(false)
                break;
        }
    }, [displayType])

    return (
        <div className='flex flex-col gap-3 w-150 md:w-210 xl:w-250 2xl:w-300 h-300 bg-zinc-700 rounded-xl shadow-xl overflow-hidden outline-2 outline-zinc-400'>
            
            <TopBar handleStateChange={handleStateChange} />
            
            <div className='flex flex-col gap-3 px-2 h-300'>
                { showRoost ? <RoostPanel /> : <></> }

                { showFunctionBar &&
                    <FunctionBar
                        displayType={displayType}
                        sortType={sortType}
                        showRoost={showRoost}
                        setShowRoost={setShowRoost}
                        setSearchInput={setSearchInput} 
                        setCardShape={setCardShape} 
                        setActiveSort={setActiveSort} 
                        setActiveOrder={setActiveOrder}
                        setActivePage={setActivePage}
                    />
                }

                <div className='bg-zinc-800 rounded-2xl overflow-scroll h-full p-1'>
                { displayType==='feed' ?
                    <FeedPanel user={loggedInUser ? loggedInUser : null } sort={activeSort} order={activeOrder} page={activePage} filters={filters} />
                    : displayType==='topics' ?

                    <TopicsPanel cardShape={cardShape} sort={activeSort} order={activeOrder} page={activePage} filters={filters} /> 
                    : displayType==='users' ?

                    <UsersPanel cardShape={cardShape} sort={activeSort} order={activeOrder} page={activePage} filters={filters} /> 
                    : displayType==='user_page' ?

                    <ArticlesPanel cardShape={cardShape} sort={activeSort} order={activeOrder} page={activePage} filters={filters} /> 
                    : displayType==='article_page' ?

                    <CommentsPanel cardShape={cardShape} sort={activeSort} order={activeOrder} page={activePage} filters={filters} /> 
                    : displayType==='comment_page' ?
                    
                    <TopicPage topic={ activeTopic ? activeTopic : null} /> 
                    : displayType==='user_page' ?

                    <UserPage user={ activeUser ? activeUser : null }/> 
                    : displayType ==='article_page' ?
                    
                    <ArticlePage article={ activeArticle ? activeArticle : null }/> 
                    : displayType === 'comment_page' ?

                    <CommentPage comment={ activeComment ? activeComment : null }/> 
                    : <></>
                }
                </div>
            </div>
        </div>
    )
}

export default MainPanel