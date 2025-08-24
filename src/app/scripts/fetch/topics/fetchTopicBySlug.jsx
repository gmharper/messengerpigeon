import axios from 'axios'

async function getTopicBySlug (
    slug,  
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/topics/'+slug)
    .then((res) => {
        const topicCopy = {...res.data.topic}

        if (setFn) setFn(topicCopy)
        return topicCopy
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getTopicBySlug