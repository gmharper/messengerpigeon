// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { postArticle } from "@/app/scripts/post/index"
import { getTopicsData } from "@/app/scripts/fetch/index"

// COMPONENTS
import { Editor } from "primereact/editor"
import { BoxLabel } from "../../style";

// TYPE DECLARATIONS
type ArticleProps = {
    setHeading: Dispatch<SetStateAction<string>>
}

const default_article = {
    type: 'article',
    article_id: 0, title: '',
    topic: '', author: '',
    body: '',
    img_url: '',
    voted_by: [], comments: [],
    created_at: ''
}

function PostArticlePage ():React.JSX.Element {
    const { loggedInUsername, params, setParams } = useContext(AppContext)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [topicSlugs, setTopicSlugs] = useState([])

    const newArticleReducer = (state:any, action:any) => {
        const newArticle = {...state}

        for (const key in default_article) {
            if (action[key]) newArticle[key] = action[key]
        }

        return newArticle
    }

    const [newArticle, setNewArticle] = useReducer(newArticleReducer, default_article)

    const [titleError, setTitleError] = useState(false)
    const [topicError, setTopicError] = useState(false)
    const [bodyError, setBodyError] = useState(false)

    function postNewArticle () {
        if (!newArticle.title) return setTitleError(true)
        if (!newArticle.topic) return setTopicError(true)
        if (!newArticle.body) return setBodyError(true)

        postArticle(newArticle, () => {}, setLoading, setError)
        .then((res) => {
            console.log(res)
        })
    }

    useEffect(() => {
        setParams({ heading: 'POST AN ARTICLE' })
        getTopicsData("slug", setTopicSlugs, setLoading, setError)
    }, [])

    return (
        <div className='flex flex-col w-full items-center p-16'>
            <div className='flex flex-col w-full gap-4 items-center content-center justify-center 2xl:px-32'>
                <div className='flex flex-row gap-2 w-full'>
                    <BoxLabel text='ARTICLE TITLE' styling=' bg-white w-64 ' text_size=" text-sm"/>
                    <input 
                        className='flex w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 px-2 text-sm rounded-sm overflow-hidden '
                        placeholder={"Enter article title..."} 
                        onChange={(e) => { setNewArticle({ title: e.target.value }) }}/>
                </div>

                <div className='flex flex-row gap-2 w-full items-center mb-8'>
                    <BoxLabel text='SELECT A TOPIC' styling=' w-64 bg-white px-2' text_size=" text-sm"/>
                    <select 
                        className='flex w-full h-8 text-white bg-zinc-800 text-sm outline-1 outline-zinc-700 rounded-sm overflow-hidden px-2'
                        onChange={(e) => { setNewArticle({ topic: e.target.value }) }}>
                    {
                        topicSlugs.map((topic:any) => {
                            return <option>{topic.slug}</option>
                        })
                    }
                    </select>
                </div>

                <div className='w-full flex flex-col gap-2 mb-8'>
                    <BoxLabel text='ARTICLE CONTENT' styling=' w-full bg-white px-2 ' text_size=" text-sm"/>
                    
                    <div className='bg-white'>
                        <Editor placeholder={'Enter the content of your article here.'} onTextChange={(e) => console.log(e.htmlValue)} 
                            style={{ 
                                color: 'black',
                                height: '320px',
                            }} 
                        />
                    </div>
                </div>

                    {/* <textarea className='flex w-full h-full bg-zinc-200 text-black px-2 align-top'
                    placeholder={"enter article content..."}
                    onChange={(e) => {
                        setBodyError(false) 
                        setNewArticle({ body: e.target.value }) 
                    }}/> */}


                <div className='flex flex-row gap-2 w-full'>
                    <BoxLabel text='ARTICLE IMAGE URL' styling='w-80 bg-white px-2' text_size=" text-sm"/>
                    <input 
                        className='w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 text-sm rounded-sm px-2 overflow-hidden'
                        placeholder={"Enter article image url..."}
                        onChange={(e) => { 
                        setNewArticle({ img_url: e.target.value }) 
                    }} />
                </div>

                <div className='flex flex-row gap-2 w-full mb-4'>
                    <BoxLabel text='ARTICLE LINK URL' styling='w-80 bg-white px-2' text_size=" text-sm"/>
                    <input 
                        className='w-full h-8 bg-zinc-800 text-white outline-1 outline-zinc-700 text-sm rounded-sm px-2 overflow-hidden'
                        placeholder={"Enter article link url..."}
                        onChange={(e) => { 
                        setNewArticle({ link_url: e.target.value }) 
                    }} />
                </div>

                <button className='w-full h-12 rounded-center bg-green-400 font-bold text-white rounded-sm shadow-sm shadow-black/20'
                    onClick={() => { postNewArticle() }}>
                    POST ARTICLE
                </button>
            </div>
        </div>
    )
}

export default PostArticlePage