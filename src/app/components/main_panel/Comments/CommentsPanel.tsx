
import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/app/page"

// SCRIPTS
import { getComments } from "../../../scripts/fetch/index"

// COMPONENTS
import { CommentCard } from "./index"
import { GridPanel } from "../Main/index"
import { SyncLoader } from "react-spinners"
import { LoadingCard } from "../../style"

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
}

function CommentsPanel ():React.JSX.Element {
    const { params, setParams } = useContext(AppContext)

    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState([])

    const [commentsLoading, setCommentsLoading] = useState(false)
    const [commentsError, setCommentsError] = useState(null)


    // UTILITY FUNCTIONS
    async function filterComments (commentsToFilter:any) {
        const commentsFiltered = commentsToFilter.filter((comment:any) => {
            if ((comment.author && comment.author.includes(params.search)) || (comment.body && comment.body.includes(params.search))) return comment //user
        })
        setFilteredComments(commentsFiltered)

        return commentsFiltered
    }

    function setHeading (filtered:any) {
        let headingString = "COMMENTS"
        if (params.author) headingString += ` by ${params.author}`
        if (params.article_id) headingString += ` for article:${params.article_id}`
        headingString += ` (${params.page*params.per_page}/${filtered.length})`

        setParams({ location: 'comments_panel', heading: headingString })   
    }


    // USE EFFECTS
    useEffect(() => {
        setParams({ heading: 'COMMENTS' })
        getComments(setComments, setCommentsLoading, setCommentsError, params.article_id, params.author, params.sort, params.order, params.page, params.per_page, '' )
        .then((res) => {
            return filterComments(res)
        })
        .then((filtered:any) => {
            setHeading(filtered) 
        })
        .finally(() => {
            setParams({ loading_page: false })
        })
    }, [params.sort, params.order, params.page, params.per_page, params.article_id, params.author])

    useEffect(() => {
        filterComments(comments)
        .then((filtered:any) => {
            setHeading(filtered)
        })

    }, [params.search])


    return (
        <div className='p-8'>
        { 
            commentsError ? 
            <LoadingCard type={'error'} display_type="Comments" err_msg={commentsError? commentsError : ''} styling='my-16' />
            : 
            commentsLoading ? 
            <LoadingCard type={'loading'} display_type="Comments" styling='my-16' />
            :
            (comments.length===0 || filteredComments.length===0)?
            <LoadingCard type={'empty'} message={"Looks like there are no comments to show..."} styling='my-16' />
            :
            <GridPanel 
                cardShape={params.card_shape || 'row'}
                isLoading={commentsLoading}
                error={commentsError}
                children={
                    filteredComments.map((comment:comment):React.JSX.Element => {
                        return (
                            <CommentCard comment_id={comment.comment_id} comment={comment} cardShape={params.card_shape || 'row'} />
                        )
                    })
                }
            />
        }
        </div>
    )
}

export default CommentsPanel