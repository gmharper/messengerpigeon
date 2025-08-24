import axios from "axios"

async function getTopicData (
    slug, dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/topics/'+slug +`/${dataType}`)
    .then((res) => {
        let topicData = res.data.data

        if (setFn) setFn(topicData)
        return topicData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getTopicData