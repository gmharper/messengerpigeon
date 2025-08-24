// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { postArticle } from "@/app/scripts/post/index"
import { getTopicsData } from "@/app/scripts/fetch/index"

// COMPONENTS
import { Editor } from "primereact/editor"

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
        setParams({ heading: 'CREATE NEW ARTICLE' })
        getTopicsData("slug", setTopicSlugs, setLoading, setError)
    }, [])

    return (
        <div className='flex flex-col w-full items-center'>
            <div className='flex flex-col w-full gap-4 items-center content-center justify-center px-16 2xl:px-32'>
                <div className='flex flex-col w-full rounded-sm overflow-hidden shadow-sm shadow-black/20'>
                    <div className='w-full h-8 items-center content-center bg-white'>
                        <p className='font-bold text-black text-center items-center'>ARTICLE TITLE</p>
                    </div>
                    <input className='h-8 bg-zinc-200 text-black px-2'
                    placeholder={"enter article title..."} 
                    onChange={(e) => { setNewArticle({ title: e.target.value }) }}/>
                </div>

                <div className='flex flex-row w-full items-center rounded-sm overflow-hidden shadow-sm shadow-black/20'>
                    <div className='flex-1 h-8 content-center bg-white'>
                        <p className='font-bold text-black text-center'>SELECT A TOPIC</p>
                    </div>
                    <select className='flex-1 h-8 text-black bg-zinc-200'
                    onChange={(e) => { setNewArticle({ topic: e.target.value }) }}>
                    {
                        topicSlugs.map((topic:any) => {
                            return <option>{topic.slug}</option>
                        })
                    }
                    </select>
                </div>

                <div className='flex flex-col gap-2 w-full h-100 bg-white rounded-sm overflow-hidden shadow-sm shadow-black/20'>
                    <div className='w-full h-8 content-center bg-white'>
                        <p className='font-bold text-black text-center content-center'>ARTICLE CONTENT</p>
                    </div>
                    <Editor value={'XD!'} onTextChange={(e) => console.log(e.htmlValue)} 
                        style={{ 
                            backgroundColor: 'white',
                            color: 'black',
                            height: '320px' 
                        }} 
                    />

                    {/* <textarea className='flex w-full h-full bg-zinc-200 text-black px-2 align-top'
                    placeholder={"enter article content..."}
                    onChange={(e) => {
                        setBodyError(false) 
                        setNewArticle({ body: e.target.value }) 
                    }}/> */}
                </div>


                <div className='flex flex-col w-full rounded-sm overflow-hidden shadow-sm shadow-black/20'>
                    <div className='w-full h-8 items-center bg-white'>
                        <p className='font-bold text-black text-center'>ARTICLE IMAGE URL</p>
                    </div>
                    <input className='w-full h-8 bg-zinc-200 text-black px-2'
                    placeholder={"enter article image url..."}
                    onChange={(e) => { 
                        setNewArticle({ img_url: e.target.value }) 
                    }} />
                </div>

                <button className='w-full h-8 rounded-center bg-green-500 font-bold text-black rounded-sm shadow-sm shadow-black/20'
                    onClick={() => { postNewArticle() }}>
                    POST ARTICLE
                </button>
            </div>
        </div>
    )
}

export default PostArticlePage