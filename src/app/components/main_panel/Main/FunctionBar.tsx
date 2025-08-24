
// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import Select from 'react-select';
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// COMPONENTS
import { SearchBar } from "./index"

import { 
    ChevronDownIcon, 
    ChevronUpIcon, 
    QueueListIcon, 
    Squares2X2Icon 
} from "@heroicons/react/24/outline"

// TYPE DECLARATIONS
type Props = {
    displayType: string,
}

// VARIABLES
const all_sorts:any = {
    'created_at': { id: 'created_at', name: 'CREATION DATE' },
    'username': { id: 'username', name: 'USERNAME' },
    'name': { id: 'name', name: 'NAME' },
    'slug': { id: 'slug', name: 'SLUG' },
    'votes_count': { id: 'votes_count', name: 'VOTES' },
    'followers_count': { id: 'followers_count', name: 'FOLLOWERS' },
    'articles_count': { id: 'articles_count', name: 'ARTICLES' },
    'comments_count': { id: 'comments_count', name: 'COMMENTS' },
    'comment_id': {},
    'article_id': {}
}

function FunctionBar():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)
    const { theme } = useContext(ThemeContext)

    const [sorts, setSorts] = useState([{ id: 'created_at', name: 'Creation Date'}])

    useEffect(() => {
        switch (params.sorts) {
            case 'feed_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation Date'}
                ])
                setParams({ sort: 'created_at', order: 'DESC', page: 0 })
                break;
            case 'user_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation Date'},
                    { id: 'username', name: 'Username' },
                    { id: 'name', name: 'Name' },
                    { id: 'followers_count', name: 'Number of followers' },
                    { id: 'articles_count', name: 'Number of articles' },
                    { id: 'comments_count', name: 'Number of comments' }
                ])
                setParams({ sort: 'followers_count', order: 'DESC', page: 0 })
                break;
            case 'article_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation date'},
                    { id: 'article_id', name: 'ID'},
                    { id: 'title', name: 'Title' },
                    { id: 'topic', name: 'Topic' },
                    { id: 'author', name: 'Author' },
                    { id: 'votes_count', name: 'Number of likes' }
                ])
                setParams({ sort: 'created_at', order: 'DESC', page: 0 })
                break;
            case 'topic_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation Date'},
                    { id: 'slug', name: 'Name' },
                    { id: 'subscribers_count', name: 'Number of subscribers' },
                ])
                setParams({ sort: 'subscribers_count', order: 'DESC', page: 0 })
                break;
            case 'comment_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation Date'},
                    { id: 'articles_id', name: 'Article' },
                    { id: 'comment_id', name: 'ID' },
                    { id: 'author', name: 'Author' },
                    { id: 'votes_count', name: 'Number of likes'}
                ])
                setParams({ sort: 'created_at', order: 'DESC', page: 0 })
                break;
            case 'game_sorts':
                setSorts([
                    { id: 'created_at', name: 'Creation Date'}
                ])
                setParams({ sort: 'created_at', order: 'DESC', page: 0 })
                break;
            default:
                setSorts([{ id: 'created_at', name: 'Creation Date'}])
                setParams({ sort: 'created_at', order: 'DESC', page: 0, per_page: 16 })
                return
        }
    }, [params.sorts])

    return (
        <div className={'flex flex-row w-full gap-2 min-h-12 h-12 p-2 pr-4 outline-0 outline-zinc-300 shadow-sm shadow-black/20 rounded-full ' +theme.secondary}>
            <SearchBar styling={''} />

            <div className='flex-1' />

            <button
                className='bg-white rounded-md p-1 outline-1 outline-zinc-300'
                onClick={() => { setParams({ cardShape: 'row' }) }}
            >
                <QueueListIcon className='w-full h-full text-black'/>
            </button>
            
            <button 
                className='bg-white rounded-md p-1 outline-1 outline-zinc-300'
                onClick={() => { setParams({ cardShape: 'square' }) }}
            >
                <Squares2X2Icon className='w-full h-full text-black'/>
            </button>

            <select 
                className='w-44 h-full font-bold text-black text-sm bg-white content-center items-center text-center rounded-sm outline-[2px] outline-zinc-200 hover:outline-indigo-500 cursor-pointer'
                value={params.sort? params.sort : 'created_at'} 
                onChange={(e) => { setParams({ sort: e.target.value }) }}>
            { sorts.map((sort:any) => {
                return <option key={sort.id} value={sort.id}>{sort.name}</option>
            }) }
            </select>

            <select
                className='w-18 h-full font-bold text-black text-sm bg-white content-center items-center text-center rounded-sm outline-[2px] outline-zinc-200 hover:outline-indigo-500 cursor-pointer'
                value={params.order? params.order : 'DESC'}
                onChange={(e) => { setParams({ order: e.target.value }) }}>
                
                <option value={'DESC'}>DESC</option>
                <option value={'ASC'}>ASC</option>
            </select>
        </div>
    )
}

export default FunctionBar