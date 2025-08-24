import axios from "axios"

function deleteArticle (
    article_id='', 
    setFn, setLoading, setError,
    dummy=false
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .delete('https://nc-news-seedingproject.onrender.com/api/articles/'+article_id, { params: { dummy: dummy } })
        .then((res) => {
            const deletedArticle = {...res.data.article}

            if (setFn) setFn(deletedArticle)
            return deletedArticle
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default deleteArticle