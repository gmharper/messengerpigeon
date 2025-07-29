
import axios from 'axios'

function getComments (
  setFn, setLoading, setError, 
  sort='likes', order='DESC', page=1, perPage=20
) {
  
  if (setLoading) setLoading(true)

  let queryString = `?sort_by=${sort}&order=${order}&p=${page}&limit=${perPage}` // injection is prevented on the db side

  axios
  .get('https://nc-news-seedingproject.onrender.com/api/comments'+queryString)
  .then((res) => {
    let comments = res.data.comments
    let commentsCopy = [...comments]

    // new property assignment
    commentsCopy.forEach((comment) => {
      comment.type = 'comment'
    })

    if (setFn) setFn(commentsCopy)
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