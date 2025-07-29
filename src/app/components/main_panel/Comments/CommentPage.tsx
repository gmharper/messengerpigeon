
// IMPORTS
import { useEffect, useState } from "react"

// TYPE DECLARATIONS
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

type AppProps = {
    comment: comment
}

function CommentPage({ comment }:AppProps ):React.JSX.Element {
    const [storedComment, setStoredComment] = useState(comment)

    useEffect(() => {
        if (comment) setStoredComment(comment)
    }, [comment])

    return (
        <>
            { comment ?
                <div></div>
                : <></>
            }
        </>
    )
}

export default CommentPage