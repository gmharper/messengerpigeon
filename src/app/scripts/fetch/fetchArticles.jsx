
import axios from 'axios'

function getArticles (
  setFn, setLoading, setError,
  sort='created_at', order='DESC', page=1, perPage=20, topic="" 
) {
  
  if (setLoading) setLoading(true)

  let queryString = `?sort_by=${sort}&order=${order}&p=${page}&limit=${perPage}` // injection is prevented on the db side
  if (topic) {
    queryString += `&topic=${topic}`
  }

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/articles'+queryString)
  .then((res) => {
    let articles = res.data.articles
    let articlesCopy = [...articles]

    // new properties assignment
    articlesCopy.forEach((article) => {
      article.type = 'article'
    })
    if (setFn) setFn(articlesCopy)
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