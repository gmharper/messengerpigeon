import axios from 'axios'

async function getCommentById (
    comment_id,  
    setFn, setLoading, setError, 
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/comments/'+comment_id)
    .then((res) => {
        const commentCopy = {...res.data.comment}
        console.log(res.data)

        if (setFn) setFn(commentCopy)
        return commentCopy
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getCommentById