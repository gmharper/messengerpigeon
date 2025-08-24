import axios from "axios";

function postTopic (topic, setFn, setLoading, setError) {
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
        .post('https://nc-news-seedingproject.onrender.com/api/topics', topic)
        .then((res) => {
            const newTopic = res.body.topic

            if (setFn) setFn(newTopic)
            return newTopic
        })
        .catch((err) => {
            if (setError) setError(err)
            console.log( { err_msg: err })
        })
        .finally(() => {
            if (setLoading) setLoading(false)
        })
}

export default postTopic