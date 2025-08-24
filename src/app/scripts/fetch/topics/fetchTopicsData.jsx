import axios from "axios"

async function getTopicsData (
    dataType, 
    setFn, setLoading, setError
) {
    
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/topics/data/'+`${dataType}`)
    .then((res) => {
        let topicsData = [...res.data.data]

        if (setFn) setFn(topicsData)
        return topicsData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
      if (setLoading) setLoading(false)
    })
}

export default getTopicsData