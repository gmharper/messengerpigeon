import axios from "axios";

function postUser (user, setFn, setLoading, setError) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .post('https://nc-news-seedingproject.onrender.com/api/users', user)
        .then((res) => {
            const newUser = res.body.user

            if (setFn) setFn(newUser)
            return newUser
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        }) 
}

export default postUser