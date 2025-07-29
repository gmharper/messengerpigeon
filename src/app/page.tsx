
"use client"

// IMPORTS
import { createContext, Dispatch, SetStateAction, useCallback, useEffect, useLayoutEffect, useReducer, useState } from "react";

// COMPONENTS
import { LeftPanel } from "./components/left_panel/index";
import { MainPanel } from "./components/main_panel/index";
import { RightPanel } from "./components/right_panel/index";

// TYPE DECLARATIONS
interface AppContext {
  getWindowSize:Function,
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  loggedInUser:user,
  setLoggedInUser:Dispatch<SetStateAction<user>>
}

type user = {
  type: string,
  username: string,
  name: string,
  avatar_url: string
}

type filter = {
  id: string,
  name: string,
  isEnabled: boolean,
  only: boolean
}
type filters = { [key:string]: Array<filter> }

// FILTERS
const myFilters:filters = {
    'feed': [
      { id: 'liked', name: 'Liked', isEnabled: true, only: false }, 
      {id: 'read', name: 'READ', isEnabled: true, only: false }],
    'users': [
      { id: 'following', name: 'Following', isEnabled: true, only: false },
      { id: 'followed_by', name: 'Followed By', isEnabled: true, only: false}, 
      { id: 'verified', name: 'Verified', isEnabled: true, only: false },
      { id: 'blocked', name: 'Blocked', isEnabled: false, only: false }
    ],
    'topics': [
      { id: 'subscribed', name: 'Liked', isEnabled: true, only: false },
      { id: 'hot', name: 'Hot Topic', isEnabled: true, only: false },
      { id: 'disabled', name: "Don't Show", isEnabled: false, only: false }
    ],
    'articles': [
      { id: 'liked', name: 'Liked', isEnabled: true, only: false }
    ],
    'comments': []
}

export const AppContext = createContext<AppContext>({} as AppContext)

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [loggedInUser, setLoggedInUser] = useState({ type:'user', username: 'gmharper', name:'George Harper', avatar_url: 'https://wildbase-recovery.storage.googleapis.com/2018/07/18094939/IMG_3704-scaled-e1642452804810.jpg' })

  const [page, setPage] = useState('home')

  const [displayType, setDisplayType] = useState('users')

  const filtersReducer = (state:filters, action:any):filters => {
    const stateCopy = {...state}
    const key:'feed' | 'users' = action.type
    const index = action.index

    stateCopy[key][index].isEnabled = action.isEnabled

    return stateCopy
  } 

  const [filters, setFilters] = useReducer(filtersReducer, myFilters)

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

  useEffect(() => {
    // make call to db to get activeUser
  }, [])

  return (
    <AppContext.Provider value={{ getWindowSize, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser }} >
        <div className='flex flex-row'>
          <div className='flex flex-row'>
            <LeftPanel displayType={displayType} setDisplayType={setDisplayType} filters={myFilters} setFilters={setFilters}/>
            <MainPanel displayType={displayType} setDisplayType={setDisplayType} filters={myFilters} />
            <RightPanel />
          </div>

          <div className='flex-1'/>
        </div>
    </AppContext.Provider >
  );
}
