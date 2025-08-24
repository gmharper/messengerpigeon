import axios from "axios"

//types:
//  votes, comments, voted_users

async function getArticleData (
    article_id, dataType, 
    setFn, setLoading, setError
) {
  
    if (setLoading) setLoading(true)
    if (setError) setError(null)

    return axios
    .get('https://nc-news-seedingproject.onrender.com/api/articles/'+article_id +`/${dataType}`)
    .then((res) => {
        let articleData = res.data.data

        if (setFn) setFn(articleData)
        return articleData
    })
    .catch((err) => {
        if (setError) setError(err)
        console.log({ err_msg: err })
    })
    .finally(() => {
        if (setLoading) setLoading(false)
    })
}

export default getArticleData