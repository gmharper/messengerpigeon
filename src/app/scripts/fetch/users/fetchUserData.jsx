import axios from "axios"

async function getUserData (
    username, dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/users/'+username +`/${dataType}`)
    .then((res) => {
        let userData = res.data.data

        if (setFn) setFn(userData)
        return userData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getUserData