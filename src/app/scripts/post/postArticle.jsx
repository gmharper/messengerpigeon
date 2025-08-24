import axios from "axios"

function postArticle (article={}, setFn, setLoading, setError) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .post('https://nc-news-seedingproject.onrender.com/api/articles', article)
        .then((response) => {
            const newArticle = {...response.body.article}

            if (setFn) setFn(newArticle)
            return newArticle
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default postArticle