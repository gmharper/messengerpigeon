import axios from "axios"

async function getArticlesData (
    dataType, 
    setFn, setLoading, setError
) {
  
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/articles/' +`/${dataType}`)
    .then((res) => {
        let articlesData = [...res.data.data]

        if (setFn) setFn(articlesData)
        return articlesData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getArticlesData