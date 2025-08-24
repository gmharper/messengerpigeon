
"use client"

// IMPORTS
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useReducer, useState } from "react";
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state";

// COMPONENTS
    // PAGES
    import FeedPanel from "./Feed/FeedPanel"
    import { UsersPanel, UserPage, CreateUserPage } from "./Users/index";
    import { ArticlesPanel, ArticlePage, PostArticlePage } from "./Articles/index";
    import { CommentsPanel, CommentPage } from "./Comments/index";
    import { TopicsPanel, TopicPage, PostTopicPage } from "./Categories/index";
    import { Profile, Settings } from "./Profile/index"
    import { LoginPage, SignupPage } from "./Login/index"

import { FunctionBar, RoostPanel, HeadingBar } from "./Main/index";

import { RightPanel } from "../right_panel/index";

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

function MainPanel ():React.JSX.Element {
    const { isLoggedIn, loggedInUsername, loggedInUser, setLoggedInUser, params, setParams } = useContext(AppContext)
    const { theme } = useContext(ThemeContext)

    const dummyProfileReducer = (state:any, action:any) => {
        const userCopy = {...state}
        
        for (const key in state) {
        if (action.hasOwnProperty(key)) userCopy[key] = action[key]
        } return userCopy
    }

    const [dummyProfile, setDummyProfile] = useReducer(dummyProfileReducer, loggedInUser)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        switch (params.display_type) {
            case 'profile':
                setParams({
                    disable_roost: false,
                    roost_type: 'profile',
                    show_function_bar: false,
                    show_filters: false,
                    show_heading: true
                })
                break;
            case 'users':
            case 'articles':
            case 'topics':
            case 'comments':
            case 'games':
                setParams({
                    disable_roost: false,
                    show_function_bar: true,
                    show_filters: true,
                    show_heading: true,
                })
                break;
            case 'comment_page':
            case 'game_page':
                setParams({
                    disable_roost: false,
                    roost_type: 'user',
                    show_function_bar: true,
                    show_filters: false,
                    show_heading: true
                })
                break;
            case 'user_page':
                setParams({
                    disable_roost: false,
                    roost_type: 'user_page',
                    show_function_bar: false,
                    show_filters: false,
                    show_heading: false
                })
                break;
            case 'article_page':
                setParams({
                    disable_roost: false,
                    roost_type: 'user',
                    show_function_bar: false,
                    show_filters: false,
                    show_heading: false
                })
                break;
            case 'topic_page':
                setParams({
                    disable_roost: false,
                    roost_type: 'topic',
                    show_function_bar: true,
                    show_filters: false,
                    show_heading: true
                })
                break;
            case 'settings':
                setParams({
                    disable_roost: false,
                    roost_type: 'user',
                    show_function_bar: true,
                    show_filters: false,
                    show_heading: false
                })
                break;
            default:
                setParams({
                    disable_roost: false,
                    roost_type: 'user',
                    show_function_bar: true,
                    show_filters: true,
                    show_heading: true,
                })
        }
    }, [params.display_type, params.roost_type])

    return (
            <div className={'min-w-200 w-300 2xl:w-300 rounded-md lines-background shadow-xl overflow-hidden outline-1 outline-zinc-500 justify-center px-4 py-2' +theme.base}>
                <div className='flex flex-col h-300'>
                    { isLoggedIn ? 
                        params.disable_roost ? <></> : 
                        <div className='flex w-full items-center justify-center mb-2'>
                            <RoostPanel 
                                type={params.roost_type? params.roost_type : 'user'} 
                                dummyProfile={dummyProfile? dummyProfile : {}} 
                                setDummyProfile={setDummyProfile}
                            /> 
                        </div>
                    :
                        <></>
                    }

                    { params.show_function_bar ?
                        <div className='flex mb-4'>
                            <FunctionBar />
                        </div> : <></>
                    }
                    
                    { params.show_heading ?
                        <div className='flex mb-4 px-8'>
                            <HeadingBar 
                                heading={params.heading? params.heading : 'HEADING'} 
                                page={params.page? params.page : 0} 
                                maxPage={params.max_page? params.max_page : 8}
                            />
                        </div> : <></>
                    }

                    <div className={'flex overflow-x-none w-full h-full justify-center rounded-t-xl outline-1 ' +theme.panel}>
                    { 
                        (params.display_type==='feed' || params.display_type==='feed_default') ?
                        <FeedPanel />
                        
                        : (params.display_type==='topics' || params.display_type==='topics_default') ?
                        <TopicsPanel /> 
                        
                        : (params.display_type==='users' || params.display_type==='users_default') ?
                        <UsersPanel /> 
                        
                        : (params.display_type==='articles' || params.display_type==='articles_default') ?
                        <ArticlesPanel /> 

                        : (params.display_type==='comments' || params.display_type==='comments_default') ?
                        <CommentsPanel /> 

                        : params.display_type==='topic_page' ?
                        <TopicPage />

                        : params.display_type==='user_page' ?
                        <UserPage /> 

                        : params.display_type ==='article_page' ?
                        <ArticlePage /> 
                        
                        : params.display_type === 'comment_page' ?
                        <CommentPage />

                        : params.display_type === 'post_article' ?
                        <PostArticlePage />

                        : params.display_type === 'post_topic' ?
                        <PostTopicPage />

                        : params.display_type === 'create_user' ?
                        <CreateUserPage />

                        : params.display_type === 'login' ?
                        <LoginPage />

                        : params.display_type === "signup" ?
                        <SignupPage />

                        : params.display_type === "profile" ?
                        <Profile dummyProfile={dummyProfile? dummyProfile : {}} setDummyProfile={setDummyProfile}/> 
                        
                        : params.display_type === "settings" ? 
                        <Settings dummyProfile={dummyProfile? dummyProfile : {}} setDummyProfile={setDummyProfile}/> 
                        
                        : <></>
                    }
                    </div>
                </div>
            </div>
    )
}

export default MainPanel