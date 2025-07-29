
import axios from 'axios'

function getArticleById (
  articleId,  
  setFn, setLoading, setError, 
) {
  
  if (setLoading) setLoading(true)

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/articles/'+articleId)
  .then((res) => {
    let article = res.data.article[0]

    if (setFn) setFn(article)
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