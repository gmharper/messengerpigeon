import axios from "axios"

async function getCommentData (
    comment_id, dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/comments/'+comment_id +`/${dataType}`)
    .then((res) => {
        let commentData = res.data.data

        if (setFn) setFn(commentData)
        return commentData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getCommentData

