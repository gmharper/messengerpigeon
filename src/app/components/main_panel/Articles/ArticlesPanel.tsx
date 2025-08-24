// IMPORTS
import { useContext, useEffect, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";

// SCRIPTS
import { getArticles } from "../../../scripts/fetch/index"

// COMPONENTS
import { ArticleCard } from "./index"
import { GridPanel } from "../Main/index"
import { SyncLoader } from "react-spinners"
import { LoadingCard } from "../../style"

type article = {
    type: string,
    article_id: number,
    title: string,
    topic: string,
    author: string,
    created_at: Date,
    votes: number,
    img_url: string,
    comment_count: number
}

function ArticlesPanel ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const [articles, setArticles] = useState([])
    const [filteredArticles, setFilteredArticles] = useState([])

    const [articlesLoading, setArticlesLoading] = useState(false)
    const [articlesError, setArticlesError] = useState(null)


    // UTILITY FUNCTIONS
    async function filterArticles (articlesToFilter:any) {
        const articlesFiltered = articlesToFilter.filter((article:any) => {
            if ((article.title && article.title.includes(params.search)) 
                || (article.body && article.body.includes(params.search))
                || (article.author && article.author.includes(params.search)
                || (article.topic && article.topic.includes(params.search)))) {
                    return article //user 
            }
        })
        setFilteredArticles(articlesFiltered)

        return articlesFiltered
    }

    function setHeading (filtered:any) {
        let headingString = "ARTICLES"
        if (params.topic) headingString += ` for ${params.topic}`
        if (params.author) headingString += ` by ${params.author}`
        headingString += ` (${params.page*params.per_page}/${articles.length})`

        setParams({ location: 'articles_panel', heading: headingString })
    }


    // USE EFFECTS
    // INITIAL PASS
    useEffect(() => {
        getArticles(setArticles, setArticlesLoading, setArticlesError, params.topic, params.author, params.sort, params.order, params.page, params.per_page)
        .then((articles) => {
            return filterArticles(articles)
        })
        .then((filtered:any) => {
            setHeading(filtered)
        })
        .finally(() => {
            setParams({ loading_page: false })
        })
    }, [params.sort, params.order, params.page, params.per_page, params.topic, params.author])

    useEffect(() => {
        filterArticles(articles)
        .then((filtered:any) => {
            setHeading(filtered)
        })
    }, [params.search])


    return (
        <div className='p-8'>
        {
            articlesError ? 
            <LoadingCard type={'error'} display_type="Articles" err_msg={articlesError? articlesError : ""} styling='my-16' />
            : 
            articlesLoading ? 
            <LoadingCard type={'loading'} display_type="Articles" styling='my-16' />
            :
            (articles.length===0 || filteredArticles.length===0)? 
            <LoadingCard type={'empty'} message={"Looks like there are no articles to show..."} styling='my-16' />
            :
            <GridPanel 
                cardShape={params.card_shape || 'row'}
                isLoading={articlesLoading}
                error={articlesError}
                children={
                    filteredArticles.map((article:article):React.JSX.Element => {
                        return (
                            <ArticleCard article_id={article.article_id} article={article} cardShape={params.card_shape || 'row'} />
                        )
                    })
                }
            />
        }
        </div>
    )
}

export default ArticlesPanel