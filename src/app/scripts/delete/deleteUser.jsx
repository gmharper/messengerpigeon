import axios from "axios"

function deleteUser (
    username='', 
    setFn, setLoading, setError,
    dummy=false
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .delete('https://nc-news-seedingproject.onrender.com/api/users/'+username, { params: { dummy: dummy } })
        .then((res) => {
            const deletedUser = {...res.data.user}

            if (setFn) setFn(deletedUser)
            return deletedUser
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default deleteUser