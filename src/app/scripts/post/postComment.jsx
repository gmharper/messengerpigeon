import axios from "axios";

function postComment (comment={}, setFn, setLoading, setError) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .post('https://nc-news-seedingproject.onrender.com/api/comments', comment)
        .then((response) => {
            const newComment = response.body.comment

            if (setFn) setFn(newComment)
            return newComment
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default postComment