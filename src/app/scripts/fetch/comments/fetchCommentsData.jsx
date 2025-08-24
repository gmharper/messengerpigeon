import axios from "axios"

async function getCommentsData (
    dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/comments/' +`${dataType}`)
    .then((res) => {
        let commentsData = [...res.data.data]

        if (setFn) setFn(commentsData)
        return commentsData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getCommentsData
