"use client"

import { Dispatch, Reducer, SetStateAction, createContext } from 'react'

// TYPE DECLARATION
interface AppContext {
    getWindowSize:Function,
    isLoggedIn:boolean, setIsLoggedIn:Dispatch<SetStateAction<boolean>>,
    loggedInUsername:string, setLoggedInUsername:Dispatch<SetStateAction<string>>,
    loggedInUser:user, setLoggedInUser:Dispatch<Reducer<user, any>>,
    dummyUser:user, dummyTopic:topic,
    params:params, setParams:Dispatch<Reducer<params, any>>
}

interface ThemeContext {
    theme:any, setTheme:Dispatch<Reducer<any, any>>
}

type user = {
    type:string, username: string, name: string, email:string, password:string, verified:boolean, description:string, 
    theme:string, banner_img_url:string, avatar_img_url: string
    profile_colour:string, banner_blend:string, banner_position:string,
    articles:Array<string>, comments:Array<string>, subscribed_topics:Array<string>, subscribed_games:Array<string>,
    followers:Array<string>, following:Array<string>
    voted_articles:Array<number>, voted_comments:Array<number>,
    created_at:string
}

type topic = {
  type:string, slug:string, description:string, created_by:string,
  topic_colour:string, img_url:string,
  subscribers:Array<string>, comments:Array<string>,
  created_at:string
}

type params = {
    location:string, id:string, name:string, loading_page:boolean,
    display_type:string, roost_type:string, card_shape:string,
    show_roost:boolean, disable_roost:boolean, show_function_bar:boolean, show_filters:boolean, show_heading:boolean,
    heading:string,
    search:string, sorts:Array<string>,
    sort:string, order:string, page:string, per_page:string, only:string, filters:Array<any>,
    author:string, topic:string, article_id:number
}

export const AppContext = createContext<AppContext>({} as AppContext)
export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)