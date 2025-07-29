
"use client"

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
    cardShape: string,
    comment: comment
}

function CommentCard ({ cardShape, comment }:AppProps ):React.JSX.Element {
    const [storedComment, setStoredComment] = useState(comment)

    useEffect(() => {
        if (comment) setStoredComment(comment)
    }, [comment])

    return (
        <>
            { 
                comment ? cardShape==='row' ?
                <div className='w-full h-32'>

                </div>
                : cardShape==='square' ?
                <div className='w-64 h-64'>

                </div>
                : <></> : <></>
            }
        </>
    )
}

export default CommentCard