
import axios from "axios"

function getArticleComments 
  (articleId,  
  setFn, setLoading, setError) {
  
  if (setLoading) setLoading(true)

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/articles/'+articleId +'/comments')
  .then((res) => {
    let comments = res.data.comments
    let commentsCopy = [...comments]

    if (setFn) setFunction(commentsCopy)
  })
  .catch((err) => {
    if (setError) setError(err)
    console.log({ err_msg: err })
  })
  .finally(() => {
    if (setLoading) setLoading(false)
  })
}

export default getArticleComments