// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext } from "@/app/page"

// SCRIPTS
import { getArticleById, getCommentById, getComments } from "@/app/scripts/fetch/index"

// COMPONENTS
import { GridPanel } from "../Main"
import { BoxLabel, LikeButton, LoadingCard } from "../../style/index"
import { PencilIcon } from "@heroicons/react/24/solid"
import { CommentCard } from "../Comments"
import { StateContext } from "@/app/state"

// TYPE DECLARATIONS
type article = {
    type: string,
    article_id: number,
    title: string,
    topic: string,
    author: string,
    body: string,
    created_at: Date,
    voted_by: Array<string>, comments: Array<number>,
    img_url: string,
}

type ArticleProps = {
    article_id:number,
}

// STYLING

const defaultArticle = {
    type: 'article', article_id: 0, title: '',
    topic: '', author: '', body: '',
    voted_by: [], comments: [],
    img_url: '',
    created_at: ''
}

function ArticlePage ():React.JSX.Element {
    const { loggedInUsername, loggedInUser, setLoggedInUser, params, setParams } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    const articleReducer = (state:any, action:any) => {
        const articleCopy = {...state}

        for (const key in action) {
            if (articleCopy.hasOwnProperty(key)) articleCopy[key] = action[key]
        } return articleCopy
    }
    
    const [storedArticle, setStoredArticle] = useReducer(articleReducer, defaultArticle)

    const [articleComments, setArticleComments] = useState([])

    const [isLiked, setIsLiked] = useState(loggedInUser? loggedInUser.voted_articles.includes(storedArticle.article_id) : false)
        
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [commentsLoading, setCommentsLoading] = useState(false)
    const [commentsError, setCommentsError] = useState(null)

    const articleStyling = {
        image: {
            backgroundColor: 'black',
            backgroundImage: storedArticle? storedArticle.img_url? `url(${storedArticle.img_url})` : '' : '',
            backgroundPosition: 'bottom',
            backgroundBlendMode: 'normal',
            backgroundSize: '100%'
        }   
    }

    // UTILITY FUNCTIONS
    function handleLike () {
        setIsLiked(true)
        const likedArticles:any = loggedInUser.voted_articles

        likedArticles.append(storedArticle.article_id)
        // make call to db
        // if error reset the value
        // if successfull
        setLoggedInUser({ voted_articles: likedArticles })
    }

    function handleUnlike () {
        setIsLiked(false)
        const likedArticles = loggedInUser.voted_articles

        likedArticles.splice(storedArticle.article_id, 1)

        // make call to db
        // if error reset the value
        // if successfull
        setLoggedInUser({ voted_articles: likedArticles })
    }

    function openTopicPage () {
        const topicState = {
            id: storedArticle? storedArticle.topic : '',
            display_type: 'topic_page',
            sorts: 'article_sorts',
            sort: 'created_at',
            order: 'DESC',
            page: 0,
            per_page: 16,
            roost_type: 'topic',
            topic: storedArticle? storedArticle.topic : '',
            heading: `ARTICLES for TOPIC ${storedArticle.topic? storedArticle.topic : ''}`
        }
        setCurrentState(topicState)
    }

    function openArticlesByUser () {
        const articleState = {
            display_type: 'articles',
            author: storedArticle? storedArticle.author : '',
            show_heading: true
        }
        setCurrentState(articleState)
    }

    useEffect(() => {
        setParams({ location: 'article_page', heading: 'ARTICLE' })

        if (params.loading_page) {
            getArticleById(params.id, setStoredArticle, setLoading, setError)
            .then((article) => {
                setParams({ location: 'article_page', heading: `${article.title}` })

                getComments(setArticleComments, setCommentsLoading, setCommentsError, article.article_id, '', 
                    'created_at', 'DESC', 0, 8)
            })
            .finally(() => {
                setParams({ loading_page: false})
            })
        }
    }, [])

    return (
        <>
        { 
            error ? 
            <LoadingCard type={'error'} display_type="Article" err_msg={error? error : ""} />
            : 
            loading ? 
            <LoadingCard type={'loading'} display_type="Article" />
            :
            <div className={'relative flex flex-col w-full px-4 xl:px-8 rounded-t-xl py-12 ' +(isLiked? 'outline-2 outline-sky-500 shadow-lg shadow-sky-500' : '')}>
                <div className='relative w-full h-60 rounded-t-xl overflow-hidden mb-8'>
                    <img 
                        src={ storedArticle? storedArticle.img_url ? storedArticle.img_url 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" 
                        } 
                        className='absolute w-full'
                    />

                    <div className='z-20 flex flex-col gap-2 w-full h-full p-2'>
                        <div className='z-20 flex flex-row'>
                            <div className='flex h-12 bg-white shadow-sm shadow-black/20 content-center items-center rounded-sm px-4 '>
                                <p className='font-bold text-black text-lg text-clip truncate'>{ storedArticle.title }</p>
                            </div>

                            <div className='flex-1' />

                            <LikeButton isLiked={isLiked} setFn={handleLike} unsetFn={handleUnlike} width='w-10 ' height='h-10 '/>
                        </div>

                        <div className='z-20 flex flex-row gap-2'>
                            <button className='w-16 bg-white/90 rounded-full outline-1 outline-zinc-300'
                            onClick={() => { openTopicPage() }}>
                                <p className='h-6 font-bold text-black text-sm'>{ storedArticle.topic }</p>
                            </button>    
                        </div>

                        <div className='flex-1' />

                        <div className='z-20 flex flex-row gap-2'>
                            <button 
                                className='max-w-64 h-6 bg-white rounded-sm shadow-sm shadow-black/20 content-center px-2 '
                                onClick={() => { openArticlesByUser() }}>
                                <p className={'text-black truncate text-clip text-xs ' +((storedArticle.author===loggedInUsername? 'font-bold' : ''))}>
                                    { storedArticle? storedArticle.author : "" }
                                </p>
                            </button>

                            <div className='w-24 h-6 bg-white rounded-sm shadow-sm shadow-black/20 content-center items-center px-2 '>
                                <p className='text-black text-xs text-center'>{ storedArticle? new Date(storedArticle.created_at).toLocaleDateString() : "" }</p>
                            </div>
                            
                            <div className='flex-1' />
                        </div>
                    </div>
                </div>

                <textarea 
                    readOnly={true} 
                    className='w-full min-h-64 max-h-64 bg-zinc-900/50 text-white p-4 overflow-hidden' 
                    defaultValue={storedArticle ? storedArticle.body : ""} />

                <div className='h-[1px] my-16 bg-zinc-500' />

                <BoxLabel text={`Article comments`}/>
                <div className='flex w-full justify-center py-4'>
                {
                    commentsError?
                    <LoadingCard type={'error'} display_type="Comments" err_msg={commentsError? commentsError : ''} styling='my-16' />
                    :
                    commentsLoading?
                    <LoadingCard type={'loading'} display_type="Comments" styling='my-16' />
                    :
                    (articleComments.length===0)?
                    <LoadingCard type={'empty'} message={"This article doesn't have any comments yet!"} styling='my-16' />
                    :
                    <GridPanel 
                        cardShape={"row"}
                        isLoading={commentsLoading}
                        error={commentsError}
                        children={
                            articleComments.map((comment:any) => {
                                return (
                                    <CommentCard comment_id={comment.comment_id} comment={comment} cardShape={"row"}/>
                                )
                            })
                        }
                    />
                }
                </div>
    
            </div>
        }
        </>
    )
}

export default ArticlePage