
import { useEffect, useState } from "react"
import { getComments } from "../../../scripts/fetch/index"

// COMPONENTS
import { CommentCard } from "./index"
import { ListBox } from "../../style"

// TYPE DECLARATIONS
type AppProps = {
    cardShape: string,
    sort: string,
    order: string,
    page: number,
    filters: any
}

type comment = {
    type: string,
    comment_id: number,
    article_id: number,
    article_title: string,
    body: string,
    votes: number,
    author: string
    created_at: Date
} | null

function CommentsPanel ({ cardShape, sort, order, page, filters }:AppProps ):React.JSX.Element {
    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState(false)
    const [commentsError, setCommentsError] = useState(null)

    useEffect(() => {
        getComments(setComments, setCommentsLoading, setCommentsError, sort, order, page, 20)
    }, [])

    return (
        <GridPanel 
            cardShape={cardShape}
            isLoading={commentsLoading}
            error={commentsError}
            children={
                comments.map((comment:comment):React.JSX.Element => {
                    return (
                        <CommentCard cardShape={cardShape} comment={comment} />
                    )
                })
            }
        />
    )
}

export default CommentsPanel