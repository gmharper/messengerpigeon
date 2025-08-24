import axios from 'axios'

async function getArticles (
  setFn, setLoading, setError,
  topic='', author='', 
  sort='created_at', order='DESC', page=0, per_page=20, only=''
) {
  
  if (setLoading) setLoading(true)
  if (setError) setError(null)

  const params = { 
    sort: sort, order: order, p: page, limit: per_page, 
  } 

  if (only) params.only = only
  if (topic) params.topic = topic
  if (author) params.author = author

  return axios
  .get('https://nc-news-seedingproject.onrender.com/api/articles', { params: params })
  .then((res) => {
    const articlesCopy = [...res.data.articles]

    if (setFn) setFn(articlesCopy)
    return articlesCopy
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getArticles