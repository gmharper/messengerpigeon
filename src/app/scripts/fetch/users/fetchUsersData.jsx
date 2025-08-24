import axios from "axios"

async function getUsersData (
    dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/users/' +`${dataType}`)
    .then((res) => {
        console.log(res.data)
        let usersData = [...res.data.data]

        if (setFn) setFn(usersData)
        return usersData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getUsersData