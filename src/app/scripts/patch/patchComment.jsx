import axios from "axios"

function patchComment ({ comment_id, comment, setLoading, setError }) {
    setError(null)
    setLoading(true)

    return axios
        .patch(`/api/comments/${comment_id}`, comment)
        .then((res) => {
            const patchedComment = {...res.body.comment}

            return patchedComment
        })
        .catch((err) => {
            setError(err)
            return { err_msg: err }
        })
        .finally(() => {
            setLoading(false)
        })
}

export default patchComment