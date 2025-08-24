import axios from "axios"


function patchTopicData (type, slug, username, patchData, setLoading, setError) {
    const endpoints = [
        "subscribe", "unsubscribe", "slug", "description", "img_url"
    ]

    if (!username) return Promise.reject({ status: 400, err_msg: "No username provided" })
    if (!slug) return Promise.reject({ status: 400, err_msg: "No slug provided" })

    setLoading(true)

    if (!endpoints.includes(type)) {
        return Promise.reject({ status: 400, err_msg: "Invalid dataType" })
    }

    switch (type) {
        case "subscribe":
            return axios
                .patch(`/api/topics/${slug}/subscribe`, username)
                .then(() => {
                    return axios.patch(`/api/users/${username}/subscribe`, slug)
                })
                .catch((err) => { 
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        case "unsubscribe":
            return axios
                .patch(`/api/topics/${slug}/unsubscribe`, username)
                .then(() => {
                    return axios.patch(`/api/users/${username}/unsubscribe`, slug)
                })
                .catch((err) => { 
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        default:
            if (!patchData) return Promise.reject({ status: 400, err_msg: "No patch data provided" })

            return axios
                .patch(`/api/topics/${slug}/${type}`, patchData)
                .catch((err) => {
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })
    }
}

export default patchTopicData