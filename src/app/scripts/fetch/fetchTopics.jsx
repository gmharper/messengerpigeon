
import axios from 'axios'

function getTopics (setFn, setLoading, setError,
    sort, order, page, perPage
) {
    if (setLoading) setLoading(true)

    let queryString = `?sort_by=${sort}&order=${order}&p=${page}&limit=${perPage}` // injection is prevented on the db side

    axios
    .get('https://nc-news-seedingproject.onrender.com/api/topics')
    .then((res) => {
        let topics = res.data.topics
        let topicsCopy = [...topics]

        // new property assignment
        topicsCopy.forEach((topic) => {
        topic.type = 'topic'
        })

        if (setFn) setFn(topicsCopy)
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getTopics