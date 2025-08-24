import axios from "axios"

function deleteTopic (
    slug='', 
    setFn, setLoading, setError,
    dummy=false
) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .delete('https://nc-news-seedingproject.onrender.com/api/topics/'+slug, { params: { dummy: dummy } })
        .then((res) => {
            const deletedTopic = {...res.data.topic}

            if (setFn) setFn(deletedTopic)
            return deletedTopic
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default deleteTopic