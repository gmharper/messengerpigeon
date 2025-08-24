
// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext } from "@/app/page"

// SCRIPTS
import { patchUserData } from "@/app/scripts/patch/index"
import { patchArticleData } from "@/app/scripts/patch/index"
import { deleteArticle } from "@/app/scripts/delete/index"

// COMPONENTS
import { Tooltip } from "react-tooltip"
import { RowCard, LikeButton, ReadButton } from "../../style"
import { ChevronDoubleRightIcon, HeartIcon as HeartIconS, XMarkIcon } from "@heroicons/react/24/solid"
import { HeartIcon } from "@heroicons/react/24/outline"
import { StateContext } from "@/app/state"


// TYPE DECLARATION
type AppProps = {
    article_id: number,
    article: article,
    cardShape: string
}

type article = {
    type: string,
    article_id: number,
    title:string, body:string, topic:string, author:string,
    comments:Array<number>,
    voted_by:Array<string>,
    img_url:string, link_url:string,
    created_at: string,
}

function ArticleCard ({ article_id, article, cardShape }:AppProps ):React.JSX.Element {
    const { loggedInUsername, loggedInUser } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)

    const articleReducer = (state:any, action:any) => {
        const articleCopy = {...state}

        for (const key in action) {
            if (articleCopy.hasOwnProperty(key)) articleCopy[key] = action[key]
        } return articleCopy
    }

    const [storedArticle, setStoredArticle] = useReducer(articleReducer, article)

    const [isLiked, setIsLiked] = useState(false)

    function openTopicPage () {
        const topicState = {
            id: article.topic,
            loading_page: true,
            display_type: 'topic_page',
            sorts: 'article_sorts',
            sort: 'created_at',
            order: 'DESC',
            page: 0,
            per_page: 16,
            roost_type: 'topic',
            heading: `ARTICLES for TOPIC ${article.topic}`
        }
        setCurrentState(topicState)
    }

    function openArticlePage () {
        const articleState = {
            id: article.article_id,
            loading_page: true,
            name: article.title,
            display_type: 'article_page',
            heading: article.title,
            show_filters: false,
            show_heading: false,
            show_function_bar: false
        }
        setCurrentState(articleState)
    }

    function openArticlesByUser () {
        const articleState = {
            id: article.author,
            loading_page: true,
            display_type: 'articles',
            author: article.author,
            show_heading: true
        }
        setCurrentState(articleState)
    }

    function handleLike () {
        if (storedArticle) {
            setIsLiked(true) // optimistic rendering
            const votes:Array<string> = [...storedArticle.voted_by]
            
            votes.push(loggedInUsername)
            setStoredArticle({ voted_by: votes })

            // make call to db
            // if returns error then unset the value
        }
    }

    function handleUnlike () {
        if (storedArticle) {
            setIsLiked(false) // optimistic rendering
            const votes:Array<string> = [...storedArticle.voted_by]

            votes.splice(votes.indexOf(loggedInUsername))
            setStoredArticle({ voted_by: votes })

            // make call to db
            // if returns error then unset the value
        }
    }

    function handleDelete () {
        return
    }

    useEffect(() => {
        if (article) setStoredArticle(article)
    }, [article])

    return (
        <>
            { article ? cardShape==='row' ?
                <RowCard type={'article'} height={'h-32 '} styling={isLiked ? "outline-3 outline-sky-500 shadow-lg shadow-sky-500 " : " "} children={
                    <div className='relative w-full'>
                        <img src={ article? article.img_url? article.img_url 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" 
                            : "https://kcc.org.nz/wp-content/uploads/2016/08/Kereru-Craig-McKenzie-e1470708765247.jpg" 
                        } className='absolute w-full'
                        />

                        <div className='z-20 flex flex-col gap-2 h-full p-2'>
                            <div className='z-20 flex flex-row gap-2'>
                                <div className='w-80 h-8 bg-white shadow-sm shadow-black/20 content-center rounded-sm px-2'>
                                    <p className='font-bold text-black text-sm text-clip truncate'>{ article.title }</p>
                                </div>

                                <div className='flex-1' />

                                <div className='flex flex-row gap-1'>
                                    <div 
                                        className='w-12 bg-zinc-300 content-center px-2 rounded-sm'
                                        data-tooltip-id={article_id +'_votes'}
                                        data-tooltip-content='Number of Votes'
                                        data-tooltip-place='bottom'
                                    >
                                        <p className='text-sm text-black text-center'>{storedArticle? storedArticle.voted_by? storedArticle.voted_by.length : 0 : 0}</p>
                                    </div>
                                    <Tooltip id={article_id +'_votes'} />
                                    
                                    <LikeButton isLiked={isLiked} setFn={handleLike} unsetFn={handleUnlike} />
                                </div>
                            </div>

                            <div className='z-20 flex flex-row gap-2'>
                                <button 
                                    className='flex w-16 bg-white/90 rounded-full outline-1 outline-zinc-300 place-content-center'
                                    onClick={() => { openTopicPage() }}>
                                    <p className='h-6 font-bold text-black text-xs content-center'>{ article.topic }</p>
                                </button>
                            </div>

                            <div className='flex-1' />

                            <div className='z-20 flex flex-row gap-2'>
                                <button 
                                    className='max-w-64 h-6 bg-white rounded-sm content-center px-2 '
                                    onClick={() => { openArticlesByUser() }}>
                                    <p className={'text-black truncate text-clip text-xs ' +(article.author===loggedInUsername? 'font-bold' : '')}>{ article ? article.author : "" }</p>
                                </button>

                                <div className='w-24 h-6 bg-white rounded-sm content-center items-center px-2 '
                                    data-tooltip-id={article_id +'_creation_date'}
                                    data-tooltip-content='Creation Date'
                                >
                                    <p className='text-black text-xs'>{ article ? new Date(article.created_at).toLocaleDateString() : "" }</p>
                                </div>
                                <Tooltip id={article_id +'_creation_date'}/>
                                
                                <div className='flex-1' />

                                <ReadButton text={''} Fn={ openArticlePage }/>
                            </div>


                        </div>
                    </div>
                } />
                : cardShape==='square' ?
                <div className='grid grid-cols-4'>
                </div> 
                : <></> : <></>
            }
        </>
    )
}

export default ArticleCard