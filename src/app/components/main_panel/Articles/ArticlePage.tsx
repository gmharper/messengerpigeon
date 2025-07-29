
// IMPORTS
import { useEffect, useState } from "react"

// TYPE DECLARATIONS
type AppProps = {
    article: article
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

function ArticlePage ({ article }:AppProps ):React.JSX.Element {
    const [storedArticle, setStoredArticle] = useState({})

    useEffect(() => {
        if (article) setStoredArticle(article)
    }, [article])

    return (
        <>
            { article ?
                <div>
        
                </div>
                : <></>
            }
        </>
    )
}

export default ArticlePage