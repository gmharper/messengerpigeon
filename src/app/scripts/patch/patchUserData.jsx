import axios from "axios"

function patchUserData (type, username, recipientUsername, patchData, setLoading, setError) {
    const endpoints = [
        "follow", "unfollow", "name", "email", "description", "profile_colour", "avatar_img_url", "banner_img_url"
    ]

    if (!endpoints.includes(type)) return Promise.reject({ status: 400, err_msg: "Invalid dataType" })
    if (!username) return Promise.reject({ status: 400, err_msg: "No username provided" })

    setLoading(true)

    switch (type) {
        case "follow":
            if (!recipientUsername) return Promise.reject({ status: 400, err_msg: "No recipient username provided" })

            return axios
                .patch(`/api/users/${username}/follow`, recipientUsername)
                .then(() => {
                    return axios
                        .patch(`/api/users/${recipientUsername}/followed_by`, username)
                })
                .catch((err) => {
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        case "unfollow":
            if (!recipientUsername) return Promise.reject({ status: 400, err_msg: "No recipient username provided" })

            return axios
                .patch(`/api/users/${username}/unfollow`, recipientUsername)
                .then(() => {
                    return axios
                        .patch(`/api/users/${recipientUsername}/unfollowed_by`, username)
                })
                .catch((err) => {
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })

        default:
            if (!patchData) return Promise.reject({ status: 400, err_msg: "No patch data provided" })

            return axios
                .patch(`/api/users/${username}/${type}`, patchData)
                .catch((err) => {
                    setError(err)
                    return { err_msg: err }
                })
                .finally(() => { return setLoading(false) })
    }

}

export default patchUserData