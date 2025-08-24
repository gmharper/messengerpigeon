// IMPORTS
import { Dispatch, SetStateAction, useContext, useEffect, useReducer, useState } from "react"
import { AppContext } from "@/app/page"

// SCRIPTS
import { getCommentById } from "@/app/scripts/fetch/index"

// COMPONENTS
import { SyncLoader } from "react-spinners"

// TYPE DECLARATIONS
type comment = {
    type: string,
    comment_id: number,
    article_id: number,
    article_title: string,
    body: string,
    voted_by: Array<string>,
    author: string
    created_at: string
}

type CommentProps = {
    comment_id: number,
}

function CommentPage():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const commentReducer = (state:any, action:any) => {
        const commentCopy = {...state}

        for (const key in action) {
            if (commentCopy.hasOwnProperty(key)) commentCopy[key] = action[key]
        } return commentCopy
    }

    const [storedComment, setStoredComment] = useReducer(commentReducer, {})

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setParams({ location: 'comment_page', heading: 'COMMENT' })

        if (params.id) {
            getCommentById(params.id, setStoredComment, setLoading, setError)
            .then((comment) => {
                setParams({ location: 'comment_page', heading: `COMMENT ${comment.comment_id}` })
            })
            .finally(() => {
                setParams({ loading_page: false })
            })
        }
    }, [])

    return (
        <>
        { 
            error ? 
            <div className='flex flex-col gap-2 w-90 h-32 bg-white place-items-center content-center justify-center rounded-xl mt-16 p-4'>
                <p className='font-bold text-black text-center'>There was an error fetching comment information. Please try refreshing.</p>
                <p className='font-bold text-indigo-500 text-center'>{error.err_msg}</p>
            </div> 
            : 
            loading ? 
            <div className='flex flex-col gap-6 w-100 h-32 bg-white place-items-center content-center justify-center rounded-xl mt-16 outline-1 outline-zinc-500 shadow-lg shadow-black p-4 animate-text-grow'>
                <p className='font-bold text-black text-center text-lg'>Loading Comment</p>
                <SyncLoader color={"#7d4cb6ff"}/> 
            </div>
            :
                <div className='flex flex-col'>
                    <div className='w-full h-32 rounded-sm bg-white'>
                        <p>{ storedComment ? storedComment.comment_id : ""}</p>
                    </div>
                </div>
        }
        </>
    )
}

export default CommentPage