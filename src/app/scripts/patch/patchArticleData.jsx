import axios from "axios"

function patchArticleData ({ type, article_id, username, patchData, setLoading, setError }) {
    const endpoints = [
        "like", "unlike", "title", "body", "img_url"
    ]

    if (!endpoints.includes(type)) return Promise.reject({ status: 400, err_msg: "Invalid dataType" })
    if (!article_id) return Promise.reject({ status: 400, err_msg: "No article ID provided" })

    setLoading(true)

    switch (type) {
        case 'like':
            if (!username) return Promise.reject({ status: 400, err_msg: "No username provided" })

            return axios
                .patch(`/api/articles/${article_id}/like`, username)
                .then(() => {
                    return axios.patch(`/api/users/${username}/like_article`, article_id)
                })
                .catch((err) => { 
                    setError(err) 
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        case 'unlike':
            if (!username) return Promise.reject({ status: 400, err_msg: "No username provided" })

            return axios
                .patch(`/api/articles/${article_id}/unlike`, username)
                .then(() => {
                    return axios.patch(`/api/users/${username}/unlike_article`, article_id)
                })
                .catch((err) => { 
                    setError(err) 
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        default:
            if (!patchData) return Promise.reject({ status: 400, err_msg: "No patch data provided" })

            return axios
                .patch(`api/articles/${article_id}/${type}`, patchData)
                .catch((err) => { 
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })
    }
}

export default patchArticleData