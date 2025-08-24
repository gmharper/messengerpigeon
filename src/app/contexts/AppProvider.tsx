"use client"
import React, { 
  createContext, Dispatch, Reducer, SetStateAction, 
  useCallback, useContext, useLayoutEffect, useReducer, useState 
} from "react";

import StateProvider from "../state";

// TYPE DECLARATIONS
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
  type:string, slug:string, name:string, description:string, created_by:string,
  topic_colour:string, img_url:string,
  subscribers:Array<string>, comments:Array<string>,
  created_at:string
}

// DEFAULTS
const defaultParams = {
  location: '', id: '', name: '', loading_page:false,
  display_type: 'profile', roost_type: 'user', card_shape: 'row', 
  show_roost: true, disable_roost: false, show_function_bar: true, show_filters: true, show_heading: true,
  heading: '',
  search: '', sorts: [], 
  sort: 'created_at', order: 'DESC', page: 0, per_page: 16,
  author: '', topic: '', article_id: 0,
  filters: [], only: ''
}

const defaultTheme = {
  theme: 'dark',
  base: ' bg-zinc-900 ',
  secondary: ' bg-zinc-800 ',
  alt: ' bg-zinc-200 ',
  lines: ' lines-background-dark ',
  panel: ' bg-zinc-900 lines-background-dark outline-zinc-800 ',
  text: ' text-white ',
  text_alt: ' text-black '
}

const dummyUser:user = {
  type:'user', username: '', name: '', email: '', password: '', description: '', verified:false, theme: 'light',
  avatar_img_url: '', banner_img_url: '',
  profile_colour: 'white', banner_blend: 'normal', banner_position: 'center',
  articles: [], comments: [], subscribed_topics: [], subscribed_games: [],
  followers: [], following: [],
  voted_articles: [], voted_comments: [],
  created_at: ''
}

const dummyTopic:topic = {
  type:'topic', slug: '', name:'', description: '', created_by: '',
  topic_colour: 'white', img_url: '',
  subscribers: [], comments: [],
  created_at: ''
}

import { AppContext, ThemeContext } from "./AppContext";

function AppProvider ({ children }:{ children:React.ReactNode }) {
    // useReducers
  const paramsReducer = (state:any, action:any) => {
    const paramsCopy = {...state}
    
    for (const key in defaultParams) {
      if (action.hasOwnProperty(key)) {
        paramsCopy[key] = action[key]
      }
    } return paramsCopy
  }

  const themeReducer = (state:any, action:any) => {
    const themeCopy = {...state}

    for (const key in defaultTheme) {
      if (action.hasOwnProperty(key)) {
        themeCopy[key] = action[key]
      }
    } return themeCopy
  }

  const userReducer = (state:any, action:any|null) => {
    const userCopy = {...state}
    
    for (const key in state) {
      if (action.hasOwnProperty(key)) userCopy[key] = action[key]
    } return userCopy
  }

  const [params, setParams] = useReducer(paramsReducer, defaultParams)
  const [theme, setTheme] = useReducer(themeReducer, defaultTheme)

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loggedInUsername, setLoggedInUsername] = useState('butter_bridge')
  const [loggedInUser, setLoggedInUser] = useReducer(userReducer, {
    type: 'user',
    username: "butter_bridge", name: "jonny", password: 'butterbridge123', email: "butter_bridge@gmharper.com", description: "Here's Jonny",
    theme: 'light', profile_colour: "blue",
    avatar_img_url:
      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
    banner_img_url: "",
    banner_blend: "normal", banner_position: "center",
    articles: ["butter_bridge's article"], comments: ["hello this is a comment"],
    subscribed_topics: [], subscribed_games: [],
    followers: [], following: [],
    voted_articles: [], voted_comments: [],
    created_at: '1583025180000'
  })

  const getWindowSize = useCallback(() => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }

      window.addEventListener('resize', updateSize);
      updateSize();

      return () => window.removeEventListener('resize', updateSize);
    }, []);

    return size;
  }, [] )

    return (
    <AppContext.Provider value={{ 
        getWindowSize, 
        isLoggedIn, setIsLoggedIn, loggedInUsername, setLoggedInUsername, loggedInUser, setLoggedInUser, 
        dummyUser, dummyTopic,
        params, setParams 
      }} >
      <ThemeContext.Provider value={{ theme, setTheme }} >
        <StateProvider defaultParams={defaultParams} setParams={setParams} children={
          children
        } />
      </ThemeContext.Provider>
    </AppContext.Provider>
    )
}

export default AppProvider