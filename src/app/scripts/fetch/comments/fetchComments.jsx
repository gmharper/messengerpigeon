import axios from 'axios'

async function getComments (
  setFn, setLoading, setError,
  article_id=0, author='', 
  sort='votes_count', order='DESC', page=0, per_page=20, only=''
) {
  if (setLoading) setLoading(true)
  if (setError) setError(null)

  const params = {
    sort: sort, order: order, p: page, limit: per_page, 
  }

  if (only) params.only = only
  if (author) params.author = author
  if (article_id) params.article_id = article_id

  return axios
  .get('https://nc-news-seedingproject.onrender.com/api/comments', { params: params })
  .then((res) => {
    const commentsCopy = [...res.data.comments]

    if (setFn) setFn(commentsCopy)
    return commentsCopy
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getComments