import axios from "axios"

function deleteComment (
    comment_id='', 
    setFn, setLoading, setError,
    dummy="false"
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .delete('https://nc-news-seedingproject.onrender.com/api/comments/'+comment_id, { params: { dummy: dummy } })
        .then((res) => {
            const deletedComment = {...res.data.comment}

            if (setFn) setFn(deletedComment)
            return deletedComment
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default deleteComment