import axios from "axios";

function patchUser (username, user, setLoading, setError) {
    setError(null)
    setLoading(true)

    return axios
        .patch(`/api/users/${username}`, user)
        .then((res) => {
            const patchedUser = {...res.body.user}

            return patchedUser
        })
        .catch((err) => {
            setError(err)
            console.log({ err_msg: err })
        })
        .finally(() => {
            setLoading(false)
        })
}

export default patchUser