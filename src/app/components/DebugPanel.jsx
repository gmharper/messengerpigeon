// IMPORTS
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../page"

import { 
    getUsers, getUserByUsername, getUserData, getUsersData,
    getArticles, getArticleById, getArticleData, getArticlesData,
    getTopics, getTopicBySlug, getTopicData, getTopicsData,
    getComments, getCommentById, getCommentData, getCommentsData
} from "../scripts/fetch/index"

import {
    postUser, postArticle, postTopic, postComment
} from "../scripts/post/index"

import {
    patchUser, patchUserData,
    patchArticle, patchArticleData,
    patchTopic, patchTopicData,
    patchComment, patchCommentData
} from "../scripts/patch/index"

import {
    deleteUser,
    deleteArticle,
    deleteTopic,
    deleteComment
} from "../scripts/delete/index"


// STYLING
let button_selected = "bg-sky-400"
let button_unselected = "bg-white"

function DebugPanel ({ displayType }) {
    const { isLoggedIn, loggedInUsername, loggedInUser } = useContext(AppContext)

    const [debugType, setDebugType] = useState('API')

    const [activeType, setActiveType] = useState('users')
    const [apiType, setApiType] = useState("fetch")
    const [receivedData, setReceivedData] = useState({})

    const [ID, setID] = useState(0)
    const [endpointInput, setEndpointInput] = useState('')

    const [activeSort, setActiveSort] = useState("created_at")
    const [activeOrder, setActiveOrder] = useState("DESC")
    const [activePage, setActivePage] = useState(0)
    const [activeLimit, setActiveLimit] = useState(16)
    const [activeOnly, setActiveOnly] = useState("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const apiGet = (id, endpoint) => {
        switch (activeType) {
            case 'users':
                if (id && endpoint) { getUserData(id, endpoint, setReceivedData, setLoading, setError) }
                else if (id) { getUserByUsername(id, setReceivedData, setLoading, setError) }
                else if (endpoint) { getUsersData(endpoint, setReceivedData, setLoading, setError) }
                else getUsers(setReceivedData, setLoading, setError, activeSort, activeOrder, activePage, activeLimit)
                break;
            case 'articles':
                if (id && endpoint) { getArticleData(id, endpoint, setReceivedData, setLoading, setError) }
                else if (id) { getArticleById(id, setReceivedData, setLoading, setError) }
                else getArticles(setReceivedData, setLoading, setError, "", "", activeSort, activeOrder, activePage, activeLimit)
                break;
            case 'topics':
                if (id && endpoint) { getTopicData(id, endpoint, setReceivedData, setLoading, setError) }
                else if (id) { getTopicBySlug(id, setReceivedData, setLoading, setError) }
                else getTopics(setReceivedData, setLoading, setError, activeSort, activeOrder, activePage, activeLimit)
                break;
            case 'comments':
                if (id && endpoint) { getCommentData(id, endpoint, setReceivedData, setLoading, setError) }
                else if (id) { getCommentById(id, setReceivedData, setLoading, setError) }
                else getComments("", "", setReceivedData, setLoading, setError, activeSort, activeOrder, activePage, activeLimit)
                break;
            default:
                return
        }
    }

    const apiPost = (id, endpoint) => {

    }
    
    const apiPatch = (id, endpoint) => {}

    const apiDelete = (id) => {
        switch (activeType) {
            case 'users':
                if (id) deleteUser(id, setReceivedData, setLoading, setError, true)
                break;
            case 'articles':
                if (ID) deleteArticle(id, setReceivedData, setLoading, setError, true)
                break;
            case 'topics':
                if (id) deleteTopic(id, setReceivedData, setLoading, setError, true)
                break;
            case 'comments':
                if (id) deleteComment(id, setReceivedData, setLoading, setError, true)
                break;
            default:
                return
        }
    }

    useEffect(() => {
    }, [receivedData, activeSort, activeOrder, activePage, activeLimit, activeOnly])

    return (
        <div className='flex flex-col gap-3 w-100 h-screen bg-black rounded-sm p-2'>
            <div className='flex flex-row bg-yellow-300 min-h-10 rounded-xs content-center px-2'>
                <p className='font-bold text-xl text-black'>DEBUGGING PANEL</p>

                <div className='flex-1'/>

                <button className={'w-16 rounded-l-xl' +(debugType==='API' ? ' bg-sky-500' : ' bg-white')} onClick={() => {setDebugType('API')}}>
                    <p className='text-black'>API</p>
                </button>
                <button className={'w-16 rounded-r-xl'  +(debugType==='PAGE' ? ' bg-sky-500' : ' bg-white')} onClick={() => {setDebugType('PAGE')}}>
                    <p className='text-black'>PAGE</p>
                </button>
            </div>

        { debugType==='API' ?
        <>
            <div className='flex flex-row w-full min-h-8'>
                <button 
                    className={"flex-1 rounded-l-xl " +(activeType==='users' ? button_selected : button_unselected)}
                    onClick={(() => {setActiveType("users")})}
                >
                    <p className='text-black text-xs'>Users</p>
                </button>

                <button 
                    className={"flex-1 " +(activeType==='articles' ? button_selected : button_unselected)}
                    onClick={(() => {setActiveType("articles")})}
                >
                    <p className='text-black text-xs'>Articles</p>
                </button>

                <button 
                    className={"flex-1 " +(activeType==='topics' ? button_selected : button_unselected)}
                    onClick={(() => {setActiveType("topics")})}
                >
                    <p className='text-black text-xs'>Topics</p>
                </button>

                <button 
                    className={"flex-1 rounded-r-xl " +(activeType==='comments' ? button_selected : button_unselected)}
                    onClick={(() => {setActiveType("comments")})}
                >
                    <p className='text-black text-xs'>Comments</p>
                </button>
            </div>

            <div className='flex flex-row w-full min-h-8'>
                <button 
                    className={"flex-1 rounded-l-xl " +(apiType==='fetch' ? button_selected : button_unselected)}
                    onClick={() => {setApiType("fetch")}}
                >
                    <p className='text-black text-xs'>FETCH</p>
                </button>

                <button 
                    className={"flex-1 " +(apiType==='post' ? button_selected : button_unselected)}
                    onClick={() => {setApiType("post")}}
                >
                    <p className='text-black text-xs'>POST</p>
                </button>

                <button 
                    className={"flex-1 " +(apiType==='patch' ? button_selected : button_unselected)}
                    onClick={() => {setApiType("patch")}}
                >
                    <p className='text-black text-xs'>PATCH</p>
                </button>

                <button 
                    className={"flex-1 rounded-r-xl " +(apiType==='delete' ? button_selected : button_unselected)}
                    onClick={() => {setApiType("delete")}}
                >
                    <p className='text-black text-xs'>DELETE</p>
                </button>
            </div>

            <div className='flex flex-col gap-2'>
                <input
                    className='flex-1 w-full w-full min-h-6 px-2 text-black text-xs bg-white rounded-full'
                    placeholder={"enter " + 
                        (
                            activeType==="users" ? "username" :
                            activeType==="articles" ? "article_id" :
                            activeType==="topics" ? "slug" :
                            activeType==="comments" ? "comment_id" :
                            "id"
                        )}
                    onChange={(e) => { setID(e.target.value) }}
                    />
                <input 
                    className='flex-1 w-full min-h-6 px-2 text-black text-xs bg-white rounded-full'
                    onChange={(e) => { setEndpointInput(e.target.value) }}
                    placeholder={"enter endpoint"}/>

                <div className='flex flex-col gap-1'>
                    <div className="w-full h-6 rounded-sm bg-white">
                        <p className="font-bold text-black">QUERIES</p>
                    </div>

                    <div className='flex flex-row'>
                        <div className='flex flex-row mr-2'>
                            <p className='text-xs w-10'>sort:</p>
                            <input className='text-xs text-black bg-white'
                            onChange={(e) => {setActiveSort(e.target.value)}}
                            defaultValue={"created_at"}/>
                        </div>
                        <div className='flex flex-row'>
                            <p className='text-xs w-10'>order:</p>
                            <select className='bg-white text-black text-xs'
                            onChange={(e) => { setActiveOrder(e.target.value) }}>
                                <option className='text-black text-xs' value={"ASC"}>ASC</option>
                                <option className='text-black text-xs' value={"DESC"}>DESC</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-row'>
                        <div className='flex flex-row mr-2'>
                            <p className='text-xs w-10'>page:</p>
                            <input 
                            className='text-xs text-black bg-white'
                            onChange={(e) => {setActivePage(e.target.value)}} 
                            defaultValue={0}/>
                        </div>
                        <div className="flex flex-row">
                            <p className='text-xs w-10'>limit:</p>
                            <input
                                className='text-xs text-black bg-white' 
                                onChange={(e) => {setActiveLimit(e.target.value)}} 
                                defaultValue={16}
                            />
                        </div>
                    </div>
                { 
                    activeType==="users" ? 
                    <div>

                    </div> 
                    :
                    activeType==="articles" ? 
                    <div>

                    </div> :
                    activeType==="topics" ? <div></div> :
                    activeType==="comments" ? <div></div> :
                    <></>
                }
                </div>

                
                <button className='bg-green-500 rounded-xs'
                onClick={() => {
                    apiType==='fetch' ? apiGet(ID, endpointInput) :
                    apiType==='post' ? apiPost(ID, endpointInput) :
                    apiType==='patch' ? apiPatch(ID, endpointInput) :
                    apiType==='delete' ? apiDelete(ID) :
                    ""
                }}>
                    { 
                        apiType==='fetch' ? <p>FETCH</p> :
                        apiType==='post' ? <p>POST</p> :
                        apiType==='patch' ? <p>PATCH</p> :
                        apiType==='delete' ? <p>DELETE</p> :
                        <p>API TYPE</p>
                    }
                    
                </button>
            </div>

            { 
                error ? 
                    <div>
                        <p>{`Error: ${error}`}</p>
                    </div> :
                loading ? 
                    <div>
                        <p>{`Loading ${activeType}`}</p>
                    </div> :
                <div className='flex flex-col gap-2 w-full h-full rounded-sm overflow-y-scroll'>
                { 
                    Array.isArray(receivedData) ? receivedData.map((dataObject) => {
                        return (
                            <div className='flex flex-col'>
                            {
                                (typeof dataObject==="object") ?
                                    Object.keys(dataObject).map((key) => {
                                        return (
                                            <div className='bg-zinc-900 rounded-sm'>
                                                <p className='w-full h-full text-white text-xs'>{`${key}: ${dataObject[key]}`}</p>
                                            </div>
                                        )    
                                    })
                                :
                                <div className='bg-zinc-900 rounded-sm'>
                                    <p className='w-full h-full text-whiy text-xs '>{JSON.stringify(dataObject)}</p>
                                </div>
                            }
                            </div>
                            
                        )
                    }) 
                    : (typeof receivedData === "object") ?
                    <div className='bg-zinc-800 rounded-sm p-1'>
                    { 
                        Object.keys(receivedData).map((key) => {
                            return (
                                <div className='bg-zinc-900 rounded-sm'>
                                    <p className='w-full h-full text-white text-xs'>{`${key}: ${receivedData[key]}`}</p>
                                </div>
                            )
                        })
                    }
                    </div> 
                    :
                    <div className='bg-zinc-800 rounded-sm'>
                        <p className='w-full h-full text-white text-2xs'>{JSON.stringify(receivedData)}</p>    
                    </div>
                }
                </div>
            } 
            </>
            : debugType==='PAGE' ?
            <div className='flex flex-col gap-1'>
                <div className='bg-white rounded-sm px-2'>
                    <p className='text-black'>{`displayType: ${displayType}`}</p>
                </div>

                <div className='bg-white rounded-sm px-2'>
                    <p className='text-black'>{`isLoggedIn: ${isLoggedIn}`}</p>
                </div>

                <div className='bg-white rounded-sm px-2'>
                    <p className='text-black'>{`loggedInUsername: ${loggedInUsername}`}</p>
                </div>

                <div className='bg-white rounded-sm px-2'>
                    <p className='text-black'>{`loggedInUser: ${JSON.stringify(loggedInUser)}`}</p>
                </div>
            </div>
            : <></>
        
            }
        </div>
    )
}

export default DebugPanel