"use client"

// IMPORTS
import { useContext, useEffect, useReducer, useState } from "react"
import { AppContext, ThemeContext } from "@/app/contexts/AppContext";
import { StateContext } from "@/app/state"

// SCRIPTS
import { patchUserData } from "@/app/scripts/patch/index"
import { getCommentData } from "@/app/scripts/fetch/index"
import { patchCommentData } from "@/app/scripts/patch/index"
import { deleteComment } from "@/app/scripts/delete/index"

// COMPONENTS
import { Tooltip } from "react-tooltip"
import { BoxLabel, RowCard, SquareCard, LikeButton, ReadButton } from "../../style"

// TYPE DECLARATIONS
type comment = {
    type: string,
    comment_id: number,
    article_id: number,
    article_title: string,
    body: string,
    voted_by: Array<string>,
    author: string,
    created_at: string
} | null

type AppProps = {
    comment_id: number,
    comment: comment,
    cardShape: string
}

function CommentCard ({ comment_id, comment, cardShape }:AppProps ):React.JSX.Element {
    const { loggedInUsername, loggedInUser } = useContext(AppContext)
    const { setCurrentState } = useContext(StateContext)
    
    const commentReducer = (state:any, action:any) => {
        const commentCopy = {...state}

        for (const key in action) {
            if (commentCopy.hasOwnProperty(key)) commentCopy[key] = action[key]
        } return commentCopy
    }

    const [storedComment, setStoredComment] = useReducer(commentReducer, comment)
    const [isLiked, setIsLiked] = useState(loggedInUser.voted_comments.includes(comment_id))

    const [voteLoading, setVoteLoading] = useState(false)
    const [voteError, setVoteError] = useState(null)

    
    function handleLike () {
        setIsLiked(true) // optimistic rendering

        const likedComments = [...storedComment.voted_by]
        likedComments.push(loggedInUsername)

        setStoredComment({ voted_by: likedComments })
        // make call to database
    }

    function handleUnlike () {
        setIsLiked(false) // optimistic rendering

        const likedComments = [...storedComment.voted_by]
        likedComments.splice(likedComments.indexOf(loggedInUsername))

        setStoredComment({ voted_by: likedComments })
        // make call to database
    }
                
    function handleDelete () {
        
    }
    
    function openArticlePage () {
        if (comment && comment.article_id) {
            const articleState = {
                id: comment.article_id,
                loading_page: true,
                display_type: "article_page",
            }
            setCurrentState(articleState)
        }
    }

    function openUserPage () {
        if (comment && comment.author) {
            const userState = {
                id: comment.author,
                loading_page: true,
                display_type: "user_page",
                roost_type: 'user',
            }
            setCurrentState(userState)
        }
    }

    useEffect(() => {
        if (comment) setStoredComment(comment)
    }, [comment])
                
    return (
        <>
            { comment && cardShape==='row' ? 
            <RowCard type={'user'} height={'h-32 '} styling={isLiked ? "outline-3 outline-sky-500 shadow-lg shadow-sky-500 " : "outline-1 outline-zinc-300 "} children={
                <div className='relative w-full h-full'>
                    <div className='flex flex-col w-full h-full gap-1 p-2'>
                        <div className='flex flex-row gap-1 w-full h-full'>
                            <div className='w-full h-full bg-zinc-300 content-center px-2 rounded-lg'>
                                <p className='text-xs text-black content-top'>{comment.body}</p>
                            </div>

                            <div 
                                className='w-12 h-8 bg-zinc-300 content-center px-2 rounded-sm'
                                data-tooltip-id={comment_id +'_votes'}
                                data-tooltip-content='Number of Votes'
                                data-tooltip-place='bottom'
                            >
                                <p className='text-sm text-black text-center'>{storedComment? storedComment.voted_by.length : 0}</p>
                            </div>
                            <Tooltip id={comment_id +'_votes'} />

                            <div className='w-8'>
                                <LikeButton isLiked={isLiked} setFn={handleLike} unsetFn={handleUnlike} />
                            </div>
                        </div>

                        <div className='flex-1' />

                        <div className='flex flex-row gap-2'>
                            <button className='flex max-w-64 h-6 bg-white rounded-sm items-center content-center px-2 hover:outline-1 outline-indigo-300 cursor-pointer'
                            onClick={() => { openUserPage() }}>
                                <p className={'text-black text-xs ' +((comment.author===loggedInUsername) ? 'font-bold' : '')}>{ comment ? comment.author : '' }</p>
                            </button>

                            <div className='w-24 h-6 bg-white rounded-sm content-center items-center px-2 '>
                                <p className='text-black text-xs'>{ comment ? new Date(comment.created_at).toLocaleDateString() : '' }</p>
                            </div>

                            <div className='flex-1'/>

                            <ReadButton text={''} Fn={openArticlePage} />
                        </div>
                    </div>
                </div>
            } />

            : cardShape==='square' ?
                <SquareCard styling={''} inputObject={{ title: '', img: ''}} />
            : <></>
            }

            
        </>
    )
}

export default CommentCard