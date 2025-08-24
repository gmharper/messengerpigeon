import axios from "axios";

function patchTopic ({ slug, topic, setLoading, setError }) {
    setError(null)
    setLoading(true)

    return axios
        .patch(`/api/topics/${slug}`, topic)
        .then((res) => {
            const patchedTopic = {...res.body.topic}

            return patchedTopic
        })
        .catch((err) => {
            setError(err)
            return { err_msg: err }
        })
        .finally(() => {
            setLoading(false)
        })
}

export default patchTopic