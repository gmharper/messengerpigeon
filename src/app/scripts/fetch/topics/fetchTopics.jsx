import axios from 'axios'

async function getTopics (
    setFn, setLoading, setError,
    sort='subscribers_count', order='DESC', page=0, per_page=20, only=''
) {
  
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    const params = {
        sort: sort, order: order, p: page, limit: per_page
    }

    if (only) params.only = only

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/topics', { params: params} )
    .then((res) => {
        const topicsCopy = [...res.data.topics]

        if (setFn) setFn(topicsCopy)
        return topicsCopy
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