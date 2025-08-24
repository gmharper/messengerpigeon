import axios from 'axios'

async function getArticleById (
  article_id, 
  setFn, setLoading, setError, 
) {
  
  if (setLoading) setLoading(true)
  if (setError) setError(null)

  return axios
  .get('https://nc-news-seedingproject.onrender.com/api/articles/'+article_id)
  .then((res) => {
    const articleCopy = {...res.data.article}

    if (setFn) setFn(articleCopy)
    return articleCopy
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getArticleById