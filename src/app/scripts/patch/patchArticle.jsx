import axios from "axios"

function patchArticle ({ article_id, article, setLoading, setError }) {
    setError(null)
    setLoading(true)

    return axios
        .patch(`/api/articles/${article_id}`, article)
        .then((res) => {
            const patchedArticle = {...res.body.article}

            return patchedArticle
        })
        .catch((err) => { 
            setError(err) 
            return { err_msg: err }
        })
        .finally(() => { setLoading(false) })
}

export default patchArticle