
// IMPORTS
import { useEffect, useState } from "react"
import { getArticles } from "../../../scripts/fetch/index"

// COMPONENTS
import { ArticleCard } from "./index"
import { ListBox } from "../../style/index"
import { GridPanel } from "../Main"

// TYPE DECLARATION
type AppProps = {
    cardShape: string,
    sort: string,
    order: string,
    page: number,
    filters: any
}

type article = {
    type: string,
    article_id: number,
    title: string,
    topic: string,
    author: string,
    created_at: Date,
    votes: number,
    article_img_url: string,
    comment_count: number
} | null

function ArticlesPanel ({ cardShape, sort, order, page, filters }:AppProps ):React.JSX.Element {
    const [articles, setArticles] = useState([])
    const [articlesLoading, setArticlesLoading] = useState(false)
    const [articlesError, setArticlesError] = useState(null)

    useEffect(() => {
        getArticles(setArticles, setArticlesLoading, setArticlesError, sort, order, page, 20)
    }, [])

    return (
        <GridPanel 
            cardShape={cardShape}
            isLoading={articlesLoading}
            error={articlesError}
            children={
                articles.map((article:article):React.JSX.Element => {
                    return (
                        <ArticleCard cardShape={cardShape} article={article} />
                    )
                })
            }
        />
    )
}

export default ArticlesPanel