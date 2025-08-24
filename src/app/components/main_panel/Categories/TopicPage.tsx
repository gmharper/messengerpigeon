// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react";
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// COMPONENTS
import { SyncLoader } from "react-spinners";
import { BoxLabel, LoadingCard, StarButton } from "../../style/index";
import { GridPanel } from "../Main";
import { ArticleCard } from "../Articles/index";

// SCRIPTS
import { getArticles, getTopicBySlug } from "@/app/scripts/fetch/index";

// TYPE DECLARATIONS
type topic = {
    type:string, slug: string, description: string,
    topic_colour:string, img_url: string,
    subscribers: Array<string>,
    created_at:string
}

type TopicProps = {
    slug:string,
    setHeading?: Dispatch<SetStateAction<string>>
}

const defaultTopic = {
    type: 'topic',
    slug: '', name: '', description:'', created_by: '',
    topic_colour: 'white',
    subscribers: [], comments: [],
    img_url: '',
    created_at: ''
}

function TopicPage ():React.JSX.Element {
    const { loggedInUser, loggedInUsername, params, setParams } = useContext(AppContext)

    const topicReducer = (state:any, action:any) => {
        const topicCopy = {...state}

        for (const key in action) {
            if (topicCopy.hasOwnProperty(key)) topicCopy[key] = action[key]
        } return topicCopy
    }

    const [storedTopic, setStoredTopic] = useReducer(topicReducer, defaultTopic)
    const [topicArticles, setTopicArticles] = useState([])
    
    const [filteredArticles, setFilteredArticles] = useState([])

    const [isSubscribed, setIsSubscribed] = useState(false)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const [articlesLoading, setArticlesLoading] = useState(false)
    const [articlesError, setArticlesError] = useState(null)

    // UTILITY FUNCTIONS
    function filterArticles(articlesToFilter:any) {
        const articlesFiltered = articlesToFilter.filter((article:any) => {
            if ((article.title && article.title.includes(params.search)) || (article.body && article.body.includes(params.search))) return article //user
        })
        setFilteredArticles(articlesFiltered)

        return articlesFiltered
    }

    function handleSubscribe () {
        setIsSubscribed(true) // optimistic rendering

        const topicSubscribers = [...storedTopic.subscribers]
        topicSubscribers.push(loggedInUsername)

        setStoredTopic({ subscribers: topicSubscribers })
    }

    function handleUnsubscribe () {
        setIsSubscribed(false) // optimistic rendering

        const topicSubscribers = [...storedTopic.subscribers]
        topicSubscribers.splice(topicSubscribers.indexOf(loggedInUsername))

        setStoredTopic({ subscribers: topicSubscribers })
    }

    useEffect(() => {
        if (params.loading_page)
            getTopicBySlug(params.id, setStoredTopic, setLoading, setError)
            .then((topic) => {
                setParams({ heading: topic? topic.name? topic.name : 'TOPIC' : 'TOPIC' })

                return getArticles(setTopicArticles, setArticlesLoading, setArticlesError, topic.slug, null, params.sort, 'DESC', 0, 12)
            })
            .then((articles:any) => {
                setFilteredArticles(articles)
            })
            .finally(() => {
                setParams({ loading_page: false })
            })
    }, [])

    useEffect(() => {
        if (!params.loading_page) {
            getArticles(setTopicArticles, setArticlesLoading, setArticlesError, storedTopic.slug, null, params.sort, params.order, params.page, params.per_page)
        }
    }, [params.sort, params.order, params.page, params.per_page])

    useEffect(() => {
        if (!params.loading_page && topicArticles) {
            filterArticles(topicArticles)
        }
    }, [params.search])

    return (
        <>
            
        { 
            error ? 
            <LoadingCard type={'error'} display_type="Topic" err_msg={error? error : ''} styling='my-16' />
            : 
            loading ? 
            <LoadingCard type={'loading'} display_type="Topic" styling='my-16' />
            :
            (topicArticles.length===0)?
            <LoadingCard type={'empty'} message={'This topic has no articles yet!'} styling='my-16' />
            :
            <div className='flex flex-col gap-4 w-full px-8 py-4'>
                {/* <BoxLabel text={`ARTICLES for ${storedTopic? storedTopic.name : 'TOPIC'}`}/> */}
                <div className='flex w-full justify-center py-4'>
                    <GridPanel 
                        cardShape={"row"}
                        isLoading={articlesLoading}
                        error={articlesError}
                        children={
                            filteredArticles.map((article:any) => {
                                return (
                                    <ArticleCard article_id={article.article_id} article={article} cardShape={"row"}/>
                                )
                            })
                        }
                    />

                </div>
            </div>
        }
        </>
    )
}

export default TopicPage